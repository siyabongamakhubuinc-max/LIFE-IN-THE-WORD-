// PayFast signing + ITN endpoint for LITW. Node 18+, no dependencies.  Run: node payfast-server.js
// Set env vars on the host (never in the website): PF_MERCHANT_ID PF_MERCHANT_KEY PF_PASSPHRASE PF_MODE=sandbox|live SITE_URL API_URL
// Point index.html  D.pf.signEndpoint  to  https://YOUR-API/api/payfast/sign  (and allow CORS for your site domain)
const http=require('http'),crypto=require('crypto'),qs=require('querystring'),E=process.env;
const live=E.PF_MODE==='live',HOST=live?'www.payfast.co.za':'sandbox.payfast.co.za';
const enc=v=>encodeURIComponent(String(v).trim()).replace(/%20/g,'+').replace(/[!'()*~]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());
const sign=(pairs)=>{let s=pairs.filter(([,v])=>v!==''&&v!=null).map(([k,v])=>k+'='+enc(v)).join('&');if(E.PF_PASSPHRASE)s+='&passphrase='+enc(E.PF_PASSPHRASE);return crypto.createHash('md5').update(s).digest('hex')};
const body=r=>new Promise(res=>{let b='';r.on('data',c=>b+=c).on('end',()=>res(b))});
http.createServer(async(req,res)=>{
 res.setHeader('Access-Control-Allow-Origin',E.SITE_URL);res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS')return res.end();
 if(req.url==='/api/payfast/sign'){const d=JSON.parse(await body(req));
  const amount=Number(d.amount);if(!(amount>=10))return res.writeHead(400).end();
  // Field ORDER matters for the signature: keep PayFast's documented order.
  const f=[['merchant_id',E.PF_MERCHANT_ID],['merchant_key',E.PF_MERCHANT_KEY],['return_url',E.SITE_URL+'/#/give'],['cancel_url',E.SITE_URL+'/#/give'],['notify_url',E.API_URL+'/api/payfast/itn'],
   ['name_first',d.first],['name_last',d.last],['email_address',d.email],['m_payment_id',d.ref],['amount',amount.toFixed(2)],['item_name',String(d.item).slice(0,100)]];
  // TODO: save {ref, amount, fund} as "pending" in your database here so the ITN can be matched.
  const fields=Object.fromEntries(f.filter(([,v])=>v));fields.signature=sign(f);
  return res.setHeader('Content-Type','application/json').end(JSON.stringify({action:`https://${HOST}/eng/process`,fields}))}
 if(req.url==='/api/payfast/itn'){res.writeHead(200).end(); // PayFast needs a fast 200 first
  const raw=await body(req),p=qs.parse(raw),pairs=raw.split('&').filter(x=>!x.startsWith('signature=')).map(x=>{const i=x.indexOf('=');return[x.slice(0,i),decodeURIComponent(x.slice(i+1).replace(/\+/g,' '))]});
  const sigOk=sign(pairs)===p.signature;
  const v=await fetch(`https://${HOST}/eng/query/validate`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:raw}).then(r=>r.text()).catch(()=>'');
  // TODO: also (1) check request IP is in PayFast's published ranges, (2) compare p.amount_gross to the stored pending amount for p.m_payment_id.
  if(sigOk&&v.trim()==='VALID'&&p.payment_status==='COMPLETE'){console.log('PAID',p.m_payment_id,p.amount_gross,p.pf_payment_id);/* TODO: mark paid + email receipt */}
  return}
 res.writeHead(404).end()}).listen(E.PORT||3000);
