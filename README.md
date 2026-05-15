# DORK Suite

Full AI creative suite powered by xAI Grok (+ OpenAI in DORK+).

## Variants

| Name | Launcher | Extras |
|------|----------|--------|
| **DORK** | `./Dork.command` | Grok-only |
| **DORK+** | `./DorkPlus.command` | + OpenAI chat, Codex, gpt-image-1, OpenAI TTS |

All variants share the same venv and `.env` file. Each gets a unique port per macOS user (no cross-user data leakage).

## Quick Start

```bash
cp .env.example .env
# Edit .env with your API keys
./Dork.command
```

## Features

| Tab | What it does |
|-----|-------------|
| **Chat** | Multi-model chat with streaming, action tags, live voice mode, character consistency, image fusion, character crossover, slash commands, file uploads, vision, reasoning |
| **Imagine** | Text-to-image, image-to-image editing, image fusion, fuse upload zone (grok-imagine-image/pro, + gpt-image-1 in DORK+) |
| **Video** | Text-to-video + image-to-video, freeze frame, stitch, narrative-aware prompt suggestions |
| **Voice** | TTS (Grok + OpenAI in DORK+) + live Voice Agent (Eve, Ara, Rex, Sal, Leo) |
| **Code** | Code assistant with context editor, artifact preview (+ Codex models in DORK+) |
| **Artifacts** | Save/preview live HTML/CSS/JS from chat or code |
| **Skills** | Markdown skill builder with collection upload |
| **Library** | Persistent image grid with individual/multi-select/clear-all delete |
| **Collections** | xAI Collections API for RAG context |

## Action Tags

In text chat, the AI uses action tags to trigger media generation directly in responses:

| Tag | What it does |
|-----|-------------|
| `[GENERATE_IMAGE: prompt]` | Generates an image inline — uses edit API with reference image for character consistency |
| `[GENERATE_VIDEO: prompt]` | Generates a video — uses gallery/source image as first frame for character consistency |
| `[EDIT_IMAGE: prompt]` | Edits the most recent gallery image |
| `[EXTEND_VIDEO: prompt]` | Extracts last frame from most recent chat video, generates continuation |
| `[STITCH_VIDEOS]` | Combines all chat videos into one via ffmpeg |
| `[COMBINE_IMAGES]` | Fuses the two most recent gallery images (edit API preserves image 1's character) |
| `[COMBINE_IMAGES: style]` | Same, with user direction for the fusion style |
| `[COMBINE_CHARACTERS]` | Takes characters from two gallery images and puts them together in a scene — preserves both faces |
| `[COMBINE_CHARACTERS: scene]` | Same, with a specific scene description |

Content policy: R-rated movie standard. Violence, suggestive content, horror, dark humor — all allowed. The AI won't self-censor prompts.

## Character Consistency

Upload a reference image in chat or in the Imagine tab's source slot, and all subsequent generations maintain that character:

- **Chat upload** → saved as `chatImageRef` → every `[GENERATE_IMAGE]` and `[GENERATE_VIDEO]` uses it via the edit API with face preservation instructions
- **Imagine source** → same behavior, used as fallback after chat upload
- **Gallery images** → if no explicit reference, the most recent gallery image is used
- **Priority chain**: chat upload > imagine source > most recent gallery > fresh generation
- **Edit prompt wrapping**: when a reference is present, prompts are wrapped with "Preserve the EXACT face, facial features, hair, eye color, skin tone, and physical appearance of the character/person in this image. Place them in a new scene: [prompt]"

## Character Crossover

Combine characters from two different images into one scene:

- Uses `[COMBINE_CHARACTERS: scene description]` action tag in chat
- Vision analyzes both characters with exhaustive detail (face, eyes, hair, skin, clothing, build — 4-5 sentences each)
- Edit API with image 1 as base preserves character A's face, injects character B
- Natural language: "put these two characters together in a bar fight"

## Live Voice Mode

Click the mic button in the chat input area to start a live voice session:

- **Natural conversation** — the voice model just talks to you. No prompt reading, no narration. It vibes with you as a creative partner.
- **Silent media generation** — when you ask for images/videos by voice, a background intent detector picks up the request and executes it silently. Media appears in chat. The detector is aware of your gallery state, uploaded references, and available videos.
- **Persona field** — text input in the voice bar for personality/tone/scene. Updates mid-session (hit Enter). Examples: "flirty and sarcastic", "chill stoner energy", "dramatic movie narrator".
- **Voice selector** — Eve, Ara, Rex, Sal, Leo (xAI Realtime voices).
- **Typed + spoken** — type messages while voice is active. Both route through the same session.
- **System prompt stacks** — chat System Prompt + voice persona field combine for layered personality.
- **Character-aware** — if you've uploaded a reference image, voice-triggered generations use it for character consistency.

## Image Fusion

Combine two images into one cohesive composition:

- **In Imagine tab**: dedicated Fuse section in the left panel
  - Upload images directly to fuse slots via drag-and-drop
  - Or click the **+** button on any gallery thumbnail to add it
  - Mix uploaded and generated images freely
  - Optional style direction field
  - Uses edit API with image 1 as base — preserves image 1's character
- **In chat**: ask to combine images or use `[COMBINE_IMAGES]` tag
- **Gallery actions**: docked action bar (matching Video tab layout)

## Video Workflow

1. Generate/upload image → set as source
2. Click **Suggest** → AI analyzes image + original prompt, suggests 3 animation prompts
3. Generate video → source image = opening frame for character consistency
4. **Freeze frame** → extract frame as new source
5. Narrative tracking → suggestions know previous scenes
6. **Stitch** → select videos in order, combine via ffmpeg

Image→Video and Image→Edit buttons pass the original generation prompt for context-aware suggestions. Chat video generation automatically uses gallery/source images as first frame.

## Theme Skins

8 switchable themes in Settings: Violet, Blackout, Cyber, Ember, Rosé, Arctic, Matrix, Gold. Persists via localStorage.

## Architecture

```
grok/
├── .env                 # Shared API keys (XAI + OPENAI)
├── .env.example         # Template with placeholders
├── venv/                # Shared Python environment
├── Dork.command         # DORK launcher
├── DorkPlus.command     # DORK+ launcher
├── dork/app/            # DORK source
└── dork-plus/app/       # DORK+ source (+ OpenAI integration)
```

## Per-User Port Isolation

Each macOS user gets a unique port offset derived from `md5(username) % 100`. Two users on the same Mac never collide — no cross-user data leakage.

## Requirements

- Python 3.10+
- Flask, python-dotenv
- ffmpeg (for video stitching & frame extraction)
- xAI API key (https://console.x.ai/)
- OpenAI API key (https://platform.openai.com/) — DORK+ only
