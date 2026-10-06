# NORTHCUT — Modern Barbershop · Ploiești

Website de portofoliu pentru un brand fictiv. V1 este exclusiv frontend: site public în română și programare demo în cinci pași. Confirmarea nu trimite niciun request și nu salvează date în browser sau pe server. Datele introduse există doar în memoria paginii și dispar la reîncărcare.

## Pornire

Necesită Node.js 22.12+ și npm. Din acest folder:

```sh
npm ci
npm run dev
```

Deschide `http://127.0.0.1:5173`. Pagina de programare este `/booking`.

```sh
npm run typecheck
npm run build
npm run preview
```

Previzualizarea build-ului folosește `http://127.0.0.1:4173`. Build-ul publicabil este în `dist/`. Porturile sunt fixe; oprește un server vechi dacă portul este deja ocupat.

## Stack

- React 19 și TypeScript strict.
- Vite 7, cu plugin React.
- Tailwind CSS 4, integrat prin `@tailwindcss/vite`.
- React Router pentru `/`, `/booking`, navigare cu ancore și pagină 404.
- Lucide React pentru iconițe discrete, importate individual.
- Manrope și Barlow Condensed, servite local în WOFF2.

Nu există biblioteci de animații, backend, bază de date sau SDK-uri de analytics.

## Structură

```text
src/
  App.tsx                  # rute și layout comun
  main.tsx                 # intrarea React
  styles.css               # temă, layout, responsive, stări și focus
  fonts.css                # fonturi locale, latin + latin-ext
  components/
    layout/                # Header, Footer
    sections/              # Hero, Services, About, Team, Experience, Gallery, Visit, FinalCTA
    ui/                    # Photo, SectionHeading
    booking/               # pași, rezumat și confirmare
  pages/                   # Home, Booking, NotFound
  data/                    # servicii, echipă, imagini, galerie, program și valori
  hooks/                   # navigare, scroll și metadate pe rută
  lib/                     # date, disponibilitate demo și program
  types/                   # modele TypeScript comune
public/
  images/                  # fotografii WebP optimizate
  fonts/                   # fonturi și licențele OFL
  favicon.svg
  robots.txt
  _redirects               # fallback SPA pentru hosting compatibil
  _headers                 # cache și antete de securitate pentru hosting compatibil
```

## Unde se modifică

- **Servicii, prețuri, durate, descrieri:** `src/data/services.ts`. Același set de date este folosit pe homepage și în programare.
- **Echipă, nume, roluri, specializări:** `src/data/team.ts`.
- **Program, valori și avantaje:** `src/data/content.ts`.
- **Brand, navigație și descriere SEO:** `src/data/site.ts`.
- **Fotografii:** toate căile sunt centralizate în `src/data/images.ts`. Înlocuiește fișierele din `public/images/` sau schimbă acele căi. Nu este necesar un serviciu extern de imagini.
- **Galerie, alt text și ordinea fotografiilor:** `src/data/gallery.ts`.
- **Textele editoriale:** componentele din `src/components/sections/`.
- **Textele formularului și validarea:** `src/pages/Booking.tsx`; rezumatul și confirmarea în `src/components/booking/`.
- **Culori, spacing și typography:** token-urile `@theme` și regulile din `src/styles.css`.
- **Metadate de bază și preload-uri:** `index.html`; actualizarea lor pe rută în `src/hooks/useRouteEffects.ts`. Schimbă URL-ul canonical și OG dacă folosești propriul domeniu.

Fotografiile de stock ilustrează conceptul. Numele echipei sunt fictive, iar persoanele fotografiate nu sunt angajați NORTHCUT și nu susțin brandul. Creditele și licențele sunt în `ASSETS.md`.

## Programare demo

1. Serviciu, cu durată și preț.
2. Barber sau „Oricare disponibil”. Parametrii `?barber=alex` și `?service=fade` preselectează opțiunile.
3. Următoarele 21 de zile, calculate pentru `Europe/Bucharest`. Duminicile și zilele fără sloturi viitoare sunt dezactivate.
4. Ore simulate. Sloturile 10:00 și 14:30 ilustrează indisponibilitatea. Durata serviciului trebuie să se încadreze înainte de 20:00 în timpul săptămânii sau 18:00 sâmbăta. Orele trecute nu pot fi selectate.
5. Nume, telefon, email opțional și acord pentru simulare.

Se pot modifica pașii anteriori, iar datele de contact se păstrează când revii. Schimbarea serviciului, barberului sau datei șterge ora selectată. La confirmare se reverifică intervalul. Rezumatul este sticky pe desktop și compact pe mobil.

## Verificare și publicare

Rezultatele verificărilor sunt documentate în `QUALITY.md`. Scorurile Lighthouse reprezintă măsurători locale, cu profilul mobil; pot varia în funcție de dispozitiv și hosting.

La publicarea build-ului pe alt hosting, configurează fallback-ul rutelor către `index.html`; accesarea directă a `/booking` trebuie să funcționeze. `_redirects` și `_headers` sunt înțelese de hosting-urile compatibile. Alte platforme pot necesita reguli echivalente. Configurarea privată Sites este în `.openai/hosting.json`.

## V2, după aprobarea V1

- Backend și PostgreSQL.
- Disponibilitate reală, cu gestionarea concurenței și evitarea rezervărilor duble.
- Salvarea programărilor și notificări email/SMS.
- Autentificare pentru admin și dashboard pentru programări, servicii și echipă.
- Validare pe server și documente de confidențialitate potrivite utilizării reale.

Aceste funcții nu sunt implementate în V1. Plățile și alte integrări pot fi definite separat în etapa V2.
