# Rijschool Drive More — Website

Productieklare, meertalige (NL/EN) multi-page website voor Rijschool Drive More.
Gebouwd met Next.js 15 App Router · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · React Three Fiber.

---

## Snel starten

```bash
# 1. Installeer afhankelijkheden
npm install

# 2. Maak .env.local aan (kopieer .env.example)
cp .env.example .env.local
# Vul daarna RESEND_API_KEY in (zie stap Contactformulier)

# 3. Start dev-server
npm run dev
# Open http://localhost:3000
```

---

## Omgevingsvariabelen

| Variabele           | Verplicht | Omschrijving                                          |
|---------------------|-----------|-------------------------------------------------------|
| `RESEND_API_KEY`    | Nee*      | API-sleutel van [resend.com](https://resend.com) voor het contactformulier |
| `CONTACT_EMAIL`     | Nee       | E-mailadres dat de contactformulieren ontvangt (default: mbouslam@hotmail.com) |
| `NEXT_PUBLIC_SITE_URL` | Nee    | Basis-URL voor OG-tags (default: https://rijschooldrivemore.nl) |

\* Zonder API-sleutel worden formuliersubmissies alleen gelogd in de console.

---

## Contactformulier koppelen (Resend)

1. Maak een gratis account op [resend.com](https://resend.com)
2. Maak een API-sleutel aan
3. Voeg een domein toe (of gebruik het Resend sandbox-domein voor testen)
4. Stel `RESEND_API_KEY` in `.env.local` in
5. Pas eventueel het `from`-adres in `src/app/api/contact/route.ts` aan

---

## Deployen naar Vercel

```bash
# Optie 1: GitHub → Vercel (aanbevolen)
git init
git add .
git commit -m "feat: rijschool drive more website"
git remote add origin https://github.com/jouw-username/drivemore-site.git
git push -u origin main
# Koppel daarna het repo aan Vercel via vercel.com/import

# Optie 2: Vercel CLI
npx vercel
```

**Vercel omgevingsvariabelen instellen:**
Ga naar Project Settings → Environment Variables en voeg `RESEND_API_KEY` toe.

---

## Assets

Zorg dat deze bestanden in `/public` staan:

| Bestand            | Gebruik                              |
|--------------------|--------------------------------------|
| `hero.mp4`         | Hero-video op de homepage            |
| `hero-poster.jpg`  | Poster/fallback voor de video        |
| `logo.png`         | Logo (huidig niet actief in code)    |

---

## Pagina's

| Route               | Beschrijving                         |
|---------------------|--------------------------------------|
| `/`                 | Homepage — alle secties              |
| `/diensten`         | Uitgebreide dienstenpagina           |
| `/rijlespakketten`  | Pakketten met Regulier/Spoed-toggle  |
| `/spoedcursus`      | Spoedcursus-landingspagina           |
| `/over-ons`         | Verhaal van Mouad en Drive More      |
| `/contact`          | Werkend contactformulier + directe contactinfo |
| `/api/contact`      | API-route voor het formulier         |

---

## Technische highlights

- **Framer Motion** — page transitions (template.tsx), staggered reveals, hamburger morph, mobile menu
- **GSAP ScrollTrigger** — scroll-driven auto 🚗 die over de weg rijdt in "Zo werkt het"
- **Lenis** — smooth scroll, gekoppeld aan GSAP ticker
- **React Three Fiber** — 3D rijbewijs-pas die meebeweegt met de cursor (gyroscoop op mobiel)
- **CountUp** — nummers die optellen bij in-view
- **Speedometer** — scroll-progress als spidometer (rechtsboven)
- **Magnetic buttons** — CTA's met magnetisch hover-effect
- **i18n** — NL/EN via React Context, zonder extra dependency
- **API-route** — beveiligde form-handler met HTML-sanitizing + Resend integratie
- **prefers-reduced-motion** — alle animaties degraderen netjes

---

## Placeholder-data aanpassen

Zoek op `*` of `PLACEHOLDER` in de codebase:
- Prijzen in `src/lib/i18n/nl.ts` + `en.ts` → `packages.regulier` / `packages.spoed`
- Stats (98%, 10.000+, 4.9★) → `stats` in de i18n-bestanden
- Reviews → `reviews.items`
- KvK-nummer → `footer.kvk`
- Foto Mouad → vervang het placeholder-blok in `AboutTeaser.tsx` door een `<Image />`
