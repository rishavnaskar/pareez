# Pareez Salon — Website

Premium marketing website for **Pareez Unisex Professional Salon** (Garfa & Jadavpur, Kolkata).
Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion · Three.js (react-three-fiber).

## Run it

```bash
npm install
npm run dev     # http://localhost:3002
npm run build   # production build
npm start       # serve production build on :3002
```

## Editing content — one file

Almost everything a salon owner needs to change lives in **`src/lib/site.ts`**:
phone numbers, WhatsApp number, addresses, hours, social links, rating, domain.
The service menu lives in **`src/lib/services.ts`** (no prices are shown anywhere, by design).

### ⚠️ Before going live, fill in these TODOs (all in `src/lib/site.ts`)

1. **Domain** — replace `https://pareezsalon.com` with your real domain (`SITE.url`).
2. **Testimonials** — `src/components/TestimonialsSection.tsx` has sample reviews;
   replace with real ones from your Google Business profile.

### Replace gallery placeholders with real photos or videos

The gallery supports both images and silent looping reel-style videos
(autoplay, muted, plays only while on screen). Put files in `public/gallery/`
and update `GALLERY_ITEMS` in `src/components/GallerySection.tsx`:

- Image: set `src` to e.g. `/gallery/work-1.jpg`
- Video: keep `src` as the poster and set `video` to e.g. `/gallery/reel-1.mp4`
  (keep clips short, ~5–15 s, and under ~5 MB each — re-export from Instagram
  works well)

Keep the descriptive `alt` texts — they are part of the SEO.

## Appointments

The booking form (`/book`) composes a structured WhatsApp message and sends it
to `SITE.whatsapp` — bookings land in the same WhatsApp the team already uses.
No backend needed. Later, this can be wired to the Firestore database used by
`pareez-billing` if you want bookings inside the admin dashboard.

## SEO — what's built in

- **Structured data (JSON-LD)**: `BeautySalon`/`HairSalon` schema for *both*
  branches with geo-coordinates, opening hours, your real 4.4★/308 Google
  rating, plus `Organization`, `WebSite` and `FAQPage` schema.
- **Per-branch landing pages** (`/locations/garfa`, `/locations/jadavpur`) —
  these target "salon in Garfa" / "salon in Jadavpur" searches.
- Unique titles/descriptions per page, canonical URLs, Open Graph + Twitter
  cards with an auto-generated branded OG image, `sitemap.xml`, `robots.txt`,
  PWA manifest, semantic HTML and descriptive alt texts.

## SEO — launch checklist (do these after deploying)

1. **Buy the domain** and update `SITE.url`.
2. **Google Search Console** — verify the domain, submit `https://yourdomain/sitemap.xml`.
3. **Google Business Profile** — on *both* branch listings, click "Add website"
   and set the matching branch URL (`/locations/garfa`, `/locations/jadavpur`).
   This is the single biggest local-SEO win.
4. Add the website link to the **Instagram bio** and **Facebook page**.
5. Ask happy clients for Google reviews regularly — rating volume is the #1
   local ranking factor.
6. Deploy on **Vercel** (free tier is fine): `npx vercel` from this folder, or
   import the repo at vercel.com. Fast global hosting also boosts rankings.
