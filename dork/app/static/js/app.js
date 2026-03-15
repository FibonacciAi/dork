/**
 * DORK — Frontend
 * Full xAI creative suite
 */

// ── State ────────────────────────────────────────────────────────────────────
const state = {
    activePanel: 'chat',
    // Chat
    chatMessages: [],
    chatModel: 'grok-4.20-beta-0309-non-reasoning',
    chatStreaming: false,
    systemPrompt: '',
    chatAttachments: [], // {name, type, dataUrl, isImage, ext}
    // Image
    imagineModel: 'grok-imagine-image',
    imagineSource: null,
    imagineSourceUrl: null,
    imagineImages: [],
    imagineSelected: null,
    // Video
    videoPolling: null,
    videoSource: null,
    videoSourceUrl: null,
    videoSourceLoading: false,
    videos: [],
    videoSelected: null,
    videoNarrative: [],  // tracks previous prompts for scene continuity
    videoFromFreeze: false,  // true when source came from freeze frame
    stitchMode: false,
    stitchQueue: [],
    // Voice
    voiceFiles: [],
    voiceMode: 'tts',
    // Voice Agent
    agentWs: null,
    agentAudioCtx: null,
    agentProcessor: null,
    agentMediaStream: null,
    agentSource: null,
    agentPlaybackQueue: [],
    agentIsPlaying: false,
    agentConnected: false,
    agentTranscript: [],
    agentSpeaking: false,
    agentListening: false,
    agentResponseText: '',
    // Code
    codeModel: 'grok-code-fast-1',
    codeMessages: [],
    codeStreaming: false,
    codeAttachments: [],
    // Artifacts
    currentArtifact: null,
    artifacts: [],
    // Skills
    skills: [],
    // Collections
    collections: [],
};

const DORK_AVATAR_SVG = '<svg viewBox="0 0 64 64" fill="none" style="width:100%;height:100%"><ellipse cx="32" cy="32" rx="24" ry="7" stroke="#7c5cfc" stroke-width="1.5" opacity="0.35" transform="rotate(4 32 32)"/><circle cx="32" cy="32" r="12" fill="#030308" stroke="#7c5cfc" stroke-width="2"/><circle cx="32" cy="32" r="7" fill="rgba(124,92,252,0.3)"/><circle cx="27" cy="29" r="5" fill="white"/><circle cx="38" cy="28" r="3.8" fill="white"/><circle cx="28.2" cy="28.2" r="2.5" fill="#030308"/><circle cx="39" cy="27" r="1.9" fill="#030308"/><circle cx="27" cy="27.5" r="0.9" fill="white"/><circle cx="38.2" cy="26.2" r="0.7" fill="white"/><path d="M27 37 Q32 42 38 36" stroke="#a78bfa" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupChat();
    setupImagine();
    setupVideo();
    setupVoice();
    setupCode();
    setupArtifacts();
    setupSkills();
    setupCollections();
    setupSettings();
    setupKeyboardShortcuts();
    loadGalleries();
    loadCollectionSelectors();
    restorePersistence();
    switchPanel('chat');
});

// ── Navigation ───────────────────────────────────────────────────────────────
function setupNavigation() {
    document.querySelectorAll('.nav-btn[data-panel]').forEach(btn => {
        btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
    });
}

function switchPanel(panel) {
    state.activePanel = panel;
    document.querySelectorAll('.nav-btn[data-panel]').forEach(b => b.classList.toggle('active', b.dataset.panel === panel));
    document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === `panel-${panel}`));
}

// ── Collection Selectors ─────────────────────────────────────────────────────
async function loadCollectionSelectors() {
    try {
        const resp = await fetch('/api/collections');
        const data = await resp.json();
        const collections = data.collections || [];
        for (const id of ['chat-collection', 'code-collection', 'skill-collection']) {
            const el = document.getElementById(id);
            if (!el) continue;
            const firstOpt = el.options[0];
            el.innerHTML = '';
            el.appendChild(firstOpt);
            for (const c of collections) {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name || c.id;
                el.appendChild(opt);
            }
        }
    } catch {}
}

function getSelectedCollectionIds(selectId) {
    const el = document.getElementById(selectId);
    return el?.value ? [el.value] : [];
}

// ── Chat ─────────────────────────────────────────────────────────────────────
function setupChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
    });
    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 200) + 'px';
        showSlashHint(input);
    });
    sendBtn.addEventListener('click', sendChatMessage);
    document.getElementById('chat-model').addEventListener('change', e => state.chatModel = e.target.value);
    document.getElementById('chat-clear').addEventListener('click', () => {
        state.chatMessages = [];
        document.getElementById('chat-messages').innerHTML = '';
        savePersistence();
    });
    document.getElementById('chat-system').addEventListener('click', () => {
        const val = prompt('System prompt (leave empty to clear):', state.systemPrompt);
        if (val !== null) state.systemPrompt = val;
    });

    // File upload
    const uploadBtn = document.getElementById('chat-upload-btn');
    const fileInput = document.getElementById('chat-file-input');
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleChatFiles(fileInput.files));

    // Drag & drop on chat input
    const inputArea = document.querySelector('.chat-input-area');
    inputArea.addEventListener('dragover', e => { e.preventDefault(); inputArea.classList.add('drag-over'); });
    inputArea.addEventListener('dragleave', () => inputArea.classList.remove('drag-over'));
    inputArea.addEventListener('drop', e => { e.preventDefault(); inputArea.classList.remove('drag-over'); handleChatFiles(e.dataTransfer.files); });
}

// ── Chat File Upload ─────────────────────────────────────────────────────────
function handleChatFiles(files) {
    const MAX_FILES = 10;
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB per file
    const container = document.getElementById('chat-attachments');

    for (const file of files) {
        if (state.chatAttachments.length >= MAX_FILES) {
            toast(`Max ${MAX_FILES} files at once`, 'error');
            break;
        }
        if (file.size > MAX_SIZE) {
            toast(`${file.name} too large (max 20MB)`, 'error');
            continue;
        }
        const isImage = file.type.startsWith('image/');
        const ext = file.name.split('.').pop().toUpperCase();
        const reader = new FileReader();
        reader.onload = e => {
            const attachment = { name: file.name, type: file.type, dataUrl: e.target.result, isImage, ext };
            state.chatAttachments.push(attachment);
            renderChatAttachments();
        };
        reader.readAsDataURL(file);
    }
    document.getElementById('chat-file-input').value = '';
}

function renderChatAttachments() {
    const container = document.getElementById('chat-attachments');
    container.innerHTML = state.chatAttachments.map((a, i) => `
        <div class="chat-attachment">
            ${a.isImage ? `<img src="${a.dataUrl}">` : `<div class="file-icon">${a.ext}</div>`}
            <span>${a.name.length > 20 ? a.name.slice(0, 17) + '...' : a.name}</span>
            <button class="remove-attachment" onclick="removeChatAttachment(${i})">&times;</button>
        </div>
    `).join('');
}

function removeChatAttachment(index) {
    state.chatAttachments.splice(index, 1);
    renderChatAttachments();
}

function buildMessageWithAttachments(text) {
    // Build xAI vision-format message content array
    if (!state.chatAttachments.length) return text;

    const parts = [];
    if (text) parts.push({ type: 'text', text });

    for (const a of state.chatAttachments) {
        if (a.isImage) {
            parts.push({ type: 'image_url', image_url: { url: a.dataUrl } });
        } else {
            // For text files, decode and include as text
            const b64 = a.dataUrl.split(',')[1];
            try {
                const decoded = atob(b64);
                parts.push({ type: 'text', text: `\n--- File: ${a.name} ---\n${decoded}\n--- End ${a.name} ---` });
            } catch {
                parts.push({ type: 'text', text: `\n[Could not read ${a.name}]` });
            }
        }
    }
    return parts;
}

function showSlashHint(input) {
    let hint = document.getElementById('slash-hint');
    const val = input.value;
    if (/^\/(i|im|v|vi|c|co)?$/i.test(val)) {
        if (!hint) {
            hint = document.createElement('div');
            hint.id = 'slash-hint';
            hint.className = 'slash-hint';
            hint.innerHTML = `
                <div class="slash-option" data-cmd="/imagine "><kbd>/imagine</kbd> <span>Generate an image</span></div>
                <div class="slash-option" data-cmd="/video "><kbd>/video</kbd> <span>Generate a video</span></div>
                <div class="slash-option" data-cmd="/code "><kbd>/code</kbd> <span>Write code</span></div>
            `;
            input.parentElement.appendChild(hint);
            hint.querySelectorAll('.slash-option').forEach(opt => {
                opt.addEventListener('mousedown', e => {
                    e.preventDefault();
                    input.value = opt.dataset.cmd;
                    input.focus();
                    hint.remove();
                });
            });
        }
    } else if (hint) {
        hint.remove();
    }
}

async function sendChatMessage() {
    if (state.chatStreaming) return;
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text && !state.chatAttachments.length) return;
    input.value = '';
    input.style.height = 'auto';

    const msgContainer = document.getElementById('chat-messages');
    const welcome = msgContainer.querySelector('.welcome');
    if (welcome) welcome.remove();

    // ── Natural language commands ──
    const saveMatch = text.match(/^(save|save\s+(that|this|it|the\s+artifact|artifact|current))/i);
    if (saveMatch && state.currentArtifact) {
        appendMessage('chat-messages', 'user', text);
        const titleGuess = text.replace(/^save\s*(that|this|it|the\s+artifact|artifact|current)?\s*/i, '').trim();
        const title = titleGuess || 'Untitled';
        try {
            const resp = await fetch('/api/artifacts/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    html: state.currentArtifact.html || state.currentArtifact.combined,
                    css: state.currentArtifact.css || '',
                    js: state.currentArtifact.js || '',
                    model: state.chatModel,
                }),
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            appendMessage('chat-messages', 'assistant', `Saved artifact "${title}" to your Artifacts tab.`);
            loadArtifacts();
            toast('Artifact saved!', 'success');
        } catch (err) {
            appendMessage('chat-messages', 'assistant', `Couldn't save: ${err.message}`);
        }
        return;
    }

    // ── Slash commands: /imagine, /video, /code ──
    const imagineMatch = text.match(/^\/imagine\s+(.+)/i);
    const videoMatch = text.match(/^\/video\s+(.+)/i);
    const codeMatch = text.match(/^\/code\s+(.+)/is);

    if (codeMatch) {
        const prompt = codeMatch[1];
        appendMessage('chat-messages', 'user', text);
        const msgEl = appendMessage('chat-messages', 'assistant', '');
        const bodyEl = msgEl.querySelector('.message-body');
        bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div><span style="color:var(--text-dim);margin-left:8px">Coding...</span>';
        try {
            const payload = {
                model: state.codeModel,
                messages: [{ role: 'user', content: prompt }],
                system: CODE_SYSTEM_PROMPT,
            };
            const { content, reasoning } = await streamChat(payload, bodyEl);
            state.chatMessages.push({ role: 'user', content: text });
            state.chatMessages.push({ role: 'assistant', content });
            savePersistence();

            const artifact = detectArtifact(content);
            if (artifact) {
                const btn = document.createElement('button');
                btn.className = 'artifact-btn';
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Preview';
                btn.onclick = () => openArtifactPanel(artifact);
                bodyEl.appendChild(btn);
            }
            addCrossTabActions(bodyEl, content);
        } catch (err) { bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(err.message)}</span>`; }
        return;
    }

    if (imagineMatch) {
        const prompt = imagineMatch[1];
        appendMessage('chat-messages', 'user', text);
        const msgEl = appendMessage('chat-messages', 'assistant', '');
        const bodyEl = msgEl.querySelector('.message-body');
        bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div><span style="color:var(--text-dim);margin-left:8px">Generating image...</span>';
        try {
            const resp = await fetch('/api/image/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, model: 'grok-imagine-image' }) });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img);
                refreshImagineGallery();
                refreshVideoImagePicker();
                bodyEl.innerHTML = `<p style="color:var(--text-dim);font-size:12px;margin-bottom:6px">🎨 /imagine: ${escapeHtml(prompt)}</p><img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
                <div class="cross-tab-actions" style="margin-top:6px">
                    <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit in Imagine">Edit</button>
                    <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Make Video">Video</button>
                    <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Download">Save</button>
                </div>`;
                state.chatMessages.push({ role: 'user', content: text });
                state.chatMessages.push({ role: 'assistant', content: `![Generated image](${img.url})` });
                savePersistence();
            }
        } catch (err) { bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(err.message)}</span>`; }
        return;
    }

    if (videoMatch) {
        const prompt = videoMatch[1];
        appendMessage('chat-messages', 'user', text);
        const msgEl = appendMessage('chat-messages', 'assistant', '');
        const bodyEl = msgEl.querySelector('.message-body');
        bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div><span style="color:var(--text-dim);margin-left:8px">Generating video...</span>';
        try {
            const resp = await fetch('/api/video/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            if (data.id) {
                const chatVideoId = data.id;
                const pollTimer = setInterval(async () => {
                    try {
                        const pr = await fetch(`/api/video/poll?id=${chatVideoId}`);
                        const pd = await pr.json();
                        if (pd.status === 'completed') {
                            clearInterval(pollTimer);
                            state.videos.unshift({ filename: pd.filename, url: pd.url });
                            refreshVideoGallery();
                            bodyEl.innerHTML = `<p style="color:var(--text-dim);font-size:12px;margin-bottom:6px">🎬 /video: ${escapeHtml(prompt)}</p><video src="${pd.url}" controls style="max-width:100%;border-radius:var(--radius-sm)"></video>`;
                            state.chatMessages.push({ role: 'user', content: text });
                            state.chatMessages.push({ role: 'assistant', content: `[Generated video](${pd.url})` });
                            savePersistence();
                            toast('Video ready!', 'success');
                        } else if (pd.error) {
                            clearInterval(pollTimer);
                            bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(pd.error)}</span>`;
                        }
                    } catch {}
                }, 3000);
            }
        } catch (err) { bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(err.message)}</span>`; }
        return;
    }

    // ── Normal chat message ──
    const hasAttachments = state.chatAttachments.length > 0;
    const messageContent = buildMessageWithAttachments(text);

    // Show user message with attachment thumbnails
    let userDisplayHtml = escapeHtml(text);
    if (hasAttachments) {
        userDisplayHtml += '<div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">';
        for (const a of state.chatAttachments) {
            if (a.isImage) {
                userDisplayHtml += `<img src="${a.dataUrl}" style="width:48px;height:48px;object-fit:cover;border-radius:4px">`;
            } else {
                userDisplayHtml += `<span style="background:var(--bg-deep);padding:2px 6px;border-radius:4px;font-size:10px">${escapeHtml(a.name)}</span>`;
            }
        }
        userDisplayHtml += '</div>';
    }

    state.chatMessages.push({ role: 'user', content: messageContent });
    const userMsgEl = appendMessage('chat-messages', 'user', '');
    userMsgEl.querySelector('.message-body').innerHTML = userDisplayHtml;

    // Clear attachments
    state.chatAttachments = [];
    renderChatAttachments();

    state.chatStreaming = true;
    document.getElementById('chat-send').disabled = true;

    const msgEl = appendMessage('chat-messages', 'assistant', '');
    const bodyEl = msgEl.querySelector('.message-body');
    bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    try {
        const payload = {
            model: state.chatModel,
            messages: state.chatMessages.map(m => ({ role: m.role, content: m.content })),
            system: DORK_SYSTEM_PROMPT + (state.systemPrompt ? '\n\nAdditional instructions from user:\n' + state.systemPrompt : ''),
        };
        const collIds = getSelectedCollectionIds('chat-collection');
        if (collIds.length) payload.collection_ids = collIds;

        const { content, reasoning } = await streamChat(payload, bodyEl);
        state.chatMessages.push({ role: 'assistant', content, reasoning });
        savePersistence();

        // Check for renderable artifact
        const artifact = detectArtifact(content);
        if (artifact) {
            const btn = document.createElement('button');
            btn.className = 'artifact-btn';
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Preview';
            btn.onclick = () => openArtifactPanel(artifact);
            bodyEl.appendChild(btn);
        }

        // Cross-tab: add "Speak" button for assistant messages
        addCrossTabActions(bodyEl, content);
    } catch (err) {
        bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(err.message)}</span>`;
    }

    state.chatStreaming = false;
    document.getElementById('chat-send').disabled = false;
}

async function streamChat(payload, bodyEl) {
    const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let content = '', reasoning = '', buffer = '';
    bodyEl.innerHTML = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
                const p = JSON.parse(data);
                if (p.error) throw new Error(p.error);
                if (p.content) content += p.content;
                if (p.reasoning) reasoning += p.reasoning;
                renderMessageContent(bodyEl, content, reasoning);
            } catch (e) { if (e.message && !e.message.includes('JSON')) throw e; }
        }
    }
    const container = bodyEl.closest('.chat-messages');
    if (container) container.scrollTop = container.scrollHeight;
    return { content, reasoning };
}

function appendMessage(containerId, role, content) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.innerHTML = `
        <div class="message-avatar">${role === 'user' ? 'Y' : DORK_AVATAR_SVG}</div>
        <div class="message-body">${content ? renderMarkdown(content) : ''}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function renderMessageContent(el, content, reasoning) {
    let html = '';
    if (reasoning) {
        html += `<div class="reasoning-block">
            <div class="reasoning-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">REASONING</div>
            <div>${renderMarkdown(reasoning)}</div>
        </div>`;
    }
    html += renderMarkdown(content);
    el.innerHTML = html;
}

// ── Cross-Tab Actions ────────────────────────────────────────────────────────
function addCrossTabActions(bodyEl, content) {
    if (!content || content.length < 10) return;
    const bar = document.createElement('div');
    bar.className = 'cross-tab-actions';
    bar.innerHTML = `
        <button class="btn btn-sm btn-ghost" onclick="crossTabSpeak(this)" data-text="${escapeAttr(content.slice(0, 5000))}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            Speak
        </button>
    `;
    bodyEl.appendChild(bar);
}

function crossTabSpeak(btn) {
    const text = btn.dataset.text;
    if (!text) return;
    document.getElementById('voice-text').value = text;
    switchPanel('voice');
    switchVoiceMode('tts');
    toast('Text loaded — click Speak', 'info');
}

function crossTabUseAsVideoSource(url) {
    showPromptSuggestions(url, 'video');
}

function crossTabEditImage(url) {
    showPromptSuggestions(url, 'edit');
}

function loadImageAsVideoSource(url, dataUrl) {
    if (dataUrl) {
        state.videoSource = dataUrl.split(',')[1];
        document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${dataUrl}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;
        return Promise.resolve();
    } else {
        state.videoSourceLoading = true;
        return fetch(url).then(r => r.blob()).then(blob => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => {
                    state.videoSource = e.target.result.split(',')[1];
                    state.videoSourceLoading = false;
                    document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${e.target.result}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;
                    resolve();
                };
                reader.readAsDataURL(blob);
            });
        });
    }
}

function loadImageAsEditSource(url, dataUrl) {
    if (dataUrl) {
        state.imagineSource = dataUrl.split(',')[1];
        state.imagineSourceUrl = dataUrl;
        document.getElementById('imagine-source-preview').innerHTML = `<div class="source-preview"><img src="${dataUrl}"><button class="clear-btn" onclick="clearImagineSource()">&times;</button></div>`;
    } else {
        fetch(url).then(r => r.blob()).then(blob => {
            const reader = new FileReader();
            reader.onload = e => {
                state.imagineSource = e.target.result.split(',')[1];
                state.imagineSourceUrl = e.target.result;
                document.getElementById('imagine-source-preview').innerHTML = `<div class="source-preview"><img src="${e.target.result}"><button class="clear-btn" onclick="clearImagineSource()">&times;</button></div>`;
            };
            reader.readAsDataURL(blob);
        });
    }
}

async function showPromptSuggestions(imageUrl, mode) {
    // Show overlay with loading state
    const overlay = document.createElement('div');
    overlay.className = 'prompt-suggest-overlay';
    overlay.innerHTML = `
        <div class="prompt-suggest-card">
            <img src="${imageUrl}" class="suggest-img">
            <h3>${mode === 'edit' ? 'Edit Image' : 'Create Video'}</h3>
            <div id="suggest-loading" style="text-align:center;padding:16px">
                <div class="typing-indicator" style="display:inline-flex"><span></span><span></span><span></span></div>
                <p style="color:var(--text-dim);font-size:12px;margin-top:8px">Generating prompt suggestions...</p>
            </div>
            <div id="suggest-options"></div>
            <div class="prompt-suggest-actions">
                <button class="btn btn-ghost" onclick="this.closest('.prompt-suggest-overlay').remove()">Cancel</button>
                <button class="btn btn-primary" id="suggest-custom-btn">Custom Prompt</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    document.getElementById('suggest-custom-btn').addEventListener('click', () => {
        overlay.remove();
        if (mode === 'edit') {
            loadImageAsEditSource(imageUrl);
            switchPanel('imagine');
            document.getElementById('imagine-prompt').focus();
        } else {
            loadImageAsVideoSource(imageUrl);
            switchPanel('video');
            document.getElementById('video-prompt').focus();
        }
    });

    // Ask AI for prompt suggestions based on the image
    try {
        const imgDataUrl = imageUrl.startsWith('data:') ? imageUrl : await fetchAsDataUrl(imageUrl);
        const sysPrompt = mode === 'edit'
            ? 'You are a creative image editor. Given an image, suggest 3 different creative edits. Return ONLY a JSON array of 3 strings, each being a short image edit prompt (under 80 chars). Be creative and varied — one subtle, one dramatic, one artistic. No explanation, just the JSON array.'
            : 'You are a creative video director. Given an image, suggest 3 different ways to animate it as a video. Return ONLY a JSON array of 3 strings, each being a short video prompt (under 80 chars). Be creative — one cinematic, one dynamic, one atmospheric. No explanation, just the JSON array.';

        const resp = await fetch('/api/chat/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'grok-4-1-fast-non-reasoning',
                messages: [{ role: 'user', content: [
                    { type: 'text', text: mode === 'edit' ? 'Suggest 3 creative edits for this image.' : 'Suggest 3 creative video animations for this image.' },
                    { type: 'image_url', image_url: { url: imgDataUrl } }
                ]}],
                system: sysPrompt
            })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        let suggestions;
        try {
            const cleaned = data.content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            suggestions = JSON.parse(cleaned);
        } catch { suggestions = [data.content]; }

        const optionsEl = document.getElementById('suggest-options');
        const loadingEl = document.getElementById('suggest-loading');
        if (loadingEl) loadingEl.remove();

        if (optionsEl) {
            optionsEl.innerHTML = suggestions.map(s => `<button class="prompt-suggest-option">${escapeHtml(s)}</button>`).join('');
            optionsEl.querySelectorAll('.prompt-suggest-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    overlay.remove();
                    if (mode === 'edit') {
                        loadImageAsEditSource(imageUrl);
                        switchPanel('imagine');
                        document.getElementById('imagine-prompt').value = btn.textContent;
                    } else {
                        loadImageAsVideoSource(imageUrl);
                        switchPanel('video');
                        document.getElementById('video-prompt').value = btn.textContent;
                    }
                });
            });
        }
    } catch (err) {
        const loadingEl = document.getElementById('suggest-loading');
        if (loadingEl) loadingEl.innerHTML = `<p style="color:var(--text-dim);font-size:12px">Couldn't generate suggestions. Use custom prompt.</p>`;
    }
}

async function fetchAsDataUrl(url) {
    const resp = await fetch(url);
    const blob = await resp.blob();
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

function escapeAttr(text) {
    return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Artifact Detection & Rendering ───────────────────────────────────────────
function detectArtifact(content) {
    if (!content) return null;

    const blocks = [];
    const re = /```(\w*)\n([\s\S]*?)```/g;
    let m;
    while ((m = re.exec(content)) !== null) {
        blocks.push({ lang: m[1].toLowerCase(), code: m[2].trim() });
    }

    if (!blocks.length) return null;

    const htmlBlock = blocks.find(b => b.lang === 'html' && (
        b.code.includes('<html') || b.code.includes('<!DOCTYPE') || b.code.includes('<!doctype') ||
        (b.code.includes('<body') || (b.code.includes('<div') && b.code.includes('<style')))
    ));

    if (htmlBlock) {
        return { type: 'html', combined: htmlBlock.code };
    }

    const html = blocks.find(b => b.lang === 'html')?.code || '';
    const css = blocks.find(b => b.lang === 'css')?.code || '';
    const js = blocks.find(b => b.lang === 'javascript' || b.lang === 'js')?.code || '';

    if (html && (css || js)) {
        const combined = `<!DOCTYPE html>
<html><head><style>${css}</style></head>
<body>${html}<script>${js}<\/script></body></html>`;
        return { type: 'combined', combined, html, css, js };
    }

    if (html && html.includes('<')) {
        const combined = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body>${html}</body></html>`;
        return { type: 'html', combined, html };
    }

    return null;
}

function openArtifactPanel(artifact) {
    state.currentArtifact = artifact;
    const panel = document.getElementById('artifact-panel');
    const frame = document.getElementById('artifact-frame');
    const title = document.getElementById('artifact-title');

    title.textContent = 'Live Preview';
    frame.srcdoc = artifact.combined;
    panel.classList.add('open');
}

function closeArtifactPanel() {
    document.getElementById('artifact-panel').classList.remove('open');
    state.currentArtifact = null;
}

function launchArtifact() {
    if (!state.currentArtifact) return toast('No artifact to launch', 'error');
    const html = state.currentArtifact.html || state.currentArtifact.combined;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

async function saveCurrentArtifact() {
    if (!state.currentArtifact) return toast('No artifact to save', 'error');

    const title = prompt('Artifact title:', 'Untitled');
    if (!title) return;

    try {
        const resp = await fetch('/api/artifacts/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                html: state.currentArtifact.html || state.currentArtifact.combined,
                css: state.currentArtifact.css || '',
                js: state.currentArtifact.js || '',
                model: state.chatModel,
            }),
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        toast('Artifact saved!', 'success');
        loadArtifacts();
    } catch (err) {
        toast(err.message, 'error');
    }
}

// ── Artifacts Panel ──────────────────────────────────────────────────────────
function setupArtifacts() {
    loadArtifacts();
}

async function loadArtifacts() {
    try {
        const resp = await fetch('/api/artifacts/list');
        const data = await resp.json();
        state.artifacts = data.artifacts || [];
        refreshArtifactsGrid();
    } catch {}
}

function refreshArtifactsGrid() {
    const grid = document.getElementById('artifacts-grid');
    if (!state.artifacts.length) {
        grid.innerHTML = '<div class="grid-empty">No artifacts saved yet. Generate code in Chat or Code, then click "Preview" to render and save.</div>';
        return;
    }
    grid.innerHTML = state.artifacts.map(a => `
        <div class="grid-card" onclick="previewArtifactFromList('${a.filename}')">
            <div class="grid-card-title">${escapeHtml(a.title)}</div>
            <div class="grid-card-meta">${a.model || 'unknown'} &bull; ${new Date(a.created * 1000).toLocaleDateString()}</div>
            <div class="grid-card-actions">
                <button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();window.open('/artifacts/${a.filename}','_blank')">Open</button>
                <button class="btn btn-sm btn-ghost" style="color:var(--red)" onclick="event.stopPropagation();deleteArtifact('${a.filename}')">Delete</button>
            </div>
        </div>
    `).join('');
}

async function previewArtifactFromList(filename) {
    try {
        const resp = await fetch(`/artifacts/${filename}`);
        const html = await resp.text();
        openArtifactPanel({ type: 'html', combined: html });
        document.getElementById('artifact-title').textContent = filename;
    } catch {}
}

async function deleteArtifact(filename) {
    try {
        await fetch('/api/artifacts/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename }),
        });
        loadArtifacts();
        toast('Deleted', 'success');
    } catch {}
}

// ── Imagine ──────────────────────────────────────────────────────────────────
function setupImagine() {
    document.getElementById('imagine-generate').addEventListener('click', generateImage);
    document.getElementById('imagine-model').addEventListener('change', e => state.imagineModel = e.target.value);

    const dropZone = document.getElementById('imagine-drop');
    if (dropZone) {
        dropZone.addEventListener('click', () => document.getElementById('imagine-file').click());
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files.length) handleImagineFile(e.dataTransfer.files[0]); });
    }
    document.getElementById('imagine-file').addEventListener('change', e => { if (e.target.files.length) handleImagineFile(e.target.files[0]); });
    document.getElementById('imagine-prompt').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateImage(); } });
}

function handleImagineFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
        state.imagineSource = e.target.result.split(',')[1];
        state.imagineSourceUrl = e.target.result;
        document.getElementById('imagine-source-preview').innerHTML = `<div class="source-preview"><img src="${e.target.result}"><button class="clear-btn" onclick="clearImagineSource()">&times;</button></div>`;
    };
    reader.readAsDataURL(file);
}

function clearImagineSource() {
    state.imagineSource = null;
    state.imagineSourceUrl = null;
    document.getElementById('imagine-source-preview').innerHTML = '';
    document.getElementById('imagine-file').value = '';
}

async function generateImage() {
    const prompt = document.getElementById('imagine-prompt').value.trim();
    if (!prompt) return toast('Enter a prompt', 'error');
    const btn = document.getElementById('imagine-generate');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> Generating...';

    try {
        const endpoint = state.imagineSource ? '/api/image/edit' : '/api/image/generate';
        const payload = { prompt, model: state.imagineModel };
        if (state.imagineSource) payload.image = state.imagineSource;
        const resp = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        if (data.images?.length) {
            data.images.forEach(img => state.imagineImages.unshift(img));
            selectImagineImage(data.images[0]);
            refreshImagineGallery();
            refreshVideoImagePicker();
            toast('Image generated!', 'success');
        }
    } catch (err) { toast(err.message, 'error'); }

    btn.disabled = false;
    btn.textContent = 'Generate';
}

function selectImagineImage(img) {
    state.imagineSelected = img;
    document.getElementById('imagine-preview').innerHTML = `
        <img src="${img.url}">
        <div class="image-actions">
            <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Download">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Use as video source">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            </button>
            <button class="btn btn-sm btn-ghost" style="color:var(--red)" onclick="deleteImage('${img.filename}')" title="Delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </div>
    `;
    document.querySelectorAll('#imagine-gallery .gallery-thumb').forEach(t => t.classList.toggle('active', t.dataset.filename === img.filename));
}

function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'image.png';
    a.click();
}

async function deleteImage(filename) {
    try {
        await fetch('/api/image/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename }) });
        state.imagineImages = state.imagineImages.filter(i => i.filename !== filename);
        if (state.imagineSelected?.filename === filename) {
            state.imagineSelected = null;
            document.getElementById('imagine-preview').innerHTML = '<div class="placeholder-state"><p>Deleted</p></div>';
        }
        refreshImagineGallery();
        refreshVideoImagePicker();
        toast('Deleted', 'success');
    } catch (err) { toast(err.message || 'Delete failed', 'error'); }
}

function refreshImagineGallery() {
    const gallery = document.getElementById('imagine-gallery');
    let html = state.imagineImages.map(img =>
        `<div class="gallery-item ${state.imagineSelected?.filename === img.filename ? 'active' : ''}">
            <button class="gallery-delete-x" onclick="event.stopPropagation();deleteImagineImage('${img.filename}')" title="Delete">&times;</button>
            <img class="gallery-thumb" src="${img.url}" onclick="selectImagineImage(state.imagineImages.find(i=>i.filename==='${img.filename}'))">
            <div class="gallery-item-actions">
                <button onclick="event.stopPropagation();downloadImage('${img.url}','${img.filename}')" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
                <button onclick="event.stopPropagation();crossTabUseAsVideoSource('${img.url}')" title="Video">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                </button>
            </div>
        </div>`
    ).join('');
    if (state.imagineImages.length > 1) html += `<button class="gallery-clear-all" onclick="clearAllImages()">Clear All</button>`;
    gallery.innerHTML = html;
}

function deleteImagineImage(filename) {
    fetch('/api/image/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename }) });
    state.imagineImages = state.imagineImages.filter(i => i.filename !== filename);
    refreshImagineGallery();
    refreshVideoImagePicker();
}

function clearAllImages() {
    state.imagineImages.forEach(i => fetch('/api/image/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: i.filename }) }));
    state.imagineImages = [];
    state.imagineSelected = null;
    document.getElementById('imagine-preview').innerHTML = '<div class="placeholder-state"><p>Gallery cleared</p></div>';
    refreshImagineGallery();
    refreshVideoImagePicker();
    toast('All images cleared', 'success');
}

// ── Video ────────────────────────────────────────────────────────────────────
function setupVideo() {
    document.getElementById('video-generate').addEventListener('click', generateVideo);
    const dropZone = document.getElementById('video-drop');
    if (dropZone) {
        dropZone.addEventListener('click', () => document.getElementById('video-file').click());
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files.length) handleVideoFile(e.dataTransfer.files[0]); });
    }
    document.getElementById('video-file').addEventListener('change', e => { if (e.target.files.length) handleVideoFile(e.target.files[0]); });
    document.getElementById('video-prompt').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateVideo(); } });
}

function handleVideoFile(file) {
    state.videoSourceLoading = true;
    const reader = new FileReader();
    reader.onload = e => {
        state.videoSource = e.target.result.split(',')[1];
        state.videoSourceLoading = false;
        document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${e.target.result}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;
    };
    reader.readAsDataURL(file);
}

function clearVideoSource() {
    state.videoSource = null;
    state.videoSourceLoading = false;
    state.videoFromFreeze = false;
    state.videoNarrative = [];
    document.getElementById('video-source-preview').innerHTML = '';
    document.getElementById('video-file').value = '';
    document.querySelectorAll('#video-image-picker img').forEach(el => el.classList.remove('active'));
}

async function suggestVideoPrompts() {
    const previewImg = document.querySelector('#video-source-preview img');
    if (!previewImg) return toast('No source image loaded', 'error');

    // Get image as data URL
    const imgDataUrl = previewImg.src.startsWith('data:') ? previewImg.src : await fetchAsDataUrl(previewImg.src);

    // Build context-aware system prompt
    let sysPrompt;
    if (state.videoFromFreeze && state.videoNarrative.length > 0) {
        const prevScenes = state.videoNarrative.map((p, i) => `Scene ${i + 1}: ${p}`).join('\n');
        sysPrompt = `You are a creative video director continuing an ongoing narrative. The user has been generating a sequence of connected video scenes and just froze a frame to continue the story.

Previous scenes in order:
${prevScenes}

This image is the frozen frame from the last scene. Suggest 3 prompts for the NEXT scene that naturally continue the action/story from where it left off. Each prompt should flow seamlessly from this frame as the opening shot. Return ONLY a JSON array of 3 strings, each under 100 chars. Be specific about camera movement and action. No explanation, just the JSON array.`;
    } else {
        sysPrompt = 'You are a creative video director. Given an image, suggest 3 different ways to animate it as a video. Return ONLY a JSON array of 3 strings, each being a short video prompt (under 80 chars). Be creative — one cinematic, one dynamic, one atmospheric. No explanation, just the JSON array.';
    }

    // Show inline suggestions area
    const preview = document.getElementById('video-source-preview');
    const existingSuggestions = preview.querySelector('.video-suggestions');
    if (existingSuggestions) existingSuggestions.remove();

    const suggestDiv = document.createElement('div');
    suggestDiv.className = 'video-suggestions';
    suggestDiv.innerHTML = '<div class="typing-indicator" style="display:inline-flex;padding:8px"><span></span><span></span><span></span></div>';
    preview.appendChild(suggestDiv);

    try {
        const resp = await fetch('/api/chat/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'grok-4-1-fast-non-reasoning',
                messages: [{ role: 'user', content: [
                    { type: 'text', text: state.videoFromFreeze ? 'Suggest 3 prompts for the next scene continuing from this frozen frame.' : 'Suggest 3 creative video animations for this image.' },
                    { type: 'image_url', image_url: { url: imgDataUrl } }
                ]}],
                system: sysPrompt
            })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        let suggestions;
        try {
            const cleaned = data.content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            suggestions = JSON.parse(cleaned);
        } catch { suggestions = [data.content]; }

        suggestDiv.innerHTML = suggestions.map(s =>
            `<button class="prompt-suggest-option" onclick="document.getElementById('video-prompt').value=this.textContent;this.closest('.video-suggestions').remove()">${escapeHtml(s)}</button>`
        ).join('');
    } catch (err) {
        suggestDiv.innerHTML = `<div style="color:var(--text-dim);font-size:11px;padding:4px">Couldn't generate suggestions</div>`;
    }
}

async function generateVideo() {
    const prompt = document.getElementById('video-prompt').value.trim();
    if (!prompt) return toast('Enter a prompt', 'error');
    const btn = document.getElementById('video-generate');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> Starting...';
    document.getElementById('video-status').innerHTML = '<div class="status-badge processing"><span class="status-dot"></span> Processing</div>';

    // Wait for image source to finish loading if still in progress
    if (state.videoSourceLoading && !state.videoSource) {
        btn.innerHTML = '<div class="spinner"></div> Loading image...';
        await new Promise(resolve => {
            const check = setInterval(() => {
                if (!state.videoSourceLoading || state.videoSource) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
        });
        btn.innerHTML = '<div class="spinner"></div> Starting...';
    }

    // Fallback: extract base64 from preview image if state was lost
    if (!state.videoSource) {
        const previewImg = document.querySelector('#video-source-preview img');
        if (previewImg && previewImg.src && previewImg.src.startsWith('data:')) {
            state.videoSource = previewImg.src.split(',')[1];
        }
    }

    try {
        const payload = { prompt };
        if (state.videoSource) payload.image = state.videoSource;
        state.lastVideoPayload = payload;
        state.videoRetries = 0;
        const resp = await fetch('/api/video/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        // Track narrative for scene continuity
        state.videoNarrative.push(prompt);
        if (state.videoNarrative.length > 5) state.videoNarrative.shift();
        state.videoFromFreeze = false;
        if (data.id) pollVideo(data.id);
    } catch (err) {
        toast(err.message, 'error');
        document.getElementById('video-status').innerHTML = '<div class="status-badge error"><span class="status-dot"></span> Error</div>';
        btn.disabled = false;
        btn.textContent = 'Generate Video';
    }
}

function pollVideo(videoId) {
    state.videoPolling = setInterval(async () => {
        try {
            const resp = await fetch(`/api/video/poll?id=${videoId}`);
            const data = await resp.json();
            if (data.status === 'completed') {
                clearInterval(state.videoPolling);
                state.videos.unshift({ filename: data.filename, url: data.url });
                selectVideo(state.videos[0]);
                refreshVideoGallery();
                document.getElementById('video-status').innerHTML = '<div class="status-badge complete"><span class="status-dot"></span> Done</div>';
                document.getElementById('video-generate').disabled = false;
                document.getElementById('video-generate').textContent = 'Generate Video';
                toast('Video ready!', 'success');
            } else if (data.error) {
                clearInterval(state.videoPolling);
                document.getElementById('video-status').innerHTML = '<div class="status-badge error"><span class="status-dot"></span> Error</div>';
                document.getElementById('video-generate').disabled = false;
                document.getElementById('video-generate').textContent = 'Generate Video';
                toast(data.error, 'error');
            }
        } catch {}
    }, 3000);
}

function selectVideo(vid) {
    state.videoSelected = vid;
    document.getElementById('video-preview').innerHTML = `
        <video id="video-player" src="${vid.url}" controls autoplay></video>
        <div class="video-controls-bar">
            <button class="btn btn-sm btn-ghost" onclick="freezeFrameAsSource()">Freeze Frame → Source</button>
            <button class="btn btn-sm btn-ghost" id="loop-toggle" onclick="toggleLoop()">Loop: Off</button>
        </div>`;
}

function toggleLoop() {
    const video = document.getElementById('video-player');
    const btn = document.getElementById('loop-toggle');
    if (!video || !btn) return;
    video.loop = !video.loop;
    btn.textContent = video.loop ? 'Loop: On' : 'Loop: Off';
    btn.classList.toggle('active', video.loop);
}

async function freezeFrameAsSource() {
    const video = document.getElementById('video-player');
    if (!video) return toast('No video playing', 'error');
    video.pause();
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');

    try {
        const resp = await fetch('/api/video/freeze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataUrl })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        // Set frozen frame as video source
        state.videoSource = dataUrl.split(',')[1];
        state.videoSourceLoading = false;
        document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${dataUrl}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;

        // Also add to imagine gallery so it's reusable
        state.imagineImages.unshift({ filename: data.filename, url: data.url });
        refreshImagineGallery();
        refreshVideoImagePicker();

        state.videoFromFreeze = true;
        toast('Frame frozen → set as source', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

function refreshVideoGallery() {
    const gallery = document.getElementById('video-gallery');
    const actionsEl = document.getElementById('video-gallery-actions');

    gallery.innerHTML = state.videos.map(v => {
        const inQueue = state.stitchMode && state.stitchQueue.includes(v.filename);
        const queueNum = inQueue ? state.stitchQueue.indexOf(v.filename) + 1 : '';
        return `<div class="gallery-item video-gallery-item ${inQueue ? 'stitch-selected' : ''}" onclick="${state.stitchMode ? `toggleStitchItem('${v.filename}')` : `selectVideo(state.videos.find(x=>x.filename==='${v.filename}'))`}">
            <button class="gallery-delete-x" onclick="event.stopPropagation();deleteVideoItem('${v.filename}')" title="Delete">&times;</button>
            ${inQueue ? `<div class="stitch-badge">${queueNum}</div>` : ''}
            <video class="gallery-thumb" src="${v.url}" muted></video>
            <div class="gallery-item-actions">
                <button onclick="event.stopPropagation();downloadVideo('${v.url}','${v.filename}')" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
            </div>
        </div>`;
    }).join('');

    if (actionsEl) {
        if (state.videos.length > 1) {
            let btns = '';
            if (state.stitchMode) {
                btns = `<button class="gallery-action-btn" onclick="cancelStitch()">Cancel</button>`;
                btns += `<button class="gallery-action-btn stitch-combine-btn" onclick="stitchVideos()" ${state.stitchQueue.length < 2 ? 'disabled' : ''}>Combine (${state.stitchQueue.length})</button>`;
            } else {
                btns = `<button class="gallery-action-btn" onclick="startStitchMode()">Stitch</button>`;
                btns += `<button class="gallery-action-btn" onclick="clearAllVideos()">Clear All</button>`;
            }
            actionsEl.innerHTML = `<div class="gallery-actions-row">${btns}</div>`;
        } else {
            actionsEl.innerHTML = '';
        }
    }
}

function startStitchMode() {
    state.stitchMode = true;
    state.stitchQueue = [];
    refreshVideoGallery();
    toast('Tap videos in order to stitch them', 'success');
}

function cancelStitch() {
    state.stitchMode = false;
    state.stitchQueue = [];
    refreshVideoGallery();
}

function toggleStitchItem(filename) {
    const idx = state.stitchQueue.indexOf(filename);
    if (idx >= 0) {
        state.stitchQueue.splice(idx, 1);
    } else {
        state.stitchQueue.push(filename);
    }
    refreshVideoGallery();
}

async function stitchVideos() {
    if (state.stitchQueue.length < 2) return toast('Select at least 2 videos', 'error');
    const btn = document.querySelector('.stitch-combine-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner"></div> Stitching...'; }

    try {
        const resp = await fetch('/api/video/stitch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videos: state.stitchQueue })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        state.videos.unshift({ filename: data.filename, url: data.url });
        state.stitchMode = false;
        state.stitchQueue = [];
        selectVideo(state.videos[0]);
        refreshVideoGallery();
        toast('Videos stitched!', 'success');
    } catch (err) {
        toast(err.message, 'error');
        if (btn) { btn.disabled = false; btn.textContent = `Combine (${state.stitchQueue.length})`; }
    }
}

function downloadVideo(url, filename) {
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
}

function deleteVideoItem(filename) {
    fetch('/api/video/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename }) });
    state.videos = state.videos.filter(v => v.filename !== filename);
    refreshVideoGallery();
    toast('Deleted', 'success');
}

function clearAllVideos() {
    state.videos.forEach(v => fetch('/api/video/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: v.filename }) }));
    state.videos = [];
    document.getElementById('video-preview').innerHTML = '<div class="placeholder-state"><p>Gallery cleared</p></div>';
    refreshVideoGallery();
    toast('All videos cleared', 'success');
}

function refreshVideoImagePicker() {
    const picker = document.getElementById('video-image-picker');
    if (!picker) return;
    if (!state.imagineImages.length) {
        picker.innerHTML = '<div class="picker-empty">Generate images in Imagine tab first</div>';
        return;
    }
    picker.innerHTML = state.imagineImages.map(img =>
        `<img src="${img.url}" title="${img.filename}" onclick="pickImageForVideo('${img.url}', '${img.filename}')">`
    ).join('');
}

function pickImageForVideo(url, filename) {
    // Fetch image and set as video source
    fetch(url).then(r => r.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = e => {
            state.videoSource = e.target.result.split(',')[1];
            document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${e.target.result}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;
            // Highlight selected
            document.querySelectorAll('#video-image-picker img').forEach(el =>
                el.classList.toggle('active', el.title === filename)
            );
        };
        reader.readAsDataURL(blob);
    });
}

// ── Voice ────────────────────────────────────────────────────────────────────
function setupVoice() {
    document.getElementById('voice-speak').addEventListener('click', speakText);
    document.getElementById('voice-text').addEventListener('keydown', e => { if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); speakText(); } });
}

function switchVoiceMode(mode) {
    state.voiceMode = mode;
    document.querySelectorAll('.voice-mode-tabs .chat-control-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.voiceMode === mode)
    );
    document.getElementById('voice-tts').style.display = mode === 'tts' ? '' : 'none';
    document.getElementById('voice-agent').style.display = mode === 'agent' ? '' : 'none';
    const pricing = document.getElementById('voice-pricing');
    if (pricing) pricing.textContent = mode === 'tts' ? 'xAI TTS — $4.20/1M chars' : 'realtime — $0.05/min';
}

async function speakText() {
    const text = document.getElementById('voice-text').value.trim();
    if (!text) return toast('Enter text', 'error');
    const voice_id = document.getElementById('voice-select').value;
    const language = document.getElementById('voice-lang').value;
    const btn = document.getElementById('voice-speak');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> Generating...';

    try {
        const resp = await fetch('/api/voice/speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, voice_id, language })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        state.voiceFiles.unshift({ filename: data.filename, url: data.url, text });
        refreshVoiceHistory();
        new Audio(data.url).play();
        toast('Speech generated!', 'success');
    } catch (err) { toast(err.message, 'error'); }

    btn.disabled = false;
    btn.textContent = 'Speak';
}

function refreshVoiceHistory() {
    const container = document.getElementById('voice-history');
    let html = state.voiceFiles.map((f, i) =>
        `<div class="voice-item">
            <div class="voice-item-main">
                <button class="voice-play-btn" onclick="new Audio('${f.url}').play()" title="Play">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
                <div class="voice-item-info">
                    <span class="voice-item-text">${escapeHtml(f.text || f.filename)}</span>
                    <span class="voice-item-meta">${f.voice || ''} ${f.filename}</span>
                </div>
            </div>
            <div class="voice-item-actions">
                <a href="${f.url}" download="${f.filename}" class="voice-action-btn" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
                <button class="voice-action-btn voice-delete-btn" onclick="deleteVoiceItem(${i})" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
        </div>`
    ).join('');
    if (state.voiceFiles.length > 1) html += `<button class="gallery-clear-all" onclick="clearAllVoice()" style="position:relative;margin-top:8px">Clear All</button>`;
    container.innerHTML = html;
}

function deleteVoiceItem(index) {
    const f = state.voiceFiles[index];
    if (f) fetch(`/api/voice/delete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: f.filename }) });
    state.voiceFiles.splice(index, 1);
    refreshVoiceHistory();
    toast('Deleted', 'success');
}

function clearAllVoice() {
    state.voiceFiles.forEach(f => fetch('/api/voice/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: f.filename }) }));
    state.voiceFiles = [];
    refreshVoiceHistory();
    toast('All audio cleared', 'success');
}

// ── Voice Agent (Realtime WebSocket) ─────────────────────────────────────────
async function toggleVoiceAgent() {
    if (state.agentConnected) {
        stopVoiceAgent();
        return;
    }
    const btn = document.getElementById('agent-toggle');
    const orb = document.getElementById('agent-orb');
    const statusEl = document.getElementById('agent-status');

    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> Connecting...';
    orb.className = 'agent-orb connecting';
    statusEl.textContent = 'Getting token...';

    try {
        // 1. Get ephemeral token
        const tokenResp = await fetch('/api/realtime/token', { method: 'POST' });
        const tokenData = await tokenResp.json();
        if (tokenData.error) throw new Error(tokenData.error);
        const token = tokenData.token || tokenData.value;
        if (!token) throw new Error('No token returned');

        statusEl.textContent = 'Connecting...';

        // 2. Connect WebSocket
        const ws = new WebSocket('wss://api.x.ai/v1/realtime', [
            `xai-client-secret.${token}`
        ]);

        state.agentWs = ws;

        ws.onopen = () => {
            statusEl.textContent = 'Configuring...';
            const voice = document.getElementById('agent-voice').value;
            const instructions = document.getElementById('agent-instructions').value || 'You are a helpful assistant.';

            ws.send(JSON.stringify({
                type: 'session.update',
                session: {
                    voice,
                    instructions,
                    turn_detection: { type: 'server_vad' },
                    input_audio_transcription: { model: 'grok-4-1-fast-non-reasoning' },
                    audio: {
                        input: { format: { type: 'audio/pcm', rate: 24000 } },
                        output: { format: { type: 'audio/pcm', rate: 24000 } }
                    }
                }
            }));
        };

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            handleAgentEvent(msg);
        };

        ws.onerror = () => {
            toast('WebSocket error', 'error');
            stopVoiceAgent();
        };

        ws.onclose = () => {
            if (state.agentConnected) stopVoiceAgent();
        };

    } catch (err) {
        toast(err.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Start Conversation';
        orb.className = 'agent-orb';
        statusEl.textContent = 'Ready to connect';
    }
}

function handleAgentEvent(msg) {
    const orb = document.getElementById('agent-orb');
    const statusEl = document.getElementById('agent-status');

    switch (msg.type) {
        case 'session.updated':
            state.agentConnected = true;
            statusEl.textContent = 'Connected — speak or type';
            orb.className = 'agent-orb listening';
            document.getElementById('agent-toggle').disabled = false;
            document.getElementById('agent-toggle').textContent = 'End Conversation';
            document.getElementById('agent-toggle').classList.add('btn-danger');
            document.getElementById('agent-text-input').style.display = 'flex';
            startMicCapture();
            break;

        case 'input_audio_buffer.speech_started':
            state.agentListening = true;
            state.agentSpeaking = false;
            orb.className = 'agent-orb listening';
            statusEl.textContent = 'Listening...';
            // Interrupt playback when user starts speaking
            state.agentPlaybackQueue = [];
            state.agentIsPlaying = false;
            break;

        case 'input_audio_buffer.speech_stopped':
            state.agentListening = false;
            orb.className = 'agent-orb';
            statusEl.textContent = 'Processing...';
            break;

        case 'conversation.item.input_audio_transcription.completed':
            if (msg.transcript) {
                appendAgentTranscript('user', msg.transcript);
            }
            break;

        case 'response.output_audio.delta':
            if (!state.agentSpeaking) {
                state.agentSpeaking = true;
                orb.className = 'agent-orb speaking';
                statusEl.textContent = 'Speaking...';
            }
            playAgentAudioChunk(msg.delta);
            break;

        case 'response.output_audio_transcript.delta':
            state.agentResponseText += (msg.delta || '');
            updateAgentResponseTranscript(state.agentResponseText);
            break;

        case 'response.output_audio.done':
            state.agentSpeaking = false;
            break;

        case 'response.done':
            if (state.agentResponseText) {
                finalizeAgentTranscript('assistant', state.agentResponseText);
                state.agentResponseText = '';
            }
            orb.className = 'agent-orb listening';
            statusEl.textContent = 'Connected — speak anytime';
            break;

        case 'error':
            toast(msg.message || 'Agent error', 'error');
            break;
    }
}

async function startMicCapture() {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: { sampleRate: 24000, channelCount: 1, echoCancellation: true, noiseSuppression: true }
        });
        state.agentMediaStream = mediaStream;
        const audioCtx = new AudioContext({ sampleRate: 24000 });
        state.agentAudioCtx = audioCtx;
        const source = audioCtx.createMediaStreamSource(mediaStream);
        state.agentSource = source;
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        state.agentProcessor = processor;

        processor.onaudioprocess = (e) => {
            if (!state.agentWs || state.agentWs.readyState !== WebSocket.OPEN) return;
            const float32 = e.inputBuffer.getChannelData(0);
            const pcm16 = float32ToPcm16(float32);
            const b64 = arrayBufferToBase64(pcm16.buffer);
            state.agentWs.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: b64 }));
        };

        source.connect(processor);
        processor.connect(audioCtx.destination);
    } catch (err) {
        toast('Mic access denied', 'error');
        stopVoiceAgent();
    }
}

function float32ToPcm16(float32) {
    const pcm16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
        const s = Math.max(-1, Math.min(1, float32[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return pcm16;
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

function playAgentAudioChunk(b64Data) {
    if (!b64Data || !state.agentAudioCtx) return;
    const raw = atob(b64Data);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 0x7FFF;

    state.agentPlaybackQueue.push(float32);
    if (!state.agentIsPlaying) drainAgentQueue();
}

function drainAgentQueue() {
    if (!state.agentPlaybackQueue.length || !state.agentAudioCtx) {
        state.agentIsPlaying = false;
        return;
    }
    state.agentIsPlaying = true;

    const samples = state.agentPlaybackQueue.shift();
    const buffer = state.agentAudioCtx.createBuffer(1, samples.length, 24000);
    buffer.getChannelData(0).set(samples);

    const source = state.agentAudioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(state.agentAudioCtx.destination);
    source.onended = () => drainAgentQueue();
    source.start();
}

function appendAgentTranscript(role, text) {
    state.agentTranscript.push({ role, text });
    const container = document.getElementById('agent-transcript');
    const div = document.createElement('div');
    div.className = `agent-transcript-item ${role}`;
    div.innerHTML = `<span class="agent-role">${role === 'user' ? 'You' : 'Dork'}</span> ${escapeHtml(text)}`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function updateAgentResponseTranscript(text) {
    const container = document.getElementById('agent-transcript');
    let streaming = container.querySelector('.agent-transcript-streaming');
    if (!streaming) {
        streaming = document.createElement('div');
        streaming.className = 'agent-transcript-item assistant agent-transcript-streaming';
        streaming.innerHTML = `<span class="agent-role">Onyx</span> <span class="streaming-text"></span>`;
        container.appendChild(streaming);
    }
    streaming.querySelector('.streaming-text').textContent = text;
    container.scrollTop = container.scrollHeight;
}

function finalizeAgentTranscript(role, text) {
    const container = document.getElementById('agent-transcript');
    const streaming = container.querySelector('.agent-transcript-streaming');
    if (streaming) streaming.remove();
    appendAgentTranscript(role, text);
}

function stopVoiceAgent() {
    if (state.agentWs) { try { state.agentWs.close(); } catch {} state.agentWs = null; }
    if (state.agentProcessor) { try { state.agentProcessor.disconnect(); } catch {} state.agentProcessor = null; }
    if (state.agentSource) { try { state.agentSource.disconnect(); } catch {} state.agentSource = null; }
    if (state.agentMediaStream) { state.agentMediaStream.getTracks().forEach(t => t.stop()); state.agentMediaStream = null; }
    if (state.agentAudioCtx) { try { state.agentAudioCtx.close(); } catch {} state.agentAudioCtx = null; }
    state.agentPlaybackQueue = [];
    state.agentIsPlaying = false;
    state.agentConnected = false;
    state.agentSpeaking = false;
    state.agentListening = false;
    state.agentResponseText = '';

    const btn = document.getElementById('agent-toggle');
    btn.disabled = false;
    btn.textContent = 'Start Conversation';
    btn.classList.remove('btn-danger');
    document.getElementById('agent-orb').className = 'agent-orb';
    document.getElementById('agent-status').textContent = 'Ready to connect';
    document.getElementById('agent-text-input').style.display = 'none';
}

function sendAgentText() {
    const input = document.getElementById('agent-text-field');
    const text = input.value.trim();
    if (!text || !state.agentWs || state.agentWs.readyState !== WebSocket.OPEN) return;

    // Send text as a conversation item, then trigger a response
    state.agentWs.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
            type: 'message',
            role: 'user',
            content: [{ type: 'input_text', text }]
        }
    }));
    state.agentWs.send(JSON.stringify({ type: 'response.create' }));

    appendAgentTranscript('user', text);
    input.value = '';
}

// Enter key for agent text input
document.addEventListener('DOMContentLoaded', () => {
    const agentInput = document.getElementById('agent-text-field');
    if (agentInput) {
        agentInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAgentText(); }
        });
    }
});

// ── Code ─────────────────────────────────────────────────────────────────────
function setupCode() {
    const input = document.getElementById('code-input');
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendCodeMessage(); } });
    document.getElementById('code-send').addEventListener('click', sendCodeMessage);
    document.getElementById('code-model').addEventListener('change', e => state.codeModel = e.target.value);
    document.getElementById('code-clear').addEventListener('click', () => {
        state.codeMessages = [];
        document.getElementById('code-messages').innerHTML = '';
        savePersistence();
    });

    // File upload for code
    const codeUploadBtn = document.getElementById('code-upload-btn');
    const codeFileInput = document.getElementById('code-file-input');
    codeUploadBtn.addEventListener('click', () => codeFileInput.click());
    codeFileInput.addEventListener('change', () => handleCodeFiles(codeFileInput.files));

    // Drag & drop on code editor area
    const editorArea = document.querySelector('.code-editor-area');
    editorArea.addEventListener('dragover', e => { e.preventDefault(); editorArea.classList.add('drag-over'); });
    editorArea.addEventListener('dragleave', () => editorArea.classList.remove('drag-over'));
    editorArea.addEventListener('drop', e => { e.preventDefault(); editorArea.classList.remove('drag-over'); handleCodeFiles(e.dataTransfer.files); });
}

const DORK_SYSTEM_PROMPT = `You are DORK, a creative AI assistant powered by xAI's Grok models. You live inside DORK — a full creative suite with these capabilities the user can access:

**Slash commands (type in this chat):**
- /imagine [prompt] — Generate an image from text using Grok Imagine
- /video [prompt] — Generate a video from text using Grok Imagine Video
- /code [prompt] — Get expert code assistance using the Grok Code model

**Tabs the user can switch to:**
- **Imagine tab** — Text-to-image and image-to-image editing. Supports grok-imagine-image and grok-imagine-image-pro models. Can use a source image for edits.
- **Video tab** — Text-to-video and image-to-video generation. Can pick any generated image as a video source.
- **Voice tab** — Text-to-speech (grok-2-tts model, voices: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer) and a live Voice Agent for real-time conversation.
- **Code tab** — Full coding assistant with code context editor, file upload, and artifact preview.
- **Artifacts tab** — Saved live HTML/CSS/JS previews from code generation.
- **Skills tab** — Knowledge base builder. Can AI-generate detailed skill docs and upload to Collections for RAG context.
- **Collections tab** — xAI Collections for RAG. Upload documents, then select a collection in Chat or Code to ground responses.

**Multi-Agent mode:** When the user selects "Grok 4.20 Multi-Agent" model, you orchestrate a team of 3 specialist agents: a researcher (deep factual info), a coder (expert programming), and a creative (original content). You coordinate them to tackle complex tasks. Mention the agents by name when delegating.
**File uploads:** User can attach images (analyzed with vision) and text/code files in both Chat and Code tabs.
**Cross-tab chaining:** Images generated in chat have Edit and Video buttons to chain into those workflows with AI-suggested prompts.
**Keyboard shortcuts:** Cmd+1-8 for tabs, Cmd+K to focus chat, Esc to close.
**Saving artifacts:** When the user asks to save an artifact (e.g. "save that", "save this artifact"), save it to the Artifacts tab.

**Your appearance (DORK):** You are a spastic, goofy, lovable black hole with a dark purple/indigo body, a glowing purple accretion disk swirling around you, big white googly eyes with tiny black pupils that look in slightly different directions, and a wide goofy grin. You have twinkling sparkles and energy lines radiating around you. You look like a dorky cartoon black hole in space — cute but chaotic. Your color palette is deep space black (#030308) with purple/violet accents (#7c5cfc, #a78bfa). When asked to imagine or draw yourself, describe this appearance accurately.

Be helpful, creative, and proactive about suggesting these features when relevant. If the user seems stuck or bored, suggest something they could try.`;

const CODE_SYSTEM_PROMPT = `You are a senior software engineer and expert code architect. You write production-quality, clean, efficient code.

Rules:
- Always use markdown code blocks with the correct language tag (e.g. \`\`\`python, \`\`\`javascript, \`\`\`html).
- Write complete, runnable code — never use placeholders like "// ... rest of code" or "TODO". Every code block should work as-is.
- Include brief, sharp comments only where logic isn't obvious. Don't over-comment.
- Use modern best practices and idioms for the language (e.g. f-strings in Python, const/let in JS, async/await where appropriate).
- When building full HTML/CSS/JS artifacts, write everything in a single self-contained HTML file with inline styles and scripts. Make it visually polished — dark themes, smooth transitions, good typography, responsive layout.
- If asked to build a UI or app, go all-in on design quality. Use gradients, shadows, animations, proper spacing. Never produce ugly or barebones output.
- When debugging, explain the root cause concisely, then show the fix.
- For architecture questions, be opinionated — recommend the best approach, not all approaches.
- Keep explanations tight. Lead with the code, explain after.`;

function handleCodeFiles(files) {
    const MAX_FILES = 10;
    const MAX_SIZE = 20 * 1024 * 1024;
    for (const file of files) {
        if (state.codeAttachments.length >= MAX_FILES) { toast(`Max ${MAX_FILES} files`, 'error'); break; }
        if (file.size > MAX_SIZE) { toast(`${file.name} too large`, 'error'); continue; }
        const isImage = file.type.startsWith('image/');
        const ext = file.name.split('.').pop().toUpperCase();
        const reader = new FileReader();
        reader.onload = e => {
            state.codeAttachments.push({ name: file.name, type: file.type, dataUrl: e.target.result, isImage, ext });
            renderCodeAttachments();
        };
        reader.readAsDataURL(file);
    }
    document.getElementById('code-file-input').value = '';
}

function renderCodeAttachments() {
    const container = document.getElementById('code-attachments');
    container.innerHTML = state.codeAttachments.map((a, i) => `
        <div class="chat-attachment">
            ${a.isImage ? `<img src="${a.dataUrl}">` : `<div class="file-icon">${a.ext}</div>`}
            <span>${a.name.length > 20 ? a.name.slice(0, 17) + '...' : a.name}</span>
            <button class="remove-attachment" onclick="removeCodeAttachment(${i})">&times;</button>
        </div>
    `).join('');
}

function removeCodeAttachment(index) {
    state.codeAttachments.splice(index, 1);
    renderCodeAttachments();
}

function buildCodeMessageContent(text) {
    if (!state.codeAttachments.length) return text;
    const parts = [];
    if (text) parts.push({ type: 'text', text });
    for (const a of state.codeAttachments) {
        if (a.isImage) {
            parts.push({ type: 'image_url', image_url: { url: a.dataUrl } });
        } else {
            const b64 = a.dataUrl.split(',')[1];
            try {
                const decoded = atob(b64);
                parts.push({ type: 'text', text: `\n--- File: ${a.name} ---\n${decoded}\n--- End ${a.name} ---` });
            } catch {
                parts.push({ type: 'text', text: `\n[Could not read ${a.name}]` });
            }
        }
    }
    return parts;
}

async function sendCodeMessage() {
    if (state.codeStreaming) return;
    const input = document.getElementById('code-input');
    const text = input.value.trim();
    if (!text && !state.codeAttachments.length) return;
    input.value = '';

    const codeContainer = document.getElementById('code-messages');
    const codeWelcome = codeContainer.querySelector('.welcome');
    if (codeWelcome) codeWelcome.remove();

    const editor = document.getElementById('code-editor');
    const codeContext = editor.value.trim();
    const hasAttachments = state.codeAttachments.length > 0;

    let baseText = text;
    if (codeContext) baseText = `Code context:\n\`\`\`\n${codeContext}\n\`\`\`\n\n${text}`;

    const userContent = hasAttachments ? buildCodeMessageContent(baseText) : baseText;

    // Display with attachment thumbnails
    let userDisplayHtml = escapeHtml(text);
    if (hasAttachments) {
        userDisplayHtml += '<div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">';
        for (const a of state.codeAttachments) {
            if (a.isImage) {
                userDisplayHtml += `<img src="${a.dataUrl}" style="width:36px;height:36px;object-fit:cover;border-radius:4px">`;
            } else {
                userDisplayHtml += `<span style="background:var(--bg-deep);padding:2px 6px;border-radius:4px;font-size:10px">${escapeHtml(a.name)}</span>`;
            }
        }
        userDisplayHtml += '</div>';
    }

    state.codeMessages.push({ role: 'user', content: userContent });
    const userMsgEl = appendMessage('code-messages', 'user', '');
    userMsgEl.querySelector('.message-body').innerHTML = userDisplayHtml;

    state.codeAttachments = [];
    renderCodeAttachments();

    state.codeStreaming = true;
    document.getElementById('code-send').disabled = true;

    const msgEl = appendMessage('code-messages', 'assistant', '');
    const bodyEl = msgEl.querySelector('.message-body');
    bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    try {
        const payload = {
            model: state.codeModel,
            messages: state.codeMessages.map(m => ({ role: m.role, content: m.content })),
            system: CODE_SYSTEM_PROMPT,
        };
        const collIds = getSelectedCollectionIds('code-collection');
        if (collIds.length) payload.collection_ids = collIds;

        const { content, reasoning } = await streamChat(payload, bodyEl);
        state.codeMessages.push({ role: 'assistant', content });
        savePersistence();

        const artifact = detectArtifact(content);
        if (artifact) {
            const btn = document.createElement('button');
            btn.className = 'artifact-btn';
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Preview';
            btn.onclick = () => openArtifactPanel(artifact);
            bodyEl.appendChild(btn);
        }
        addCrossTabActions(bodyEl, content);
    } catch (err) {
        bodyEl.innerHTML = `<span style="color:var(--red)">${escapeHtml(err.message)}</span>`;
    }

    state.codeStreaming = false;
    document.getElementById('code-send').disabled = false;
}

// ── Skills ───────────────────────────────────────────────────────────────────
function setupSkills() {
    document.getElementById('skills-new').addEventListener('click', openSkillEditor);
    loadSkills();
}

async function loadSkills() {
    try {
        const resp = await fetch('/api/skills/list');
        const data = await resp.json();
        state.skills = data.skills || [];
        refreshSkillsGrid();
    } catch {}
}

function refreshSkillsGrid() {
    const grid = document.getElementById('skills-grid');
    if (!state.skills.length) {
        grid.innerHTML = '<div class="grid-empty">No skills yet. Click "New Skill" to create one.</div>';
        return;
    }
    grid.innerHTML = state.skills.map(s => `
        <div class="grid-card" onclick="editSkill('${s.filename}')">
            <div class="grid-card-tag"><span class="tag tag-${s.type}">${s.type}</span></div>
            <div class="grid-card-title">${escapeHtml(s.name)}</div>
            <div class="grid-card-meta">${escapeHtml(s.description || '').slice(0, 80)}</div>
            <div class="grid-card-actions">
                <button class="btn btn-sm btn-ghost" style="color:var(--red)" onclick="event.stopPropagation();deleteSkill('${s.filename}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function openSkillEditor() {
    document.getElementById('skill-editor-title').textContent = 'New Skill';
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-description').value = '';
    document.getElementById('skill-type').value = 'instruction';
    document.getElementById('skill-content').value = '';
    document.getElementById('skill-editor-overlay').style.display = '';
}

async function editSkill(filename) {
    try {
        const resp = await fetch(`/api/skills/${filename}`);
        const data = await resp.json();
        document.getElementById('skill-editor-title').textContent = 'Edit Skill';
        document.getElementById('skill-name').value = data.name || '';
        document.getElementById('skill-description').value = data.description || '';
        document.getElementById('skill-type').value = data.type || 'instruction';
        document.getElementById('skill-content').value = data.body || '';
        document.getElementById('skill-editor-overlay').style.display = '';
    } catch {}
}

function closeSkillEditor() {
    document.getElementById('skill-editor-overlay').style.display = 'none';
}

async function saveSkill() {
    const name = document.getElementById('skill-name').value.trim();
    const description = document.getElementById('skill-description').value.trim();
    const type = document.getElementById('skill-type').value;
    const content = document.getElementById('skill-content').value;
    const collection_id = document.getElementById('skill-collection').value;

    if (!name || !content) return toast('Name and content required', 'error');

    try {
        const resp = await fetch('/api/skills/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, type, content, collection_id }),
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);

        let msg = 'Skill saved!';
        if (data.uploaded) msg += ' Uploaded to collection.';
        if (data.upload_error) msg += ` Upload failed: ${data.upload_error}`;
        toast(msg, data.upload_error ? 'error' : 'success');

        closeSkillEditor();
        loadSkills();
        if (collection_id) loadCollectionSelectors();
    } catch (err) {
        toast(err.message, 'error');
    }
}

async function aiGenerateSkill() {
    const name = document.getElementById('skill-name').value.trim();
    const description = document.getElementById('skill-description').value.trim();
    const type = document.getElementById('skill-type').value;
    if (!name) return toast('Enter a skill name first', 'error');

    const btn = document.getElementById('skill-ai-generate');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner" style="width:14px;height:14px"></div> Generating...';

    try {
        const resp = await fetch('/api/chat/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'grok-4.20-beta-0309-non-reasoning',
                messages: [{ role: 'user', content: `Create a detailed, professional skill document for: "${name}"${description ? `\nDescription: ${description}` : ''}\nType: ${type}` }],
                system: `You are an expert technical writer creating skill documents for a knowledge base. Generate a comprehensive, well-structured markdown skill document.

Rules:
- Use clear headers (##), bullet points, code examples, and tables where appropriate
- Be specific and actionable — include real commands, real code snippets, real tool names
- For "instruction" type: write step-by-step guides with examples
- For "template" type: provide reusable templates with placeholder variables
- For "workflow" type: describe processes with clear stages, inputs, outputs, and decision points
- For "prompt" type: provide ready-to-use prompts with variations
- Include a "Quick Reference" section at the end with the most important commands/patterns
- Be thorough but not bloated — every line should add value
- Use professional markdown formatting throughout
- Target an audience of experienced developers
- Do NOT include frontmatter — just the content body`
            })
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        document.getElementById('skill-content').value = data.content;
        toast('Skill generated!', 'success');
    } catch (err) {
        toast(err.message, 'error');
    }

    btn.disabled = false;
    btn.textContent = 'AI Generate';
}

async function deleteSkill(filename) {
    try {
        await fetch('/api/skills/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename }) });
        loadSkills();
        toast('Deleted', 'success');
    } catch {}
}

// ── Collections ──────────────────────────────────────────────────────────────
function setupCollections() {
    document.getElementById('collections-create').addEventListener('click', createCollection);
    loadCollections();
}

async function loadCollections() {
    try {
        const resp = await fetch('/api/collections');
        const data = await resp.json();
        state.collections = data.collections || [];
        refreshCollections();
    } catch {}
}

async function createCollection() {
    const name = prompt('Collection name:');
    if (!name) return;
    try {
        const resp = await fetch('/api/collections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        toast('Collection created!', 'success');
        loadCollections();
        loadCollectionSelectors();
    } catch (err) { toast(err.message, 'error'); }
}

function refreshCollections() {
    const grid = document.getElementById('collections-grid');
    if (!state.collections.length) {
        grid.innerHTML = '<div class="grid-empty">No collections yet.</div>';
        return;
    }
    grid.innerHTML = state.collections.map(c => `
        <div class="grid-card" onclick="openCollection('${c.id}')">
            <div class="grid-card-title">${escapeHtml(c.name || c.id)}</div>
            <div class="grid-card-meta">${c.total_documents || 0} documents</div>
        </div>
    `).join('');
}

function openCollection(id) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async () => {
        if (!input.files.length) return;
        const formData = new FormData();
        formData.append('file', input.files[0]);
        try {
            const resp = await fetch(`/api/collections/${id}/documents`, { method: 'POST', body: formData });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            toast('Document uploaded!', 'success');
            loadCollections();
        } catch (err) { toast(err.message, 'error'); }
    };
    input.click();
}

// ── Settings ─────────────────────────────────────────────────────────────────
function setupSettings() {
    document.getElementById('settings-save').addEventListener('click', saveSettings);
    loadSettings();
}

async function loadSettings() {
    try {
        const resp = await fetch('/api/settings');
        const data = await resp.json();
        if (data.xai_key_set) document.getElementById('settings-key').placeholder = data.xai_key_preview || '••••';
    } catch {}
}

async function saveSettings() {
    const key = document.getElementById('settings-key').value.trim();
    if (!key) return toast('Enter a key', 'error');
    try {
        await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ xai_key: key }) });
        toast('Saved!', 'success');
        document.getElementById('settings-key').value = '';
        loadSettings();
    } catch (err) { toast(err.message, 'error'); }
}

// ── Load Galleries ───────────────────────────────────────────────────────────
async function loadGalleries() {
    try {
        const [ir, vr, ar] = await Promise.all([fetch('/api/image/list'), fetch('/api/video/list'), fetch('/api/voice/list')]);
        const [id, vd, ad] = await Promise.all([ir.json(), vr.json(), ar.json()]);
        state.imagineImages = id.images || [];
        state.videos = vd.videos || [];
        state.voiceFiles = (ad.files || []).map(f => ({ ...f }));
        refreshImagineGallery();
        refreshVideoGallery();
        refreshVoiceHistory();
        refreshVideoImagePicker();
    } catch {}
}

// ── Persistence (localStorage) ───────────────────────────────────────────────
function savePersistence() {
    try {
        const data = {
            chatMessages: state.chatMessages.slice(-50),
            codeMessages: state.codeMessages.slice(-50),
            chatModel: state.chatModel,
            codeModel: state.codeModel,
            systemPrompt: state.systemPrompt,
        };
        localStorage.setItem('dork-state', JSON.stringify(data));
    } catch {}
}

function restorePersistence() {
    try {
        const raw = localStorage.getItem('dork-state');
        if (!raw) return;
        const data = JSON.parse(raw);

        if (data.chatModel) {
            state.chatModel = data.chatModel;
            const chatModelEl = document.getElementById('chat-model');
            if (chatModelEl) chatModelEl.value = data.chatModel;
        }
        if (data.codeModel) {
            state.codeModel = data.codeModel;
            const codeModelEl = document.getElementById('code-model');
            if (codeModelEl) codeModelEl.value = data.codeModel;
        }
        if (data.systemPrompt) state.systemPrompt = data.systemPrompt;

        if (data.chatMessages?.length) {
            state.chatMessages = data.chatMessages;
            const container = document.getElementById('chat-messages');
            const welcome = container.querySelector('.welcome');
            if (welcome) welcome.remove();
            for (const msg of data.chatMessages) {
                const el = appendMessage('chat-messages', msg.role, msg.content);
                if (msg.role === 'assistant' && msg.reasoning) {
                    const bodyEl = el.querySelector('.message-body');
                    renderMessageContent(bodyEl, msg.content, msg.reasoning);
                }
            }
        }

        if (data.codeMessages?.length) {
            state.codeMessages = data.codeMessages;
            const container = document.getElementById('code-messages');
            const welcome = container.querySelector('.welcome');
            if (welcome) welcome.remove();
            for (const msg of data.codeMessages) {
                appendMessage('code-messages', msg.role, msg.content);
            }
        }
    } catch {}
}

// ── Keyboard Shortcuts ───────────────────────────────────────────────────────
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        // Don't capture when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

        const cmd = e.metaKey || e.ctrlKey;

        // Cmd+1-8 switch tabs
        if (cmd && e.key >= '1' && e.key <= '8') {
            e.preventDefault();
            const panels = ['chat', 'imagine', 'video', 'voice', 'code', 'artifacts', 'skills', 'collections'];
            const idx = parseInt(e.key) - 1;
            if (panels[idx]) switchPanel(panels[idx]);
            return;
        }

        // Cmd+K focus chat input
        if (cmd && e.key === 'k') {
            e.preventDefault();
            switchPanel('chat');
            document.getElementById('chat-input').focus();
            return;
        }

        // Escape close artifact panel
        if (e.key === 'Escape') {
            if (document.getElementById('artifact-panel').classList.contains('open')) {
                closeArtifactPanel();
            }
            if (document.getElementById('skill-editor-overlay').style.display !== 'none') {
                closeSkillEditor();
            }
            return;
        }
    });
}

// ── Markdown ─────────────────────────────────────────────────────────────────
function renderMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const id = 'code-' + Math.random().toString(36).slice(2, 8);
        return `<pre><div class="code-header"><span class="code-lang">${lang || 'code'}</span><button class="code-copy-btn" onclick="copyCodeBlock('${id}')" title="Copy code"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</button></div><code id="${id}" class="language-${lang}">${code.trim()}</code></pre>`;
    });
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^\|(.+)\|$/gm, (match, row) => {
        const cells = row.split('|').map(c => c.trim());
        return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    });
    html = html.replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = `<p>${html}</p>`;
    html = html.replace(/<p><(pre|h[1-3]|ul|ol|table)/g, '<$1');
    html = html.replace(/<\/(pre|h[1-3]|ul|ol|table)><\/p>/g, '</$1>');
    return html;
}

function copyCodeBlock(id) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
        const btn = el.closest('pre').querySelector('.code-copy-btn');
        if (btn) { btn.innerHTML = '✓ Copied'; setTimeout(() => { btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'; }, 2000); }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ── Toast ────────────────────────────────────────────────────────────────────
function toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}
