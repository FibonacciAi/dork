"""
DORK — Flask backend
Full xAI API integration: Chat, Image, Video, Voice, Code, Collections, Artifacts, Skills
"""

import os
import json
import time
import uuid
import base64
import io
import urllib.request
import urllib.error
import urllib.parse
import subprocess
from pathlib import Path
from dotenv import load_dotenv
from flask import (
    Flask, render_template, request, jsonify, Response,
    send_from_directory, stream_with_context
)

# Load .env from project root
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

# ── Directories ──────────────────────────────────────────────────────────────
HOME = Path.home()
SETTINGS_DIR = HOME / ".dork"
DATA_DIR = HOME / "Desktop" / "Dork"
IMAGES_DIR = DATA_DIR / "Images"
VIDEOS_DIR = DATA_DIR / "Videos"
AUDIO_DIR = DATA_DIR / "Audio"
UPLOADS_DIR = DATA_DIR / "Uploads"
ARTIFACTS_DIR = DATA_DIR / "Artifacts"
SKILLS_DIR = DATA_DIR / "Skills"

ASSET_LIB_DIR = SETTINGS_DIR / "asset-library"

for d in [SETTINGS_DIR, IMAGES_DIR, VIDEOS_DIR, AUDIO_DIR, UPLOADS_DIR, ARTIFACTS_DIR, SKILLS_DIR, ASSET_LIB_DIR]:
    d.mkdir(parents=True, exist_ok=True)

ASSET_LIB_INDEX = ASSET_LIB_DIR / "index.json"

# Migrate old settings if they exist
SETTINGS_FILE = SETTINGS_DIR / "settings.json"
for old_dir in [HOME / ".onyx", HOME / ".helix", HOME / ".supergrok"]:
    old_settings = old_dir / "settings.json"
    if old_settings.exists() and not SETTINGS_FILE.exists():
        import shutil
        shutil.copy2(str(old_settings), str(SETTINGS_FILE))
        break

# ── Flask App ────────────────────────────────────────────────────────────────
app = Flask(__name__,
            template_folder="templates",
            static_folder="static")
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100MB
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0  # No caching in dev

XAI_BASE = "https://api.x.ai/v1"
DEFAULT_IMAGE_MODEL = "grok-imagine-image-quality"
DEFAULT_IMAGE_RESOLUTION = "2k"
DEFAULT_IMAGE_ASPECT_RATIO = "auto"
DEFAULT_VIDEO_MODEL = "grok-imagine-video"
DEFAULT_VIDEO_RESOLUTION = "720p"
DEFAULT_VIDEO_ASPECT_RATIO = "16:9"
DEFAULT_VIDEO_DURATION = 8

IMAGE_RESOLUTIONS = {"1k", "2k"}
IMAGE_ASPECT_RATIOS = {"auto", "1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "2:1", "1:2", "19.5:9", "9:19.5", "20:9", "9:20"}
VIDEO_RESOLUTIONS = {"480p", "720p"}
VIDEO_ASPECT_RATIOS = {"1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"}

# ── Models Registry ──────────────────────────────────────────────────────────
MODELS = {
    "language": [
        {"id": "grok-4.20-multi-agent-beta-0309", "name": "Grok 4.20 Multi-Agent", "context": 2000000, "tag": "multi-agent"},
        {"id": "grok-4.20-beta-0309-reasoning", "name": "Grok 4.20 Reasoning", "context": 2000000, "tag": "reasoning"},
        {"id": "grok-4.20-beta-0309-non-reasoning", "name": "Grok 4.20", "context": 2000000, "tag": "fast"},
        {"id": "grok-code-fast-1", "name": "Grok Code Fast", "context": 256000, "tag": "code"},
        {"id": "grok-4-1-fast-reasoning", "name": "Grok 4.1 Fast Reasoning", "context": 2000000, "tag": "reasoning"},
        {"id": "grok-4-1-fast-non-reasoning", "name": "Grok 4.1 Fast", "context": 2000000, "tag": "fast"},
    ],
    "image": [
        {"id": "grok-imagine-image-quality", "name": "Grok Imagine Quality", "price": "$0.05"},
        {"id": "grok-imagine-image", "name": "Grok Imagine", "price": "$0.02"},
    ],
    "video": [
        {"id": "grok-imagine-video", "name": "Grok Imagine Video", "price": "$0.05/s"},
    ],
}

EARLY_ACCESS_MODEL_HINTS = [
    {"id": "grok-4.3-beta", "name": "Grok 4.3 Beta", "context": 2000000, "tag": "early-access", "early_access": True},
    {"id": "grok-4-3-beta", "name": "Grok 4.3 Beta", "context": 2000000, "tag": "early-access", "early_access": True},
    {"id": "grok-4.3-beta-early-access", "name": "Grok 4.3 Beta Early Access", "context": 2000000, "tag": "early-access", "early_access": True},
]

DEFAULT_CHAT_MODEL = "grok-4.20-beta-0309-non-reasoning"
LANGUAGE_MODEL_ALIASES = {
    "grok-4.3-beta": "grok-4.3",
    "grok-4-3-beta": "grok-4.3",
    "grok-4.3-beta-early-access": "grok-4.3",
}


def load_settings():
    if SETTINGS_FILE.exists():
        return json.loads(SETTINGS_FILE.read_text())
    return {}


def save_settings(data):
    current = load_settings()
    current.update(data)
    SETTINGS_FILE.write_text(json.dumps(current, indent=2))
    return current


def get_api_key():
    settings = load_settings()
    return settings.get("xai_key", os.environ.get("XAI_API_KEY", ""))


def _upload_file_to_collection(filename, file_bytes, content_type, collection_id):
    """Upload a file to an xAI collection via POST /v1/files."""
    api_key = get_api_key()
    if not api_key:
        raise ValueError("No API key configured")
    boundary = uuid.uuid4().hex
    body = b""
    body += f"--{boundary}\r\n".encode()
    body += f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode()
    body += f"Content-Type: {content_type}\r\n\r\n".encode()
    body += file_bytes if isinstance(file_bytes, bytes) else file_bytes.encode("utf-8")
    body += f"\r\n--{boundary}\r\n".encode()
    body += f'Content-Disposition: form-data; name="collection_ids"\r\n\r\n'.encode()
    body += collection_id.encode()
    body += f"\r\n--{boundary}--\r\n".encode()

    req = urllib.request.Request(f"{XAI_BASE}/files", data=body, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    req.add_header("User-Agent", "DORK/1.0")
    try:
        resp = urllib.request.urlopen(req, timeout=120)
        return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ValueError(_parse_xai_error(e))


IMAGE_EXTENSIONS = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
}

REFERENCE_IMAGE_MIMES = {"image/png", "image/jpeg", "image/webp"}
XAI_REFERENCE_IMAGE_MIMES = {"image/png", "image/jpeg"}
XAI_REFERENCE_MAX_DIMENSION = 2048
XAI_REFERENCE_MAX_BYTES = 18 * 1024 * 1024


def _strip_data_uri(image_data):
    """Accept either raw base64 or a data URI from the browser."""
    image_data = (image_data or "").strip()
    if image_data.startswith("data:") and "," in image_data:
        return image_data.split(",", 1)[1]
    return image_data


def _mime_from_image_bytes(image_bytes):
    if image_bytes[:3] == b'\xff\xd8\xff':
        return "image/jpeg"
    if image_bytes[:8] == b'\x89PNG\r\n\x1a\n':
        return "image/png"
    if image_bytes[:4] == b'RIFF' and image_bytes[8:12] == b'WEBP':
        return "image/webp"
    if image_bytes[:4] == b'GIF8':
        return "image/gif"
    return ""


def _detect_mime(b64_data):
    """Detect actual MIME type from base64-encoded image data."""
    b64_data = _strip_data_uri(b64_data)
    try:
        header = base64.b64decode(b64_data[:32])
        detected = _mime_from_image_bytes(header)
        if detected:
            return detected
    except Exception:
        pass
    return "image/png"


def _reference_image_parts(image_data, *, allow_gif=False):
    b64_data = _strip_data_uri(image_data)
    if not b64_data:
        raise ValueError("Reference image is empty")
    try:
        image_bytes = base64.b64decode(b64_data, validate=True)
    except Exception:
        raise ValueError("Reference image data is not valid base64")
    mime = _mime_from_image_bytes(image_bytes)
    allowed = set(REFERENCE_IMAGE_MIMES)
    if allow_gif:
        allowed.add("image/gif")
    if mime not in allowed:
        raise ValueError("Reference image must be PNG, JPG, or WEBP")
    return b64_data, image_bytes, mime, f"data:{mime};base64,{b64_data}"


def _xai_reference_data_uri(image_data):
    """Normalize refs to formats xAI image edits reliably accept: PNG or JPEG."""
    b64_data, image_bytes, mime, data_uri = _reference_image_parts(image_data)
    if mime in XAI_REFERENCE_IMAGE_MIMES and len(image_bytes) <= XAI_REFERENCE_MAX_BYTES:
        return data_uri

    try:
        from PIL import Image
    except Exception:
        if mime in XAI_REFERENCE_IMAGE_MIMES:
            return data_uri
        raise ValueError("Reference image must be PNG or JPG for xAI edits")

    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.load()
    except Exception:
        raise ValueError("Reference image could not be decoded")

    width, height = img.size
    longest = max(width, height)
    if longest > XAI_REFERENCE_MAX_DIMENSION:
        scale = XAI_REFERENCE_MAX_DIMENSION / longest
        img = img.resize((max(1, round(width * scale)), max(1, round(height * scale))), Image.LANCZOS)

    has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
    if has_alpha:
        output = io.BytesIO()
        img.convert("RGBA").save(output, format="PNG", optimize=True)
        out_bytes = output.getvalue()
        out_mime = "image/png"
        if len(out_bytes) <= XAI_REFERENCE_MAX_BYTES:
            return f"data:{out_mime};base64,{base64.b64encode(out_bytes).decode('ascii')}"

    quality = 92
    working = img.convert("RGB")
    while True:
        output = io.BytesIO()
        working.save(output, format="JPEG", quality=quality, optimize=True)
        out_bytes = output.getvalue()
        if len(out_bytes) <= XAI_REFERENCE_MAX_BYTES or quality <= 74:
            return f"data:image/jpeg;base64,{base64.b64encode(out_bytes).decode('ascii')}"
        quality -= 6


def _save_image_result(img_data, prefix, prompt, model, index):
    b64 = img_data.get("b64_json") or img_data.get("base64") or ""
    if b64:
        b64 = _strip_data_uri(b64)
        ts = int(time.time() * 1000)
        mime = _detect_mime(b64)
        ext = IMAGE_EXTENSIONS.get(mime, ".png")
        filename = f"{prefix}_{ts}_{index}{ext}"
        filepath = IMAGES_DIR / filename
        filepath.write_bytes(base64.b64decode(b64))
        return {"filename": filename, "url": f"/images/{filename}", "prompt": prompt, "model": model}

    url = img_data.get("url", "")
    if not url:
        return None

    try:
        req = urllib.request.Request(url, method="GET")
        req.add_header("User-Agent", "DORK/1.0")
        resp = urllib.request.urlopen(req, timeout=120)
        image_bytes = resp.read()
        content_type = resp.headers.get("Content-Type", "").split(";", 1)[0].lower()
        mime = content_type if content_type in IMAGE_EXTENSIONS else (_mime_from_image_bytes(image_bytes) or "image/png")
        ext = IMAGE_EXTENSIONS.get(mime, ".png")
        ts = int(time.time() * 1000)
        filename = f"{prefix}_{ts}_{index}{ext}"
        filepath = IMAGES_DIR / filename
        filepath.write_bytes(image_bytes)
        return {"filename": filename, "url": f"/images/{filename}", "prompt": prompt, "model": model}
    except Exception:
        return {"filename": "", "url": url, "prompt": prompt, "model": model}


def _save_image_results(result, prefix, prompt, model):
    saved = []
    for i, img_data in enumerate(result.get("data", [])):
        saved_img = _save_image_result(img_data, prefix, prompt, model, i)
        if saved_img:
            saved.append(saved_img)
    return saved


def _xai_image_edit(model, prompt, data_uri, settings=None):
    """Call xAI image edits with compatible JSON payload variants.

    Strategy: try the cleanest nested shape first; if that 422s, try mobile-style
    with `type:image_url`; finally try `images:[]` array. Other 422 causes (prompt
    moderation, image too large, etc.) get surfaced verbatim so the user can act.
    """
    if not model or not model.startswith("grok-imagine-image"):
        model = DEFAULT_IMAGE_MODEL
    settings = settings or {}

    variants = [
        {"image": {"url": data_uri, "type": "image_url"}},
        {"image": {"url": data_uri}},
        {"images": [{"type": "image_url", "url": data_uri}]},
        {"image": data_uri},
        {"image_url": data_uri},
        {"image_urls": [data_uri]},
    ]
    last_422 = None
    for variant in variants:
        payload = {"model": model, "prompt": prompt, **settings, **variant}
        try:
            return xai_request("images/edits", payload)
        except ValueError as e:
            msg = str(e)
            if "422" in msg or "unprocessable" in msg.lower():
                last_422 = msg
                continue
            raise
    if last_422:
        # Surface the actual xAI 422 message — usually moderation or image-format related
        raise ValueError(f"xAI rejected the edit request: {last_422}")
    raise ValueError("xAI image edit failed across all payload shapes")


def _parse_xai_error(e):
    """Extract a readable error message from an xAI HTTP error."""
    try:
        body = json.loads(e.read().decode("utf-8"))
        err = body.get("error", body.get("code", ""))
        if isinstance(err, dict):
            msg = err.get("message", str(err))
        else:
            msg = str(err)
        return f"HTTP {e.code}: {msg}" if msg else f"HTTP {e.code}"
    except Exception:
        return f"HTTP {e.code}"


def xai_request(endpoint, payload, stream=False):
    """Make a request to the xAI API."""
    api_key = get_api_key()
    if not api_key:
        raise ValueError("No xAI API key configured — set it in Settings or .env")

    url = f"{XAI_BASE}/{endpoint}"
    data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "DORK/1.0")

    try:
        if stream:
            return urllib.request.urlopen(req, timeout=300)
        else:
            resp = urllib.request.urlopen(req, timeout=300)
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ValueError(_parse_xai_error(e))


def xai_get(endpoint):
    """GET request to xAI API."""
    api_key = get_api_key()
    if not api_key:
        raise ValueError("No xAI API key configured — set it in Settings or .env")

    url = f"{XAI_BASE}/{endpoint}"
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("User-Agent", "DORK/1.0")

    try:
        resp = urllib.request.urlopen(req, timeout=120)
        return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ValueError(_parse_xai_error(e))


def xai_get_optional(endpoint):
    """GET request that returns None when no key is configured."""
    api_key = get_api_key()
    if not api_key:
        return None

    url = f"{XAI_BASE}/{endpoint}"
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("User-Agent", "DORK/1.0")

    try:
        resp = urllib.request.urlopen(req, timeout=30)
        return json.loads(resp.read().decode("utf-8"))
    except Exception:
        return None


def _label_model(model_id):
    name = model_id.replace("-", " ").replace(".", ".")
    name = " ".join(part.upper() if part in ("ai", "tts") else part.capitalize() for part in name.split())
    name = name.replace("Grok 4 3", "Grok 4.3").replace("Grok 4 20", "Grok 4.20").replace("Grok 4 1", "Grok 4.1")
    return name


def discover_language_models():
    """Merge built-ins with models exposed by the user's xAI key."""
    discovered = []
    raw = xai_get_optional("models")
    if raw:
        for item in raw.get("data", []):
            model_id = item.get("id", "")
            if not model_id or "grok" not in model_id.lower():
                continue
            lower = model_id.lower()
            if any(skip in lower for skip in ("imagine", "image", "video", "tts", "audio", "voice")):
                continue
            if "4.3" in lower or "4-3" in lower:
                tag = "early-access"
            elif "code" in lower:
                tag = "code"
            elif "multi-agent" in lower:
                tag = "multi-agent"
            elif "non-reasoning" in lower:
                tag = "fast"
            elif "reasoning" in lower:
                tag = "reasoning"
            else:
                tag = "fast"
            discovered.append({
                "id": model_id,
                "name": _label_model(model_id),
                "context": 2000000 if "4" in lower else 256000,
                "tag": tag,
                "early_access": tag == "early-access",
                "available": True,
            })

    builtin_order = {m["id"]: i for i, m in enumerate(MODELS["language"])}
    by_id = {m["id"]: dict(m, available=True, builtin=True) for m in MODELS["language"]}
    for model in discovered:
        by_id[model["id"]] = {**by_id.get(model["id"], {}), **model}

    for hint in EARLY_ACCESS_MODEL_HINTS:
        if hint["id"] in by_id:
            by_id[hint["id"]] = {**hint, **by_id[hint["id"]]}
        elif raw:
            by_id[hint["id"]] = {**hint, "available": False}

    def sort_key(model):
        if model.get("tag") == "early-access":
            return (0, model.get("name", ""))
        if model.get("id") in builtin_order:
            return (1, builtin_order[model["id"]])
        order = {"multi-agent": 2, "reasoning": 3, "fast": 4, "code": 5}
        return (order.get(model.get("tag"), 9), model.get("name", ""))

    return sorted(by_id.values(), key=sort_key)


def _coerce_choice(value, allowed, default):
    value = str(value or "").strip()
    return value if value in allowed else default


def _coerce_int(value, default, minimum, maximum):
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return default
    return max(minimum, min(maximum, parsed))


def _price_label(cents):
    if cents is None:
        return ""
    try:
        value = float(cents)
    except (TypeError, ValueError):
        return ""
    dollars = value / 100
    if dollars > 100:
        dollars = value / 10_000_000_000
    return f"${dollars:.2f}"


def _model_items(raw):
    if not raw:
        return []
    if isinstance(raw.get("models"), list):
        return raw["models"]
    if isinstance(raw.get("data"), list):
        return raw["data"]
    return []


def discover_generation_models(endpoint, builtin, *, fallback_tag, price_key=None):
    raw = xai_get_optional(endpoint)
    by_id = {m["id"]: dict(m, available=True, builtin=True) for m in builtin}
    for item in _model_items(raw):
        model_id = item.get("id", "")
        if not model_id:
            continue
        model = {
            "id": model_id,
            "name": _label_model(model_id),
            "tag": fallback_tag,
            "available": True,
            "version": item.get("version", ""),
            "aliases": item.get("aliases", []),
            "fingerprint": item.get("fingerprint", ""),
        }
        existing = by_id.get(model_id, {})
        price = _price_label(item.get(price_key)) if price_key else ""
        if price and not existing.get("price"):
            model["price"] = price
        by_id[model_id] = {**by_id.get(model_id, {}), **model}

    return list(by_id.values())


def build_xai_tools(tool_ids, collection_ids=None):
    tools = []
    for tool_id in tool_ids or []:
        if tool_id == "web_search":
            tools.append({"type": "web_search"})
        elif tool_id == "x_search":
            tools.append({"type": "x_search"})
        elif tool_id == "code_execution":
            tools.append({"type": "code_execution"})
        elif tool_id == "collections_search":
            tool = {"type": "collections_search"}
            if collection_ids:
                tool["collection_ids"] = collection_ids
            tools.append(tool)
    return tools


def normalize_language_model(model):
    model = (model or DEFAULT_CHAT_MODEL).strip()
    return LANGUAGE_MODEL_ALIASES.get(model, model or DEFAULT_CHAT_MODEL)


def _chat_part_image_url(part):
    image = part.get("image_url") if isinstance(part, dict) else None
    if isinstance(image, dict):
        return image.get("url", "")
    if isinstance(image, str):
        return image
    return part.get("url", "") if isinstance(part, dict) else ""


def sanitize_chat_messages(messages):
    """Keep chat payloads valid even if localStorage has stale image attachments."""
    safe = []
    last_image_idx = -1
    for i, msg in enumerate(messages or []):
        content = msg.get("content") if isinstance(msg, dict) else ""
        if isinstance(content, list) and any(
            isinstance(part, dict) and part.get("type") == "image_url" for part in content
        ):
            last_image_idx = i

    for i, msg in enumerate(messages or []):
        if not isinstance(msg, dict):
            continue
        role = msg.get("role", "user")
        if role not in ("system", "user", "assistant"):
            role = "user"
        content = msg.get("content", "")
        if isinstance(content, list):
            parts = []
            omitted = False
            for part in content:
                if not isinstance(part, dict):
                    continue
                if part.get("type") == "text":
                    text = part.get("text", "")
                    if text:
                        parts.append({"type": "text", "text": text})
                elif part.get("type") == "image_url":
                    if i != last_image_idx:
                        omitted = True
                        continue
                    url = _chat_part_image_url(part)
                    if not url:
                        omitted = True
                        continue
                    if url.startswith("data:"):
                        try:
                            url = _xai_reference_data_uri(url)
                        except Exception:
                            omitted = True
                            continue
                    parts.append({"type": "image_url", "image_url": {"url": url}})
            if omitted:
                parts.append({"type": "text", "text": "[Earlier or unsupported image attachment omitted.]"})
            if not parts:
                continue
            content = parts
        elif not isinstance(content, str):
            content = str(content)
        if content == "":
            continue
        safe.append({"role": role, "content": content})
    return safe


def extract_response_text(result):
    if result.get("output_text"):
        return result["output_text"]
    parts = []
    for item in result.get("output", []):
        for content in item.get("content", []):
            text = content.get("text") or content.get("value")
            if text:
                parts.append(text)
    return "\n".join(parts)


# ── Collection Context Retrieval ──────────────────────────────────────────────

_collection_cache = {}
CACHE_TTL = 300


def fetch_collection_context(collection_ids, max_chars=80000):
    """Fetch document contents from collections and return as combined text context."""
    api_key = get_api_key()
    if not api_key:
        return ""

    all_docs = []
    for coll_id in collection_ids:
        cached = _collection_cache.get(coll_id)
        if cached and (time.time() - cached["fetched_at"]) < CACHE_TTL:
            all_docs.extend(cached["docs"])
            continue

        try:
            doc_list = xai_get(f"collections/{coll_id}/documents")
            docs = doc_list.get("documents", [])

            fetched = []
            for doc in docs:
                file_id = doc.get("file_metadata", {}).get("file_id", "")
                file_name = doc.get("file_metadata", {}).get("name", "unknown")
                if not file_id:
                    continue
                try:
                    url = f"{XAI_BASE}/files/{file_id}/content"
                    req = urllib.request.Request(url, method="GET")
                    req.add_header("Authorization", f"Bearer {api_key}")
                    req.add_header("User-Agent", "DORK/1.0")
                    resp = urllib.request.urlopen(req, timeout=30)
                    content = resp.read().decode("utf-8", errors="replace")
                    fetched.append({"name": file_name, "content": content})
                except Exception:
                    pass

            _collection_cache[coll_id] = {"docs": fetched, "fetched_at": time.time()}
            all_docs.extend(fetched)
        except Exception:
            pass

    if not all_docs:
        return ""

    parts = []
    total = 0
    for doc in all_docs:
        header = f"=== {doc['name']} ===\n"
        content = doc["content"]
        if total + len(header) + len(content) > max_chars:
            remaining = max_chars - total - len(header) - 20
            if remaining > 200:
                parts.append(header + content[:remaining] + "\n[truncated]")
            break
        parts.append(header + content)
        total += len(header) + len(content)

    return "\n\n".join(parts)


def _preview_key(key):
    if not key:
        return ""
    return key[:8] + "..." + key[-4:] if len(key) > 12 else "set"


def _dir_stats(directory, suffixes=None):
    suffixes = tuple(s.lower() for s in suffixes) if suffixes else None
    files = []
    total_bytes = 0
    for path in directory.iterdir():
        if not path.is_file():
            continue
        if suffixes and path.suffix.lower() not in suffixes:
            continue
        try:
            stat = path.stat()
        except OSError:
            continue
        total_bytes += stat.st_size
        files.append({
            "filename": path.name,
            "modified": stat.st_mtime,
            "bytes": stat.st_size,
        })
    files.sort(key=lambda item: item["modified"], reverse=True)
    return {
        "count": len(files),
        "bytes": total_bytes,
        "latest": files[0] if files else None,
    }


def _workspace_summary():
    stats = {
        "images": _dir_stats(IMAGES_DIR, [".png", ".jpg", ".jpeg", ".webp", ".gif"]),
        "videos": _dir_stats(VIDEOS_DIR, [".mp4", ".mov", ".webm"]),
        "audio": _dir_stats(AUDIO_DIR, [".mp3", ".wav", ".m4a", ".ogg"]),
        "uploads": _dir_stats(UPLOADS_DIR),
        "artifacts": _dir_stats(ARTIFACTS_DIR, [".html"]),
        "skills": _dir_stats(SKILLS_DIR, [".md"]),
    }
    latest = []
    for name, data in stats.items():
        if data["latest"]:
            latest.append({"type": name, **data["latest"]})
    latest.sort(key=lambda item: item["modified"], reverse=True)
    key = get_api_key()
    return {
        "app": "DORK",
        "data_dir": str(DATA_DIR),
        "settings_dir": str(SETTINGS_DIR),
        "api_keys": {
            "xai": {"set": bool(key), "preview": _preview_key(key)},
        },
        "stats": stats,
        "latest": latest[:8],
        "generated_at": time.time(),
    }


# ── Routes: Pages ────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html", cache_bust=int(time.time()))


# ── Routes: Settings ─────────────────────────────────────────────────────────

@app.route("/api/settings", methods=["GET", "POST"])
def api_settings():
    if request.method == "GET":
        settings = load_settings()
        key = settings.get("xai_key", "") or os.environ.get("XAI_API_KEY", "")
        if key:
            settings["xai_key_set"] = True
            settings["xai_key_preview"] = key[:8] + "..." + key[-4:]
        else:
            settings["xai_key_set"] = False
        settings.pop("xai_key", None)
        return jsonify(settings)
    else:
        data = request.json
        save_settings(data)
        return jsonify({"status": "ok"})


@app.route("/api/workspace")
def api_workspace():
    return jsonify(_workspace_summary())


@app.route("/api/models")
def api_models():
    models = dict(MODELS)
    models["language"] = discover_language_models()
    models["image"] = discover_generation_models("image-generation-models", MODELS["image"], fallback_tag="image", price_key="image_price")
    models["video"] = discover_generation_models("video-generation-models", MODELS["video"], fallback_tag="video")
    models["early_access_hints"] = EARLY_ACCESS_MODEL_HINTS
    models["discovery"] = {
        "live": bool(get_api_key()),
        "note": "xAI image/video model lists are refreshed from your API key when available; bundled defaults are used as fallback.",
    }
    return jsonify(models)


# ── Routes: Chat (Streaming SSE) ─────────────────────────────────────────────

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.json
    model = normalize_language_model(data.get("model", DEFAULT_CHAT_MODEL))
    messages = sanitize_chat_messages(data.get("messages", []))
    system = data.get("system", "")
    temperature = data.get("temperature", 0.7)
    collection_ids = data.get("collection_ids", [])
    requested_tools = data.get("tools", [])
    reasoning = data.get("reasoning", {})

    system_parts = []
    if system:
        system_parts.append(system)
    if collection_ids:
        coll_context = fetch_collection_context(collection_ids)
        if coll_context:
            system_parts.append(
                "The user has attached the following documents from their collection. "
                "Use this information to answer their questions:\n\n" + coll_context
            )
    system_text = "\n\n".join(system_parts) if system_parts else ""

    response_tools = build_xai_tools(requested_tools, collection_ids)

    # Tool-enabled chat and multi-agent models use /v1/responses.
    is_multi_agent = "multi-agent" in model
    use_responses = is_multi_agent or bool(response_tools)

    if use_responses:
        payload = {
            "model": model,
            "input": messages,
            "stream": True,
            "temperature": temperature,
        }
        if system_text:
            payload["instructions"] = system_text
        if response_tools:
            payload["tools"] = response_tools
        if is_multi_agent:
            effort = reasoning.get("effort", "low")
            if effort in ("low", "medium", "high", "xhigh"):
                payload["reasoning"] = {"effort": effort}

        def generate_multi_agent():
            try:
                resp = xai_request("responses", payload, stream=True)
                buffer = b""
                for chunk in iter(lambda: resp.read(4096), b""):
                    buffer += chunk
                    while b"\n" in buffer:
                        line, buffer = buffer.split(b"\n", 1)
                        line = line.strip()
                        if not line:
                            continue
                        if line.startswith(b"data: "):
                            try:
                                obj = json.loads(line[6:])
                                evt_type = obj.get("type", "")
                                if evt_type in ("response.output_text.delta", "response.refusal.delta"):
                                    delta = obj.get("delta", "")
                                    if delta:
                                        yield f"data: {json.dumps({'content': delta})}\n\n"
                                elif evt_type == "response.reasoning_text.delta":
                                    delta = obj.get("delta", "")
                                    if delta:
                                        yield f"data: {json.dumps({'reasoning': delta})}\n\n"
                                elif evt_type == "response.completed":
                                    yield "data: [DONE]\n\n"
                                    return
                            except json.JSONDecodeError:
                                pass
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return Response(
            stream_with_context(generate_multi_agent()),
            mimetype="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
        )

    # Standard chat/completions models
    payload = {
        "model": model,
        "messages": messages,
        "stream": True,
        "temperature": temperature,
    }
    if system_text:
        payload["messages"] = [{"role": "system", "content": system_text}] + payload["messages"]

    def generate():
        try:
            resp = xai_request("chat/completions", payload, stream=True)
            buffer = b""
            for chunk in iter(lambda: resp.read(4096), b""):
                buffer += chunk
                while b"\n" in buffer:
                    line, buffer = buffer.split(b"\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    if line == b"data: [DONE]":
                        yield "data: [DONE]\n\n"
                        return
                    if line.startswith(b"data: "):
                        try:
                            obj = json.loads(line[6:])
                            delta = obj.get("choices", [{}])[0].get("delta", {})
                            content = delta.get("content", "")
                            reasoning = delta.get("reasoning_content", "")
                            if content:
                                yield f"data: {json.dumps({'content': content})}\n\n"
                            if reasoning:
                                yield f"data: {json.dumps({'reasoning': reasoning})}\n\n"
                        except json.JSONDecodeError:
                            pass
            if buffer.strip():
                line = buffer.strip()
                if line.startswith(b"data: ") and line != b"data: [DONE]":
                    try:
                        obj = json.loads(line[6:])
                        delta = obj.get("choices", [{}])[0].get("delta", {})
                        content = delta.get("content", "")
                        if content:
                            yield f"data: {json.dumps({'content': content})}\n\n"
                    except json.JSONDecodeError:
                        pass
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return Response(
        stream_with_context(generate()),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )


@app.route("/api/chat/sync", methods=["POST"])
def api_chat_sync():
    data = request.json
    model = normalize_language_model(data.get("model", DEFAULT_CHAT_MODEL))
    messages = sanitize_chat_messages(data.get("messages", []))
    system = data.get("system", "")
    collection_ids = data.get("collection_ids", [])
    requested_tools = data.get("tools", [])
    reasoning = data.get("reasoning", {})

    system_parts = []
    if system:
        system_parts.append(system)
    if collection_ids:
        coll_context = fetch_collection_context(collection_ids)
        if coll_context:
            system_parts.append(
                "The user has attached the following documents from their collection. "
                "Use this information to answer their questions:\n\n" + coll_context
            )
    system_text = "\n\n".join(system_parts) if system_parts else ""

    try:
        response_tools = build_xai_tools(requested_tools, collection_ids)
        if "multi-agent" in model or response_tools:
            payload = {"model": model, "input": messages, "stream": False}
            if system_text:
                payload["instructions"] = system_text
            if response_tools:
                payload["tools"] = response_tools
            if "multi-agent" in model:
                effort = reasoning.get("effort", "low")
                if effort in ("low", "medium", "high", "xhigh"):
                    payload["reasoning"] = {"effort": effort}
            result = xai_request("responses", payload)
            content = extract_response_text(result)
        else:
            payload = {"model": model, "messages": messages, "stream": False}
            if system_text:
                payload["messages"] = [{"role": "system", "content": system_text}] + payload["messages"]
            result = xai_request("chat/completions", payload)
            content = result["choices"][0]["message"]["content"]
        return jsonify({"content": content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Routes: Image Generation ─────────────────────────────────────────────────

@app.route("/api/image/generate", methods=["POST"])
def api_image_generate():
    data = request.json
    prompt = data.get("prompt", "")
    model = data.get("model", DEFAULT_IMAGE_MODEL)
    n = _coerce_int(data.get("n", 1), 1, 1, 10)
    resolution = _coerce_choice(data.get("resolution"), IMAGE_RESOLUTIONS, DEFAULT_IMAGE_RESOLUTION)
    aspect_ratio = _coerce_choice(data.get("aspect_ratio"), IMAGE_ASPECT_RATIOS, DEFAULT_IMAGE_ASPECT_RATIO)
    reference_b64 = data.get("reference", "")  # optional reference image for character consistency

    if not prompt:
        return jsonify({"error": "Prompt required"}), 400

    try:
        # If a reference image is provided, analyze it for character details and enrich the prompt
        final_prompt = prompt
        if reference_b64:
            try:
                ref_mime = _detect_mime(reference_b64)
                ref_uri = f"data:{ref_mime};base64,{reference_b64}"
                vision_payload = {
                    "model": "grok-4-1-fast-non-reasoning",
                    "messages": [{
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "Describe this character/subject in precise visual detail for image generation consistency: exact appearance, hair color/style, eye color, skin tone, facial features, body type, clothing, distinctive marks, accessories, art style. Be specific and concise — 2-3 sentences max. ONLY describe what you see, no interpretation."},
                            {"type": "image_url", "image_url": {"url": ref_uri}},
                        ]
                    }]
                }
                vision_result = xai_request("chat/completions", vision_payload)
                char_desc = vision_result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
                if char_desc:
                    final_prompt = f"[CHARACTER REFERENCE — maintain exact appearance: {char_desc}] {prompt}"
            except Exception:
                pass  # Fall back to original prompt if vision fails

        payload = {
            "model": model,
            "prompt": final_prompt,
            "n": n,
            "response_format": "b64_json",
            "resolution": resolution,
        }
        if aspect_ratio:
            payload["aspect_ratio"] = aspect_ratio
        result = xai_request("images/generations", payload)
        saved = _save_image_results(result, "img", final_prompt, model)
        return jsonify({"images": saved})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/image/edit", methods=["POST"])
def api_image_edit():
    data = request.json
    prompt = data.get("prompt", "")
    model = data.get("model", DEFAULT_IMAGE_MODEL)
    image_b64 = data.get("image", "")
    resolution = _coerce_choice(data.get("resolution"), IMAGE_RESOLUTIONS, DEFAULT_IMAGE_RESOLUTION)
    aspect_ratio = _coerce_choice(data.get("aspect_ratio"), IMAGE_ASPECT_RATIOS, DEFAULT_IMAGE_ASPECT_RATIO)

    if not prompt or not image_b64:
        return jsonify({"error": "Prompt and image required"}), 400

    try:
        if model.startswith("gpt-"):
            return jsonify({"error": "Reference image edits in DORK use Grok Imagine models. Switch to Grok Imagine or open DORK+ for GPT image edits."}), 400

        if not model.startswith("grok-imagine-image"):
            model = DEFAULT_IMAGE_MODEL

        # xAI edits are picky: send PNG/JPEG data URIs, converting WebP/large refs.
        data_uri = _xai_reference_data_uri(image_b64)
        settings = {"resolution": resolution}
        if aspect_ratio and aspect_ratio != "auto":
            settings["aspect_ratio"] = aspect_ratio
        result = _xai_image_edit(model, prompt, data_uri, settings)
        saved = _save_image_results(result, "edit", prompt, model)
        return jsonify({"images": saved})
    except ValueError as e:
        status = 400 if str(e).startswith("Reference image") else 500
        return jsonify({"error": str(e)}), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/image/combine", methods=["POST"])
def api_image_combine():
    """Combine two images using edit API (preserves character consistency from image 1)."""
    data = request.json
    image1_b64 = data.get("image1", "")
    image2_b64 = data.get("image2", "")
    user_prompt = data.get("prompt", "")

    if not image1_b64 or not image2_b64:
        return jsonify({"error": "Two images required"}), 400

    try:
        # Step 1: Analyze image 2 with vision to describe what to fuse IN
        mime2 = _detect_mime(image2_b64)
        uri2 = f"data:{mime2};base64,{image2_b64}"

        analysis_prompt = "Describe the key visual elements, subjects, style, mood, colors, and thematic content of this image in 2-3 concise sentences. "
        analysis_prompt += "Focus on what makes it distinctive — characters, objects, environment, aesthetic. Be specific and vivid."

        vision_payload = {
            "model": "grok-4-1-fast-non-reasoning",
            "messages": [{"role": "user", "content": [
                {"type": "text", "text": analysis_prompt},
                {"type": "image_url", "image_url": {"url": uri2}},
            ]}]
        }
        vision_result = xai_request("chat/completions", vision_payload)
        img2_desc = vision_result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()

        # Step 2: Use the EDIT endpoint with image 1 as the source (preserves its character/subject)
        # The edit prompt fuses image 2's elements INTO image 1
        fusion_prompt = f"Fuse the following elements into this image while preserving the existing characters and subjects exactly as they appear: {img2_desc}"
        if user_prompt:
            fusion_prompt += f". Style direction: {user_prompt}"

        mime1 = _detect_mime(image1_b64)
        data_uri = _xai_reference_data_uri(image1_b64)
        result = _xai_image_edit(DEFAULT_IMAGE_MODEL, fusion_prompt, data_uri, {"resolution": DEFAULT_IMAGE_RESOLUTION})
        saved = _save_image_results(result, "fusion", fusion_prompt, DEFAULT_IMAGE_MODEL)
        return jsonify({"images": saved, "fusion_prompt": fusion_prompt})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/image/combine-characters", methods=["POST"])
def api_image_combine_characters():
    """Combine characters from two images into a new scene preserving both faces."""
    data = request.json
    image1_b64 = data.get("image1", "")
    image2_b64 = data.get("image2", "")
    scene_prompt = data.get("prompt", "")

    if not image1_b64 or not image2_b64:
        return jsonify({"error": "Two images required"}), 400

    try:
        # Step 1: Analyze both characters with vision
        mime1 = _detect_mime(image1_b64)
        mime2 = _detect_mime(image2_b64)
        uri1 = f"data:{mime1};base64,{image1_b64}"
        uri2 = f"data:{mime2};base64,{image2_b64}"

        char_prompt = "Describe each character/person in these two images with EXTREME precision for visual consistency. For EACH character: exact face shape, eye color/shape, nose, lips, skin tone, hair color/style/length, body build, height impression, clothing, accessories, any distinguishing marks. Label them Character A (image 1) and Character B (image 2). Be exhaustive — this description will be used to recreate them exactly. 4-5 sentences per character."

        vision_payload = {
            "model": "grok-4-1-fast-non-reasoning",
            "messages": [{"role": "user", "content": [
                {"type": "text", "text": char_prompt},
                {"type": "image_url", "image_url": {"url": uri1}},
                {"type": "image_url", "image_url": {"url": uri2}},
            ]}]
        }
        vision_result = xai_request("chat/completions", vision_payload)
        char_descriptions = vision_result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()

        # Step 2: Use edit API with image 1 as base, inject character B into the scene
        scene = scene_prompt or "both characters together in the same scene, interacting naturally"
        edit_prompt = f"Add the second character into this image while preserving the EXACT face and appearance of the existing character. {char_descriptions}\n\nScene: {scene}. Both characters must appear with their exact original faces, features, and proportions."

        data_uri = _xai_reference_data_uri(image1_b64)
        result = _xai_image_edit(DEFAULT_IMAGE_MODEL, edit_prompt, data_uri, {"resolution": DEFAULT_IMAGE_RESOLUTION})
        saved = _save_image_results(result, "charcombo", edit_prompt[:200], DEFAULT_IMAGE_MODEL)
        return jsonify({"images": saved, "characters": char_descriptions[:500]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/image/upload", methods=["POST"])
def api_image_upload():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    f = request.files["file"]
    ts = int(time.time() * 1000)
    ext = os.path.splitext(f.filename)[1] or ".png"
    filename = f"upload_{ts}{ext}"
    filepath = UPLOADS_DIR / filename
    f.save(str(filepath))
    return jsonify({"filename": filename, "url": f"/uploads/{filename}"})


@app.route("/api/image/list")
def api_image_list():
    images = []
    for f in sorted(IMAGES_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if f.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp"):
            images.append({"filename": f.name, "url": f"/images/{f.name}", "created": f.stat().st_mtime})
    return jsonify({"images": images})


@app.route("/api/image/delete", methods=["POST"])
def api_image_delete():
    data = request.json
    filename = data.get("filename", "")
    filepath = IMAGES_DIR / filename
    if filepath.exists() and filepath.parent == IMAGES_DIR:
        filepath.unlink()
        return jsonify({"success": True})
    return jsonify({"error": "File not found"}), 404


# ── Routes: Video Generation ─────────────────────────────────────────────────

@app.route("/api/video/generate", methods=["POST"])
def api_video_generate():
    data = request.json
    prompt = data.get("prompt", "")
    image_b64 = data.get("image", "")
    model = data.get("model", DEFAULT_VIDEO_MODEL)
    if not model or not model.startswith("grok-imagine-video"):
        model = DEFAULT_VIDEO_MODEL
    duration = _coerce_int(data.get("duration"), DEFAULT_VIDEO_DURATION, 1, 15)
    resolution = _coerce_choice(data.get("resolution"), VIDEO_RESOLUTIONS, DEFAULT_VIDEO_RESOLUTION)
    aspect_ratio = _coerce_choice(data.get("aspect_ratio"), VIDEO_ASPECT_RATIOS, DEFAULT_VIDEO_ASPECT_RATIO)

    if not prompt:
        return jsonify({"error": "Prompt required"}), 400

    try:
        payload = {
            "model": model,
            "prompt": prompt,
            "duration": duration,
            "resolution": resolution,
            "aspect_ratio": aspect_ratio,
        }
        if image_b64:
            # Detect actual MIME from base64 header bytes
            mime = _detect_mime(image_b64)
            # xAI expects nested object: image: {url: "data:mime;base64,..."}
            payload["image"] = {"url": f"data:{mime};base64,{image_b64}"}
        result = xai_request("videos/generations", payload)
        video_id = result.get("request_id", "") or result.get("id", "") or result.get("job_id", "")
        if not video_id:
            return jsonify({"error": f"No request ID in response: {list(result.keys())}"}), 500
        return jsonify({"id": video_id, "status": "processing"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/video/poll")
def api_video_poll():
    video_id = request.args.get("id", "")
    if not video_id:
        return jsonify({"error": "Video ID required"}), 400
    try:
        result = xai_get(f"videos/{video_id}")
        status = result.get("status", "processing")

        if status in ("done", "completed", "complete", "succeeded"):
            # Find video URL — xAI uses different response shapes
            video_url = ""
            vi = result.get("video", {})
            if isinstance(vi, dict):
                video_url = vi.get("url", "")
            if not video_url:
                dl = result.get("data", [])
                if dl and isinstance(dl, list) and isinstance(dl[0], dict):
                    video_url = dl[0].get("url", "")
            if not video_url:
                for k in ("output", "result", "video_url", "url"):
                    v = result.get(k)
                    if isinstance(v, str) and v.startswith("http"):
                        video_url = v
                        break
                    elif isinstance(v, dict) and v.get("url"):
                        video_url = v["url"]
                        break

            if not video_url:
                return jsonify({"status": "processing", "detail": "Video finished; waiting for download URL"})

            ts = int(time.time() * 1000)
            filename = f"video_{ts}.mp4"
            filepath = VIDEOS_DIR / filename
            req = urllib.request.Request(video_url)
            req.add_header("User-Agent", "DORK/1.0")
            resp = urllib.request.urlopen(req, timeout=120)
            filepath.write_bytes(resp.read())
            return jsonify({"status": "completed", "filename": filename, "url": f"/videos/{filename}"})

        elif status in ("failed", "error", "cancelled", "expired"):
            err = result.get("error", {})
            err_msg = err.get("message", "") if isinstance(err, dict) else str(err)
            # Check for moderation in video object
            vi = result.get("video", {})
            if isinstance(vi, dict) and vi.get("respect_moderation") is False:
                err_msg = err_msg or "Content moderation rejected"
            return jsonify({"error": err_msg or f"Video {status}"})

        return jsonify({"status": status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/video/freeze", methods=["POST"])
def api_video_freeze():
    """Freeze a video frame and save as image."""
    data = request.json
    image_data = data.get("image", "")
    if not image_data:
        return jsonify({"error": "No image data"}), 400
    if "," in image_data:
        image_data = image_data.split(",", 1)[1]
    ts = int(time.time() * 1000)
    filename = f"frame_{ts}.png"
    filepath = IMAGES_DIR / filename
    filepath.write_bytes(base64.b64decode(image_data))
    return jsonify({"filename": filename, "url": f"/images/{filename}"})


@app.route("/api/video/lastframe", methods=["POST"])
def api_video_lastframe():
    """Extract the last frame from a video file and save as an image."""
    data = request.json
    filename = data.get("filename", "")
    if not filename:
        return jsonify({"error": "Filename required"}), 400
    video_path = VIDEOS_DIR / Path(filename).name
    if not video_path.exists():
        return jsonify({"error": "Video not found"}), 404

    ts = int(time.time() * 1000)
    frame_filename = f"frame_{ts}.png"
    frame_path = IMAGES_DIR / frame_filename

    try:
        result = subprocess.run(
            ["ffmpeg", "-y", "-sseof", "-0.1", "-i", str(video_path),
             "-update", "1", "-frames:v", "1", str(frame_path)],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0 or not frame_path.exists():
            result = subprocess.run(
                ["ffprobe", "-v", "error", "-show_entries", "format=duration",
                 "-of", "default=noprint_wrappers=1:nokey=1", str(video_path)],
                capture_output=True, text=True, timeout=10
            )
            duration = float(result.stdout.strip()) - 0.05
            subprocess.run(
                ["ffmpeg", "-y", "-ss", str(max(0, duration)), "-i", str(video_path),
                 "-frames:v", "1", str(frame_path)],
                capture_output=True, text=True, timeout=30
            )

        if not frame_path.exists():
            return jsonify({"error": "Failed to extract frame"}), 500

        frame_b64 = base64.b64encode(frame_path.read_bytes()).decode()
        return jsonify({
            "filename": frame_filename,
            "url": f"/images/{frame_filename}",
            "base64": frame_b64,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/video/delete", methods=["POST"])
def api_video_delete():
    data = request.json
    filename = data.get("filename", "")
    filepath = VIDEOS_DIR / Path(filename).name
    if filepath.exists() and filepath.parent == VIDEOS_DIR:
        filepath.unlink()
        return jsonify({"success": True})
    return jsonify({"error": "File not found"}), 404


@app.route("/api/video/list")
def api_video_list():
    videos = []
    for f in sorted(VIDEOS_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if f.suffix.lower() in (".mp4", ".webm", ".mov"):
            videos.append({"filename": f.name, "url": f"/videos/{f.name}", "created": f.stat().st_mtime})
    return jsonify({"videos": videos})


@app.route("/api/video/stitch", methods=["POST"])
def api_video_stitch():
    """Stitch multiple videos together via ffmpeg."""
    data = request.json
    filenames = data.get("videos", [])
    if len(filenames) < 2:
        return jsonify({"error": "Need at least 2 videos"}), 400

    paths = []
    for name in filenames:
        p = VIDEOS_DIR / Path(name).name
        if not p.exists():
            return jsonify({"error": f"Not found: {name}"}), 404
        paths.append(str(p))

    stitch_id = str(uuid.uuid4())[:8]
    output_filename = f"stitch_{stitch_id}.mp4"
    output_path = VIDEOS_DIR / output_filename

    try:
        concat_path = VIDEOS_DIR / f".concat_{stitch_id}.txt"
        concat_path.write_text("\n".join(f"file '{p}'" for p in paths))

        result = subprocess.run(
            ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_path), "-c", "copy", str(output_path)],
            capture_output=True, text=True, timeout=60
        )
        concat_path.unlink(missing_ok=True)

        if result.returncode != 0:
            # Retry with re-encoding
            concat_path.write_text("\n".join(f"file '{p}'" for p in paths))
            result = subprocess.run(
                ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_path),
                 "-c:v", "libx264", "-crf", "23", "-preset", "fast", "-c:a", "aac", str(output_path)],
                capture_output=True, text=True, timeout=120
            )
            concat_path.unlink(missing_ok=True)
            if result.returncode != 0:
                return jsonify({"error": f"ffmpeg failed: {result.stderr[:200]}"}), 500

        return jsonify({"filename": output_filename, "url": f"/videos/{output_filename}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Routes: Voice / TTS ──────────────────────────────────────────────────────

@app.route("/api/voice/speak", methods=["POST"])
def api_voice_speak():
    """TTS via POST /v1/tts — xAI native TTS endpoint."""
    data = request.json
    text = data.get("text", "")
    voice_id = data.get("voice_id", "eve")
    language = data.get("language", "en")

    if not text:
        return jsonify({"error": "Text required"}), 400

    try:
        api_key = get_api_key()
        if not api_key:
            return jsonify({"error": "No API key configured"}), 400

        payload = json.dumps({
            "text": text,
            "voice_id": voice_id,
            "language": language,
        }).encode("utf-8")

        url = f"{XAI_BASE}/tts"
        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("Content-Type", "application/json")
        req.add_header("User-Agent", "DORK/1.0")

        try:
            resp = urllib.request.urlopen(req, timeout=120)
        except urllib.error.HTTPError as e:
            raise ValueError(_parse_xai_error(e))

        audio_data = resp.read()
        ts = int(time.time() * 1000)
        filename = f"speech_{ts}.mp3"
        filepath = AUDIO_DIR / filename
        filepath.write_bytes(audio_data)
        return jsonify({"filename": filename, "url": f"/audio/{filename}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/voice/list")
def api_voice_list():
    audio_files = []
    for f in sorted(AUDIO_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if f.suffix.lower() in (".mp3", ".wav", ".ogg"):
            audio_files.append({"filename": f.name, "url": f"/audio/{f.name}", "created": f.stat().st_mtime})
    return jsonify({"files": audio_files})


@app.route("/api/voice/delete", methods=["POST"])
def api_voice_delete():
    filename = request.json.get("filename", "")
    filepath = AUDIO_DIR / filename
    if filepath.exists() and filepath.parent == AUDIO_DIR:
        filepath.unlink()
        return jsonify({"deleted": True})
    return jsonify({"error": "Not found"}), 404


# ── Routes: Voice Agent (Realtime) ───────────────────────────────────────────

@app.route("/api/realtime/token", methods=["POST"])
def api_realtime_token():
    """Get ephemeral token for voice agent WebSocket."""
    try:
        api_key = get_api_key()
        if not api_key:
            return jsonify({"error": "No API key configured"}), 400

        payload = json.dumps({}).encode("utf-8")
        url = f"{XAI_BASE}/realtime/client_secrets"
        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("Content-Type", "application/json")
        req.add_header("User-Agent", "DORK/1.0")

        try:
            resp = urllib.request.urlopen(req, timeout=15)
        except urllib.error.HTTPError as e:
            raise ValueError(_parse_xai_error(e))

        data = json.loads(resp.read().decode("utf-8"))
        # Token is in "value" field
        return jsonify({"token": data.get("value", ""), "expires_at": data.get("expires_at", 0)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Routes: Collections ──────────────────────────────────────────────────────

@app.route("/api/collections", methods=["GET", "POST"])
def api_collections():
    if request.method == "GET":
        try:
            result = xai_get("collections")
            raw = result.get("collections", [])
            normalized = []
            for c in raw:
                normalized.append({
                    "id": c.get("collection_id", c.get("id", "")),
                    "name": c.get("collection_name", c.get("name", "")),
                    "description": c.get("collection_description", c.get("description", "")),
                    "total_documents": c.get("documents_count", c.get("total_documents", 0)),
                    "created_at": c.get("created_at", ""),
                })
            return jsonify({"collections": normalized})
        except Exception as e:
            return jsonify({"error": str(e), "collections": []}), 200
    else:
        data = request.json
        name = data.get("name", "")
        description = data.get("description", "")
        try:
            payload = {"name": name}
            if description:
                payload["description"] = description
            result = xai_request("collections", payload)
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/api/collections/<collection_id>/documents", methods=["POST"])
def api_collection_upload(collection_id):
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    f = request.files["file"]
    try:
        result = _upload_file_to_collection(f.filename, f.read(), "application/octet-stream", collection_id)
        _collection_cache.pop(collection_id, None)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/collections/<collection_id>", methods=["DELETE"])
def api_collection_delete(collection_id):
    try:
        api_key = get_api_key()
        url = f"{XAI_BASE}/collections/{collection_id}"
        req = urllib.request.Request(url, method="DELETE")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("User-Agent", "DORK/1.0")
        urllib.request.urlopen(req, timeout=60)
        return jsonify({"status": "deleted"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ── Routes: Artifacts ─────────────────────────────────────────────────────────

@app.route("/api/artifacts/save", methods=["POST"])
def api_artifact_save():
    data = request.json
    title = data.get("title", "Untitled")
    html = data.get("html", "")
    css = data.get("css", "")
    js = data.get("js", "")
    source_model = data.get("model", "")

    ts = int(time.time() * 1000)
    slug = "".join(c if c.isalnum() or c in "-_ " else "" for c in title)[:40].strip().replace(" ", "-").lower()
    filename = f"{slug}_{ts}.html"

    # Build standalone HTML
    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<!-- DORK Artifact | model: {source_model} | created: {time.strftime('%Y-%m-%d %H:%M')} -->
<style>
{css}
</style>
</head>
<body>
{html}
<script>
{js}
</script>
</body>
</html>"""

    filepath = ARTIFACTS_DIR / filename
    filepath.write_text(doc)

    # Save metadata sidecar
    meta = {"title": title, "filename": filename, "model": source_model, "created": time.time()}
    meta_path = ARTIFACTS_DIR / f"{filename}.json"
    meta_path.write_text(json.dumps(meta))

    return jsonify({"filename": filename, "url": f"/artifacts/{filename}", "title": title})


@app.route("/api/artifacts/list")
def api_artifact_list():
    artifacts = []
    for f in sorted(ARTIFACTS_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if f.suffix == ".html":
            meta_path = ARTIFACTS_DIR / f"{f.name}.json"
            meta = {}
            if meta_path.exists():
                try:
                    meta = json.loads(meta_path.read_text())
                except Exception:
                    pass
            artifacts.append({
                "filename": f.name,
                "url": f"/artifacts/{f.name}",
                "title": meta.get("title", f.stem),
                "model": meta.get("model", ""),
                "created": meta.get("created", f.stat().st_mtime),
            })
    return jsonify({"artifacts": artifacts})


@app.route("/api/artifacts/delete", methods=["POST"])
def api_artifact_delete():
    data = request.json
    filename = data.get("filename", "")
    filepath = ARTIFACTS_DIR / filename
    meta_path = ARTIFACTS_DIR / f"{filename}.json"
    if filepath.exists():
        filepath.unlink()
        if meta_path.exists():
            meta_path.unlink()
        return jsonify({"status": "deleted"})
    return jsonify({"error": "Not found"}), 404


@app.route("/artifacts/<path:filename>")
def serve_artifact(filename):
    return send_from_directory(str(ARTIFACTS_DIR), filename)


# ── Routes: Skills ────────────────────────────────────────────────────────────

@app.route("/api/skills/save", methods=["POST"])
def api_skill_save():
    data = request.json
    name = data.get("name", "")
    description = data.get("description", "")
    skill_type = data.get("type", "instruction")
    content = data.get("content", "")
    collection_id = data.get("collection_id", "")

    if not name or not content:
        return jsonify({"error": "Name and content required"}), 400

    # Build markdown with frontmatter
    md = f"""---
name: {name}
description: |
  {description}
type: {skill_type}
created: {time.strftime('%Y-%m-%dT%H:%M:%S')}
---

{content}
"""

    slug = "".join(c if c.isalnum() or c in "-_ " else "" for c in name)[:40].strip().replace(" ", "-").lower()
    filename = f"{slug}.md"
    filepath = SKILLS_DIR / filename
    filepath.write_text(md)

    result = {"filename": filename, "name": name}

    # Upload to collection if specified
    if collection_id:
        try:
            _upload_file_to_collection(filename, md.encode("utf-8"), "text/markdown", collection_id)
            result["uploaded"] = True
            _collection_cache.pop(collection_id, None)
        except Exception as e:
            result["upload_error"] = str(e)

    return jsonify(result)


@app.route("/api/skills/list")
def api_skill_list():
    skills = []
    for f in sorted(SKILLS_DIR.iterdir(), key=lambda x: x.stat().st_mtime, reverse=True):
        if f.suffix == ".md":
            text = f.read_text()
            meta = _parse_frontmatter(text)
            skills.append({
                "filename": f.name,
                "name": meta.get("name", f.stem),
                "description": meta.get("description", ""),
                "type": meta.get("type", "instruction"),
                "created": meta.get("created", ""),
            })
    return jsonify({"skills": skills})


@app.route("/api/skills/<filename>")
def api_skill_get(filename):
    filepath = SKILLS_DIR / filename
    if not filepath.exists():
        return jsonify({"error": "Not found"}), 404
    text = filepath.read_text()
    meta = _parse_frontmatter(text)
    # Extract body (after second ---)
    parts = text.split("---", 2)
    body = parts[2].strip() if len(parts) >= 3 else text
    return jsonify({"filename": filename, "body": body, **meta})


@app.route("/api/skills/delete", methods=["POST"])
def api_skill_delete():
    data = request.json
    filename = data.get("filename", "")
    filepath = SKILLS_DIR / filename
    if filepath.exists():
        filepath.unlink()
        return jsonify({"status": "deleted"})
    return jsonify({"error": "Not found"}), 404


def _parse_frontmatter(text):
    """Parse YAML-like frontmatter from markdown."""
    if not text.startswith("---"):
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}
    meta = {}
    current_key = None
    for line in parts[1].strip().split("\n"):
        if ":" in line and not line.startswith(" "):
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            if val == "|":
                current_key = key
                meta[key] = ""
            else:
                meta[key] = val
                current_key = None
        elif current_key and line.startswith("  "):
            meta[current_key] += line.strip() + " "
    # Clean up trailing spaces
    for k in meta:
        if isinstance(meta[k], str):
            meta[k] = meta[k].strip()
    return meta


# ── Routes: File Serving ─────────────────────────────────────────────────────

@app.route("/images/<path:filename>")
def serve_image(filename):
    return send_from_directory(str(IMAGES_DIR), filename)

@app.route("/uploads/<path:filename>")
def serve_upload(filename):
    return send_from_directory(str(UPLOADS_DIR), filename)

@app.route("/videos/<path:filename>")
def serve_video(filename):
    return send_from_directory(str(VIDEOS_DIR), filename)

@app.route("/audio/<path:filename>")
def serve_audio(filename):
    return send_from_directory(str(AUDIO_DIR), filename)


@app.route("/api/delete", methods=["POST"])
def api_delete():
    data = request.json
    filename = data.get("filename", "")
    file_type = data.get("type", "image")
    dirs = {"image": IMAGES_DIR, "video": VIDEOS_DIR, "audio": AUDIO_DIR, "upload": UPLOADS_DIR}
    target_dir = dirs.get(file_type, IMAGES_DIR)
    filepath = target_dir / filename
    if filepath.exists():
        filepath.unlink()
        return jsonify({"status": "deleted"})
    return jsonify({"error": "Not found"}), 404


# ── Asset Library (Characters + Styles, ported from dork+ios) ───────────────
# Persistent character/style references with active toggles. Active items
# auto-attach to image and video generations as reference images.

def _asset_lib_load():
    if ASSET_LIB_INDEX.exists():
        try:
            return json.loads(ASSET_LIB_INDEX.read_text())
        except Exception:
            pass
    return {"items": []}


def _asset_lib_save(data):
    ASSET_LIB_INDEX.write_text(json.dumps(data, indent=2))


def _asset_lib_ext_from_data_url(data_url):
    low = (data_url or "").lower()
    if low.startswith("data:image/jpeg") or low.startswith("data:image/jpg"):
        return "jpg"
    if low.startswith("data:image/webp"):
        return "webp"
    if low.startswith("data:image/gif"):
        return "gif"
    return "png"


def _asset_lib_mime_from_ext(ext):
    return {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
            "webp": "image/webp", "gif": "image/gif"}.get(ext.lower(), "image/png")


@app.route("/api/asset-library", methods=["GET"])
def api_asset_lib_list():
    return jsonify(_asset_lib_load())


@app.route("/api/asset-library", methods=["POST"])
def api_asset_lib_add():
    data = request.json or {}
    name = (data.get("name") or "Untitled").strip()[:60] or "Untitled"
    asset_type = data.get("type", "character")
    if asset_type not in ("character", "style"):
        asset_type = "character"
    tags = (data.get("tags") or "").strip()
    image_data = data.get("image", "") or ""
    if not image_data:
        return jsonify({"error": "no image"}), 400
    orig = image_data
    if image_data.startswith("data:") and "," in image_data:
        image_data = image_data.split(",", 1)[1]
    ext = _asset_lib_ext_from_data_url(orig)
    item_id = uuid.uuid4().hex[:12]
    fname = f"{item_id}.{ext}"
    fpath = ASSET_LIB_DIR / fname
    try:
        fpath.write_bytes(base64.b64decode(image_data))
    except Exception as e:
        return jsonify({"error": f"file write: {e}"}), 500
    idx = _asset_lib_load()
    item = {"id": item_id, "name": name, "type": asset_type, "tags": tags,
            "file": fname, "created": int(time.time()), "active": False}
    idx["items"].insert(0, item)
    _asset_lib_save(idx)
    return jsonify(item)


@app.route("/api/asset-library/toggle", methods=["POST"])
def api_asset_lib_toggle():
    data = request.json or {}
    iid = data.get("id")
    idx = _asset_lib_load()
    target = next((i for i in idx["items"] if i["id"] == iid), None)
    if not target:
        return jsonify({"error": "not found"}), 404
    target["active"] = not target.get("active", False)
    _asset_lib_save(idx)
    return jsonify(idx)


@app.route("/api/asset-library/rename", methods=["POST"])
def api_asset_lib_rename():
    data = request.json or {}
    idx = _asset_lib_load()
    item = next((i for i in idx["items"] if i["id"] == data.get("id")), None)
    if not item:
        return jsonify({"error": "not found"}), 404
    item["name"] = (data.get("name") or "Untitled").strip()[:60]
    if "tags" in data:
        item["tags"] = (data.get("tags") or "")
    _asset_lib_save(idx)
    return jsonify(item)


@app.route("/api/asset-library/delete", methods=["POST"])
def api_asset_lib_delete():
    data = request.json or {}
    iid = data.get("id")
    if not iid:
        return jsonify({"error": "no id"}), 400
    idx = _asset_lib_load()
    item = next((i for i in idx["items"] if i["id"] == iid), None)
    if item:
        fpath = ASSET_LIB_DIR / item["file"]
        if fpath.exists():
            try:
                fpath.unlink()
            except Exception:
                pass
        idx["items"] = [i for i in idx["items"] if i["id"] != iid]
        _asset_lib_save(idx)
    return jsonify({"ok": True})


@app.route("/api/asset-library/dataurl/<item_id>")
def api_asset_lib_dataurl(item_id):
    idx = _asset_lib_load()
    item = next((i for i in idx["items"] if i["id"] == item_id), None)
    if not item:
        return jsonify({"error": "not found"}), 404
    fpath = ASSET_LIB_DIR / item["file"]
    if not fpath.exists():
        return jsonify({"error": "file missing"}), 404
    raw = fpath.read_bytes()
    ext = item["file"].rsplit(".", 1)[-1].lower()
    mime = _asset_lib_mime_from_ext(ext)
    b64 = base64.b64encode(raw).decode("ascii")
    return jsonify({"data_url": f"data:{mime};base64,{b64}"})


@app.route("/asset-library/<item_id>")
def asset_lib_serve(item_id):
    idx = _asset_lib_load()
    item = next((i for i in idx["items"] if i["id"] == item_id), None)
    if not item:
        return ("", 404)
    fpath = ASSET_LIB_DIR / item["file"]
    if not fpath.exists():
        return ("", 404)
    return send_from_directory(str(ASSET_LIB_DIR), item["file"])


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import getpass, hashlib
    _base_port = 5080
    _user_offset = int(hashlib.md5(getpass.getuser().encode()).hexdigest(), 16) % 100
    _port = _base_port + _user_offset
    print(f"\n  \033[38;5;141m◆\033[0m DORK")
    print(f"  → http://127.0.0.1:{_port}\n")
    app.run(host="127.0.0.1", port=_port, debug=False)
