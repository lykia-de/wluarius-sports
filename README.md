# WLUARIUS SPORTS site — first static prototype

This is a responsive, dark-theme front-end prototype for WLUARIUS SPORTS.

## Included
- Transfer news feed with search and category filters
- Official / rumour labels
- Rumour panel
- Player profile cards and modal details
- Club directory and modal details
- Responsive mobile navigation

## Important
All news and player entries in this prototype are **sample/demo content**, not real transfer reports. The site does not yet connect to RSS, an AI verification service, a database, or Telegram. Do not publish demo cards as factual news.

## Preview locally
Open `index.html` in a browser.

## Free static deployment with Cloudflare Pages
1. Create a GitHub repository and upload `index.html`, `styles.css`, and `app.js` to its root.
2. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. For a plain static site, leave the build command empty and set the output directory to `/` (repository root).
5. Deploy. Cloudflare will provide a `*.pages.dev` address.

A custom `.com` domain is not included; it normally costs money.

## Next engineering step
Build a separate backend ingestion pipeline that:
1. fetches permitted RSS/article sources,
2. stores source URL, publication time, article text and extracted entities,
3. deduplicates syndicated copies,
4. checks player/current-club/target-club relations,
5. labels primary-source confirmations separately from unconfirmed reports,
6. only then publishes to the site and Telegram.

Never label a report "official" unless supported by a primary club/player/league announcement.
