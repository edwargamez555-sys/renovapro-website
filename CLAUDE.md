# RenovaPro Website — project context

Static one-page marketing website for **RenovaPro** (Renovierung, Reinigung & Bauleitung).

## Stack

- Vanilla **HTML + CSS + JavaScript**. No framework, no build step, no dependencies.
- Three authored files: `index.html`, `assets/styles.css`, `assets/app.js`.
- Design tokens in `assets/colors_and_type.css` (mostly overridden in styles.css `:root`).
- Trilingual via `data-i18n` attributes + the `COPY` table in app.js.

## Deploy

- **Repo:** https://github.com/edwargamez555-sys/renovapro-website
- **Hosting:** GitHub Pages from `main` branch, root path
- **Public URL:** https://edwargamez555-sys.github.io/renovapro-website/
- Every push to `main` redeploys; takes ~30–60 s. The `gh` CLI lives at `C:\Program Files\GitHub CLI\gh.exe` (auth: `edwargamez555-sys`, scope `repo`).

## Brand snapshot (current as of 2026-05-09)

- **HQ:** Bielefeld (Heeper Str. 281, 33607 Bielefeld) — NRW
- **Operations area:** Großraum Dresden + Sachsen
- **Phone / WhatsApp:** +49 176 72172705
- **Email:** renovapro.api@gmail.com
- **Languages:** DE (default) / ES / EN — switchable live in nav

## Visual direction (iteration 3 — current)

- **Background:** warm cream `#F7F3EC`
- **Surface:** pure white `#FFFFFF`
- **Text:** deep warm charcoal `#2B201A`
- **Accent:** warm gold/bronze `#B7873A` (chosen after voice-note audit + reference synthesis with sosna.ca, torontogeneralcontractors.com, mohedanoarquitectura.es, orielrenovations.com, ashtonrenovations.com)
- **Status colors:** green `#6F8E4F`, amber `#C99327`, red `#B5413A`
- Restrained whitespace + clean architect feel
- Pillars carry before/after photo placeholders awaiting real photos
- Map shows Dresden districts with progress bars in an "Aktive Baustellen" list

## Working procedures

See `.claude/skills/` for the workflows we use repeatedly:

- **deploy-verify** — push to main + poll the GitHub Pages URL until the new content is live
- **palette-swap** — coherent color iteration across styles.css + app.js + index.html (no residuals)
- **i18n-update** — never edit one language without DE/ES/EN traveling together
- **voice-audit** — voice note → faster-whisper transcript → matrix of changes → apply
- **design-references-synthesis** — N reference URLs → comparison matrix → unified proposal

## Pending data from owner

| What | Status | Notes |
|---|---|---|
| Real KPI numbers | placeholders | 150+ delivered, 13 staff, 96% on-time, 12 active, since 2019, 2yr warranty |
| Hero photo | SVG placeholder (floor plan) | Needs lifestyle photo of finished work |
| Before/after photos in pillars | dashed placeholders | Boss will send |
| Reference projects in table | placeholder rows | Boss will send anonymized |
| Legal data (Impressum, Datenschutz) | deferred | Until prototype graduates to production |
| Custom domain | github.io subdomain | When `renovapro.de` is registered |

## Conventions / quirks

- **PowerShell here-strings break with `;` chains.** Use simple `git commit -m "message"` form, never `@'...'@; "---"` patterns.
- **PowerShell `2>&1` on `git push` produces noisy `RemoteException` lines** even when push succeeded. The `branch -> main` line at the end is the real signal.
- **Don't edit `colors_and_type.css` directly** — it's the design-system tokens file. Override `--rp-*` in `styles.css :root` instead.
- **Don't trust placeholder text as final** — flagged with `[POR DEFINIR]` or visual dashed/dotted boxes in HTML.
