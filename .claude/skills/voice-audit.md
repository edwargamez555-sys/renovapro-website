---
name: voice-audit
description: When the user provides a voice note (.ogg/.mp3/.m4a) with design feedback, transcribe it with faster-whisper, classify each segment, and build an action matrix BEFORE applying any changes.
---

# Voice-note audit

The owner sends design feedback as WhatsApp voice notes (Spanish, sometimes mixed with German terms). Audio cannot be processed by Claude directly — it must be transcribed first.

## Tools (already installed user-wide)

- **ffmpeg** — at `C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0-full_build\bin\` (added to PATH for the session in transcription scripts)
- **faster-whisper** (Python lib) — installed in user pip site-packages: `C:\Users\User\AppData\Roaming\Python\Python314\site-packages\`
- **Python 3.14.4** at `C:\Users\User\AppData\Local\Programs\Python\Python314\python.exe` (use `py` launcher)

## Workflow

1. **Verify the audio file exists** with `ls`.

2. **Run transcription** via a Python script that:
   - Loads `WhisperModel("base", device="cpu", compute_type="int8")`
   - Transcribes with `beam_size=5, vad_filter=True`
   - Writes the full transcript to `Desktop/voicenote_transcript.txt` BEFORE any print statement (so unicode print errors don't lose data)
   - Optionally writes timestamped segments to `Desktop/voicenote_segments.txt`
   
   The `base` model gives DE/ES at ~98% confidence in seconds; no need for `large` for short feedback notes.

3. **Read the transcript** with the Read tool.

4. **Build a matrix** classifying each feedback segment. The owner's voice notes blend approval, criticism, and questions — separate them:

   | Categoría | Símbolo | Acción |
   |---|---|---|
   | Aprobado | ✅ | No tocar |
   | Cambio mayor | 🔧 | Restructure / palette flip / new section |
   | Cambio menor | 📋 | Single value, copy tweak, label change |
   | Pendiente | ⏳ | Owner will provide more info later |

5. **Show the matrix to the user** as a clear markdown table with the literal quote → veredict → action. Include the FULL transcript above the matrix (so they can verify nothing was lost).

6. **Wait for their go-ahead** before applying. Even if they pre-authorized, surfacing the matrix gives them a chance to correct misinterpretations.

7. **Apply approved changes** using the relevant skills:
   - Color / palette → `palette-swap`
   - Copy text → `i18n-update`
   - Structural → direct edit
   - Then `deploy-verify` to ship.

## Quirks

- **UnicodeEncodeError on Windows console:** Python's default cp1252 codec chokes on `→`, `…`, and other unicode in `print()`. Always **write transcript to file FIRST**, print SECOND. The file survives even if print crashes.
- **HuggingFace symlink warning:** ignored, doesn't break — just warns about disk usage.
- **Owner's accent and code-mixing:** he transcribes "Apple" as "Adolf" and inserts German terms in Spanish sentences. Read the matrix critically — when something doesn't make sense, infer from context (e.g., "paquete de Adolf" near talk of clean tech aesthetic ≈ "paquete de Apple").
