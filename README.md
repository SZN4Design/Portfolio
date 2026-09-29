# SZN4.DESIGN — complete portfolio

Static, responsive portfolio for Sabrina Mohammed. No chatbot, framework, package install, or build step is required.

## Routes

- `/` — original animated Welcome, with direct Work/About/Contact navigation
- `/about-me/` — original About story, headshot, imagery and contact form
- `/ui-ux-projects/` — four-project collection with FragranceBuy featured
- `/fragrancebuy-deals-vs-discovery/`
- `/crvnchmode-designing-a-smarter-way-to-choose-a-car/`
- `/dealer-listing-optimization-platform/` — ListIQ
- `/market-demand-forecaster/`

The former `/welcome-1`, `/work`, and `/projects` routes redirect to their current destinations. Original case-study URLs are preserved.

## Vercel

This continues the existing SZN4Design/portfolio project. Framework preset: Other. No build command. Serve the repository root. `vercel.json` retains clean URLs and trailing-slash routing.

For a local preview, run `python3 -m http.server 8123` in this directory.

## Content and assets

All 34 original Adobe case-study images and four covers are hosted locally under `assets/projects/`, with their bytes unchanged. The prepared FragranceBuy study is included and its full original Adobe presentation remains available in an expandable section. Supplied FragranceBuy prototype and wireframe screenshots are preserved as PNGs. Original About images remain unchanged.

FragranceBuy A and B are conceptual design directions, not a completed A/B test. Its dashboards contain illustrative data, and the measurement plans are proposed. CRVNCHMODE, ListIQ and Market Demand Forecaster contain mock data; scores, forecasts and performance benefits are not presented as validated business outcomes.

The five existing interactive prototypes remain linked to their existing Vercel deployments. They are separate applications and are not rebuilt by this portfolio. The portfolio pages and images no longer depend on Adobe Portfolio.

## Contact

The existing FormSubmit form and email address (`sabrina@szn4.design`) are preserved. Delivery still depends on the recipient's FormSubmit activation. Verification checks form markup and validation without sending messages. Do not infer delivery from the local success query parameter.

## Accessibility and maintenance

Navigation and case-study content work without JavaScript. JavaScript progressively enables scroll effects and image dialogs. Dialogs support keyboard focus, Escape, full-size zoom and original-image links. Reduced-motion preferences are respected. New page styling is in `assets/projects.css`; shared navigation/footer styling is in `assets/site.css`.
