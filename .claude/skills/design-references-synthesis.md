---
name: design-references-synthesis
description: When the user shares N reference URLs to inform a design direction, fetch them in parallel, extract palette/structure/photo treatment, build a comparison matrix, and propose ONE coherent direction before changing anything.
---

# Design reference synthesis

The owner sends 3–7 reference URLs at a time. Some he likes, some he dislikes. Don't pick one and copy — synthesize what's CONVERGENT across the liked ones, and what's DIVERGENT in the disliked ones (those become anti-patterns).

## Workflow

1. **Read the user's message carefully** to mark each ref as LIKED, DISLIKED, or NEUTRAL based on his words. Examples:
   - "esta sí me gusta los colores" → LIKED for colors
   - "está completa pero no me gustan los colores" → MIXED (structure ok, colors no)
   - "esta es muy genérica" → DISLIKED
   - "lo tiene todo más todo" → STRONG LIKE

2. **Fetch in parallel with `WebFetch`**, one call per URL. Use a structured extraction prompt:
   ```
   Describe this site in detail. I need:
   (1) exact color palette — primary background, accents, text — with hex codes if visible
   (2) typography — fonts, hero headline size
   (3) hero structure — what photo, what headline, what CTA
   (4) main sections in order
   (5) photo treatment — gallery, before/after, lifestyle hero
   (6) overall mood — warm vs cool, modern vs traditional, formal vs casual
   ```

3. **Build a comparison matrix** as a markdown table with rows = ref URL, columns = bg / accent / typography / photo treatment / mood.

4. **Identify convergent patterns** — features that appear across all (or most) LIKED refs. These are signal.

5. **Identify divergent patterns** — features only in DISLIKED refs. These are anti-patterns to avoid.

6. **Propose ONE coherent direction** that captures the convergent patterns. Don't try to merge everything — pick one accent color, one photo style, one mood. Reference the specific ref(s) that informed each choice.

7. **Show the matrix + proposal to the user** before applying anything. Include:
   - The matrix
   - Convergent / divergent patterns
   - The proposed change (specific hex codes, structure decisions)
   - Which refs informed each decision

8. **Wait for confirmation**, then apply using `palette-swap` and direct edits.

## Specific tips for renovation/contractor sites

The owner's audit (2026-05-09) made it clear: this site should NOT feel like a tech/IT/Wi-Fi page. The default convergence across legitimate renovation references is:

- **White or warm-cream background** (universal — sosna, toronto, oriel, ashton, mohedano)
- **Charcoal / warm dark text** (no dark mode)
- **One restrained accent** used only on CTAs and headers (gold-ish, deep green, or muted red — varies by brand)
- **Big lifestyle photos of finished work** (not abstract SVGs)
- **Trust signals: testimonials + badge row**
- **Numbered process** (Germans like 1-2-3-4-5)

If a reference deviates from this convergence, weigh it carefully — it may just be a stylistic outlier (e.g., Mohedano has zero accent, but is an architecture studio, not a contractor).

## When the owner is vague

If he says "looks good" or "I'll send references" without specifying what he likes, ask before building:
- "¿Te gusta más el feel limpio de Mohedano (sin acento, todo blanco) o el más cálido de Sosna (acento verde-teal)?"

Avoid going off and rebuilding without the signal — the diff cost is high (palette swaps cascade across files).
