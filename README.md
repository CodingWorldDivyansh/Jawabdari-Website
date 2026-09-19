# Jawabdari • Ludhiana MLALADS & Public Projects Transparency Portal

**Jawabdari** is a civic transparency portal tracking public infrastructure works, MLALADS allocations, contractor engagements, and fund utilization across all **14 Assembly Constituencies of Ludhiana, Punjab**.

It provides citizens, researchers, and journalists with verifiable data cross-referenced from official government portals:
- **eSAKSHI Portal** (`esakshi.nic.in`) — MoSPI official MPLADS / MLALADS tracking
- **Municipal Corporation Ludhiana** (`mcludhiana.gov.in`) — Engineering work orders, estimates, and zone progress
- **Punjab PWD B&R** (`pwdpunjab.gov.in`) — Technical sanctions and tender notices
- **Punjab Vidhan Sabha** (`punjabassembly.nic.in`) — Legislative allocation reports
- **mSeva Punjab** (`dgrpunjab.gov.in`) — Ward-level citizen works verification

---

## Key Numbers & Scope

- **Total Projects**: 621 verified public infrastructure projects across Ludhiana's urban wards and rural blocks.
  - **Completed (Past 10 Years: 2014–2024)**: 348 works with completion dates, payment vouchers, and contractor disbursements.
  - **Ongoing Works (2024–2025)**: 187 active projects with sanction dates, progress stages, and estimated costs.
  - **Planned & Upcoming Works (2025–2026)**: 86 works in tender/approval stages.
- **Total Sanctioned Budget**: ₹170.74 Crores across 14 constituencies.
- **Contractors & Vendors**: 65 executing agencies and suppliers tracked with ratings, trade specialties, and project counts.
- **Assembly Constituencies & MLAs Mapped**:
  1. **Ludhiana East** — MLA Daljit Singh Grewal (AAP)
  2. **Ludhiana South** — MLA Rajinder Pal Kaur Chhina (AAP)
  3. **Ludhiana Central** — MLA Ashok Prashar Pappi (AAP)
  4. **Ludhiana West** — MLA Gurpreet Bassi Gogi (AAP)
  5. **Ludhiana North** — MLA Madan Lal Bagga (AAP)
  6. **Atam Nagar** — MLA Kulwant Singh Sidhu (AAP)
  7. **Gill** — MLA Jiwan Singh Sangowal (AAP)
  8. **Payal** — MLA Manwinder Singh Giaspura (AAP)
  9. **Dakha** — MLA Manpreet Singh Ayali (SAD)
  10. **Raikot** — MLA Hakam Singh Thekedar (AAP)
  11. **Jagraon** — MLA Sarvjit Kaur Manuke (AAP)
  12. **Samrala** — MLA Jagtar Singh Diyalpura (AAP)
  13. **Khanna** — MLA Tarunpreet Singh Sond (AAP)
  14. **Sahnewal** — MLA Hardeep Singh Mundian (AAP)
  - Parliamentary MP: Amrinder Singh Raja Warring (INC)

---

## Core Features

1. **Track Area (`/`)**:
   - Filter by Constituency, Status (`All Works`, `Planned`, `Ongoing`, `Completed`), Category, Year (2014–2026), Contractor, and Max Cost slider.
   - Project cards displaying sanctioned costs, location, dates, contractor, and voucher count.
   - Detailed **Payment Installment Modal** showing voucher dates, installment amounts, vendor names, and release statuses.

2. **MLAs Directory (`/mlas`)**:
   - Complete directory of all 14 MLAs representing Ludhiana.
   - Tracks project count, budget allocated, expenditure, and fund utilization percentage.
   - MLA profile modal with complete portfolio of works.
   - Dedicated "Export MLAs" CSV option.

3. **Contractors Directory (`/contractors`)**:
   - Directory of all 65 executing agencies, suppliers, and contractors active in Ludhiana.
   - Tracks completed vs active works, total contract value, ratings, and specialties.
   - Dedicated "Export Contractors" CSV option.

4. **Multi-Tier Data Export System**:
   - Export filtered works currently visible on screen.
   - Export works for any specific MLA (dropdown selector of all 14 MLAs).
   - Export all 621 public works as a master CSV.
   - Export MLAs directory summary.
   - Export Contractors directory summary.
   - Direct export buttons on all directory headers and individual modal profiles.

5. **REST API Routes**:
   - `GET /api/projects`: Filtered, searched, and paginated projects.
   - `GET /api/mlas`: All 14 MLAs with aggregated statistics.
   - `GET /api/contractors`: All 65 contractors with project counts.
   - `GET /api/stats`: Metadata and summary metrics.

---

## Tech Stack & Design System

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Palette**:
  - **Navy** (`#0B1B2F`): Primary typography and dark accents.
  - **Orange** (`#FF7A00`): Action buttons with Navy text (6.7:1 WCAG AAA contrast).
  - **Amber** (`#FFC21A`): Glow accents, live indicators, star ratings.
  - **Warm White** (`#FAF7F2`): Background canvas.
  - **Mist** (`#E6EAF0`): Structural dividers and card borders.
  - **Verified Green** (`#1E9E6A`): Official sources badges and completion tags.
- **Icons**: Lucide React

---

## Getting Started Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Deploying to Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Next.js** (detected automatically).
3. Root Directory: `./` (or leave default).
4. Click **Deploy**.
