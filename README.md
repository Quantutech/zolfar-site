# zolfar.de — Next.js site

Portfolio for Zolfar (architect, graphic designer, artist). Replaces the WordPress/Bridge site.
Next.js 16.4 (App Router, Cache Components) · React 19.3 · TypeScript · plain CSS modules. No UI framework.

## Design idea: a woven atlas

Everything comes from her own visual vocabulary:

- **Rhombus logo**, redrawn as SVG from the original pixel geometry (`src/components/Logo.tsx`). It draws itself on the home page.
- **Kilim lattice** (`WorksExplorer`). The 11 works sit in interlocking diamonds (4-3-4 on desktop, 3-2-3-2-1 on tablet, 2-1-2-… on phones), cropped to her logo's 1 : 1.418 rhombus. Filtering by discipline leaves the lattice standing: non-matching works fall back to dashed drafting outlines. A "register" view lists the works like a drawing index, with a cursor-following preview.
- **Palette** from her identity: logo indigo `#191151`, orchid `#ECA2FC`, the aqua of her pattern tiles, vermilion speckle from the old site, plus saffron and gold from her paintings. Paper grain and speckle are generated SVG, not images.
- **Cut-out ZOLFAR wordmark.** Each letter sits on a torn scrap, quoting the ransom-note lettering of her Political Impact Art flyer.
- **Project pages are staged by discipline** (`Showcase`): architecture boards on aqua graph paper with sheet numbers, art taped to the page, graphics pinned to a wall, workshop photos scattered on a table. Every image opens in a zoomable viewer (useful for competition boards).
- **Her "menu +" disc** from the old site opens a full-screen lilac sheet.

Fonts: Bricolage Grotesque (display/body), Instrument Serif (accents), JetBrains Mono (drafting labels), Vazirmatn (Persian lines).

## Content

- `src/content/projects.ts` holds the 11 works: her own texts from zolfar.de (spelling fixes only), facts, alt text, and gallery order. Add a project by importing its images and appending an entry. The archive number (`Z—01`…) follows array order.
- `src/content/site.ts` holds the name, statement and About list.
- `src/content/media/` holds the images. Regenerate them from the WordPress export with:

  ```bash
  python3 -I scripts/import-media.py ~/Tasks/10-active/work/Zolfar/sources/wp-export/media
  ```

  The script strips all metadata (one original catering photo carried GPS coordinates) and caps images at 2400 px. next/image serves AVIF/WebP at request time.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npx tsc --noEmit && npm run lint
```

Next.js 16 has breaking changes. Read `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Contact form

The contact form is a Server Action (`src/app/contact/actions.ts`) that sends through SMTP with nodemailer, with Reply-To set to the sender. It's protected by a honeypot field and a minimum fill time. Configure it with the variables in `.env.example` (Titan mailbox: `smtp.titan.email:465`). Without them, the form shows a polite "not connected yet" error and logs on the server.

## Rendering

- All routes are prerendered. `ensureStatic = "navigation"` on the root layout fails the build if anything becomes request-time.
- Unknown `/works/*` slugs return a real 404.
- Old WordPress URLs (`/portfolio_page/<old-slug>/`) 308-redirect to the new pages (`next.config.ts`).
- `sitemap.xml`, `robots.txt`, a generated Open Graph image and a Person JSON-LD block are included.

## Deploy (not done yet)

The site needs a Node.js host because of the contact form Server Action and image optimisation. Options:

- **Hostinger:** a Node.js web app on the existing Business plan.
- **Vercel.**

Switching zolfar.de from WordPress to this site is a DNS and hosting change that needs the owner's go-ahead. Set `NEXT_PUBLIC_SITE_URL` and the SMTP variables in the host's environment.
