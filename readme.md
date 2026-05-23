# Interest Rate Calculator — Tuottolaskuri

A simple web-based **compound interest calculator** (korkoa korolle -laskuri) with support for monthly contributions. Built with vanilla HTML, CSS, and JavaScript — no build tools required.

## Features

- Calculate compound interest with an optional monthly investment contribution
- View final portfolio value, total capital invested, profit, and profit percentage
- Compare multiple scenarios side-by-side in a results table
- Remove individual result rows dynamically

## How to Run Locally

No build step needed — just open the HTML file in a browser:

```bash
# Clone the repository
git clone https://github.com/JimiKoppinen/InterestRateCalculator.git
cd InterestRateCalculator

# Open directly in your default browser (macOS)
open index.html

# Or serve with any static file server, e.g.:
npx serve .
```

## Input Fields

| Field | Finnish label | Description |
|-------|--------------|-------------|
| Initial investment | Kertasijoitus EUR | One-time lump sum invested at the start |
| Monthly savings | Kuukausisäästö EUR / kk | Amount added every month |
| Investment period | Säästöaika vuosina | Duration of investment in years |
| Annual return | Tuotto % | Expected annual return rate (e.g. 7 for 7%) |

## Calculation Method

Monthly compounding is used when a monthly contribution is provided:

```
monthly_rate = (1 + annual_rate)^(1/12) - 1
each month: balance = (1 + monthly_rate) × balance + monthly_contribution
```

When no monthly contribution is given, simple annual compounding is applied:

```
each year: balance = (1 + annual_rate) × balance
```

## Deployment

The app is deployed automatically via GitHub Actions to Azure Static Web Apps on every push to `main`. See `.github/workflows/` for the workflow configuration.
