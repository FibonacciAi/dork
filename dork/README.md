# DORK — Full xAI Creative Suite

Comprehensive xAI-powered creative suite — Chat, Image, Video, Voice, Code, Artifacts, Skills, and Collections — all in one premium dark UI.

## Quick Start

1. **Set your API key** in `.env` or via the Settings panel:
   ```
   XAI_API_KEY=xai-...
   ```

2. **Launch:**
   ```bash
   ./Dork.command
   ```

## Features

| Tab | What it does | Model |
|-----|-------------|-------|
| **Chat** | Multi-model chat with streaming, action tags, live voice, character consistency, image fusion, character crossover, slash commands, file uploads, vision, reasoning | grok-4.20 (all variants) |
| **Imagine** | Text-to-image, image-to-image editing, image fusion (fuse zone + gallery), AI prompt suggestions | grok-imagine-image / pro |
| **Video** | Text-to-video, image-to-video, freeze frame, stitch, narrative-aware suggestions | grok-imagine-video |
| **Voice** | TTS (10 voices) + live Voice Agent (Eve, Ara, Rex, Sal, Leo — realtime WebSocket) | grok-2-tts / realtime |
| **Code** | Code assistant with context editor, file upload, and artifact preview | grok-code-fast-1 |
| **Artifacts** | Save and preview live HTML/CSS/JS from chat or code responses | — |
| **Skills** | Markdown skill builder with AI generation and collection upload | — |
| **Collections** | xAI Collections API for RAG context in Chat and Code | xAI Collections |

## Action Tags (Text Chat)

| Tag | What it does |
|-----|-------------|
| `[GENERATE_IMAGE: prompt]` | Generates image — uses edit API with reference for character consistency |
| `[GENERATE_VIDEO: prompt]` | Generates video — uses gallery/source image as first frame |
| `[EDIT_IMAGE: prompt]` | Edits the most recent gallery image |
| `[EXTEND_VIDEO: prompt]` | Extracts last frame, generates continuation |
| `[STITCH_VIDEOS]` | Combines all chat videos via ffmpeg |
| `[COMBINE_IMAGES]` | Fuses top 2 gallery images (edit API preserves image 1's character) |
| `[COMBINE_CHARACTERS: scene]` | Puts characters from 2 gallery images together — preserves both faces |

Content policy: R-rated movie standard — no self-censoring.

## Character Consistency

Upload a reference image in chat or in the Imagine source slot:
- All subsequent `[GENERATE_IMAGE]` uses the edit API with "preserve EXACT face/features" wrapping
- All `[GENERATE_VIDEO]` uses the reference as the opening frame
- Priority: chat upload > imagine source > most recent gallery image > fresh generation
- Works identically via text chat, voice, and slash commands

## Live Voice Mode

Click the mic button in chat:
- Voice model talks naturally — never reads prompts or describes what it's generating
- Background intent detector silently triggers image/video/edit generation
- Persona field for personality instructions (updates mid-session)
- Voices: Eve, Ara, Rex, Sal, Leo
- Character-aware — uses uploaded reference images for generations

## Image Fusion

Fuse section in the Imagine tab left panel:
- Upload images directly or click **+** on gallery thumbnails
- Mix uploaded and generated images
- Optional style direction field
- Edit API with image 1 as base preserves character

## Character Crossover

`[COMBINE_CHARACTERS: scene]` or natural language "put these characters together":
- Vision analyzes both characters exhaustively
- Edit API with image 1 as base, injects character B
- Both faces preserved

## Video Workflow

1. Generate/upload image → set as source
2. **Suggest** → AI analyzes image + original prompt → 3 prompts
3. Generate → source image = opening frame
4. **Freeze frame** → extract as new source
5. **Stitch** → select and combine via ffmpeg

## Models

| Category | Model | Price |
|----------|-------|-------|
| Chat | grok-4.20 (reasoning/non-reasoning/multi-agent) | $2/$6 per 1M |
| Chat Fast | grok-4-1-fast | $0.20/$0.50 per 1M |
| Code | grok-code-fast-1 | $0.20/$1.50 per 1M |
| Image | grok-imagine-image | $0.02/image |
| Image Quality | grok-imagine-image-quality | $0.05/image |
| Video | grok-imagine-video | $0.05/second |
| TTS | grok-2-tts | $4.20/1M chars |
| Realtime | realtime | $0.05/minute |

## Data Directories

```
~/Desktop/Dork/Images/      — Generated, edited, fused, frozen frame images
~/Desktop/Dork/Videos/      — Generated and stitched videos
~/Desktop/Dork/Audio/       — TTS audio files
~/Desktop/Dork/Uploads/     — Uploaded source images
~/Desktop/Dork/Artifacts/   — Saved HTML/CSS/JS artifacts
~/Desktop/Dork/Skills/      — Skill documents
~/.dork/settings.json       — API key & preferences
```

## Requirements

- Python 3.10+
- Flask, python-dotenv
- ffmpeg (for video stitching & frame extraction)
- xAI API key (https://console.x.ai/)
