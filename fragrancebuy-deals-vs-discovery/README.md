# FragranceBuy — Deals vs. Discovery

Static case-study page for SZN4.DESIGN. Open `index.html` or serve this folder from any static host.

## Integrating with the existing portfolio

Copy this entire folder into the portfolio repository as `fragrancebuy-deals-vs-discovery/`. A static host such as Vercel will serve `fragrancebuy-deals-vs-discovery/index.html` at that path. Add a link to that path from the Work listing. The header uses the live portfolio's home, Work and About destinations.

The two calls to action open the supplied interactive Prototype A and Prototype B deployments. The six files under `assets/` are byte-identical copies of the supplied PNGs. Do not recompress them if the original artwork must stay unchanged.

The dashboards contain illustrative figures. The page identifies them as mock data beside the screenshots and does not claim measured A/B test results.

## Local preview

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/fragrancebuy-case-study/` from the parent directory.
