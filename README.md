# dz-delivery — دليل أسعار التوصيل في الجزائر

Standalone Next.js directory of Algeria delivery fees. Currently ships **RedEx**
data (58 wilayas, 1542 communes, domicile + stop-desk fees in DZD) with a
carrier registry so adding new carriers later is trivial. No env vars needed.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build / production

```bash
npm run build
npm start
```

## API

```
GET /api/fees?carrier=redex&wilaya=16[&q=alger]
```

- `carrier` — carrier id (default `redex`). Inactive/unknown carriers return 4xx.
- `wilaya` — **required**, integer 1–58.
- `q` — optional commune name substring filter.

Example response:

```json
{
  "carrier": "redex",
  "wilaya_id": 16,
  "wilaya_name": "Alger",
  "total_communes": 57,
  "communes": [
    {
      "commune_id": 1601,
      "commune_name": "Alger",
      "domicile_available": true,
      "domicile_fee_da": 800,
      "stop_desk_available": true,
      "stop_desk_fee_da": 450
    }
  ]
}
```

## Downloads

Static files served from `public/downloads/` (copies of the ready exports):

| File | Source |
|---|---|
| `/downloads/redex-wilayas-58.json` | `facebook-publish/01-wilayas-58.json` |
| `/downloads/redex-communes-1542.csv` | `facebook-publish/02-communes-1542.csv` |
| `/downloads/redex-wilayas-58-summary.csv` | `facebook-publish/03-wilayas-58-summary.csv` |
| `/downloads/redex-delivery-fees.xlsx` | `facebook-publish/04-delivery-fees-facebook.xlsx` |

Raw normalized dataset used by the app/API: `data/redex.json`.

## Deploy to Vercel

```bash
# from D:\dzdelivery
vercel
# or: import the repo in vercel.com → Add New Project → select dz-delivery
```

No environment variables required. Defaults (build `npm run build`, output `.next`) work as-is.

## How to add a new carrier

1. Add the normalized dataset as `data/<carrier-id>.json` (same shape as
   `data/redex.json`: array of wilayas with `wilaya_id`, `wilaya_name`,
   `has_stop_desk_service`, `total_communes`, `communes[]` with
   `commune_id`, `commune_name`, `domicile{available,fee_da}`,
   `stop_desk{available,fee_da,desk_info}`).
2. Register it in `lib/carriers.ts`:

```ts
{ id: "<carrier-id>", name: "<Name>", nameAr: "<الاسم>", active: true, dataFile: "<carrier-id>.json" },
```

3. Wire the dataset in `lib/fees.ts`:

```ts
import emsData from "@/data/ems.json";
const datasets = { redex: redexData, ems: emsData };
```

4. Optionally add downloadable exports under `public/downloads/` and a button
   in `app/page.tsx`.

## Publish to GitHub (not run automatically)

```bash
cd D:\dzdelivery
git init -b main
git add .
git commit -m "feat: scaffold dz-delivery (RedEx fees directory, AR RTL)"
gh repo create dz-delivery --public --source=. --remote=origin
git push -u origin main
```
