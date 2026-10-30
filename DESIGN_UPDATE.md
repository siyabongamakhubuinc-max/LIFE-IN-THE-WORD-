# LITW — Design refinement

This is an enhancement of the supplied `litw-site`, not a replacement project.

## Refined
- Warm charcoal/gold design tokens, stronger type scale and content hierarchy.
- Improved mobile-first hero, desktop navigation, mobile drawer and bottom tabs.
- Refined cards, media rails, forms, event listings and page transitions.
- Event page now presents the existing configured images as large event artwork panels, rather than dates alone. Confirm that each configured image is the correct poster before publishing.
- IntersectionObserver-based scroll reveals, reduced-motion support, keyboard Escape for mobile navigation, focus-visible states.
- Preserved the original content object, media assets, hash routes, WhatsApp and email fallbacks, and PayFast server sample.
- Changed footer wording to avoid implying that online payments are already enabled.

## Before launch
- Verify event poster-to-event mapping and dates against the latest client-supplied posters.
- Confirm the official YouTube channel ID and Facebook page URL in the `D` object in `index.html`.
- Payment endpoint is intentionally unset. Review server-side PayFast signature, ITN verification, policies and banking details with the church before enabling live transactions.
- The privacy/terms/refund text is a draft and requires the church's approval and appropriate legal review.
- Contact/prayer forms require a live backend endpoint if automatic submission is desired.
- Test on real mobile devices and across browsers prior to publication.

## Preview on Mac
In Terminal, `cd` into the `litw-site` folder and run `python3 -m http.server 8000`. Visit `http://localhost:8000`.
