---
name: palette-swap
description: Apply a coherent brand-color change across all the files where colors live (styles.css, app.js map SVG, index.html hero SVG). Use when iterating the accent color or flipping light/dark mode after design feedback.
---

# Palette swap

Brand colors leak into multiple files because some SVG attributes don't accept CSS variables. Doing a partial swap leaves residuals that look broken (one cyan circle in a sea of terracotta).

## Where colors live

| Location | What | Pattern |
|---|---|---|
| `assets/styles.css` `:root` block | All `--bg`, `--surface`, `--accent`, etc. | Hex literals |
| `assets/styles.css` `:root` `--rp-*` overrides | Design-system tokens (focus, scrollbar, ::selection) | Hex literals |
| `assets/styles.css` body | Hardcoded `rgba(R, G, B, alpha)` literals (gradients, glows, shadows) | rgb tuples |
| `index.html` hero SVG | `stroke="#XXXXXX"`, `fill="..."`, `<stop stop-color="rgba(...)"/>` | Hex + rgb |
| `assets/app.js` map SVG | rgba in `renderMap()` (currently neutral, no accent — leave alone) | rgb tuples |

## Workflow

1. **Define old + new** as a triple: hex, hex-deep (hover state), rgb tuple.
   ```
   OLD: #C8612A / #9F4716 / 200, 97, 42
   NEW: #B7873A / #8E6624 / 183, 135, 58
   ```

2. **Mass-replace each pattern with `Edit replace_all=true`:**
   - `#OLD_HEX` → `#NEW_HEX`
   - `#OLD_HEX_DEEP` → `#NEW_HEX_DEEP`
   - `OLD, R, G, B` → `NEW, R, G, B` (with spaces)
   - `OLD,R,G,B` → `NEW,R,G,B` (no spaces — CSS often omits)
   
   Apply each to `styles.css` AND `index.html`. Skip `app.js` if the map SVG was already neutralized.

3. **Verify zero residuals:**
   ```
   grep -rE "#OLD_HEX|OLD_R,\s*OLD_G,\s*OLD_B" assets/ index.html
   ```
   Should return zero matches. If any remain, repeat step 2 for that pattern.

4. **Run `deploy-verify`** with the new hex (without `#`) as the marker.

## When changing more than just the accent

If flipping light↔dark mode (not just accent):

- Update **all** `--bg`, `--surface`, `--elevated`, `--border`, `--text*` variables in `:root`.
- Update **all** the `--rp-*` overrides in the same `:root` block (so design-system tokens flip too).
- Adjust shadow opacities — light mode wants softer `rgba(43,32,26,0.04)`-class shadows; dark mode wants `rgba(0,0,0,0.4)`-class.
- Check button text contrast: on light accent, white text. On dark accent, white text usually still OK but verify.
- The map SVG district/Elbe colors in `app.js renderMap()` need to match the new palette mood — currently warm-tan + soft slate for light mode.
