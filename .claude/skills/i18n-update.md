---
name: i18n-update
description: Add or update a user-visible string across DE/ES/EN simultaneously. Use whenever copy text changes — never edit one language without the others, never leave a key untranslated.
---

# i18n update

User-visible text lives in two coordinated places. Editing only one creates drift that's hard to spot until a user switches languages.

## Where strings live

1. **`assets/app.js`** — the `COPY` table at the top of the file, with `de`, `es`, `en` keys (in that order). This is the source of truth at runtime; the language switcher reads from here.

2. **`index.html`** — default text inside elements with `data-i18n="path.to.key"` attributes. This is the SSR fallback (visible before JS hydrates) and the SEO content. Always set to the **German** value (since DE is default).

## Workflow for editing an existing string

1. **Identify the key path** by reading the JSX. E.g., `<p data-i18n="about.p1">…</p>` → key is `about.p1`.

2. **Update DE first** in `COPY.de.about.p1`. This is the source — write it well.

3. **Translate to ES and EN** in `COPY.es.about.p1` / `COPY.en.about.p1`. Match the tone, register, and formality. Don't translate word-for-word; rewrite for the language.

4. **Update the HTML default** — find the matching `<X data-i18n="about.p1">…</X>` in `index.html` and replace its content with the new German text.

5. **Validate JS still parses:**
   ```powershell
   node --check assets/app.js
   ```

6. Run `deploy-verify` with a unique snippet from the new text as the marker.

## Workflow for adding a NEW string

1. **Decide the key** following existing structure: section.subkey (`leist.eyebrow`, `kontakt.f_name_p`, etc.).

2. **Add to all 3 language objects** in the same shape:
   ```js
   de: { ...other, mysection: { mykey: "Deutscher Text" } },
   es: { ...other, mysection: { mykey: "Texto en español" } },
   en: { ...other, mysection: { mykey: "English text" } }
   ```

3. **Reference in HTML** if the string is rendered statically:
   ```html
   <p data-i18n="mysection.mykey">Deutscher Text</p>
   ```

4. **OR add to renderXxx()** if the string is rendered dynamically by JS (look at how `renderPillars`, `renderRefs`, `renderActiveSites` pull from `COPY[STATE.lang]`).

## Hard rules

- **Never push a missing translation.** If you don't have ES or EN ready, write a temporary direct translation — don't leave it blank or in DE.
- **Placeholders count as i18n.** Form input placeholders (`f_name_p`, `f_email_p`, etc.) must follow the same DE/ES/EN coverage.
- **Subject options in the contact form** are an array — keep all 3 arrays the same length so prefill logic works.
- **The footer language strip "DE · ES · RU · SR · HR"** is hardcoded (it lists what the *team* speaks, not what the *site* offers). Don't translate or i18n it.
