"""DORK+ Server — Run in Pyto. index.html must be in same folder.
Adds /lib endpoints for persistent Character/Style library storage.
"""
import http.server, socket, os, json, time, base64, uuid, urllib.parse, webbrowser

HERE = os.path.dirname(os.path.abspath(__file__))
LIB_DIR = os.path.join(HERE, "library")
os.makedirs(LIB_DIR, exist_ok=True)
INDEX_FILE = os.path.join(LIB_DIR, "index.json")


def lib_load():
    try:
        with open(INDEX_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return {"items": []}


def lib_save(data):
    with open(INDEX_FILE, "w") as f:
        json.dump(data, f, indent=2)


class H(http.server.BaseHTTPRequestHandler):
    def _json(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (ConnectionResetError, BrokenPipeError):
            pass

    def _serve_html(self):
        p = os.path.join(HERE, "index.html")
        try:
            with open(p, "rb") as f:
                d = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Content-Length", str(len(d)))
            self.end_headers()
            try:
                self.wfile.write(d)
            except (ConnectionResetError, BrokenPipeError):
                pass
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()

    def _serve_lib_dataurl(self, item_id):
        """Return library image as a base64 data URL (so client can inline it into xAI requests)."""
        idx = lib_load()
        item = next((i for i in idx["items"] if i["id"] == item_id), None)
        if not item:
            return self._json(404, {"error": "not found"})
        path = os.path.join(LIB_DIR, item["file"])
        if not os.path.exists(path):
            return self._json(404, {"error": "file missing"})
        try:
            with open(path, "rb") as f:
                data = f.read()
            ext = item["file"].rsplit(".", 1)[-1].lower()
            mime = {"png":"image/png","jpg":"image/jpeg","jpeg":"image/jpeg",
                    "webp":"image/webp","gif":"image/gif",
                    "heic":"image/heic","heif":"image/heif"}.get(ext, "image/png")
            b64 = base64.b64encode(data).decode("ascii")
            return self._json(200, {"data_url": "data:" + mime + ";base64," + b64})
        except Exception as e:
            print("[lib] dataurl error:", e)
            return self._json(500, {"error": str(e)})

    def _serve_lib_image(self, item_id):
        idx = lib_load()
        item = next((i for i in idx["items"] if i["id"] == item_id), None)
        if not item:
            self.send_response(404); self.end_headers(); return
        path = os.path.join(LIB_DIR, item["file"])
        if not os.path.exists(path):
            self.send_response(404); self.end_headers(); return
        try:
            with open(path, "rb") as f:
                data = f.read()
            ext = item["file"].rsplit(".", 1)[-1].lower()
            mime = {
                "png":"image/png","jpg":"image/jpeg","jpeg":"image/jpeg",
                "webp":"image/webp","gif":"image/gif",
                "heic":"image/heic","heif":"image/heif"
            }.get(ext,"application/octet-stream")
            self.send_response(200)
            self.send_header("Content-Type", mime)
            self.send_header("Cache-Control", "max-age=86400")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except (ConnectionResetError, BrokenPipeError):
            pass

    def _serve_proxy(self, target_url):
        """Proxy an external image so the iOS browser can fetch it from the same HTTP origin."""
        try:
            import urllib.request
            req = urllib.request.Request(target_url, headers={"User-Agent": "DORK/1.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
                ctype = r.headers.get("Content-Type", "application/octet-stream")
            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Cache-Control", "max-age=300")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            try: self.wfile.write(data)
            except (ConnectionResetError, BrokenPipeError): pass
        except Exception as e:
            print("[proxy] error:", e)
            self.send_response(502)
            self.end_headers()

    def do_GET(self):
        try:
            path = urllib.parse.urlparse(self.path).path
            if path == "/" or path == "/index.html":
                return self._serve_html()
            if path == "/lib":
                return self._json(200, lib_load())
            if path.startswith("/lib/dataurl/"):
                item_id = path[len("/lib/dataurl/"):]
                return self._serve_lib_dataurl(item_id)
            if path.startswith("/lib/img/"):
                item_id = path[len("/lib/img/"):]
                return self._serve_lib_image(item_id)
            if path == "/proxy":
                qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
                target = (qs.get("url") or [None])[0]
                if not target or not (target.startswith("http://") or target.startswith("https://")):
                    self.send_response(400); self.end_headers(); return
                return self._serve_proxy(target)
            self.send_response(404); self.end_headers()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def do_POST(self):
        try:
            path = urllib.parse.urlparse(self.path).path
            length = int(self.headers.get("Content-Length", 0))
            print("[POST]", path, "len=", length)
            raw = self.rfile.read(length) if length > 0 else b""
            print("[POST] read complete:", len(raw), "bytes")
            if path == "/lib":
                # Add new library item
                try:
                    data = json.loads(raw.decode("utf-8"))
                except Exception as e:
                    print("[lib] JSON parse error:", e, "len=", len(raw))
                    return self._json(400, {"error": "bad json"})
                name = (data.get("name") or "Untitled").strip()[:60] or "Untitled"
                slot_type = data.get("type", "character")
                if slot_type not in ("character", "style"):
                    slot_type = "character"
                tags = data.get("tags", "") or ""
                image_b64 = data.get("image", "") or ""
                orig_url = image_b64
                if image_b64.startswith("data:"):
                    image_b64 = image_b64.split(",", 1)[1] if "," in image_b64 else ""
                if not image_b64:
                    print("[lib] no image data")
                    return self._json(400, {"error": "no image"})
                # Detect ext from data URL
                ext = "png"
                low = orig_url.lower()
                if low.startswith("data:image/jpeg") or low.startswith("data:image/jpg"):
                    ext = "jpg"
                elif low.startswith("data:image/webp"):
                    ext = "webp"
                elif low.startswith("data:image/gif"):
                    ext = "gif"
                elif low.startswith("data:image/heic") or low.startswith("data:image/heif"):
                    ext = "heic"
                item_id = uuid.uuid4().hex[:12]
                fname = item_id + "." + ext
                fpath = os.path.join(LIB_DIR, fname)
                try:
                    with open(fpath, "wb") as f:
                        f.write(base64.b64decode(image_b64))
                except Exception as e:
                    print("[lib] file write error:", e)
                    return self._json(500, {"error": "file write: " + str(e)})
                idx = lib_load()
                item = {
                    "id": item_id,
                    "name": name,
                    "type": slot_type,
                    "tags": tags,
                    "file": fname,
                    "created": int(time.time()),
                    "active": False,
                }
                idx["items"].insert(0, item)
                try:
                    lib_save(idx)
                except Exception as e:
                    print("[lib] index write error:", e)
                    return self._json(500, {"error": "index write: " + str(e)})
                print("[lib] saved", slot_type, name, "->", fname)
                return self._json(200, item)
            if path == "/lib/toggle":
                # Toggle active state for a slot. Multiple items of same type can be active.
                data = json.loads(raw.decode("utf-8"))
                item_id = data.get("id")
                idx = lib_load()
                target = next((i for i in idx["items"] if i["id"] == item_id), None)
                if not target:
                    return self._json(404, {"error": "not found"})
                target["active"] = not target.get("active", False)
                lib_save(idx)
                return self._json(200, idx)
            if path == "/lib/rename":
                data = json.loads(raw.decode("utf-8"))
                idx = lib_load()
                item = next((i for i in idx["items"] if i["id"] == data.get("id")), None)
                if not item:
                    return self._json(404, {"error": "not found"})
                item["name"] = (data.get("name") or "Untitled").strip()[:60]
                if "tags" in data:
                    item["tags"] = data.get("tags", "")
                lib_save(idx)
                return self._json(200, item)
            if path == "/lib/delete":
                try:
                    data = json.loads(raw.decode("utf-8"))
                except Exception as e:
                    print("[lib] delete JSON error:", e)
                    return self._json(400, {"error": "bad json"})
                item_id = data.get("id")
                if not item_id:
                    return self._json(400, {"error": "no id"})
                idx = lib_load()
                item = next((i for i in idx["items"] if i["id"] == item_id), None)
                if item:
                    fpath = os.path.join(LIB_DIR, item["file"])
                    if os.path.exists(fpath):
                        try:
                            os.remove(fpath)
                        except Exception as e:
                            print("[lib] file remove error:", e)
                    idx["items"] = [i for i in idx["items"] if i["id"] != item_id]
                    try:
                        lib_save(idx)
                        print("[lib] deleted", item["name"])
                    except Exception as e:
                        print("[lib] index save error:", e)
                        return self._json(500, {"error": str(e)})
                else:
                    print("[lib] delete: item not found", item_id)
                return self._json(200, {"ok": True})
            self.send_response(404); self.end_headers()
        except (ConnectionResetError, BrokenPipeError):
            print("[POST] connection error")
        except Exception as e:
            import traceback
            print("[POST] EXCEPTION:", type(e).__name__, str(e))
            traceback.print_exc()
            try:
                return self._json(500, {"error": type(e).__name__ + ": " + str(e)})
            except Exception:
                pass

    def do_DELETE(self):
        try:
            path = urllib.parse.urlparse(self.path).path
            if path.startswith("/lib/"):
                item_id = path[len("/lib/"):]
                idx = lib_load()
                item = next((i for i in idx["items"] if i["id"] == item_id), None)
                if item:
                    fpath = os.path.join(LIB_DIR, item["file"])
                    if os.path.exists(fpath):
                        try: os.remove(fpath)
                        except: pass
                    idx["items"] = [i for i in idx["items"] if i["id"] != item_id]
                    lib_save(idx)
                return self._json(200, {"ok": True})
            self.send_response(404); self.end_headers()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def log_message(self, *a):
        pass


def main():
    port = 8080
    for p in range(8080, 8100):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.bind(("127.0.0.1", p))
            s.close()
            port = p
            break
        except OSError:
            s.close()
            continue
    srv = http.server.HTTPServer(("127.0.0.1", port), H)
    url = "http://127.0.0.1:" + str(port)
    print("\n  DORK+ at " + url)
    print("  Library: " + LIB_DIR + "\n")
    webbrowser.open(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        srv.server_close()


if __name__ == "__main__":
    main()
