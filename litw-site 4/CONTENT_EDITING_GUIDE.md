# LITW — Campus and event content guide

Open `index.html` in a code editor and find `D.campuses` and `D.eventPages` in the JavaScript near the bottom of the file.

## Campuses
Each campus has a unique `id` that determines its address `#/branch/<id>`. The campus `hero` uses an existing image ID (for example `m13`) from `assets/img/m13.webp`. To add your own approved campus photograph, copy it into `assets/img/` and either convert it to WebP and assign an ID in the existing naming convention, or change the `photo` helper to accept full relative paths. Keep two entries in the `pastors` array; replace names and image IDs only when confirmed. A blank name/image deliberately renders a pending-photo/confirmation slot instead of making up a person. `sunday`, `midweek` and `homecells` are arrays of `[time,description]` pairs; empty arrays display a 'to be confirmed' notice. Confirm homecell locations and meeting times before publishing.

## Events
The `D.events` array contains the event title, start/end dates and location. The matching entry in `D.eventPages` (same position in the array) contains the unique event URL ID, `poster`, `officialPoster`, `synopsis` and expandable `details`. To upload a new poster, add it to `assets/img` in WebP format, assign its ID to `poster`, and set `officialPoster:true`. Until a verified poster is available, leave `poster:''` and `officialPoster:false`. Event detail sections are native expandable HTML `details` elements. Do not copy dates from older promotional material when the dossier differs.

## Photo permissions and QA
The founding couple photograph on About uses `m03.webp`, which was supplied by the client. Verify approval to use any portraits, especially children, before launch. Check every event date, pastor's name and branch service time with the church. The November 2026 event poster is provided, but its individual session information should be confirmed. This package retains the existing giving/payment configuration; no payment gateway is activated by these page changes.

## Preview on Mac
From inside the `litw-site` folder, run `python3 -m http.server 8000` and open `http://localhost:8000/#/about`, `http://localhost:8000/#/branches`, or `http://localhost:8000/#/events`.
