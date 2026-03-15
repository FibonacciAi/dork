"""
DORK — Flask backend
Full xAI API integration: Chat, Image, Video, Voice, Code, Collections, Artifacts, Skills
"""

import os
import json
import time
import uuid
import base64
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
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

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

for d in [SETTINGS_DIR, IMAGES_DIR, VIDEOS_DIR, AUDIO_DIR, UPLOADS_DIR, ARTIFACTS_DIR, SKILLS_DIR]:
    d.mkdir(parents=True, exist_ok=True)

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
        {"id": "grok-imagine-image", "name": "Grok Imagine", "price": "$0.02"},
        {"id": "grok-imagine-image-pro", "name": "Grok Imagine Pro", "price": "$0.07"},
    ],
    "video": [
        {"id": "grok-imagine-video", "name": "Grok Imagine Video", "price": "$0.05/s"},
    ],
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


def _detect_mime(b64_data):
    """Detect actual MIME type from base64-encoded image data."""
    try:
        header = base64.b64decode(b64_data[:32])
        if header[:3] == b'\xff\xd8\xff':
            return "image/jpeg"
        elif header[:8] == b'\x89PNG\r\n\x1a\n':
            return "image/png"
        elif header[:4] == b'RIFF' and header[8:12] == b'WEBP':
            return "image/webp"
        elif header[:4] == b'GIF8':
            return "image/gif"
    except Exception:
        pass
    return "image/png"


def _parse_xai_error(e):
    """Extract a readable error message from an xAI HTTP error."""
    try:
        body = json.loads(e.read().decode("utf-8"))
        err = body.get("error", body.get("code", ""))
        if isinstance(err, dict):
            return err.get("message", str(err))
        return str(err) or f"HTTP {e.code}"
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


@app.route("/api/models")
def api_models():
    return jsonify(MODELS)


# ── Routes: Chat (Streaming SSE) ─────────────────────────────────────────────

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.json
    model = data.get("model", "grok-4.20-beta-0309-non-reasoning")
    messages = data.get("messages", [])
    system = data.get("system", "")
    temperature = data.get("temperature", 0.7)
    collection_ids = data.get("collection_ids", [])

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

    # Multi-agent model uses /v1/responses endpoint (Responses API)
    is_multi_agent = "multi-agent" in model

    if is_multi_agent:
        payload = {
            "model": model,
            "input": messages,
            "stream": True,
            "temperature": temperature,
        }
        if system_text:
            payload["instructions"] = system_text
        # Pass agents config from frontend, or use smart defaults
        agents = data.get("agents")
        if agents:
            payload["agents"] = agents
        else:
            # Default agent team for multi-agent mode
            payload["agents"] = [
                {"name": "researcher", "model": "grok-4.20-beta-0309-non-reasoning",
                 "instructions": "You are a thorough research specialist. Provide detailed, factual, well-sourced information. Be comprehensive."},
                {"name": "coder", "model": "grok-code-fast-1",
                 "instructions": "You are an expert programmer. Write clean, production-quality code with proper formatting. Use markdown code blocks with language tags."},
                {"name": "creative", "model": "grok-4.20-beta-0309-non-reasoning",
                 "instructions": "You are a creative writer and designer. Generate vivid, engaging, original content. Think outside the box."},
            ]

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
                                if evt_type == "response.output_text.delta":
                                    delta = obj.get("delta", "")
                                    if delta:
                                        yield f"data: {json.dumps({'content': delta})}\n\n"
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
    model = data.get("model", "grok-4.20-beta-0309-non-reasoning")
    messages = data.get("messages", [])
    system = data.get("system", "")
    collection_ids = data.get("collection_ids", [])

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
        if "multi-agent" in model:
            payload = {"model": model, "input": messages, "stream": False}
            if system_text:
                payload["instructions"] = system_text
            agents = data.get("agents")
            if agents:
                payload["agents"] = agents
            result = xai_request("responses", payload)
            content = result["output"][0]["content"][0]["text"]
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
    model = data.get("model", "grok-imagine-image")
    n = data.get("n", 1)

    if not prompt:
        return jsonify({"error": "Prompt required"}), 400

    try:
        payload = {"model": model, "prompt": prompt, "n": n, "response_format": "b64_json"}
        result = xai_request("images/generations", payload)
        saved = []
        for i, img_data in enumerate(result.get("data", [])):
            b64 = img_data.get("b64_json", "")
            if b64:
                ts = int(time.time() * 1000)
                mime = _detect_mime(b64)
                ext = {"image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif"}.get(mime, ".png")
                filename = f"img_{ts}_{i}{ext}"
                filepath = IMAGES_DIR / filename
                filepath.write_bytes(base64.b64decode(b64))
                saved.append({"filename": filename, "url": f"/images/{filename}", "prompt": prompt, "model": model})
        return jsonify({"images": saved})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/image/edit", methods=["POST"])
def api_image_edit():
    data = request.json
    prompt = data.get("prompt", "")
    model = data.get("model", "grok-imagine-image")
    image_b64 = data.get("image", "")

    if not prompt or not image_b64:
        return jsonify({"error": "Prompt and image required"}), 400

    try:
        # xAI expects image as data URI object, not raw base64
        mime = _detect_mime(image_b64)
        data_uri = f"data:{mime};base64,{image_b64}"
        payload = {
            "model": model,
            "prompt": prompt,
            "image": {"url": data_uri, "type": "image_url"},
            "n": 1,
            "response_format": "b64_json",
        }
        result = xai_request("images/edits", payload)
        saved = []
        for i, img_data in enumerate(result.get("data", [])):
            b64 = img_data.get("b64_json", "")
            if b64:
                ts = int(time.time() * 1000)
                emime = _detect_mime(b64)
                eext = {"image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif"}.get(emime, ".png")
                filename = f"edit_{ts}_{i}{eext}"
                filepath = IMAGES_DIR / filename
                filepath.write_bytes(base64.b64decode(b64))
                saved.append({"filename": filename, "url": f"/images/{filename}", "prompt": prompt, "model": model})
        return jsonify({"images": saved})
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

    if not prompt:
        return jsonify({"error": "Prompt required"}), 400

    try:
        payload = {"model": "grok-imagine-video", "prompt": prompt}
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
                return jsonify({"error": "Video done but no download URL found"}), 500

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


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("\n  \033[38;5;141m◆\033[0m DORK")
    print(f"  → http://127.0.0.1:5080\n")
    app.run(host="127.0.0.1", port=5080, debug=False)
