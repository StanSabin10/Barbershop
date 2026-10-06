# Verificare NORTHCUT V1 — istoric

Acest document consemnează verificarea versiunii inițiale. Fluxul intern de programare descris mai jos a fost eliminat ulterior; site-ul direcționează acum programările către MERO.

Data: 6 octombrie 2026. Build de producție Vite, testat în Chrome headless pe Windows.

## Lighthouse

Lighthouse 12.8.2, profil mobil implicit, pe previzualizarea locală a build-ului de producție.

| Pagină | Performance | Accessibility | Best Practices | SEO | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 97 | 100 | 100 | 100 | 0 |
| /booking | 98 | 100 | 100 | 100 | 0 |

Acestea sunt rezultate măsurate local, nu o garanție pentru orice dispozitiv, conexiune sau găzduire. Rapoartele HTML și JSON complete se află în folderul verification, alături de folderul proiectului.

## Build și funcționalitate

- TypeScript strict: fără erori.
- Build Vite: reușit, fără avertismente relevante.
- Paginile / și /booking verificate vizual la 375, 390, 430, 768, 1024, 1440 și 1920px.
- Fără scroll orizontal la dimensiunile verificate; toate fotografiile locale s-au încărcat.
- Text mărit la 200% pe 375px: fără scroll orizontal pe ambele pagini.
- 34 de linkuri de navigare și programare verificate.
- Meniul mobil: deschidere, închidere, Escape, revenirea focusului și navigare prin ancore.
- Selecțiile obligatorii blochează avansarea.
- Preselectare a serviciului și barberului prin URL.
- Sloturi indisponibile, duminici închise și ore trecute dezactivate.
- Durata serviciului respectă ora de închidere, inclusiv sâmbăta.
- Schimbarea unei selecții relevante șterge ora.
- Nume, telefon, email opțional și acord validate; focus pe primul câmp invalid.
- Întoarcerea la pasul anterior păstrează datele de contact.
- Confirmare demo, recapitulare și reset verificate.
- **ZERO request-uri la confirmarea programării**, verificat prin monitorizarea cererilor browserului.
- Fără erori JavaScript sau mesaje console.error în fluxul verificat.
- Rută 404 și prefers-reduced-motion verificate.

## Accesibilitate automată

Axe-core, reguli WCAG 2 A/AA și WCAG 2.1 A/AA: **0 probleme detectate** în 9 stări: homepage, meniu mobil deschis, cei cinci pași, formular cu erori și confirmare.

Auditul automat completează verificările de tastatură și contrast; nu înlocuiește o evaluare completă cu tehnologii asistive.

## Limite V1

Programările, disponibilitatea, prețurile, contactul și echipa sunt demonstrative. Nu există backend, salvare, autentificare, notificări sau plăți. Fotografiile reprezintă un concept vizual, nu o locație sau o echipă reală NORTHCUT.
