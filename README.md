# IMIKIA B2B rebuild

Next.js App Router + TypeScript, MongoDB and Cloudinary. Database-only runtime content: products, categories, pages, articles, contact/navigation settings, enquiries and uploaded media metadata. There is no hardcoded catalogue fallback. Initial source records are only imported by an authenticated admin into MongoDB.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`. Configure MongoDB, Cloudinary, a strong admin password and a random session secret of at least 32 characters. Keep secrets private.
3. `npm run dev`, open http://127.0.0.1:3000/admin.
4. Sign in and click **Import initial website content**. Existing records are not overwritten. Public pages then read from MongoDB.
5. Use the dashboard to manage products, categories, pages, articles and settings. Read enquiries in the enquiries section.

## Validation
`npm run typecheck` and `npm run build`. `GET /api/health` verifies database connectivity. Without environment configuration, APIs return explicit unavailable responses, never fabricated success.

## Launch checklist
Review migrated product specifications and client editorial copy; finish source article migration; move original remote product images into Cloudinary; approve privacy/retention policy. Configure domain, SSL, a separately protected staging environment, database and media backup schedules, hosting-level login rate limits, and original URL redirects. Business owns deployment, database and Cloudinary accounts. Thirty days of post-launch support is a separate operational commitment. Email notifications are not configured: submitted enquiries are stored and viewed in admin.

No production deployment has been performed. This project is being built locally in the user-selected checkout. The initial import includes a 55-product manifest and 21 category/subcategory records. Six products have richer initial descriptions/specifications; the remaining records require detailed specification review. Original news/knowledge migration is still pending.

Dependencies and the verified build copy currently live at `D:\CodexBuilds\imikia-deps`. The primary editable source remains this folder. Synchronise frontend source and configuration before running that copy after editing. Manage credentials separately; do not copy or print secret files as part of ordinary source synchronisation. The failed `node_modules.incomplete` installation and regenerable npm cache were cleaned at the user's request. Working dependencies still use the D: junction.

The premium frontend redesign and its exact backend integration limits are documented in `FRONTEND_STATUS.md`. `scripts/smoke.cjs` checks public routes, protected workspaces, admin login and error responses against a running local server; it does not create business records or simulate services.

## Local preview environment
Run `npm run preview` from this editable project when using the D: build copy. The launcher reads this project's environment and passes it to the server in process memory, without copying secret files. Restart after editing environment values. Next.js prioritises `.env.local` over `.env`; keep both aligned when both exist.

Read-only checks: `node scripts/check-connections.cjs` verifies MongoDB and catalogue counts; `node scripts/check-cloudinary.cjs` checks Cloudinary without uploading/deleting assets. Credentials are never printed.

## Original clone completed — 31 October 2026
This supersedes earlier migration-pending notes. Original public routes now render the original layouts, Museo font, banners, navigation, product cards, galleries, specifications, articles and footer, with account/theme controls added. MongoDB contains 55 original products with descriptions/specifications, 21 categories/subcategories, 41 articles and 130 original page/listing snapshots. Product edits feed original product pages and cards.

656 original image assets migrated to Cloudinary: all 55 main product images and 624 gallery/detail references. Five obsolete optional source assets returned 404 and received font/decorative fallbacks; no content images remain unresolved. YouTube videos remain embeds. Original red is the default; existing saved appearance/photo preferences are preserved with light/dark/system and six gradients.

Validation: production build and 130 original route checks passed. MongoDB and Cloudinary are connected. Customer/cart/HR/OTP services previously listed as absent remain absent. Preview: npm run preview. Audit: node scripts/audit-original.cjs. Content re-import replaces imported fields: review edits/backups before rerunning migration, followed by media migration/finalisation.

## Customer registration and login — 31 October 2026
The later signup fix supersedes earlier statements that customer authentication is absent. Create account is enabled at /register (/signup redirects there). POST /api/auth/register validates name, normalized unique email and matching passwords, stores a scrypt hash in customers, and issues a signed httpOnly customer session. Public signup fixes role=customer and reserves the administrator email. POST /api/auth/login routes the configured admin to its existing authentication flow and customers to their own session/account; DELETE signs customers out. /account and its sections require a customer session, while admin retains its own guard/cookie. The account displays the saved name/email. Quotation history, password reset, customer profile editing, and customer-specific saved appearance remain unimplemented.
Validation: production build passed, 16 customer-auth integration checks passed with a temporary account removed after testing, and all 48 existing regression checks passed. Browser verified the enabled Create account form and updated copy.

## Stale preview and working quote cart — 1 November 2026
Confirmed port 3000 was still running old server modules: its HR product API returned 401 while the updated port 3001 returned all 56 products. Restarted only the verified IMIKIA Next.js processes; both 3000 and 3001 now serve the latest build and the editable project's environment in memory.

Implemented /api/cart GET/POST/PATCH/DELETE with MongoDB quote_cart_items, signed httpOnly browser cart cookies, owner isolation, quantity validation, authoritative product lookups, same-origin mutation checks and seven-day expiry. Original product pages now have Add to quote. Cart UI supports reload, quantity updates, removal, loading/error feedback and signed-in quote enquiries. includeCart enquiries attach product names/quantities loaded from the backend. Guest cart selections survive sign-in in the same browser; cross-device account cart sync is not implemented. Sending a quote retains the selection for subsequent editing. No online payment or stock reservation is performed.

A transient session database lookup in the public root layout no longer replaces the whole public cart page with the generic content error; API and protected workspace checks retain their guards.

Verification: final production build/TypeScript passed. 15 cart integration checks, 22 HR checks on port 3000 and 48 regression checks on port 3001 passed. Browser verified original product Add to quote, quantity update to three, reload persistence and removal. All temporary test accounts, cart selections and enquiry records were removed. This supersedes earlier missing-cart API notes. HR counts currently match 56 products and 21 categories; existing HR sessions need a fresh sign-in for identity-aware profiles.
