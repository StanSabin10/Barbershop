# NORTHCUT — Modern Barbershop · Ploiești

Website de prezentare pentru un concept de barbershop. Programările nu se realizează în website: toate butoanele de programare deschid MERO într-un tab nou.

## Pornire

Necesită Node.js 22.12+ și npm. Din acest folder:

```sh
npm ci
npm run dev
```

Deschide `http://127.0.0.1:5173`.

```sh
npm run typecheck
npm run build
npm run preview
```

Previzualizarea build-ului folosește `http://127.0.0.1:4173`. Build-ul publicabil este în `dist/`.

## Stack

- React 19, TypeScript strict și Vite 7.
- Tailwind CSS 4 și React Router pentru pagina principală, ancore și pagina 404.
- Lucide React pentru iconițe și fonturi locale Manrope / Barlow Condensed.

## Programări prin MERO

Adresa centralizată pentru toate CTA-urile este `meroBookingUrl` în `src/data/site.ts`. Componentele folosesc `BookingLink`, care aplică automat `target="_blank"` și `rel="noopener noreferrer"`.

Înainte de publicare, înlocuiește `https://mero.ro/` cu URL-ul oficial al paginii NORTHCUT de pe MERO.

## Unde se modifică

- Servicii, prețuri, durate și descrieri: `src/data/services.ts`.
- Echipă, roluri și specializări: `src/data/team.ts`.
- Program, valori și avantaje: `src/data/content.ts`.
- Brand, navigație, SEO și linkul MERO: `src/data/site.ts`.
- Culori, layout și responsive: `src/styles.css`.
- Metadate: `index.html` și `src/hooks/useRouteEffects.ts`.

Fotografiile, numele echipei și datele de contact ilustrează un concept. Creditele imaginilor sunt în `ASSETS.md`.
