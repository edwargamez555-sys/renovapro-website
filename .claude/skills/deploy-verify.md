---
name: deploy-verify
description: Stage, commit, push to GitHub `main`, and poll the GitHub Pages URL until the new content is live. Use whenever a code change needs to go live in production.
---

# Deploy and verify

This project deploys via **GitHub Pages** from `main` branch root. Every push to `main` redeploys automatically; first byte typically arrives in 30–90 seconds.

**Public URL:** `https://edwargamez555-sys.github.io/renovapro-website/`
**gh CLI:** `C:\Program Files\GitHub CLI\gh.exe` (auth: `edwargamez555-sys`, scope `repo`)

## Workflow

1. **Stage only intended files** by name. Avoid `git add -A` / `git add .` — keeps commits scoped and prevents accidental commits of `.env`, large binaries, or transcript artifacts on Desktop.

2. **Verify status:**
   ```powershell
   git status --short
   ```
   Confirm only the intended files are staged.

3. **Commit with a single-line `-m` message.** Do NOT use PowerShell here-strings (`@'...'@`) chained with `;` — the closing `'@` must be alone on its line, and chaining breaks the parser. We've already lost commits to this. Single-line is reliable:
   ```powershell
   git commit -m "Short imperative summary of the change"
   ```

4. **Push:**
   ```powershell
   git push 2>&1 | Select-Object -Last 3
   ```
   PowerShell 5.1 will wrap stderr in `RemoteException` even on a successful push. Trust the final `<old>..<new>  main -> main` line. The exception lines are noise.

5. **Poll the live URL** in the background, looking for a unique marker from the new content (a hex color, a new German string, etc.):
   ```bash
   URL="https://edwargamez555-sys.github.io/renovapro-website/"
   for i in $(seq 1 30); do
     if curl -s "$URL" | grep -q "MARKER_FROM_NEW_CONTENT"; then
       echo "DEPLOYED after ${i} checks (~$((i*6))s)"
       exit 0
     fi
     sleep 6
   done
   echo "TIMEOUT after 3 min"; exit 1
   ```
   Run this with `run_in_background: true` so you don't block on it.

6. **When the task notification arrives**, read the output file with `cat` and confirm to the user with the URL and propagation time.

## Common pitfalls

- **First-time-only:** if the live URL hasn't been hit yet in this session, `gh api .../pages/builds/latest` may show `status: building` briefly — that's expected.
- **Caching:** GitHub Pages doesn't aggressively CDN-cache HTML, but if the marker isn't appearing after 90 seconds, double-check the marker actually exists in the committed file (commit may have stripped it).
- **Unicode in transcripts:** Python on Windows may UnicodeEncodeError when printing `→` etc. — write outputs to file BEFORE printing so the file is saved even if print fails.
