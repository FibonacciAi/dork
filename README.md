# DORK Suite

5 themed variants of a full AI creative suite powered by xAI Grok (+ OpenAI in DORK+).

## Variants

| Name | Launcher | Theme | Extras |
|------|----------|-------|--------|
| **DORK** | `./Dork.command` | Violet/purple | Grok-only |
| **DORK+** | `./DorkPlus.command` | Violet | + GPT-5.x chat, Codex, gpt-image-1.5, OpenAI TTS |
| **HELIX** | `./Helix.command` | Teal/cyan | Grok-only |
| **ONYX** | `./Onyx.command` | Monochrome | Grok-only |
| **SuperGrok** | `./SuperGrok.command` | Orange/amber | Grok-only |

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
| **Chat** | Multi-model chat with streaming, slash commands (/imagine, /image, /video, /code), file uploads, vision, reasoning display |
| **Imagine** | Text-to-image + image-to-image editing (grok-imagine-image/pro, + gpt-image-1.5 in DORK+) |
| **Video** | Text-to-video + image-to-video (source as opening frame), freeze frame, stitch, narrative-aware prompt suggestions |
| **Voice** | TTS (Grok + OpenAI in DORK+) + live Voice Agent with text input option |
| **Code** | Code assistant with context editor, artifact preview (+ Codex models in DORK+) |
| **Artifacts** | Save/preview live HTML/CSS/JS from chat or code |
| **Skills** | Markdown skill builder with collection upload |
| **Library** | Persistent image grid with individual/multi-select/clear-all delete |
| **Collections** | xAI Collections API for RAG context |

## Video Workflow

1. Generate/upload image → set as source (shown above prompt)
2. Click **Suggest** → AI analyzes image, suggests 3 animation prompts
3. Generate video → source image = opening frame for scene consistency
4. **Freeze frame** → pause, extract frame as new source
5. Narrative tracking → next suggestions know previous scenes
6. **Stitch** → select videos in order, combine via ffmpeg

## Theme Skins

8 switchable themes in Settings: Violet, Blackout, Cyber, Ember, Rosé, Arctic, Matrix, Gold. Persists via localStorage.

## Content Guidelines

Image/video generation follows xAI's R-rated movie standard — anything you'd see in an R-rated film. The AI writes maximally creative, uncensored prompts within that range.

## Architecture

```
grok/
├── .env                 # Shared API keys (XAI + OPENAI)
├── .env.example         # Template with placeholders
├── venv/                # Shared Python environment
├── Dork.command         # Launchers (one per variant)
├── DorkPlus.command
├── Helix.command
├── Onyx.command
├── SuperGrok.command
├── dork/app/            # DORK source
├── dork-plus/app/       # DORK+ source (+ OpenAI integration)
├── helix/app/           # HELIX source (teal theme)
├── onyx/app/            # ONYX source (monochrome theme)
└── supergrok/app/       # SuperGrok source (orange theme)
```

## Per-User Port Isolation

Each macOS user gets a unique port offset derived from `md5(username) % 100`. Two users on the same Mac never collide — no cross-user data leakage.

## Requirements

- Python 3.10+
- Flask, python-dotenv
- xAI API key (https://console.x.ai/)
- OpenAI API key (https://platform.openai.com/) — DORK+ only
