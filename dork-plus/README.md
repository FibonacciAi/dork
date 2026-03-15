# DORK+ — Full xAI + OpenAI Creative Suite

DORK+ extends the original DORK creative suite with OpenAI integration. All existing Grok features remain unchanged, with additive OpenAI capabilities.

## What's New (vs DORK)

- **OpenAI Image Generation** — `gpt-image-1` added as an option in the Imagine tab alongside Grok Imagine and Grok Imagine Pro
- **OpenAI Chat for Suggestions** — Prompt suggestion overlays (for image editing and video) can use ChatGPT (`gpt-4o-mini`) instead of Grok via a provider toggle
- **Dual API Key Management** — Settings page supports both xAI and OpenAI API keys
- **Separate Data Directories** — `~/Desktop/DorkPlus/` and `~/.dork-plus/` (does not touch DORK data)

## Features

| Tab | Capabilities | Provider |
|-----|-------------|----------|
| **Chat** | Streaming chat, slash commands, file uploads, vision | xAI (Grok) |
| **Imagine** | Text-to-image, image-to-image editing | xAI (Grok) + OpenAI (gpt-image-1) |
| **Video** | Text-to-video, image-to-video, freeze frame, stitch | xAI (Grok) |
| **Voice** | TTS (5 voices, 10 languages) + Realtime Voice Agent | xAI (Grok) |
| **Code** | Code assistant with context editor and file upload | xAI (Grok) |
| **Artifacts** | Save and preview live HTML/CSS/JS | Local |
| **Skills** | Markdown knowledge base with collection upload | xAI (Grok) |
| **Collections** | xAI Collections API for RAG context | xAI (Grok) |

## Quick Start

```bash
# 1. Edit .env with your API keys
nano .env

# 2. Double-click the launcher (or run manually)
./DorkPlus.command
```

The launcher creates a Python venv, installs dependencies, and opens `http://127.0.0.1:5085` in app mode.

## Configuration

### API Keys

Set keys in one of two ways:

1. **`.env` file** (in project root):
   ```
   XAI_API_KEY=xai-your-key-here
   OPENAI_API_KEY=sk-your-key-here
   ```

2. **Settings tab** in the UI (stored at `~/.dork-plus/settings.json`)

### Data Directories

```
~/Desktop/DorkPlus/
  Images/      — Generated and uploaded images
  Videos/      — Generated videos
  Audio/       — TTS audio files
  Uploads/     — Uploaded source images
  Artifacts/   — Saved HTML artifacts
  Skills/      — Markdown skill documents

~/.dork-plus/
  settings.json  — API keys and preferences
```

## API Endpoints (New)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/image/generate-openai` | POST | Generate image via OpenAI gpt-image-1 |
| `/api/chat/sync-openai` | POST | Sync chat completion via OpenAI gpt-4o-mini |

All original DORK endpoints remain unchanged.

## Requirements

- Python 3.10+
- macOS (tested on Apple Silicon)
- xAI API key (for Grok features)
- OpenAI API key (for ChatGPT Image and suggestions)

## Port

Runs on **5085** (DORK uses 5080, so both can run simultaneously).
