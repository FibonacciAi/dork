# DORK+ — Full xAI + OpenAI Creative Suite

DORK+ extends DORK with OpenAI integration. All Grok features remain, with additive OpenAI capabilities.

## What's New (vs DORK)

- **OpenAI Image Generation** — `gpt-image-1` in the Imagine tab
- **OpenAI Chat** — ChatGPT models for suggestions and chat
- **OpenAI TTS** — Additional TTS voices
- **Dual API Key Management** — xAI + OpenAI keys

## Features

All features from DORK apply — see the [main README](../README.md) for:
- Action tags (GENERATE_IMAGE, GENERATE_VIDEO, EDIT_IMAGE, EXTEND_VIDEO, STITCH_VIDEOS, COMBINE_IMAGES, COMBINE_CHARACTERS)
- Live voice mode with silent media generation, persona field, and character awareness
- Character consistency via edit API with face preservation
- Character crossover from two gallery images
- Image fusion (fuse zone + gallery)
- Video workflow with context-aware suggestions

## Quick Start

```bash
nano .env  # Set XAI_API_KEY and OPENAI_API_KEY
./DorkPlus.command
```

## Data Directories

```
~/Desktop/DorkPlus/
  Images/      — Generated, edited, fused images
  Videos/      — Generated and stitched videos
  Audio/       — TTS audio files
  Uploads/     — Uploaded source images
  Artifacts/   — Saved HTML artifacts
  Skills/      — Markdown skill documents

~/.dork-plus/
  settings.json  — API keys and preferences
```

## Requirements

- Python 3.10+
- ffmpeg (for video stitching & frame extraction)
- xAI API key (https://console.x.ai/)
- OpenAI API key (https://platform.openai.com/)
