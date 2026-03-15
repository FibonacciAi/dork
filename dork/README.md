# DORK — Full xAI Creative Suite

Comprehensive xAI-powered creative suite — Chat, Image, Video, Voice, Code, Artifacts, Skills, and Collections — all in one premium dark UI with a spastic black hole dork logo.

## Quick Start

1. **Set your API key** in `.env` or via the Settings panel:
   ```
   XAI_API_KEY=xai-...
   ```

2. **Launch:**
   ```bash
   ./Dork.command
   ```
   Opens at http://127.0.0.1:5080

## Features

| Tab | What it does | Model |
|-----|-------------|-------|
| **Chat** | Multi-model conversational AI with streaming, reasoning display, file uploads (vision), slash commands (/imagine, /video, /code), artifact detection | grok-4.20 (all variants) |
| **Imagine** | Text-to-image and image-to-image editing with AI prompt suggestions, gallery hover actions | grok-imagine-image / pro |
| **Video** | Text-to-video and image-to-video (source image as opening frame), freeze frame extraction, async polling | grok-imagine-video |
| **Voice** | TTS (10 voices) + live Voice Agent (realtime WebSocket with server VAD) | grok-2-tts / realtime |
| **Code** | Code assistant with context editor, file upload, and artifact preview | grok-code-fast-1 |
| **Artifacts** | Save and preview live HTML/CSS/JS from chat or code responses | — |
| **Skills** | Markdown skill builder with AI generation and collection upload | — |
| **Collections** | xAI Collections API for RAG context in Chat and Code | xAI Collections |

## Video Workflow

Image-to-video uses the source image as the opening frame for scene/character consistency:

1. **Generate image** in Imagine tab
2. **Use as video source** → image auto-loads in Video tab
3. **Generate video** → source image becomes the first frame, prompt drives the animation
4. **Freeze frame** → pause video at any point, extract frame as new image
5. **Repeat** → frozen frame becomes source for next video, maintaining narrative continuity

## Models

### Language (Chat & Code)
| Model | Type | Context | Price (in/out per 1M) |
|-------|------|---------|----------------------|
| grok-4.20-multi-agent-beta-0309 | Multi-Agent | 2M | $2.00 / $6.00 |
| grok-4.20-beta-0309-reasoning | Reasoning | 2M | $2.00 / $6.00 |
| grok-4.20-beta-0309-non-reasoning | Fast | 2M | $2.00 / $6.00 |
| grok-code-fast-1 | Code | 256K | $0.20 / $1.50 |
| grok-4-1-fast-reasoning | Reasoning | 2M | $0.20 / $0.50 |
| grok-4-1-fast-non-reasoning | Fast | 2M | $0.20 / $0.50 |

### Image
| Model | Price |
|-------|-------|
| grok-imagine-image | $0.02/image |
| grok-imagine-image-pro | $0.07/image |

### Video
| Model | Price |
|-------|-------|
| grok-imagine-video | $0.05/second |

### Voice
| Feature | Model | Price |
|---------|-------|-------|
| Text-to-Speech | grok-2-tts | $4.20/1M characters |
| Voice Agent | realtime | $0.05/minute |

### TTS Voices
alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer

## xAI API Reference

| Feature | Endpoint | Payload Notes |
|---------|----------|---------------|
| Chat | `POST /v1/chat/completions` | Standard OpenAI-compatible |
| Multi-Agent | `POST /v1/responses` | `input` (not messages), `instructions` (not system), `agents` array |
| Image gen | `POST /v1/images/generations` | `model: "grok-imagine-image"` |
| Image edit | `POST /v1/images/edits` | JSON with base64 data URI (not multipart), raw urllib |
| Video gen | `POST /v1/videos/generations` | Async — returns `request_id`, poll GET `/v1/videos/{id}` |
| Image→Video | `POST /v1/videos/generations` | `image: {url: "data:mime;base64,..."}` — source image as opening frame |
| TTS | `POST /v1/audio/speech` | `model: "grok-2-tts"`, `input`, `voice`, `response_format: "mp3"` |
| Voice Agent | `wss://api.x.ai/v1/realtime` | Auth via subprotocol `xai-client-secret.{token}` |

### API Gotchas
- xAI blocks Python's default User-Agent — all requests use `User-Agent: DORK/1.0`
- Image edit endpoint requires JSON body (not multipart form) — uses raw urllib, not OpenAI SDK
- Old TTS endpoint `/v1/tts` with `text`/`voice_id`/`language` is **DEPRECATED** (returns 403)
- New TTS uses `/v1/audio/speech` with `model`/`input`/`voice`/`response_format` (OpenAI-compatible)
- Image-to-video field changed from flat `image_url: "data:..."` to nested `image: {url: "data:..."}`
- Realtime token: POST `/v1/realtime/client_secrets` → response field is `value` (not `client_secret`)
- Voice names: lowercase for TTS (`alloy`), capitalized for Realtime (`Alloy`)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Cmd+1-8 | Switch tabs |
| Cmd+K | Focus input |
| Esc | Close overlay |

## Data Directories

```
~/Desktop/Dork/Images/      — Generated and frozen frame images
~/Desktop/Dork/Videos/      — Generated videos
~/Desktop/Dork/Audio/       — TTS audio files
~/Desktop/Dork/Uploads/     — Uploaded source images
~/Desktop/Dork/Artifacts/   — Saved HTML/CSS/JS artifacts
~/Desktop/Dork/Skills/      — Skill documents
~/.dork/settings.json       — API key & preferences
```

## Architecture

```
grok/
├── Dork.command             # App-mode launcher (port 5080)
├── .env                     # XAI_API_KEY
├── requirements.txt         # flask, python-dotenv
├── app/
│   ├── dashboard.py         # Flask backend (all xAI API routes)
│   ├── templates/
│   │   └── index.html       # 8-tab sidebar layout
│   └── static/
│       ├── css/styles.css   # Premium dark UI (Space Grotesk, violet accent)
│       └── js/app.js        # Frontend logic, voice agent, persistence
└── venv/                    # Python virtual environment
```

## Requirements

- Python 3.10+
- Flask, python-dotenv
- xAI API key (https://console.x.ai/)

## API Key

Get your key at https://console.x.ai/ — set it in `.env` or in the Settings tab. The key is stored locally at `~/.dork/settings.json` and only sent to `api.x.ai`.
