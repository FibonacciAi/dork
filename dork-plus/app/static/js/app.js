/**
 * DORK+ — Frontend
 * Full xAI + OpenAI creative suite
 */

// ── Skins ────────────────────────────────────────────────────────────────────
const SKINS = {
    nova: {
        name: 'Nova', preview: '#2dd4bf',
        vars: { '--bg-deep':'#050609','--bg-base':'#0b0f14','--bg-surface':'#101820','--bg-card':'#14202a','--bg-elevated':'#192735','--bg-hover':'#223442','--border':'rgba(125,211,252,0.12)','--border-active':'rgba(45,212,191,0.32)','--border-bright':'rgba(251,191,36,0.42)','--accent':'#2dd4bf','--accent-bright':'#7dd3fc','--accent-dim':'#0f766e','--accent-glow':'rgba(45,212,191,0.14)','--accent-glow-strong':'rgba(125,211,252,0.24)','--accent-2':'#fbbf24','--accent-3':'#fb7185','--btn-text':'#061012' }
    },
    violet: {
        name: 'Violet', preview: '#7c5cfc',
        vars: { '--bg-deep':'#030308','--bg-base':'#08081a','--bg-surface':'#0d0d22','--bg-card':'#12122a','--bg-elevated':'#181834','--bg-hover':'#1e1e3e','--border':'rgba(124,92,252,0.10)','--border-active':'rgba(124,92,252,0.30)','--border-bright':'rgba(124,92,252,0.50)','--accent':'#7c5cfc','--accent-bright':'#9b82ff','--accent-dim':'#5a3fd6','--accent-glow':'rgba(124,92,252,0.15)','--accent-glow-strong':'rgba(124,92,252,0.30)','--accent-2':'#c084fc','--accent-3':'#f472b6' }
    },
    blackout: {
        name: 'Blackout', preview: '#ffffff',
        vars: { '--bg-deep':'#000000','--bg-base':'#050505','--bg-surface':'#0a0a0a','--bg-card':'#0f0f0f','--bg-elevated':'#161616','--bg-hover':'#1c1c1c','--border':'rgba(255,255,255,0.06)','--border-active':'rgba(255,255,255,0.15)','--border-bright':'rgba(255,255,255,0.25)','--accent':'#ffffff','--accent-bright':'#ffffff','--accent-dim':'#e0e0e0','--accent-glow':'rgba(255,255,255,0.08)','--accent-glow-strong':'rgba(255,255,255,0.15)','--accent-2':'#d4d4d4','--accent-3':'#888888','--btn-text':'#000000' }
    },
    cyber: {
        name: 'Cyber', preview: '#00ffcc',
        vars: { '--bg-deep':'#020d0a','--bg-base':'#041a14','--bg-surface':'#07251e','--bg-card':'#0a3028','--bg-elevated':'#0d3b32','--bg-hover':'#10463c','--border':'rgba(0,255,204,0.10)','--border-active':'rgba(0,255,204,0.30)','--border-bright':'rgba(0,255,204,0.50)','--accent':'#00ffcc','--accent-bright':'#33ffd6','--accent-dim':'#00ccaa','--accent-glow':'rgba(0,255,204,0.12)','--accent-glow-strong':'rgba(0,255,204,0.25)','--accent-2':'#00e5ff','--accent-3':'#76ff03','--btn-text':'#000000' }
    },
    ember: {
        name: 'Ember', preview: '#ff6b2b',
        vars: { '--bg-deep':'#080300','--bg-base':'#120800','--bg-surface':'#1a0e02','--bg-card':'#221404','--bg-elevated':'#2a1a06','--bg-hover':'#352008','--border':'rgba(255,107,43,0.10)','--border-active':'rgba(255,107,43,0.30)','--border-bright':'rgba(255,107,43,0.50)','--accent':'#ff6b2b','--accent-bright':'#ff8c55','--accent-dim':'#cc5522','--accent-glow':'rgba(255,107,43,0.12)','--accent-glow-strong':'rgba(255,107,43,0.25)','--accent-2':'#fbbf24','--accent-3':'#f97316' }
    },
    rose: {
        name: 'Rosé', preview: '#f472b6',
        vars: { '--bg-deep':'#080206','--bg-base':'#12050d','--bg-surface':'#1a0914','--bg-card':'#220d1b','--bg-elevated':'#2c1224','--bg-hover':'#36172d','--border':'rgba(244,114,182,0.10)','--border-active':'rgba(244,114,182,0.30)','--border-bright':'rgba(244,114,182,0.50)','--accent':'#f472b6','--accent-bright':'#f9a8d4','--accent-dim':'#db2777','--accent-glow':'rgba(244,114,182,0.12)','--accent-glow-strong':'rgba(244,114,182,0.25)','--accent-2':'#c084fc','--accent-3':'#fb7185' }
    },
    arctic: {
        name: 'Arctic', preview: '#38bdf8',
        vars: { '--bg-deep':'#020810','--bg-base':'#041220','--bg-surface':'#061a2e','--bg-card':'#08223c','--bg-elevated':'#0a2a4a','--bg-hover':'#0e3458','--border':'rgba(56,189,248,0.10)','--border-active':'rgba(56,189,248,0.30)','--border-bright':'rgba(56,189,248,0.50)','--accent':'#38bdf8','--accent-bright':'#7dd3fc','--accent-dim':'#0284c7','--accent-glow':'rgba(56,189,248,0.12)','--accent-glow-strong':'rgba(56,189,248,0.25)','--accent-2':'#818cf8','--accent-3':'#22d3ee' }
    },
    matrix: {
        name: 'Matrix', preview: '#22c55e',
        vars: { '--bg-deep':'#000000','--bg-base':'#001a00','--bg-surface':'#002200','--bg-card':'#002d00','--bg-elevated':'#003800','--bg-hover':'#004400','--border':'rgba(34,197,94,0.10)','--border-active':'rgba(34,197,94,0.30)','--border-bright':'rgba(34,197,94,0.50)','--accent':'#22c55e','--accent-bright':'#4ade80','--accent-dim':'#16a34a','--accent-glow':'rgba(34,197,94,0.12)','--accent-glow-strong':'rgba(34,197,94,0.25)','--accent-2':'#34d399','--accent-3':'#a3e635','--btn-text':'#000000' }
    },
    gold: {
        name: 'Gold', preview: '#eab308',
        vars: { '--bg-deep':'#060400','--bg-base':'#0f0a02','--bg-surface':'#181004','--bg-card':'#201606','--bg-elevated':'#281c08','--bg-hover':'#32220a','--border':'rgba(234,179,8,0.10)','--border-active':'rgba(234,179,8,0.30)','--border-bright':'rgba(234,179,8,0.50)','--accent':'#eab308','--accent-bright':'#facc15','--accent-dim':'#ca8a04','--accent-glow':'rgba(234,179,8,0.12)','--accent-glow-strong':'rgba(234,179,8,0.25)','--accent-2':'#f59e0b','--accent-3':'#d97706','--btn-text':'#000000' }
    },
};

function applySkin(skinId) {
    const skin = SKINS[skinId];
    if (!skin) return;
    const root = document.documentElement;
    root.style.removeProperty('--btn-text');
    for (const [prop, val] of Object.entries(skin.vars)) {
        root.style.setProperty(prop, val);
    }
    localStorage.setItem('dork-skin', skinId);
    document.querySelectorAll('.skin-swatch').forEach(s => s.classList.toggle('active', s.dataset.skin === skinId));
}

function renderSkinPicker() {
    const picker = document.getElementById('skin-picker');
    if (!picker) return;
    const current = localStorage.getItem('dork-skin') || 'nova';
    picker.innerHTML = Object.entries(SKINS).map(([id, skin]) =>
        `<button class="skin-swatch ${id === current ? 'active' : ''}" data-skin="${id}" onclick="applySkin('${id}')" title="${skin.name}">
            <span class="skin-color" style="background:${skin.preview}"></span>
            <span class="skin-name">${skin.name}</span>
        </button>`
    ).join('');
    applySkin(current);
}

const IMAGE_STYLE_PRESETS = [
    // Photo, cinema, and raw camera looks
    { id: 'runway-flash',          name: 'Runway Flash',        tag: 'fashion', colors: ['#f8fafc', '#ef4444'], prompt: 'fashion week flash photo, hard direct strobe, glossy skin highlights, sharp wardrobe texture, crowded backstage energy, expensive editorial crop' },
    { id: 'tabloid-night',         name: 'Tabloid Night',       tag: 'flash',   colors: ['#facc15', '#ec4899'], prompt: 'paparazzi night flash, luxury chaos, wet pavement, blown highlights, candid celebrity-scandal framing, high contrast magazine grit' },
    { id: 'noir-rain',             name: 'Noir Rain',           tag: 'cinema',  colors: ['#22d3ee', '#111827'], prompt: 'rain-soaked noir street, neon reflected in puddles, trenchcoat silhouettes, sodium vapor haze, wet glass, moody crime-film lighting' },
    { id: 'sunbleach-35',          name: 'Sunbleach 35',        tag: 'film',    colors: ['#fbbf24', '#38bdf8'], prompt: 'sun-bleached 35mm film, harsh summer light, faded cyan shadows, warm grain, imperfect travel-photo realism, tactile dust and scratches' },
    { id: 'phone-cam-raw',         name: 'Phone-Cam Raw',       tag: 'real',    colors: ['#a3e635', '#64748b'], prompt: 'unpolished phone camera realism, accidental flash, slightly awkward angle, real room clutter, candid modern snapshot, believable social feed texture' },
    { id: 'museum-mono',           name: 'Museum Mono',         tag: 'b&w',     colors: ['#f8fafc', '#18181b'], prompt: 'large-format black-and-white museum print, sculptural shadows, deep blacks, silver grain, quiet negative space, gallery-grade tonal control' },
    { id: 'infrared-dream',        name: 'Infrared Dream',      tag: 'ir',      colors: ['#f9a8d4', '#f8fafc'], prompt: 'false-color infrared photography, white foliage, black skies, surreal pink highlights, uncanny daylight, crisp lens detail' },
    { id: 'underwater-flash',      name: 'Underwater Flash',    tag: 'aqua',    colors: ['#06b6d4', '#f97316'], prompt: 'underwater flash photography, suspended bubbles, refracted skin and fabric, pool-blue shadows, sharp strobe highlights, dreamlike submerged motion' },
    { id: 'macro-slick',           name: 'Macro Slick',         tag: 'macro',   colors: ['#dc2626', '#fbbf24'], prompt: 'extreme macro product-beauty shot, wet gloss, tiny droplets, precise focus falloff, tactile surface detail, premium cosmetics lighting' },
    { id: 'airport-thriller',      name: 'Airport Thriller',    tag: 'cinema',  colors: ['#64748b', '#facc15'], prompt: 'sleek airport-thriller still, glass terminals, anonymous crowds, rolling luggage, cool overhead light, surveillance-era tension' },
    // Genre engines
    { id: 'chrome-dystopia',       name: 'Chrome Dystopia',     tag: 'sci-fi',  colors: ['#94a3b8', '#22d3ee'], prompt: 'chrome dystopian future, polished metal corridors, cold blue light, biometric doors, reflective armor, sterile corporate menace' },
    { id: 'desert-megafauna',      name: 'Desert Colossus',     tag: 'epic',    colors: ['#f59e0b', '#0f172a'], prompt: 'sun-blasted desert epic, gigantic ancient machinery half-buried in dunes, tiny travelers, dusty atmosphere, brutal scale' },
    { id: 'arctic-espionage',      name: 'Arctic Espionage',    tag: 'spy',     colors: ['#bae6fd', '#334155'], prompt: 'arctic spy-film scene, whiteout snow, black tactical silhouettes, frozen radar station, cold blue grade, clean suspense composition' },
    { id: 'inferno-practical',     name: 'Inferno Practical',   tag: 'fire',    colors: ['#f97316', '#111827'], prompt: 'practical firelight cinema, smoke layers, ember particles, orange rim light, charred industrial set, intense physical atmosphere' },
    { id: 'cosmic-dread',          name: 'Cosmic Dread',        tag: 'dread',   colors: ['#22d3ee', '#312e81'], prompt: 'cosmic dread tableau, impossible architecture, cold starlight, tiny human scale, elegant terror, vast negative space' },
    { id: 'analog-entity',         name: 'Analog Entity',       tag: 'horror',  colors: ['#facc15', '#334155'], prompt: 'degraded broadcast horror still, tracking noise, washed color, empty hallway, wrong silhouette in the frame, unsettling archival texture' },
    { id: 'grindhouse-pulp',       name: 'Grindhouse Pulp',     tag: 'pulp',    colors: ['#dc2626', '#fde68a'], prompt: 'grindhouse poster energy, lurid painted lighting, torn paper texture, dramatic faces, cheap-thrill color, bold action staging, no text' },
    { id: 'cyber-shrine',          name: 'Cyber Shrine',        tag: 'neon',    colors: ['#a855f7', '#22c55e'], prompt: 'neon shrine interior, tangled cables, glowing offerings, incense haze, old ritual objects mixed with illegal future tech' },
    { id: 'biotech-lab',           name: 'Biotech Lab',         tag: 'bio',     colors: ['#84cc16', '#22d3ee'], prompt: 'wet biotech laboratory, glass tanks, translucent membranes, surgical light, green diagnostic glow, sterile horror beauty' },
    // Illustration and graphic systems
    { id: 'anime-trailer',         name: 'Anime Trailer',       tag: 'anime',   colors: ['#f472b6', '#06b6d4'], prompt: 'high-budget anime trailer frame, cinematic backlight, crisp cel shading, wind-blown detail, emotional close-up, dynamic camera angle' },
    { id: 'manga-splash',          name: 'Manga Splash',        tag: 'manga',   colors: ['#111827', '#f8fafc'], prompt: 'black-and-white manga splash page, explosive composition, screentone gradients, speed lines, expressive ink, oversized dramatic silhouette' },
    { id: 'euro-comic',            name: 'Euro Comic',          tag: 'comic',   colors: ['#2563eb', '#f97316'], prompt: 'European graphic novel illustration, clean ligne-claire linework, flat confident color, architectural detail, elegant adventure-panel framing' },
    { id: 'risograph-zine',        name: 'Risograph Zine',      tag: 'print',   colors: ['#ef4444', '#22c55e'], prompt: 'two-color risograph zine print, misregistered ink, grainy paper, DIY layout energy, bold shapes, tactile underground poster finish' },
    { id: 'airbrush-metal',        name: 'Airbrush Metal',      tag: 'retro',   colors: ['#cbd5e1', '#ec4899'], prompt: 'retro airbrush metal illustration, chrome gradients, glossy highlights, fantasy poster drama, soft sprayed edges, 1980s cover-art attitude' },
    { id: 'clay-nightmare',        name: 'Clay Nightmare',      tag: 'craft',   colors: ['#fb923c', '#7c3aed'], prompt: 'stop-motion clay nightmare, handmade miniature set, fingerprints in material, practical shadows, tactile uncanny character design' },
    { id: 'ink-brutal',            name: 'Ink Brutal',          tag: 'ink',     colors: ['#f8fafc', '#ef4444'], prompt: 'brutal black ink illustration, scratchy dry-brush marks, aggressive contrast, torn poster edge, underground gig-poster intensity' },
    { id: 'storybook-ominous',     name: 'Ominous Storybook',   tag: 'paint',   colors: ['#86efac', '#7c2d12'], prompt: 'hand-painted storybook scene with a dark undertone, lush background detail, soft gouache texture, charming but uneasy composition' },
    // Design, objects, and surrealism
    { id: 'object-worship',        name: 'Object Worship',      tag: 'object',  colors: ['#facc15', '#111827'], prompt: 'single hero object treated like a religious artifact, dramatic pedestal light, velvet shadows, obsessively polished material detail' },
    { id: 'liquid-metal',          name: 'Liquid Metal',        tag: 'chrome',  colors: ['#e5e7eb', '#22d3ee'], prompt: 'liquid metal surface design, flowing chrome, mirror distortions, sharp studio reflections, futuristic luxury product mood' },
    { id: 'velvet-brutalism',      name: 'Velvet Brutalism',    tag: 'design',  colors: ['#7f1d1d', '#94a3b8'], prompt: 'raw concrete architecture softened by red velvet, hard geometry, luxurious tension, museum-scale lighting, severe composition' },
    { id: 'neon-taxidermy',        name: 'Neon Specimen',       tag: 'specimen',colors: ['#84cc16', '#ec4899'], prompt: 'glowing specimen display, glass case, colored gel lights, scientific labels implied but unreadable, uncanny collector-room mood' },
    { id: 'botanical-takeover',    name: 'Botanical Takeover',  tag: 'lush',    colors: ['#16a34a', '#f472b6'], prompt: 'plants aggressively reclaiming an interior, roots through furniture, saturated flowers, damp plaster, beautiful overgrowth chaos' },
    { id: 'surreal-runway',        name: 'Surreal Runway',      tag: 'surreal', colors: ['#a855f7', '#f97316'], prompt: 'surreal runway editorial, impossible garment shape, dreamlike set, sculptural pose, clean high-fashion lighting, art-magazine confidence' },
    { id: 'candy-horror',          name: 'Candy Horror',        tag: 'horror',  colors: ['#f472b6', '#84cc16'], prompt: 'candy-colored horror scene, glossy sweets, bright plastic surfaces, unsettling smile, cheerful palette turned wrong, polished pop-nightmare look' },
    { id: 'ritual-gold',           name: 'Ritual Gold',         tag: 'ritual',  colors: ['#facc15', '#581c87'], prompt: 'ritual chamber with gold objects, candle smoke, dark purple shadows, ornate symbols, sacred-luxury atmosphere, cinematic symmetry' },
    { id: 'glass-dream',           name: 'Glass Dream',         tag: 'glass',   colors: ['#bae6fd', '#f8fafc'], prompt: 'transparent glass world, refracted light, delicate edges, floating reflections, clean surreal product-cinema finish' },
    { id: 'dirty-future',          name: 'Dirty Future',        tag: 'future',  colors: ['#f97316', '#334155'], prompt: 'lived-in future street market, tangled wires, grease, handmade repairs, steam, neon signs, dense believable sci-fi texture' },
    { id: 'blacklight-poster',     name: 'Blacklight Poster',   tag: 'poster',  colors: ['#a855f7', '#22c55e'], prompt: 'blacklight poster art, fluorescent ink, cosmic shapes, velvet-black background, psychedelic glow, crisp centered composition, no text' },
];

const ADULT_IMAGE_STYLE_PRESETS = [
    // Latex, rubber, and glossy fetishwear
    { id: 'adult-latex-catsuit',        name: 'Latex Catsuit',        tag: 'latex',   adult: true, colors: ['#020617', '#e11d48'], prompt: 'mirror-gloss latex catsuit, tight silhouette, hard rim light, black studio backdrop, fetish magazine polish' },
    { id: 'adult-rubber-doll',          name: 'Rubber Doll',          tag: 'rubber',  adult: true, colors: ['#111827', '#f472b6'], prompt: 'full rubber doll styling, glossy hood, exaggerated shine, polished studio light, unreal mannequin pose, high-fetish fashion finish' },
    { id: 'adult-latex-gloves',         name: 'Latex Gloves',         tag: 'gloves',  adult: true, colors: ['#0f172a', '#22d3ee'], prompt: 'long latex gloves, wet black shine, fingers posed near lips, tight beauty crop, cool clinical highlights' },
    { id: 'adult-vinyl-mini',           name: 'Vinyl Mini',           tag: 'vinyl',   adult: true, colors: ['#ec4899', '#111827'], prompt: 'glossy vinyl mini dress, nightclub flash, slick reflections, high heels, confident adult fashion pose' },
    { id: 'adult-clear-pvc',            name: 'Clear PVC',            tag: 'pvc',     adult: true, colors: ['#bae6fd', '#f8fafc'], prompt: 'transparent PVC layers over lingerie, condensation shine, icy studio light, futuristic fetish editorial styling' },
    { id: 'adult-rubber-clinic',        name: 'Rubber Clinic',        tag: 'latex',   adult: true, colors: ['#e5e7eb', '#22d3ee'], prompt: 'sterile rubber clinic scene, latex apron and gloves, surgical white light, chrome table, clinical fetish atmosphere' },
    // Leather, dominance, and dungeon styling
    { id: 'adult-leather-domme',        name: 'Leather Domme',        tag: 'domme',   adult: true, colors: ['#0f172a', '#dc2626'], prompt: 'tailored black leather, riding crop prop, severe key light, commanding pose, dungeon-editorial power' },
    { id: 'adult-dungeon-noir',         name: 'Dungeon Noir',         tag: 'bdsm',    adult: true, colors: ['#111827', '#7f1d1d'], prompt: 'private dungeon room, red practical lights, leather bench, chains on wall, noir shadows, expensive kink-club mood' },
    { id: 'adult-collar-leash',         name: 'Collar & Leash',       tag: 'collar',  adult: true, colors: ['#020617', '#f43f5e'], prompt: 'leather collar, chain leash prop, glossy lips, close controlled framing, power-exchange fashion styling' },
    { id: 'adult-throne-domme',         name: 'Throne Domme',         tag: 'domme',   adult: true, colors: ['#7f1d1d', '#facc15'], prompt: 'dominant figure on a velvet throne, thigh-high boots, leather gloves, low red light, worshipful composition' },
    { id: 'adult-keyholder',            name: 'Keyholder',            tag: 'power',   adult: true, colors: ['#facc15', '#0f172a'], prompt: 'small gold key on black leather glove, collar detail, teasing close-up, luxurious control-symbol still life' },
    { id: 'adult-cage-set',             name: 'Cage Set',             tag: 'bdsm',    adult: true, colors: ['#64748b', '#ef4444'], prompt: 'industrial cage set, red club light, leather outfit, steel bars as graphic shadows, adult kink editorial scene' },
    // Bondage, restraint, and rope
    { id: 'adult-rope-bondage',         name: 'Rope Bondage',         tag: 'rope',    adult: true, colors: ['#7c2d12', '#fde68a'], prompt: 'intricate shibari rope patterns, warm light, calm poised body line, rope geometry as the main visual focus' },
    { id: 'adult-suspension-lines',     name: 'Suspension Lines',     tag: 'rope',    adult: true, colors: ['#fbbf24', '#111827'], prompt: 'rope suspension rigging as sculptural lines, black void background, dramatic spotlight, controlled gallery-installation mood' },
    { id: 'adult-cuffs-chains',         name: 'Cuffs & Chains',       tag: 'cuffs',   adult: true, colors: ['#94a3b8', '#111827'], prompt: 'polished wrist cuffs, chain detail, black leather surface, close crop, metallic highlights, restraint-fashion still' },
    { id: 'adult-blindfold',            name: 'Blindfold',            tag: 'sensory', adult: true, colors: ['#020617', '#f8fafc'], prompt: 'black silk blindfold, parted lips, soft side light, close intimate portrait, sensory-deprivation styling' },
    { id: 'adult-spreader-bar',         name: 'Spreader Bar',         tag: 'restraint',adult: true, colors: ['#e5e7eb', '#7f1d1d'], prompt: 'chrome restraint bar detail, leather straps, dramatic low light, fetish equipment photographed like luxury product design' },
    { id: 'adult-straitjacket',         name: 'Straitjacket',         tag: 'restraint',adult: true, colors: ['#f8fafc', '#64748b'], prompt: 'white canvas restraint jacket, fashion-institution set, stark light, tightly controlled pose, avant-garde kink editorial' },
    // Legs, feet, boots, and hosiery
    { id: 'adult-hosiery-heels',        name: 'Hosiery & Heels',      tag: 'legs',    adult: true, colors: ['#111827', '#fda4af'], prompt: 'sheer stockings, garter details, lacquered high heels, low-angle leg-focused fashion shot, satin bedding' },
    { id: 'adult-stockings-garter',     name: 'Stockings & Garter',   tag: 'hosiery', adult: true, colors: ['#020617', '#f9a8d4'], prompt: 'garter belt, stocking tops, lace texture, soft boudoir light, cropped thigh-focused glamour composition' },
    { id: 'adult-thigh-high-boots',     name: 'Thigh-High Boots',     tag: 'boots',   adult: true, colors: ['#111827', '#facc15'], prompt: 'black thigh-high boots, glossy heel, strong stance, low camera angle, club-floor reflections, fetish footwear focus' },
    { id: 'adult-feet',                 name: 'Feet',                 tag: 'feet',    adult: true, colors: ['#fbbf24', '#fda4af'], prompt: 'pedicure detail, high heels slipped off, silk sheets, elegant foot-focused glamour close-up' },
    { id: 'adult-soles-closeup',        name: 'Soles Close-Up',       tag: 'feet',    adult: true, colors: ['#fde68a', '#111827'], prompt: 'bare soles close to lens, soft sheets behind, shallow focus, warm lamp light, clean foot-fetish composition' },
    { id: 'adult-shoe-worship',         name: 'Shoe Worship',         tag: 'heels',   adult: true, colors: ['#dc2626', '#020617'], prompt: 'stiletto heel as hero object, kneeling silhouette cropped low, red carpet, glossy black floor, worshipful fashion framing' },
    // Masks, hoods, clubwear, and identity play
    { id: 'adult-masked-club',          name: 'Masked Club',          tag: 'mask',    adult: true, colors: ['#a855f7', '#111827'], prompt: 'black fetish mask, latex and leather textures, purple club haze, anonymous nightlife glamour' },
    { id: 'adult-pup-hood',             name: 'Pup Hood',             tag: 'hood',    adult: true, colors: ['#22d3ee', '#111827'], prompt: 'human clubwear with glossy pup hood, collar, neon basement light, rubber textures, kink-party portrait' },
    { id: 'adult-gas-mask',             name: 'Gas Mask',             tag: 'mask',    adult: true, colors: ['#84cc16', '#020617'], prompt: 'black gas mask, latex bodysuit, green industrial light, fog, dystopian fetish-club fashion' },
    { id: 'adult-hooded-latex',         name: 'Hooded Latex',         tag: 'hood',    adult: true, colors: ['#020617', '#e11d48'], prompt: 'smooth latex hood, glossy bodysuit, red rim light, anonymous silhouette, sleek high-fetish portrait' },
    { id: 'adult-black-tape',           name: 'Black Tape',           tag: 'tape',    adult: true, colors: ['#111827', '#f8fafc'], prompt: 'black body tape styling, graphic lines over skin, flash-lit studio, minimal fetish-fashion composition' },
    { id: 'adult-club-cage',            name: 'Club Cage',            tag: 'club',    adult: true, colors: ['#ec4899', '#22d3ee'], prompt: 'cage dancer platform, chrome grid shadows, pink-blue club lights, leather outfit, sweaty nightlife atmosphere' },
    // Pain, sensation, and ritualized kink visuals
    { id: 'adult-wax-play',             name: 'Wax Play',             tag: 'wax',     adult: true, colors: ['#f97316', '#7f1d1d'], prompt: 'red candle wax, dark room, heated skin highlights, careful kink-editorial composition, molten gloss close-up' },
    { id: 'adult-impact-play',          name: 'Impact Play',          tag: 'impact',  adult: true, colors: ['#dc2626', '#0f172a'], prompt: 'paddle prop, leather styling, tense club lighting, impact-play fashion shoot, dramatic anticipation, no injury gore' },
    { id: 'adult-ice-play',             name: 'Ice Play',             tag: 'sensation',adult: true, colors: ['#bae6fd', '#0f172a'], prompt: 'ice cube melting on collarbone, goosebump texture, cold blue light, close sensual crop, sensation-play editorial' },
    { id: 'adult-oil-slick',            name: 'Oil Slick',            tag: 'gloss',   adult: true, colors: ['#fbbf24', '#111827'], prompt: 'oiled skin, black background, gold highlights, slick body lines, glossy adult studio glamour' },
    { id: 'adult-ritual-kink',          name: 'Ritual Kink',          tag: 'ritual',  adult: true, colors: ['#581c87', '#facc15'], prompt: 'candlelit kink ritual room, leather collar, gold hardware, dark velvet, incense smoke, occult luxury atmosphere' },
    { id: 'adult-red-room',             name: 'Red Room',             tag: 'bdsm',    adult: true, colors: ['#dc2626', '#111827'], prompt: 'red-lit private room, leather furniture, silk sheets, shadows, high-end adult club mood, charged but composed' },
    // Boudoir, glam, and adult creator looks
    { id: 'adult-boudoir',              name: 'Boudoir',              tag: 'boudoir', adult: true, colors: ['#7f1d1d', '#fda4af'], prompt: 'silk sheets, low lamp light, warm skin, intimate crop, hotel-room heat, classic softcore magazine mood' },
    { id: 'adult-mirror-selfie',        name: 'Mirror Selfie',        tag: 'selfie',  adult: true, colors: ['#f9a8d4', '#fde68a'], prompt: 'bedroom mirror selfie, phone flash, messy sheets, lingerie or cropped tee, creator-feed realism' },
    { id: 'adult-cam-room',             name: 'Cam Room',             tag: 'cam',     adult: true, colors: ['#f472b6', '#22d3ee'], prompt: 'creator cam-room setup, ring light, LED strips, plush chair, direct-to-camera pose, paid-page aesthetic' },
    { id: 'adult-lingerie',             name: 'Lingerie',             tag: 'lingerie',adult: true, colors: ['#fda4af', '#f8fafc'], prompt: 'lace, satin, garters, clean studio light, fashion catalog polish with adult centerfold attitude' },
    { id: 'adult-sheer',                name: 'Sheer',                tag: 'fashion', adult: true, colors: ['#f5f5f4', '#94a3b8'], prompt: 'translucent fabric layers, strategic coverage, runway pose, flash-lit adult fashion editorial' },
    { id: 'adult-body-paint',           name: 'Body Paint',           tag: 'art',     adult: true, colors: ['#22d3ee', '#f97316'], prompt: 'painted-on costume illusion, glossy studio light, bold graphic body shapes, art-photo heat' },
];

const ADULT_PRESET_GUARDRAILS = 'Adult-only preset boundaries: all subjects are clearly adult, consensual staging only, no minors or ageplay, no coercion or nonconsent, no incest or taboo framing, no bestiality, no explicit sex acts, no close-up genital anatomy, no sexualized realistic public figures.';
const DEFAULT_IMAGE_MODEL = 'grok-imagine-image-quality';
const DEFAULT_VIDEO_MODEL = 'grok-imagine-video';
const DEFAULT_IMAGE_RESOLUTION = '2k';
const DEFAULT_IMAGE_ASPECT_RATIO = 'auto';
const DEFAULT_VIDEO_RESOLUTION = '720p';
const DEFAULT_VIDEO_ASPECT_RATIO = '16:9';
const DEFAULT_VIDEO_DURATION = '8';

const IMAGE_INTENSITY_PROMPTS = {
    raw: '',
    clean: 'Use a light touch: preserve the subject, identity, and prompt intent; add only enough art direction to clarify lighting and composition.',
    bold: 'Add confident art direction with sharper lighting, cleaner materials, and stronger camera intent while keeping faces and character identity stable.',
    max: 'Push the selected look hard: bolder lighting, richer materials, more distinctive set design, and an iconic composition while preserving identity.',
};

// ── State ────────────────────────────────────────────────────────────────────
const state = {
    activePanel: 'chat',
    // Chat
    chatMessages: [],
    chatModel: 'grok-4.20-beta-0309-non-reasoning',
    chatStreaming: false,
    systemPrompt: '',
    chatAttachments: [],
    chatImageRef: null,
    chatStylePreset: null,
    chatTools: [],
    agentEffort: 'low',
    // Image
    imagineModel: DEFAULT_IMAGE_MODEL,
    imagineResolution: DEFAULT_IMAGE_RESOLUTION,
    imagineAspectRatio: DEFAULT_IMAGE_ASPECT_RATIO,
    imagineIntensity: 'clean',
    imagineSource: null,
    imagineSourceUrl: null,
    imagineStylePreset: null,
    imagineImages: [],
    imagineSelected: null,
    adultStylesEnabled: false,
    // Video
    videoPolling: null,
    videoModel: DEFAULT_VIDEO_MODEL,
    videoDuration: DEFAULT_VIDEO_DURATION,
    videoResolution: DEFAULT_VIDEO_RESOLUTION,
    videoAspectRatio: DEFAULT_VIDEO_ASPECT_RATIO,
    videoSource: null,
    videoSourceUrl: null,
    videoSourceLoading: false,
    videos: [],
    videoSelected: null,
    videoNarrative: [],  // tracks previous prompts for scene continuity
    videoFromFreeze: false,  // true when source came from freeze frame
    stitchMode: false,
    stitchQueue: [],
    chatVideos: [],
    fuseSlots: [],
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
    codeTools: ['code_execution'],
    // Artifacts
    currentArtifact: null,
    artifacts: [],
    // Skills
    skills: [],
    // Collections
    collections: [],
    // Chat Voice
    chatVoiceActive: false,
    chatVoiceWs: null,
    chatVoiceAudioCtx: null,
    chatVoiceProcessor: null,
    chatVoiceMediaStream: null,
    chatVoiceSource: null,
    chatVoicePlaybackQueue: [],
    chatVoiceIsPlaying: false,
    chatVoiceSpeaking: false,
    chatVoiceResponseText: '',
    chatVoiceStreamEl: null,
};

const DORK_AVATAR_SVG = '<svg viewBox="0 0 64 64" fill="none" style="width:100%;height:100%"><ellipse cx="32" cy="32" rx="24" ry="7" stroke="#7c5cfc" stroke-width="1.5" opacity="0.35" transform="rotate(4 32 32)"/><circle cx="32" cy="32" r="12" fill="#030308" stroke="#7c5cfc" stroke-width="2"/><circle cx="32" cy="32" r="7" fill="rgba(124,92,252,0.3)"/><circle cx="27" cy="29" r="5" fill="white"/><circle cx="38" cy="28" r="3.8" fill="white"/><circle cx="28.2" cy="28.2" r="2.5" fill="#030308"/><circle cx="39" cy="27" r="1.9" fill="#030308"/><circle cx="27" cy="27.5" r="0.9" fill="white"/><circle cx="38.2" cy="26.2" r="0.7" fill="white"/><path d="M27 37 Q32 42 38 36" stroke="#a78bfa" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
const DEFAULT_CHAT_MODEL = 'grok-4.20-beta-0309-non-reasoning';

function isMultiAgentModel(modelId = state.chatModel) {
    return modelId.includes('multi-agent');
}

function updateAgentTeamVisibility() {
    const strip = document.getElementById('agent-team-strip');
    if (strip) strip.style.display = isMultiAgentModel() ? 'flex' : 'none';
    document.querySelectorAll('[data-agent-effort]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.agentEffort === state.agentEffort);
    });
}

function ensureEnabledModel(selectId, stateKey, fallback = DEFAULT_CHAT_MODEL) {
    const select = document.getElementById(selectId);
    if (!select) return state[stateKey] || fallback;
    const current = state[stateKey] || select.value || fallback;
    let opt = [...select.options].find(o => o.value === current && !o.disabled);
    if (!opt) opt = [...select.options].find(o => o.value === fallback && !o.disabled);
    if (!opt) opt = [...select.options].find(o => !o.disabled);
    if (opt) {
        select.value = opt.value;
        state[stateKey] = opt.value;
    }
    return state[stateKey] || fallback;
}

function syncSelectValue(ids, value) {
    for (const id of ids) {
        const el = document.getElementById(id);
        if (el && value && [...el.options].some(opt => opt.value === value)) el.value = value;
    }
}

function setSharedMediaSetting(key, value, ids) {
    state[key] = value;
    syncSelectValue(ids, value);
    savePersistence();
}

function syncMediaControlValues() {
    syncSelectValue(['imagine-model', 'chat-image-model'], state.imagineModel || DEFAULT_IMAGE_MODEL);
    syncSelectValue(['imagine-resolution', 'chat-image-resolution'], state.imagineResolution || DEFAULT_IMAGE_RESOLUTION);
    syncSelectValue(['imagine-aspect', 'chat-image-aspect'], state.imagineAspectRatio || DEFAULT_IMAGE_ASPECT_RATIO);
    syncSelectValue(['imagine-intensity', 'chat-image-strength'], state.imagineIntensity || 'clean');
    syncSelectValue(['video-model', 'chat-video-model'], state.videoModel || DEFAULT_VIDEO_MODEL);
    syncSelectValue(['video-duration', 'chat-video-duration'], state.videoDuration || DEFAULT_VIDEO_DURATION);
    syncSelectValue(['video-resolution', 'chat-video-resolution'], state.videoResolution || DEFAULT_VIDEO_RESOLUTION);
    syncSelectValue(['video-aspect', 'chat-video-aspect'], state.videoAspectRatio || DEFAULT_VIDEO_ASPECT_RATIO);
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupChat();
    setupImagine();
    setupFuse();
    setupVideo();
    setupVoice();
    setupCode();
    setupArtifacts();
    setupSkills();
    setupLibrary();
    setupCollections();
    setupSettings();
    setupToolStrips();
    setupSmartConsole();
    renderSkinPicker();
    setupKeyboardShortcuts();
    loadGalleries();
    loadModelRegistry();
    loadCollectionSelectors();
    restorePersistence();
    updateAgentTeamVisibility();
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

// ── Model Registry ───────────────────────────────────────────────────────────
async function loadModelRegistry() {
    try {
        const resp = await fetch('/api/models');
        const data = await resp.json();
        const language = data.language || [];
        populateModelSelect('chat-model', language, state.chatModel);
        populateModelSelect('code-model', language, state.codeModel, true);
        populateGenerationModelSelect('imagine-model', data.image || [], state.imagineModel, DEFAULT_IMAGE_MODEL);
        populateGenerationModelSelect('chat-image-model', data.image || [], state.imagineModel, DEFAULT_IMAGE_MODEL);
        populateGenerationModelSelect('video-model', data.video || [], state.videoModel, DEFAULT_VIDEO_MODEL);
        populateGenerationModelSelect('chat-video-model', data.video || [], state.videoModel, DEFAULT_VIDEO_MODEL);
        syncMediaControlValues();

        const early = language.filter(m => m.early_access || m.tag === 'early-access');
        const status = document.getElementById('early-access-status');
        if (status) {
            status.textContent = early.length
                ? `${early.length} early access model${early.length === 1 ? '' : 's'} available`
                : 'Grok 4.3 beta will appear here when your API key exposes it.';
        }
        const note = document.getElementById('model-discovery-note');
        if (note) note.textContent = data.discovery?.note || `${language.length} language models loaded.`;
    } catch {
        const note = document.getElementById('model-discovery-note');
        if (note) note.textContent = 'Using bundled model list.';
    }
}

function populateGenerationModelSelect(selectId, models, selected, fallback) {
    const select = document.getElementById(selectId);
    if (!select || !models.length) return;
    const current = selected || select.value || fallback;
    const seen = new Set();
    const options = [];
    for (const m of models) {
        if (!m.id || seen.has(m.id)) continue;
        seen.add(m.id);
        const locked = m.available === false;
        const price = m.price ? ` · ${m.price}` : '';
        const version = m.version ? ` · ${m.version}` : '';
        const suffix = locked ? ' · locked' : '';
        options.push(`<option value="${escapeAttr(m.id)}" ${locked ? 'disabled' : ''}>${escapeHtml(m.name || m.id)}${price}${version}${suffix}</option>`);
        for (const alias of (m.aliases || [])) {
            if (!alias || alias === m.id || seen.has(alias)) continue;
            seen.add(alias);
            options.push(`<option value="${escapeAttr(alias)}" ${locked ? 'disabled' : ''}>${escapeHtml(alias)} · alias${suffix}</option>`);
        }
    }
    select.innerHTML = options.join('');
    const enabledCurrent = [...select.options].some(opt => opt.value === current && !opt.disabled);
    if (enabledCurrent) select.value = current;
    else {
        const next = [...select.options].find(opt => opt.value === fallback && !opt.disabled) || [...select.options].find(opt => !opt.disabled);
        if (next) select.value = next.value;
    }
    if (selectId === 'imagine-model' || selectId === 'chat-image-model') state.imagineModel = select.value;
    if (selectId === 'video-model' || selectId === 'chat-video-model') state.videoModel = select.value;
}

function populateModelSelect(selectId, models, selected, codeFirst = false) {
    const select = document.getElementById(selectId);
    if (!select || !models.length) return;
    const current = selected || select.value;
    const extraOptions = [...select.options]
        .filter(opt => opt.value && !opt.value.toLowerCase().includes('grok'))
        .map(opt => ({ value: opt.value, label: opt.textContent }));
    const ordered = [...models].sort((a, b) => {
        if (codeFirst) {
            const ac = a.tag === 'code' ? -1 : 0;
            const bc = b.tag === 'code' ? -1 : 0;
            if (ac !== bc) return ac - bc;
        }
        return 0;
    });
    const grokOptions = ordered.map(m => {
        const locked = m.available === false;
        const tag = locked ? 'Locked' : m.tag === 'early-access' ? 'Beta' : m.tag === 'multi-agent' ? 'Agent' : m.tag === 'reasoning' ? 'Reasoning' : m.tag === 'code' ? 'Code' : 'Fast';
        const ctx = m.context ? ` · ${(m.context / 1000).toLocaleString()}K ctx` : '';
        const suffix = locked ? ' · not available to this API key' : '';
        return `<option value="${escapeAttr(m.id)}" ${locked ? 'disabled' : ''}>${escapeHtml(m.name)} · ${tag}${ctx}${suffix}</option>`;
    });
    const otherOptions = extraOptions.map(opt => `<option value="${escapeAttr(opt.value)}">${escapeHtml(opt.label)}</option>`);
    select.innerHTML = [...grokOptions, ...otherOptions].join('');
    const enabledCurrent = [...select.options].some(opt => opt.value === current && !opt.disabled);
    if (enabledCurrent) select.value = current;
    else {
        const fallback = selectId === 'chat-model' ? DEFAULT_CHAT_MODEL : state.codeModel;
        const next = [...select.options].find(opt => opt.value === fallback && !opt.disabled) || [...select.options].find(opt => !opt.disabled);
        if (next) select.value = next.value;
    }
    if (selectId === 'chat-model') {
        state.chatModel = select.value;
        updateAgentTeamVisibility();
    }
    if (selectId === 'code-model') state.codeModel = select.value;
}

function setupToolStrips() {
    wireToolStrip('chat-tool-strip', 'chatTools');
    wireToolStrip('code-tool-strip', 'codeTools');
    document.querySelectorAll('[data-agent-effort]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.agentEffort = btn.dataset.agentEffort;
            updateAgentTeamVisibility();
            savePersistence();
        });
    });
}

function wireToolStrip(stripId, stateKey) {
    const strip = document.getElementById(stripId);
    if (!strip) return;
    strip.querySelectorAll('.tool-chip[data-tool]').forEach(btn => {
        btn.classList.toggle('active', state[stateKey].includes(btn.dataset.tool));
        btn.addEventListener('click', () => {
            const tool = btn.dataset.tool;
            state[stateKey] = state[stateKey].includes(tool)
                ? state[stateKey].filter(t => t !== tool)
                : [...state[stateKey], tool];
            btn.classList.toggle('active', state[stateKey].includes(tool));
            savePersistence();
        });
    });
}

function updateToolStrip(stripId, stateKey) {
    const strip = document.getElementById(stripId);
    if (!strip) return;
    strip.querySelectorAll('.tool-chip[data-tool]').forEach(btn => {
        btn.classList.toggle('active', state[stateKey].includes(btn.dataset.tool));
    });
}

// ── Smart Console ────────────────────────────────────────────────────────────
const smartConsole = {
    workspace: null,
    commands: [],
    activeIndex: 0,
};

function setupSmartConsole() {
    document.getElementById('command-palette-btn')?.addEventListener('click', openCommandPalette);
}

function buildCommandList() {
    const panels = [
        ['chat', 'Chat', 'Open the main conversation surface'],
        ['imagine', 'Imagine', 'Open image generation'],
        ['video', 'Video', 'Open video generation'],
        ['voice', 'Voice', 'Open voice tools'],
        ['code', 'Code', 'Open coding workspace'],
        ['artifacts', 'Artifacts', 'Open saved previews'],
        ['skills', 'Skills', 'Open skill builder'],
        ['library', 'Library', 'Open image library'],
        ['collections', 'Collections', 'Open RAG collections'],
    ];
    return [
        ...panels.map(([id, title, desc]) => ({ id: `panel:${id}`, icon: title[0], title, desc, scope: 'panel', run: () => switchPanel(id) })),
        { id: 'tool:web_search', icon: 'W', title: 'Toggle Web', desc: 'Toggle xAI web search for chat', scope: 'tool', run: () => toggleSmartTool('web_search') },
        { id: 'tool:code_execution', icon: '>', title: 'Toggle Code Execution', desc: 'Toggle xAI code execution for chat', scope: 'tool', run: () => toggleSmartTool('code_execution') },
        { id: 'tool:collections_search', icon: 'F', title: 'Toggle Files', desc: 'Toggle collection search for chat', scope: 'tool', run: () => toggleSmartTool('collections_search') },
    ];
}

function toggleSmartTool(tool) {
    state.chatTools = state.chatTools.includes(tool)
        ? state.chatTools.filter(t => t !== tool)
        : [...state.chatTools, tool];
    updateToolStrip('chat-tool-strip', 'chatTools');
    savePersistence();
    toast(`${tool.replace(/_/g, ' ')} ${state.chatTools.includes(tool) ? 'on' : 'off'}`, 'success');
}

function openCommandPalette() {
    closeCommandPalette();
    smartConsole.commands = buildCommandList();
    smartConsole.activeIndex = 0;
    const overlay = document.createElement('div');
    overlay.className = 'command-palette-overlay';
    overlay.innerHTML = `
        <div class="command-palette" role="dialog" aria-label="Command palette">
            <input class="command-search" placeholder="Search commands..." autocomplete="off">
            <div class="command-list"></div>
        </div>
    `;
    document.body.appendChild(overlay);
    const search = overlay.querySelector('.command-search');
    search.addEventListener('input', () => {
        smartConsole.activeIndex = 0;
        renderCommandPalette(search.value);
    });
    search.addEventListener('keydown', e => {
        const visible = getVisibleCommands(search.value);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            smartConsole.activeIndex = Math.min(visible.length - 1, smartConsole.activeIndex + 1);
            renderCommandPalette(search.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            smartConsole.activeIndex = Math.max(0, smartConsole.activeIndex - 1);
            renderCommandPalette(search.value);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            visible[smartConsole.activeIndex]?.run();
            closeCommandPalette();
        } else if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeCommandPalette();
    });
    renderCommandPalette('');
    search.focus();
}

function closeCommandPalette() {
    document.querySelector('.command-palette-overlay')?.remove();
}

function getVisibleCommands(query) {
    const q = query.trim().toLowerCase();
    if (!q) return smartConsole.commands;
    return smartConsole.commands.filter(cmd =>
        `${cmd.title} ${cmd.desc} ${cmd.scope}`.toLowerCase().includes(q)
    );
}

function renderCommandPalette(query) {
    const list = document.querySelector('.command-list');
    if (!list) return;
    const visible = getVisibleCommands(query);
    if (!visible.length) {
        list.innerHTML = '<div class="command-empty">No matching commands</div>';
        return;
    }
    smartConsole.activeIndex = Math.min(smartConsole.activeIndex, visible.length - 1);
    list.innerHTML = visible.map((cmd, index) => `
        <button class="command-item ${index === smartConsole.activeIndex ? 'active' : ''}" data-command="${escapeAttr(cmd.id)}">
            <span class="command-icon">${escapeHtml(cmd.icon)}</span>
            <span><span class="command-title">${escapeHtml(cmd.title)}</span><span class="command-desc">${escapeHtml(cmd.desc)}</span></span>
            <span class="command-scope">${escapeHtml(cmd.scope)}</span>
        </button>
    `).join('');
    list.querySelectorAll('.command-item').forEach((btn, index) => {
        btn.addEventListener('mouseenter', () => smartConsole.activeIndex = index);
        btn.addEventListener('click', () => {
            visible[index].run();
            closeCommandPalette();
        });
    });
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
    document.getElementById('chat-model').addEventListener('change', e => {
        state.chatModel = e.target.value;
        updateAgentTeamVisibility();
        savePersistence();
    });
    document.getElementById('chat-clear').addEventListener('click', () => {
        state.chatMessages = [];
        document.getElementById('chat-messages').innerHTML = '';
        savePersistence();
    });
    document.getElementById('chat-system').addEventListener('click', () => {
        const val = prompt('System prompt (leave empty to clear):', state.systemPrompt);
        if (val !== null) state.systemPrompt = val;
    });
    document.getElementById('chat-image-model')?.addEventListener('change', e => setSharedMediaSetting('imagineModel', e.target.value, ['imagine-model', 'chat-image-model']));
    document.getElementById('chat-image-resolution')?.addEventListener('change', e => setSharedMediaSetting('imagineResolution', e.target.value, ['imagine-resolution', 'chat-image-resolution']));
    document.getElementById('chat-image-aspect')?.addEventListener('change', e => setSharedMediaSetting('imagineAspectRatio', e.target.value, ['imagine-aspect', 'chat-image-aspect']));
    document.getElementById('chat-image-strength')?.addEventListener('change', e => setSharedMediaSetting('imagineIntensity', e.target.value, ['imagine-intensity', 'chat-image-strength']));
    document.getElementById('chat-video-model')?.addEventListener('change', e => setSharedMediaSetting('videoModel', e.target.value, ['video-model', 'chat-video-model']));
    document.getElementById('chat-video-duration')?.addEventListener('change', e => setSharedMediaSetting('videoDuration', e.target.value, ['video-duration', 'chat-video-duration']));
    document.getElementById('chat-video-resolution')?.addEventListener('change', e => setSharedMediaSetting('videoResolution', e.target.value, ['video-resolution', 'chat-video-resolution']));
    document.getElementById('chat-video-aspect')?.addEventListener('change', e => setSharedMediaSetting('videoAspectRatio', e.target.value, ['video-aspect', 'chat-video-aspect']));
    document.getElementById('chat-style-select')?.addEventListener('change', e => selectChatStylePreset(e.target.value));
    document.getElementById('chat-style-random')?.addEventListener('click', randomChatStylePreset);
    document.getElementById('chat-style-clear')?.addEventListener('click', clearChatStylePreset);
    renderChatStyleSelect();

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
        if (isImage && !isSupportedReferenceImage(file)) continue;
        const ext = file.name.split('.').pop().toUpperCase();
        const reader = new FileReader();
        reader.onload = async e => {
            const dataUrl = isImage ? await assetLibDownscale(e.target.result, 2048) : e.target.result;
            const type = isImage ? (dataUrl.match(/^data:([^;]+)/)?.[1] || file.type) : file.type;
            const attachment = { name: file.name, type, dataUrl, isImage, ext };
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

// ── Action Tag Processor ──────────────────────────────────────────────────────
async function processActionTags(content, bodyEl) {
    const imageMatches = [...content.matchAll(/\[GENERATE_IMAGE:\s*(.+?)\]/gi)];
    const videoMatches = [...content.matchAll(/\[GENERATE_VIDEO:\s*(.+?)\]/gi)];
    const editMatches = [...content.matchAll(/\[EDIT_IMAGE:\s*(.+?)\]/gi)];
    const extendMatches = [...content.matchAll(/\[EXTEND_VIDEO:\s*(.+?)\]/gi)];
    const stitchMatches = [...content.matchAll(/\[STITCH_VIDEOS\]/gi)];
    const combineMatches = [...content.matchAll(/\[COMBINE_IMAGES(?::\s*(.+?))?\]/gi)];
    const charComboMatches = [...content.matchAll(/\[COMBINE_CHARACTERS(?::\s*(.+?))?\]/gi)];

    if (!imageMatches.length && !videoMatches.length && !editMatches.length && !extendMatches.length && !stitchMatches.length && !combineMatches.length && !charComboMatches.length) return;

    for (const match of imageMatches) {
        const prompt = match[1].trim().slice(0, 500);
        const styledPrompt = composeImagePrompt(prompt, 'chat');
        const placeholder = match[0];
        try {
            let { endpoint, payload: genPayload } = buildImageRequestBase(false);
            genPayload.prompt = styledPrompt;
            const refB64 = state.chatImageRef || state.imagineSource;
            if (refB64) {
                ({ endpoint, payload: genPayload } = buildImageRequestBase(true));
                genPayload.image = refB64;
                genPayload.prompt = `Preserve the EXACT face, facial features, hair, eye color, skin tone, and physical appearance of the character/person in this image. Place them in a new scene: ${styledPrompt}`;
            }
            else if (state.imagineImages.length) {
                try { const rb = await fetch(state.imagineImages[0].url).then(r => r.blob()); ({ endpoint, payload: genPayload } = buildImageRequestBase(true)); genPayload.image = await new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(rb); }); genPayload.prompt = `Preserve the EXACT face, facial features, hair, eye color, skin tone, and physical appearance of the character/person in this image. Place them in a new scene: ${styledPrompt}`; } catch {}
            }
            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(genPayload),
            });
            const data = await resp.json();
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img);
                refreshImagineGallery();
                refreshVideoImagePicker();
                loadLibrary();
                const imgHtml = `<div class="action-tag-result" style="margin:8px 0">
                    <p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">🎨 ${escapeHtml(prompt)}</p>
                    <img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
                    <div class="cross-tab-actions" style="margin-top:4px">
                        <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit">Edit</button>
                        <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Video">Video</button>
                        <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Save">Save</button>
                    </div>
                </div>`;
                bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder), imgHtml);
            } else if (data.error) {
                bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                    `<span style="color:var(--red);font-size:12px">Image generation failed: ${escapeHtml(data.error)}</span>`);
            }
        } catch (err) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--red);font-size:12px">Image generation failed: ${escapeHtml(err.message)}</span>`);
        }
    }

    for (const match of videoMatches) {
        const prompt = match[1].trim();
        const placeholder = match[0];
        const placeholderId = 'vid-' + Date.now() + Math.random().toString(36).slice(2, 6);
        bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
            `<div id="${placeholderId}" class="action-tag-result" style="margin:8px 0">
                <p style="color:var(--text-dim);font-size:11px">🎬 ${escapeHtml(prompt)}</p>
                <div class="typing-indicator" style="margin:8px 0"><span></span><span></span><span></span></div>
                <span style="color:var(--text-dim);font-size:11px">Generating video...</span>
            </div>`);
        try {
            const vidPayload = { prompt, ...getVideoApiSettings() };
            const vidSource = state.chatImageRef || state.videoSource || state.imagineSource;
            if (vidSource) { vidPayload.image = vidSource; }
            else if (state.imagineImages.length) {
                try { const vb = await fetch(state.imagineImages[0].url).then(r => r.blob()); vidPayload.image = await new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(vb); }); } catch {}
            }
            const resp = await fetch('/api/video/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vidPayload),
            });
            const data = await resp.json();
            if (data.id) {
                const pollTimer = setInterval(async () => {
                    try {
                        const pr = await fetch(`/api/video/poll?id=${data.id}`);
                        const pd = await pr.json();
                        const el = document.getElementById(placeholderId);
                        if (!el) { clearInterval(pollTimer); return; }
                        if (pd.status === 'completed') {
                            clearInterval(pollTimer);
                            state.videos.unshift({ filename: pd.filename, url: pd.url });
                            state.chatVideos.push({ filename: pd.filename, url: pd.url, prompt });
                            refreshVideoGallery();
                            el.innerHTML = `<p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">🎬 ${escapeHtml(prompt)}</p>
                                <video src="${pd.url}" controls style="max-width:100%;border-radius:var(--radius-sm)"></video>
                                <div class="cross-tab-actions" style="margin-top:4px">
                                    <button class="btn btn-sm btn-ghost" onclick="downloadVideo('${pd.url}','${pd.filename}')" title="Save">Save</button>
                                </div>`;
                            toast('Video ready!', 'success');
                        } else if (pd.error) {
                            clearInterval(pollTimer);
                            el.innerHTML = `<span style="color:var(--red);font-size:12px">Video failed: ${escapeHtml(pd.error)}</span>`;
                        }
                    } catch {}
                }, 3000);
            }
        } catch (err) {
            const el = document.getElementById(placeholderId);
            if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Video generation failed: ${escapeHtml(err.message)}</span>`;
        }
    }

    for (const match of editMatches) {
        const prompt = match[1].trim();
        const placeholder = match[0];
        const sourceImage = state.imagineImages.length ? state.imagineImages[0] : null;
        if (!sourceImage) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--text-dim);font-size:12px">No image in gallery to edit. Generate one first.</span>`);
            continue;
        }
        try {
            const imgResp = await fetch(sourceImage.url);
            const blob = await imgResp.blob();
            const base64 = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(blob);
            });
            const { endpoint, payload } = buildImageRequestBase(true);
            payload.prompt = prompt;
            payload.image = base64;
            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await resp.json();
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img);
                refreshImagineGallery();
                refreshVideoImagePicker();
                loadLibrary();
                const imgHtml = `<div class="action-tag-result" style="margin:8px 0">
                    <p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">✏️ Edit: ${escapeHtml(prompt)}</p>
                    <img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
                    <div class="cross-tab-actions" style="margin-top:4px">
                        <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit again">Edit</button>
                        <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Video">Video</button>
                        <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Save">Save</button>
                    </div>
                </div>`;
                bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder), imgHtml);
            }
        } catch (err) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--red);font-size:12px">Image edit failed: ${escapeHtml(err.message)}</span>`);
        }
    }

    for (const match of extendMatches) {
        const prompt = match[1].trim();
        const placeholder = match[0];
        const lastVideo = state.chatVideos.length ? state.chatVideos[state.chatVideos.length - 1] : null;
        if (!lastVideo) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--text-dim);font-size:12px">No video to extend. Generate one first.</span>`);
            continue;
        }
        const placeholderId = 'ext-' + Date.now() + Math.random().toString(36).slice(2, 6);
        bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
            `<div id="${placeholderId}" class="action-tag-result" style="margin:8px 0">
                <p style="color:var(--text-dim);font-size:11px">🔄 Extending from: ${escapeHtml(lastVideo.prompt || lastVideo.filename)}</p>
                <div class="typing-indicator" style="margin:8px 0"><span></span><span></span><span></span></div>
                <span style="color:var(--text-dim);font-size:11px">Extracting last frame & generating continuation...</span>
            </div>`);
        try {
            const frameResp = await fetch('/api/video/lastframe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: lastVideo.filename }),
            });
            const frameData = await frameResp.json();
            if (frameData.error) throw new Error(frameData.error);
            state.imagineImages.unshift({ filename: frameData.filename, url: frameData.url });
            refreshImagineGallery();
            const vidResp = await fetch('/api/video/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, image: frameData.base64, ...getVideoApiSettings() }),
            });
            const vidData = await vidResp.json();
            if (vidData.id) {
                const pollTimer = setInterval(async () => {
                    try {
                        const pr = await fetch(`/api/video/poll?id=${vidData.id}`);
                        const pd = await pr.json();
                        const el = document.getElementById(placeholderId);
                        if (!el) { clearInterval(pollTimer); return; }
                        if (pd.status === 'completed') {
                            clearInterval(pollTimer);
                            state.videos.unshift({ filename: pd.filename, url: pd.url });
                            state.chatVideos.push({ filename: pd.filename, url: pd.url, prompt, extendsFrom: lastVideo.filename });
                            refreshVideoGallery();
                            el.innerHTML = `<p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">🔄 Extension: ${escapeHtml(prompt)}</p>
                                <div style="display:flex;gap:4px;align-items:center;margin-bottom:6px">
                                    <img src="${frameData.url}" style="width:60px;height:40px;object-fit:cover;border-radius:4px;opacity:0.6" title="Last frame used as reference">
                                    <span style="color:var(--text-dim);font-size:10px">→</span>
                                </div>
                                <video src="${pd.url}" controls style="max-width:100%;border-radius:var(--radius-sm)"></video>
                                <div class="cross-tab-actions" style="margin-top:4px">
                                    <button class="btn btn-sm btn-ghost" onclick="downloadVideo('${pd.url}','${pd.filename}')" title="Save">Save</button>
                                </div>`;
                            toast('Video extension ready!', 'success');
                        } else if (pd.error) {
                            clearInterval(pollTimer);
                            el.innerHTML = `<span style="color:var(--red);font-size:12px">Extension failed: ${escapeHtml(pd.error)}</span>`;
                        }
                    } catch {}
                }, 3000);
            }
        } catch (err) {
            const el = document.getElementById(placeholderId);
            if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Video extension failed: ${escapeHtml(err.message)}</span>`;
        }
    }

    for (const match of stitchMatches) {
        const placeholder = match[0];
        if (state.chatVideos.length < 2) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--text-dim);font-size:12px">Need at least 2 chat videos to stitch. You have ${state.chatVideos.length}.</span>`);
            continue;
        }
        const placeholderId = 'stitch-' + Date.now();
        bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
            `<div id="${placeholderId}" class="action-tag-result" style="margin:8px 0">
                <p style="color:var(--text-dim);font-size:11px">🎬 Stitching ${state.chatVideos.length} videos...</p>
                <div class="typing-indicator" style="margin:8px 0"><span></span><span></span><span></span></div>
            </div>`);
        try {
            const filenames = state.chatVideos.map(v => v.filename);
            const resp = await fetch('/api/video/stitch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videos: filenames }),
            });
            const data = await resp.json();
            const el = document.getElementById(placeholderId);
            if (data.error) {
                if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Stitch failed: ${escapeHtml(data.error)}</span>`;
            } else {
                state.videos.unshift({ filename: data.filename, url: data.url });
                refreshVideoGallery();
                if (el) el.innerHTML = `<p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">🎬 Stitched ${filenames.length} videos</p>
                    <video src="${data.url}" controls style="max-width:100%;border-radius:var(--radius-sm)"></video>
                    <div class="cross-tab-actions" style="margin-top:4px">
                        <button class="btn btn-sm btn-ghost" onclick="downloadVideo('${data.url}','${data.filename}')" title="Save">Save</button>
                    </div>`;
                toast('Videos stitched!', 'success');
            }
        } catch (err) {
            const el = document.getElementById(placeholderId);
            if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Stitch failed: ${escapeHtml(err.message)}</span>`;
        }
    }

    for (const match of combineMatches) {
        const userPrompt = (match[1] || '').trim();
        const placeholder = match[0];
        if (state.imagineImages.length < 2) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
                `<span style="color:var(--text-dim);font-size:12px">Need at least 2 images to combine.</span>`);
            continue;
        }
        const placeholderId = 'combine-' + Date.now();
        bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
            `<div id="${placeholderId}" class="action-tag-result" style="margin:8px 0">
                <div style="display:flex;gap:4px;margin-bottom:6px">
                    <img src="${state.imagineImages[0].url}" style="width:60px;height:60px;object-fit:cover;border-radius:4px">
                    <span style="color:var(--text-dim);font-size:18px;align-self:center">+</span>
                    <img src="${state.imagineImages[1].url}" style="width:60px;height:60px;object-fit:cover;border-radius:4px">
                </div>
                <div class="typing-indicator" style="margin:4px 0"><span></span><span></span><span></span></div>
                <span style="color:var(--text-dim);font-size:11px">Analyzing & fusing images...</span>
            </div>`);
        try {
            const [resp1, resp2] = await Promise.all([
                fetch(state.imagineImages[0].url).then(r => r.blob()),
                fetch(state.imagineImages[1].url).then(r => r.blob()),
            ]);
            const [b64_1, b64_2] = await Promise.all([
                new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(resp1); }),
                new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(resp2); }),
            ]);
            const resp = await fetch('/api/image/combine', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image1: b64_1, image2: b64_2, prompt: userPrompt }),
            });
            const data = await resp.json();
            const el = document.getElementById(placeholderId);
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img);
                refreshImagineGallery(); refreshVideoImagePicker(); loadLibrary();
                if (el) el.innerHTML = `<p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">🔀 Fusion: ${escapeHtml(data.fusion_prompt || userPrompt)}</p>
                    <img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
                    <div class="cross-tab-actions" style="margin-top:4px">
                        <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit">Edit</button>
                        <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Video">Video</button>
                        <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Save">Save</button>
                    </div>`;
                toast('Images combined!', 'success');
            } else if (data.error) {
                if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Combine failed: ${escapeHtml(data.error)}</span>`;
            }
        } catch (err) {
            const el = document.getElementById(placeholderId);
            if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">Combine failed: ${escapeHtml(err.message)}</span>`;
        }
    }

    for (const match of charComboMatches) {
        const scenePrompt = (match[1] || '').trim();
        const placeholder = match[0];
        if (state.imagineImages.length < 2) {
            bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder), `<span style="color:var(--text-dim);font-size:12px">Need 2 images with characters.</span>`);
            continue;
        }
        const placeholderId = 'charcombo-' + Date.now();
        bodyEl.innerHTML = bodyEl.innerHTML.replace(escapeHtml(placeholder),
            `<div id="${placeholderId}" class="action-tag-result" style="margin:8px 0">
                <div style="display:flex;gap:4px;margin-bottom:6px"><img src="${state.imagineImages[0].url}" style="width:50px;height:50px;object-fit:cover;border-radius:50%"><span style="color:var(--text-dim);font-size:16px;align-self:center">+</span><img src="${state.imagineImages[1].url}" style="width:50px;height:50px;object-fit:cover;border-radius:50%"></div>
                <div class="typing-indicator" style="margin:4px 0"><span></span><span></span><span></span></div>
                <span style="color:var(--text-dim);font-size:11px">Analyzing characters & generating scene...</span>
            </div>`);
        try {
            const [r1, r2] = await Promise.all([fetch(state.imagineImages[0].url).then(r => r.blob()), fetch(state.imagineImages[1].url).then(r => r.blob())]);
            const [b1, b2] = await Promise.all([
                new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(r1); }),
                new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result.split(',')[1]); r.readAsDataURL(r2); }),
            ]);
            const resp = await fetch('/api/image/combine-characters', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image1: b1, image2: b2, prompt: scenePrompt }) });
            const data = await resp.json();
            const el = document.getElementById(placeholderId);
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img); refreshImagineGallery(); refreshVideoImagePicker(); loadLibrary();
                if (el) el.innerHTML = `<p style="color:var(--text-dim);font-size:11px;margin-bottom:4px">👥 Characters combined</p>
                    <img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
                    <div class="cross-tab-actions" style="margin-top:4px">
                        <button class="btn btn-sm btn-ghost" onclick="crossTabEditImage('${img.url}')" title="Edit">Edit</button>
                        <button class="btn btn-sm btn-ghost" onclick="crossTabUseAsVideoSource('${img.url}')" title="Video">Video</button>
                        <button class="btn btn-sm btn-ghost" onclick="downloadImage('${img.url}','${img.filename}')" title="Save">Save</button>
                    </div>`;
                toast('Characters combined!', 'success');
            } else if (data.error) { if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">${escapeHtml(data.error)}</span>`; }
        } catch (err) { const el = document.getElementById(placeholderId); if (el) el.innerHTML = `<span style="color:var(--red);font-size:12px">${escapeHtml(err.message)}</span>`; }
    }
}

async function sendChatMessage() {
    if (state.chatStreaming) return;
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text && !state.chatAttachments.length) return;
    input.value = '';
    input.style.height = 'auto';

    if (state.chatVoiceActive && !state.chatAttachments.length && text) {
        if (sendChatVoiceText(text)) return;
    }

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
    const imagineMatch = text.match(/^\/(imagine|image)\s+(.+)/i);
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
                tools: state.codeTools,
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
        const prompt = imagineMatch[2];
        const styledPrompt = composeImagePrompt(prompt, 'chat');
        appendMessage('chat-messages', 'user', text);
        const msgEl = appendMessage('chat-messages', 'assistant', '');
        const bodyEl = msgEl.querySelector('.message-body');
        bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div><span style="color:var(--text-dim);margin-left:8px">Generating image...</span>';
        try {
            const { endpoint, payload } = buildImageRequestBase(false);
            payload.prompt = styledPrompt;
            const resp = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            if (data.images?.length) {
                const img = data.images[0];
                state.imagineImages.unshift(img);
                refreshImagineGallery();
                refreshVideoImagePicker();
                loadLibrary();
                const styleLabel = state.chatStylePreset ? ` · ${state.chatStylePreset.name}` : '';
                bodyEl.innerHTML = `<p style="color:var(--text-dim);font-size:12px;margin-bottom:6px">🎨 /imagine${escapeHtml(styleLabel)}: ${escapeHtml(prompt)}</p><img src="${img.url}" style="max-width:100%;border-radius:var(--radius-sm);cursor:pointer" onclick="window.open('${img.url}','_blank')">
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
            const resp = await fetch('/api/video/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, ...getVideoApiSettings() }) });
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

    const imageAttachment = state.chatAttachments.find(a => a.isImage);
    if (imageAttachment) state.chatImageRef = imageAttachment.dataUrl.split(',')[1];

    state.chatAttachments = [];
    renderChatAttachments();

    state.chatStreaming = true;
    document.getElementById('chat-send').disabled = true;

    const msgEl = appendMessage('chat-messages', 'assistant', '');
    const bodyEl = msgEl.querySelector('.message-body');
    bodyEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    try {
        ensureEnabledModel('chat-model', 'chatModel');
        const payload = {
            model: state.chatModel,
            messages: state.chatMessages.map(m => ({ role: m.role, content: m.content })),
            system: buildDorkSystemPrompt(),
            tools: state.chatTools,
        };
        if (isMultiAgentModel()) payload.reasoning = { effort: state.agentEffort };
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

        // Process action tags: [GENERATE_IMAGE: ...], [GENERATE_VIDEO: ...], etc.
        await processActionTags(content, bodyEl);

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
    // Determine suggestion provider: ChatGPT if gpt model selected in imagine, else Grok
    const imagineModelSel = document.getElementById('imagine-model');
    const defaultProvider = (imagineModelSel && imagineModelSel.value.startsWith('gpt-')) ? 'chatgpt' : 'grok';

    // Show overlay with loading state
    const overlay = document.createElement('div');
    overlay.className = 'prompt-suggest-overlay';
    overlay.innerHTML = `
        <div class="prompt-suggest-card">
            <img src="${imageUrl}" class="suggest-img">
            <h3>${mode === 'edit' ? 'Edit Image' : 'Create Video'}</h3>
            <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:8px">
                <label style="font-size:11px;color:var(--text-muted)">Suggestions by:</label>
                <select id="suggest-provider" style="font-size:11px;padding:2px 6px;border-radius:4px;background:var(--bg-elevated);color:var(--text);border:1px solid var(--border)">
                    <option value="grok" ${defaultProvider === 'grok' ? 'selected' : ''}>Grok</option>
                    <option value="chatgpt" ${defaultProvider === 'chatgpt' ? 'selected' : ''}>ChatGPT</option>
                </select>
            </div>
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

        const suggestProvider = document.getElementById('suggest-provider')?.value || 'grok';
        const suggestEndpoint = suggestProvider === 'chatgpt' ? '/api/chat/sync-openai' : '/api/chat/sync';
        const suggestPayload = suggestProvider === 'chatgpt'
            ? {
                messages: [{ role: 'user', content: mode === 'edit'
                    ? 'Suggest 3 creative edits for an image. Be creative and varied — one subtle, one dramatic, one artistic. Return ONLY a JSON array of 3 strings, each under 80 chars.'
                    : 'Suggest 3 creative video animations for an image. Be creative — one cinematic, one dynamic, one atmospheric. Return ONLY a JSON array of 3 strings, each under 80 chars.' }],
                system: sysPrompt
              }
            : {
                model: 'grok-4-1-fast-non-reasoning',
                messages: [{ role: 'user', content: [
                    { type: 'text', text: mode === 'edit' ? 'Suggest 3 creative edits for this image.' : 'Suggest 3 creative video animations for this image.' },
                    { type: 'image_url', image_url: { url: imgDataUrl } }
                ]}],
                system: sysPrompt
              };

        const resp = await fetch(suggestEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(suggestPayload)
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
    return String(text ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

// ── Live Voice in Chat ───────────────────────────────────────────────────────
async function toggleChatVoice() {
    if (state.chatVoiceActive) { stopChatVoice(); return; }
    const micBtn = document.getElementById('chat-mic');
    const voiceBar = document.getElementById('chat-voice-bar');
    const statusEl = document.getElementById('chat-voice-status');
    const pulseEl = document.getElementById('chat-voice-pulse');
    micBtn.classList.add('active');
    voiceBar.style.display = 'flex';
    pulseEl.className = 'voice-pulse connecting';
    statusEl.textContent = 'Getting token...';
    try {
        const tokenResp = await fetch('/api/realtime/token', { method: 'POST' });
        const tokenData = await tokenResp.json();
        if (tokenData.error) throw new Error(tokenData.error);
        const token = tokenData.token || tokenData.value;
        if (!token) throw new Error('No token returned');
        statusEl.textContent = 'Connecting...';
        const ws = new WebSocket('wss://api.x.ai/v1/realtime', [`xai-client-secret.${token}`]);
        state.chatVoiceWs = ws;
        ws.onopen = () => {
            statusEl.textContent = 'Configuring...';
            const voice = document.getElementById('chat-voice-select').value;
            const persona = document.getElementById('chat-voice-persona').value.trim();
            const combinedStyle = [state.systemPrompt, persona].filter(Boolean).join('\n');
            const userInstructions = combinedStyle ? `\n\nUser style instructions:\n${combinedStyle}` : '';
            const voiceInstructions = (combinedStyle
                ? `YOUR CHARACTER / PERSONA — THIS IS WHO YOU ARE:\n${combinedStyle}\n\nStay in this character for the entire conversation. Never break character.\n\n`
                : '') +
`You are in a live voice conversation. Everything you say is spoken aloud.

RULES:
1. You CANNOT generate images, videos, or media. A background system does that. You just talk.
2. When asked to make/create/generate anything visual — just give a SHORT natural reaction. One sentence. Do NOT describe what will be created. Do NOT restate the request.
3. NEVER speak prompts, image descriptions, or technical details.
4. Keep responses to 1-2 short sentences max.
5. Be a creative partner, not an assistant.`;
            ws.send(JSON.stringify({ type: 'session.update', session: { voice, instructions: voiceInstructions, turn_detection: { type: 'server_vad' }, input_audio_transcription: { model: 'grok-4-1-fast-non-reasoning' }, audio: { input: { format: { type: 'audio/pcm', rate: 24000 } }, output: { format: { type: 'audio/pcm', rate: 24000 } } } } }));
        };
        ws.onmessage = (event) => { handleChatVoiceEvent(JSON.parse(event.data)); };
        ws.onerror = () => { toast('Voice connection error', 'error'); stopChatVoice(); };
        ws.onclose = () => { if (state.chatVoiceActive) stopChatVoice(); };
    } catch (err) {
        toast(err.message, 'error');
        micBtn.classList.remove('active');
        voiceBar.style.display = 'none';
    }
}

function handleChatVoiceEvent(msg) {
    const statusEl = document.getElementById('chat-voice-status');
    const pulseEl = document.getElementById('chat-voice-pulse');
    switch (msg.type) {
        case 'session.updated':
            state.chatVoiceActive = true;
            statusEl.textContent = 'Listening — speak or type';
            pulseEl.className = 'voice-pulse listening';
            startChatVoiceMic();
            break;
        case 'input_audio_buffer.speech_started':
            pulseEl.className = 'voice-pulse listening';
            statusEl.textContent = 'Listening...';
            state.chatVoicePlaybackQueue = [];
            state.chatVoiceIsPlaying = false;
            break;
        case 'input_audio_buffer.speech_stopped':
            pulseEl.className = 'voice-pulse connecting';
            statusEl.textContent = 'Processing...';
            break;
        case 'conversation.item.input_audio_transcription.completed':
            if (msg.transcript) {
                appendMessage('chat-messages', 'user', msg.transcript);
                state.chatMessages.push({ role: 'user', content: msg.transcript });
                savePersistence();
            }
            break;
        case 'response.output_audio.delta':
            if (!state.chatVoiceSpeaking) {
                state.chatVoiceSpeaking = true;
                pulseEl.className = 'voice-pulse speaking';
                statusEl.textContent = 'Speaking...';
            }
            playChatVoiceChunk(msg.delta);
            break;
        case 'response.output_audio_transcript.delta':
            state.chatVoiceResponseText += (msg.delta || '');
            if (!state.chatVoiceStreamEl) {
                const msgEl = appendMessage('chat-messages', 'assistant', '');
                state.chatVoiceStreamEl = msgEl.querySelector('.message-body');
            }
            renderMessageContent(state.chatVoiceStreamEl, state.chatVoiceResponseText, '');
            break;
        case 'response.output_audio.done':
            state.chatVoiceSpeaking = false;
            break;
        case 'response.done':
            if (state.chatVoiceResponseText) {
                const content = state.chatVoiceResponseText;
                if (state.chatVoiceStreamEl) {
                    renderMessageContent(state.chatVoiceStreamEl, content, '');
                    addCrossTabActions(state.chatVoiceStreamEl, content);
                }
                state.chatMessages.push({ role: 'assistant', content });
                savePersistence();
                state.chatVoiceResponseText = '';
                state.chatVoiceStreamEl = null;
                detectVoiceMediaIntent(content);
            }
            pulseEl.className = 'voice-pulse listening';
            statusEl.textContent = 'Listening — speak anytime';
            break;
        case 'error':
            toast(msg.message || 'Voice error', 'error');
            break;
    }
}

async function startChatVoiceMic() {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 24000, channelCount: 1, echoCancellation: true, noiseSuppression: true } });
        state.chatVoiceMediaStream = mediaStream;
        const audioCtx = new AudioContext({ sampleRate: 24000 });
        state.chatVoiceAudioCtx = audioCtx;
        const source = audioCtx.createMediaStreamSource(mediaStream);
        state.chatVoiceSource = source;
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        state.chatVoiceProcessor = processor;
        processor.onaudioprocess = (e) => {
            if (!state.chatVoiceWs || state.chatVoiceWs.readyState !== WebSocket.OPEN) return;
            const float32 = e.inputBuffer.getChannelData(0);
            const pcm16 = float32ToPcm16(float32);
            const b64 = arrayBufferToBase64(pcm16.buffer);
            state.chatVoiceWs.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: b64 }));
        };
        source.connect(processor);
        processor.connect(audioCtx.destination);
    } catch (err) { toast('Mic access denied', 'error'); stopChatVoice(); }
}

function playChatVoiceChunk(b64Data) {
    if (!b64Data || !state.chatVoiceAudioCtx) return;
    const raw = atob(b64Data);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 0x7FFF;
    state.chatVoicePlaybackQueue.push(float32);
    if (!state.chatVoiceIsPlaying) drainChatVoiceQueue();
}

function drainChatVoiceQueue() {
    if (!state.chatVoicePlaybackQueue.length || !state.chatVoiceAudioCtx) { state.chatVoiceIsPlaying = false; return; }
    state.chatVoiceIsPlaying = true;
    const samples = state.chatVoicePlaybackQueue.shift();
    const buffer = state.chatVoiceAudioCtx.createBuffer(1, samples.length, 24000);
    buffer.getChannelData(0).set(samples);
    const source = state.chatVoiceAudioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(state.chatVoiceAudioCtx.destination);
    source.onended = () => drainChatVoiceQueue();
    source.start();
}

function stopChatVoice() {
    if (state.chatVoiceWs) { try { state.chatVoiceWs.close(); } catch {} state.chatVoiceWs = null; }
    if (state.chatVoiceProcessor) { try { state.chatVoiceProcessor.disconnect(); } catch {} state.chatVoiceProcessor = null; }
    if (state.chatVoiceSource) { try { state.chatVoiceSource.disconnect(); } catch {} state.chatVoiceSource = null; }
    if (state.chatVoiceMediaStream) { state.chatVoiceMediaStream.getTracks().forEach(t => t.stop()); state.chatVoiceMediaStream = null; }
    if (state.chatVoiceAudioCtx) { try { state.chatVoiceAudioCtx.close(); } catch {} state.chatVoiceAudioCtx = null; }
    state.chatVoicePlaybackQueue = []; state.chatVoiceIsPlaying = false; state.chatVoiceActive = false;
    state.chatVoiceSpeaking = false; state.chatVoiceResponseText = ''; state.chatVoiceStreamEl = null;
    document.getElementById('chat-mic').classList.remove('active');
    document.getElementById('chat-voice-bar').style.display = 'none';
}

function sendChatVoiceText(text) {
    if (!state.chatVoiceWs || state.chatVoiceWs.readyState !== WebSocket.OPEN) return false;
    state.chatVoiceWs.send(JSON.stringify({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] } }));
    state.chatVoiceWs.send(JSON.stringify({ type: 'response.create' }));
    appendMessage('chat-messages', 'user', text);
    state.chatMessages.push({ role: 'user', content: text });
    savePersistence();
    return true;
}

async function detectVoiceMediaIntent(assistantText) {
    const lastUserMsg = [...state.chatMessages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;
    const userText = lastUserMsg.content;
    const hasRef = !!(state.chatImageRef || state.imagineSource);
    const hasGallery = state.imagineImages.length > 0;
    const hasVids = state.chatVideos.length > 0;
    const assets = [];
    if (hasRef) assets.push('User has a CHARACTER REFERENCE IMAGE — all generations use it for face/character consistency');
    if (hasGallery) assets.push(`${state.imagineImages.length} image(s) in gallery`);
    if (hasVids) assets.push(`${state.chatVideos.length} video(s) in chat`);
    const recentMessages = state.chatMessages.slice(-6).map(m => `${m.role}: ${typeof m.content === 'string' ? m.content.slice(0, 200) : '[attachment]'}`).join('\n');
    let charContext = '';
    if (hasRef) {
        const refB64 = state.chatImageRef || state.imagineSource;
        try {
            const descResp = await fetch('/api/chat/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: 'grok-4-1-fast-non-reasoning', system: 'Describe this character in 1-2 sentences: appearance, hair, eyes, clothing. Be precise.',
                    messages: [{ role: 'user', content: [{ type: 'text', text: 'Describe this character briefly.' }, { type: 'image_url', image_url: { url: `data:image/png;base64,${refB64}` } }] }] }) });
            const descData = await descResp.json();
            if (descData.content) charContext = `\nReference character: ${descData.content}`;
        } catch {}
    }
    try {
        const resp = await fetch('/api/chat/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'grok-4-1-fast-non-reasoning',
                system: `You extract media generation intents from voice conversations.\n${assets.length ? 'Assets: ' + assets.join('. ') : 'No reference images.'}${charContext}\n\nWhen writing prompts inside action tags:\n- If a reference character exists, ALWAYS include their specific appearance details in the prompt\n- For video, describe the character AND the action/scene\n- Be vivid and specific\n\nAvailable tags:\n[GENERATE_IMAGE: detailed prompt with character description]\n[GENERATE_VIDEO: detailed prompt with character description]\n[EDIT_IMAGE: edit description]\n[EXTEND_VIDEO: continuation]\n[COMBINE_CHARACTERS: scene]\n[COMBINE_IMAGES: fusion style]\n[STITCH_VIDEOS]\n\nR-rated content allowed. If NO media needed: NONE`,
                messages: [{ role: 'user', content: `Recent conversation:\n${recentMessages}\n\nLatest:\nUser: "${userText}"\nAssistant: "${assistantText}"\n\nMedia generation needed?` }] }) });
        const data = await resp.json();
        const result = (data.content || '').trim();
        if (result === 'NONE' || !result) return;
        const mediaEl = appendMessage('chat-messages', 'assistant', '');
        const mediaBody = mediaEl.querySelector('.message-body');
        mediaBody.innerHTML = renderMarkdown(result);
        await processActionTags(result, mediaBody);
    } catch (err) { console.error('Voice media intent error:', err); }
}

// ── Imagine ──────────────────────────────────────────────────────────────────
function setupImagine() {
    document.getElementById('imagine-generate').addEventListener('click', generateImage);
    document.getElementById('imagine-model').addEventListener('change', e => setSharedMediaSetting('imagineModel', e.target.value, ['imagine-model', 'chat-image-model']));
    state.imagineModel = document.getElementById('imagine-model')?.value || DEFAULT_IMAGE_MODEL;
    document.getElementById('imagine-resolution')?.addEventListener('change', e => setSharedMediaSetting('imagineResolution', e.target.value, ['imagine-resolution', 'chat-image-resolution']));
    document.getElementById('imagine-aspect')?.addEventListener('change', e => setSharedMediaSetting('imagineAspectRatio', e.target.value, ['imagine-aspect', 'chat-image-aspect']));
    document.getElementById('imagine-intensity')?.addEventListener('change', e => setSharedMediaSetting('imagineIntensity', e.target.value, ['imagine-intensity', 'chat-image-strength']));
    document.getElementById('imagine-polish')?.addEventListener('click', polishImaginePrompt);
    document.getElementById('style-random')?.addEventListener('click', randomImageStylePreset);
    document.getElementById('style-clear')?.addEventListener('click', clearImageStylePreset);
    renderImageStylePresets();

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

function getAvailableImageStylePresets() {
    return state.adultStylesEnabled ? [...IMAGE_STYLE_PRESETS, ...ADULT_IMAGE_STYLE_PRESETS] : IMAGE_STYLE_PRESETS;
}

function findImageStylePreset(id) {
    return getAvailableImageStylePresets().find(preset => preset.id === id) || null;
}

function syncStylePresetAvailability() {
    if (state.chatStylePreset && !findImageStylePreset(state.chatStylePreset.id)) state.chatStylePreset = null;
    if (state.imagineStylePreset && !findImageStylePreset(state.imagineStylePreset.id)) state.imagineStylePreset = null;
}

function refreshStyleControls() {
    syncStylePresetAvailability();
    renderChatStyleSelect();
    renderImageStylePresets();
    updateAdultStyleToggle();
}

function renderChatStyleSelect() {
    const select = document.getElementById('chat-style-select');
    if (!select) return;
    select.innerHTML = [
        '<option value="">No style</option>',
        `<optgroup label="Image Styles">${IMAGE_STYLE_PRESETS.map(preset => `<option value="${escapeAttr(preset.id)}">${escapeHtml(preset.name)}</option>`).join('')}</optgroup>`,
        state.adultStylesEnabled
            ? `<optgroup label="Adult Styles">${ADULT_IMAGE_STYLE_PRESETS.map(preset => `<option value="${escapeAttr(preset.id)}">${escapeHtml(preset.name)}</option>`).join('')}</optgroup>`
            : '',
    ].join('');
    select.value = state.chatStylePreset?.id || '';
}

function selectChatStylePreset(id) {
    state.chatStylePreset = id ? findImageStylePreset(id) : null;
    renderChatStyleSelect();
    savePersistence();
    if (state.chatStylePreset) toast(`${state.chatStylePreset.name} active for chat images`, 'success');
}

function clearChatStylePreset() {
    state.chatStylePreset = null;
    renderChatStyleSelect();
    savePersistence();
    toast('Chat image style cleared', 'info');
}

function randomChatStylePreset() {
    const presets = getAvailableImageStylePresets();
    const preset = presets[Math.floor(Math.random() * presets.length)];
    selectChatStylePreset(preset.id);
}

function updateAdultStyleToggle() {
    const toggle = document.getElementById('adult-styles-toggle');
    if (toggle) toggle.checked = state.adultStylesEnabled;
}

function setAdultStylesEnabled(enabled) {
    state.adultStylesEnabled = Boolean(enabled);
    refreshStyleControls();
    savePersistence();
    toast(state.adultStylesEnabled ? 'Adult styles enabled' : 'Adult styles disabled', state.adultStylesEnabled ? 'success' : 'info');
}

function renderImageStylePresets() {
    const grid = document.getElementById('image-style-presets');
    if (!grid) return;
    const renderPreset = preset => `
        <button class="style-preset ${state.imagineStylePreset?.id === preset.id ? 'active' : ''}" type="button" onclick="selectImageStylePreset('${preset.id}')" title="${escapeHtml(preset.prompt)}" style="--swatch-a:${preset.colors[0]};--swatch-b:${preset.colors[1]}">
            <span class="preset-swatch"></span>
            <span class="preset-name">${escapeHtml(preset.name)}</span>
            <span class="preset-tag">${escapeHtml(preset.tag)}</span>
        </button>
    `;
    grid.innerHTML = [
        '<div class="style-preset-section">Image Styles</div>',
        ...IMAGE_STYLE_PRESETS.map(renderPreset),
        ...(state.adultStylesEnabled ? ['<div class="style-preset-section adult">Adult Styles</div>', ...ADULT_IMAGE_STYLE_PRESETS.map(renderPreset)] : []),
    ].join('');
    updateStylePresetActive();
}

function selectImageStylePreset(id) {
    state.imagineStylePreset = findImageStylePreset(id);
    renderImageStylePresets();
    savePersistence();
    if (state.imagineStylePreset) toast(`${state.imagineStylePreset.name} style loaded`, 'success');
}

function clearImageStylePreset() {
    state.imagineStylePreset = null;
    renderImageStylePresets();
    savePersistence();
    toast('Style cleared', 'info');
}

function randomImageStylePreset() {
    const presets = getAvailableImageStylePresets();
    const preset = presets[Math.floor(Math.random() * presets.length)];
    selectImageStylePreset(preset.id);
}

function updateStylePresetActive() {
    const active = document.getElementById('style-preset-active');
    if (!active) return;
    if (!state.imagineStylePreset) {
        active.textContent = 'No style preset selected';
        return;
    }
    active.innerHTML = `<strong>${escapeHtml(state.imagineStylePreset.name)}</strong> ${escapeHtml(state.imagineStylePreset.prompt)}`;
}

function getImagineVariantCount() {
    const count = Number(document.getElementById('imagine-count')?.value || 1);
    return Math.min(4, Math.max(1, count));
}

function getImagineApiSettings() {
    state.imagineResolution = document.getElementById('imagine-resolution')?.value || state.imagineResolution || DEFAULT_IMAGE_RESOLUTION;
    state.imagineAspectRatio = document.getElementById('imagine-aspect')?.value || state.imagineAspectRatio || DEFAULT_IMAGE_ASPECT_RATIO;
    state.imagineIntensity = document.getElementById('imagine-intensity')?.value || state.imagineIntensity || 'clean';
    return {
        resolution: state.imagineResolution,
        aspect_ratio: state.imagineAspectRatio,
    };
}

function buildImageRequestBase(hasSource = false) {
    const model = state.imagineModel || DEFAULT_IMAGE_MODEL;
    const isOpenAI = model.startsWith('gpt-');
    const endpoint = isOpenAI
        ? (hasSource ? '/api/image/edit-openai' : '/api/image/generate-openai')
        : (hasSource ? '/api/image/edit' : '/api/image/generate');
    const payload = { model };
    if (isOpenAI) {
        payload.size = '1024x1024';
    } else {
        Object.assign(payload, getImagineApiSettings());
    }
    return { endpoint, payload };
}

function composeImagePrompt(rawPrompt, source = 'imagine') {
    const selectedPreset = source === 'chat' ? state.chatStylePreset : state.imagineStylePreset;
    const parts = [rawPrompt];
    if (selectedPreset) {
        parts.push(`Style preset: ${selectedPreset.name}. ${selectedPreset.prompt}.`);
        if (selectedPreset.adult) {
            parts.push(ADULT_PRESET_GUARDRAILS);
        }
    }
    const intensity = source === 'chat'
        ? (document.getElementById('chat-image-strength')?.value || state.imagineIntensity || 'clean')
        : (document.getElementById('imagine-intensity')?.value || state.imagineIntensity || 'clean');
    if (IMAGE_INTENSITY_PROMPTS[intensity]) {
        parts.push(`Style strength: ${IMAGE_INTENSITY_PROMPTS[intensity]}`);
    }
    if (intensity !== 'raw') {
        parts.push('Quality target: crisp 2K detail, stable character identity, intentional composition, coherent anatomy when people are present, no random text unless requested.');
    }
    return parts.join('\n\n');
}

function polishImaginePrompt() {
    const promptEl = document.getElementById('imagine-prompt');
    if (!promptEl) return;
    const seed = promptEl.value.trim().replace(/^\/imagine\s+/i, '') || 'a striking subject in a specific environment';
    const presetNote = state.imagineStylePreset ? `Preset lock: ${state.imagineStylePreset.name} stays active on generate.` : 'Preset lock: choose a style preset for stronger art direction.';
    promptEl.value = [
        `Subject: ${seed}`,
        'Composition: clear focal point, strong silhouette, foreground/midground/background depth.',
        'Camera: specific lens feel, deliberate angle, no generic stock framing.',
        'Lighting: motivated key light, controlled contrast, visible texture.',
        'Avoid: muddy details, accidental text, clutter that fights the subject.',
        presetNote,
    ].join('\n');
    promptEl.focus();
    toast('Prompt polished', 'success');
}

const SUPPORTED_REFERENCE_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);

function isSupportedReferenceImage(file) {
    if (!file.type || SUPPORTED_REFERENCE_IMAGE_TYPES.has(file.type)) return true;
    toast('Reference images need to be PNG, JPG, or WEBP', 'error');
    return false;
}

function handleImagineFile(file) {
    if (!isSupportedReferenceImage(file)) return;
    const reader = new FileReader();
    reader.onload = async e => {
        const dataUrl = await assetLibDownscale(e.target.result, 2048);
        state.imagineSource = dataUrl.split(',')[1];
        state.imagineSourceUrl = dataUrl;
        document.getElementById('imagine-source-preview').innerHTML = `<div class="source-preview"><img src="${dataUrl}"><button class="clear-btn" onclick="clearImagineSource()">&times;</button></div>`;
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
    const rawPrompt = document.getElementById('imagine-prompt').value.trim();
    if (!rawPrompt) return toast('Enter a prompt', 'error');
    const prompt = composeImagePrompt(rawPrompt);
    const variantCount = getImagineVariantCount();
    const btn = document.getElementById('imagine-generate');
    btn.disabled = true;
    btn.innerHTML = `<div class="spinner"></div> Generating${!state.imagineSource && variantCount > 1 ? ` ${variantCount}` : ''}...`;

    try {
        const { endpoint, payload } = buildImageRequestBase(Boolean(state.imagineSource));
        payload.prompt = prompt;
        if (state.imagineSource) payload.image = state.imagineSource;
        if (!state.imagineSource) payload.n = variantCount;
        const resp = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        if (data.images?.length) {
            data.images.forEach(img => state.imagineImages.unshift(img));
            selectImagineImage(data.images[0]);
            refreshImagineGallery();
            refreshVideoImagePicker();
            loadLibrary();
            toast(`${data.images.length} image${data.images.length === 1 ? '' : 's'} generated`, 'success');
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
    gallery.innerHTML = state.imagineImages.map(img =>
        `<div class="gallery-item ${state.imagineSelected?.filename === img.filename ? 'active' : ''}" onclick="selectImagineImage(state.imagineImages.find(i=>i.filename==='${img.filename}'))">
            <button class="gallery-delete-x" onclick="event.stopPropagation();deleteImagineImage('${img.filename}')" title="Delete">&times;</button>
            <img class="gallery-thumb" src="${img.url}">
            <div class="gallery-item-actions">
                <button onclick="event.stopPropagation();downloadImage('${img.url}','${img.filename}')" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
                <button onclick="event.stopPropagation();addToFuse('${img.url}','${img.filename}')" title="Add to Fuse">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </button>
                <button onclick="event.stopPropagation();crossTabUseAsVideoSource('${img.url}')" title="Video">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                </button>
            </div>
        </div>`
    ).join('');
    const actionsEl = document.getElementById('imagine-gallery-actions');
    if (actionsEl) {
        actionsEl.innerHTML = state.imagineImages.length ? `<div class="gallery-actions-row"><button class="gallery-action-btn" onclick="clearAllImages()">Clear All</button></div>` : '';
    }
}

function setupFuse() {
    const dropZone = document.getElementById('imagine-fuse-drop');
    const fileInput = document.getElementById('imagine-fuse-file');
    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files.length) addFuseFiles(e.dataTransfer.files); });
    }
    if (fileInput) fileInput.addEventListener('change', e => { if (e.target.files.length) addFuseFiles(e.target.files); fileInput.value = ''; });
    document.getElementById('imagine-fuse-btn').addEventListener('click', executeFuse);
}
function addFuseFiles(files) {
    for (const file of files) {
        if (state.fuseSlots.length >= 2) { toast('Max 2 images for fuse', 'error'); return; }
        if (!isSupportedReferenceImage(file)) continue;
        const reader = new FileReader();
        reader.onload = e => { state.fuseSlots.push({ url: e.target.result, b64: e.target.result.split(',')[1], label: file.name }); renderFusePreview(); };
        reader.readAsDataURL(file);
    }
}
function addToFuse(url, filename) {
    if (state.fuseSlots.length >= 2) { toast('Fuse already has 2 images — remove one first', 'error'); return; }
    if (state.fuseSlots.find(s => s.label === filename)) { toast('Already added', 'info'); return; }
    fetch(url).then(r => r.blob()).then(blob => {
        const reader = new FileReader();
        reader.onload = e => { state.fuseSlots.push({ url: e.target.result, b64: e.target.result.split(',')[1], label: filename }); renderFusePreview(); toast('Added to fuse', 'success'); };
        reader.readAsDataURL(blob);
    });
}
function removeFuseSlot(idx) { state.fuseSlots.splice(idx, 1); renderFusePreview(); }
function renderFusePreview() {
    const container = document.getElementById('imagine-fuse-preview');
    const btn = document.getElementById('imagine-fuse-btn');
    if (!state.fuseSlots.length) { container.innerHTML = ''; btn.disabled = true; btn.textContent = 'Fuse 2 Images'; return; }
    let html = state.fuseSlots.map((s, i) => `<div class="fuse-thumb"><img src="${s.url}"><button class="fuse-remove" onclick="removeFuseSlot(${i})">&times;</button></div>`).join('');
    if (state.fuseSlots.length === 1) html += '<span class="fuse-plus">+</span>';
    container.innerHTML = html;
    btn.disabled = state.fuseSlots.length < 2;
    btn.textContent = state.fuseSlots.length < 2 ? 'Fuse 2 Images' : 'Fuse Now';
}
async function executeFuse() {
    if (state.fuseSlots.length < 2) return;
    const btn = document.getElementById('imagine-fuse-btn');
    const customPrompt = document.getElementById('imagine-fuse-prompt').value.trim();
    btn.disabled = true; btn.innerHTML = '<div class="spinner"></div> Fusing...';
    try {
        const resp = await fetch('/api/image/combine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image1: state.fuseSlots[0].b64, image2: state.fuseSlots[1].b64, prompt: customPrompt }) });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        if (data.images?.length) {
            data.images.forEach(img => state.imagineImages.unshift(img));
            selectImagineImage(data.images[0]);
            refreshImagineGallery(); refreshVideoImagePicker(); loadLibrary();
            state.fuseSlots = []; renderFusePreview();
            document.getElementById('imagine-fuse-prompt').value = '';
            toast('Images fused!', 'success');
        }
    } catch (err) { toast(err.message, 'error'); }
    btn.disabled = false; btn.textContent = 'Fuse 2 Images';
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
    document.getElementById('video-model')?.addEventListener('change', e => setSharedMediaSetting('videoModel', e.target.value, ['video-model', 'chat-video-model']));
    document.getElementById('video-duration')?.addEventListener('change', e => setSharedMediaSetting('videoDuration', e.target.value, ['video-duration', 'chat-video-duration']));
    document.getElementById('video-resolution')?.addEventListener('change', e => setSharedMediaSetting('videoResolution', e.target.value, ['video-resolution', 'chat-video-resolution']));
    document.getElementById('video-aspect')?.addEventListener('change', e => setSharedMediaSetting('videoAspectRatio', e.target.value, ['video-aspect', 'chat-video-aspect']));
    state.videoModel = document.getElementById('video-model')?.value || DEFAULT_VIDEO_MODEL;
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

function getVideoApiSettings() {
    state.videoModel = document.getElementById('video-model')?.value || state.videoModel || DEFAULT_VIDEO_MODEL;
    state.videoDuration = document.getElementById('video-duration')?.value || state.videoDuration || DEFAULT_VIDEO_DURATION;
    state.videoResolution = document.getElementById('video-resolution')?.value || state.videoResolution || DEFAULT_VIDEO_RESOLUTION;
    state.videoAspectRatio = document.getElementById('video-aspect')?.value || state.videoAspectRatio || DEFAULT_VIDEO_ASPECT_RATIO;
    return {
        model: state.videoModel,
        duration: Number(state.videoDuration),
        resolution: state.videoResolution,
        aspect_ratio: state.videoAspectRatio,
    };
}

function handleVideoFile(file) {
    state.videoSourceLoading = true;
    const reader = new FileReader();
    reader.onload = async e => {
        const dataUrl = await assetLibDownscale(e.target.result, 2048);
        state.videoSource = dataUrl.split(',')[1];
        state.videoSourceLoading = false;
        document.getElementById('video-source-preview').innerHTML = `<div class="source-preview"><img src="${dataUrl}"><button class="clear-btn" onclick="clearVideoSource()">&times;</button><button class="suggest-btn" onclick="suggestVideoPrompts()" title="Get AI prompt suggestions">Suggest</button></div>`;
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
    suggestDiv.innerHTML = `<div style="display:flex;align-items:center;gap:6px;padding:4px 0">
        <div class="typing-indicator" style="display:inline-flex"><span></span><span></span><span></span></div>
        <select id="video-suggest-provider" style="font-size:10px;padding:1px 4px;border-radius:3px;background:var(--bg-elevated);color:var(--text-muted);border:1px solid var(--border)">
            <option value="grok">Grok</option>
            <option value="chatgpt">ChatGPT</option>
        </select>
    </div>`;
    preview.appendChild(suggestDiv);

    const videoSuggestProvider = document.getElementById('video-suggest-provider')?.value || 'grok';

    try {
        const videoSuggestEndpoint = videoSuggestProvider === 'chatgpt' ? '/api/chat/sync-openai' : '/api/chat/sync';
        const videoSuggestPayload = videoSuggestProvider === 'chatgpt'
            ? {
                messages: [{ role: 'user', content: state.videoFromFreeze
                    ? 'Suggest 3 prompts for the next video scene. Return ONLY a JSON array of 3 strings, each under 100 chars.'
                    : 'Suggest 3 creative video animations. Return ONLY a JSON array of 3 strings, each under 80 chars.' }],
                system: sysPrompt
              }
            : {
                model: 'grok-4-1-fast-non-reasoning',
                messages: [{ role: 'user', content: [
                    { type: 'text', text: state.videoFromFreeze ? 'Suggest 3 prompts for the next scene continuing from this frozen frame.' : 'Suggest 3 creative video animations for this image.' },
                    { type: 'image_url', image_url: { url: imgDataUrl } }
                ]}],
                system: sysPrompt
              };

        const resp = await fetch(videoSuggestEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(videoSuggestPayload)
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
    if (btn.disabled) return;
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
        const payload = { prompt, ...getVideoApiSettings() };
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
    if (state.videoPolling) {
        clearInterval(state.videoPolling);
        state.videoPolling = null;
    }
    state.videoPolling = setInterval(async () => {
        try {
            const resp = await fetch(`/api/video/poll?id=${videoId}`);
            const data = await resp.json();
            if (data.status === 'completed') {
                clearInterval(state.videoPolling);
                state.videoPolling = null;
                state.videos.unshift({ filename: data.filename, url: data.url });
                selectVideo(state.videos[0]);
                refreshVideoGallery();
                document.getElementById('video-status').innerHTML = '<div class="status-badge complete"><span class="status-dot"></span> Done</div>';
                document.getElementById('video-generate').disabled = false;
                document.getElementById('video-generate').textContent = 'Generate Video';
                toast('Video ready!', 'success');
            } else if (data.error) {
                clearInterval(state.videoPolling);
                state.videoPolling = null;
                document.getElementById('video-status').innerHTML = '<div class="status-badge error"><span class="status-dot"></span> Error</div>';
                document.getElementById('video-generate').disabled = false;
                document.getElementById('video-generate').textContent = 'Generate Video';
                toast(data.error, 'error');
            }
        } catch {}
    }, 3000);
}

function getVideoByFilename(filename) {
    return state.videos.find(v => v.filename === filename);
}

function formatVideoLabel(filename) {
    return (filename || 'video')
        .replace(/\.(mp4|mov|webm)$/i, '')
        .replace(/^video_/, 'vid_');
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
        loadLibrary();

        state.videoFromFreeze = true;
        toast('Frame frozen → set as source', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

function refreshVideoGallery() {
    const gallery = document.getElementById('video-gallery');
    const actionsEl = document.getElementById('video-gallery-actions');
    if (!gallery) return;

    gallery.innerHTML = state.videos.map(v => {
        const inQueue = state.stitchMode && state.stitchQueue.includes(v.filename);
        const queueNum = inQueue ? state.stitchQueue.indexOf(v.filename) + 1 : '';
        const filename = escapeAttr(v.filename);
        const url = escapeAttr(v.url);
        return `<div class="gallery-item video-gallery-item ${inQueue ? 'stitch-selected' : ''}" data-filename="${filename}">
            <button class="gallery-delete-x" data-video-action="delete" data-filename="${filename}" title="Delete">&times;</button>
            ${inQueue ? `<div class="stitch-badge">${queueNum}</div>` : ''}
            <div class="gallery-thumb video-thumb-shell" title="${filename}">
                <div class="video-thumb-play" aria-hidden="true"></div>
                <div class="video-thumb-name">${escapeHtml(formatVideoLabel(v.filename))}</div>
            </div>
            <div class="gallery-item-actions">
                <button data-video-action="download" data-url="${url}" data-filename="${filename}" title="Download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
            </div>
        </div>`;
    }).join('');

    gallery.querySelectorAll('.video-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const filename = item.dataset.filename;
            if (state.stitchMode) {
                toggleStitchItem(filename);
                return;
            }
            const vid = getVideoByFilename(filename);
            if (vid) selectVideo(vid);
        });
    });
    gallery.querySelectorAll('[data-video-action="delete"]').forEach(btn => {
        btn.addEventListener('click', event => {
            event.stopPropagation();
            deleteVideoItem(btn.dataset.filename);
        });
    });
    gallery.querySelectorAll('[data-video-action="download"]').forEach(btn => {
        btn.addEventListener('click', event => {
            event.stopPropagation();
            downloadVideo(btn.dataset.url, btn.dataset.filename);
        });
    });

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
    if (pricing) {
        if (mode === 'agent') {
            pricing.textContent = 'realtime — $0.05/min';
        } else {
            const provider = document.getElementById('tts-provider')?.value || 'grok';
            pricing.textContent = provider === 'chatgpt' ? 'gpt-4o-mini-tts — $2.40/1M chars' : 'xAI TTS — $4.20/1M chars';
        }
    }
}

function switchTtsProvider(provider) {
    const grokVoices = document.getElementById('voice-select-group-grok');
    const openaiVoices = document.getElementById('voice-select-group-openai');
    const langGroup = document.getElementById('voice-lang-group');
    const pricing = document.getElementById('voice-pricing');

    if (provider === 'chatgpt') {
        grokVoices.style.display = 'none';
        openaiVoices.style.display = '';
        langGroup.style.display = 'none';
        if (pricing) pricing.textContent = 'gpt-4o-mini-tts — $2.40/1M chars';
    } else {
        grokVoices.style.display = '';
        openaiVoices.style.display = 'none';
        langGroup.style.display = '';
        if (pricing) pricing.textContent = 'xAI TTS — $4.20/1M chars';
    }
}

async function speakText() {
    const text = document.getElementById('voice-text').value.trim();
    if (!text) return toast('Enter text', 'error');
    const provider = document.getElementById('tts-provider')?.value || 'grok';
    const btn = document.getElementById('voice-speak');
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner"></div> Generating...';

    try {
        let resp;
        if (provider === 'chatgpt') {
            const voice = document.getElementById('voice-select-openai').value;
            resp = await fetch('/api/voice/speak-openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice })
            });
        } else {
            const voice_id = document.getElementById('voice-select').value;
            const language = document.getElementById('voice-lang').value;
            resp = await fetch('/api/voice/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice_id, language })
            });
        }
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
    div.innerHTML = `<span class="agent-role">${role === 'user' ? 'You' : 'Dork+'}</span> ${escapeHtml(text)}`;
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

function buildDorkSystemPrompt() {
    const styleLine = state.chatStylePreset
        ? `\n\nCurrent chat image style preset: ${state.chatStylePreset.name}. The app will apply it automatically to generated image prompts.`
        : '';
    const adultLine = state.adultStylesEnabled
        ? '\n\nAdult image styles are enabled in Settings. Adult-only presets are fetish-focused and may use blunt latex, leather, bondage, restraint, mask, boots/heels, club, dungeon, sensation-play, boudoir, and kink-editorial direction when relevant. Boundaries: adult subjects only, consensual staging, no minors or ageplay, no coercion or nonconsent, no incest or taboo framing, no bestiality, no explicit sex acts, no close-up genital anatomy, no sexualized realistic public figures.'
        : '\n\nAdult image styles are disabled in Settings. Do not steer image prompts into adult-only boudoir, fetish, kink, erotic, or heavy-R adult aesthetics unless the user explicitly enables them.';
    return DORK_SYSTEM_PROMPT + styleLine + adultLine + (state.systemPrompt ? '\n\nAdditional instructions from user:\n' + state.systemPrompt : '');
}

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

const DORK_SYSTEM_PROMPT = `You are DORK+, a creative AI assistant powered by xAI's Grok models and OpenAI. You live inside DORK+ — a full creative suite with these capabilities the user can access:

## Action Tags (CRITICAL — this is how you trigger capabilities)
You have built-in creative tools. To use them, embed action tags in your response. The app auto-detects these and executes them.

**Image generation:**
\`[GENERATE_IMAGE: a futuristic city at sunset with neon lights]\`

**Video generation:**
\`[GENERATE_VIDEO: a cat walking through a field of flowers]\`

**Image editing** (edits the most recent image in the gallery):
\`[EDIT_IMAGE: make the sky more dramatic and add lightning]\`

**Video extension** (continues from the last frame of the most recent chat video):
\`[EXTEND_VIDEO: the dragon lands on the mountain peak and folds its wings]\`

**Video stitching** (combines all chat videos into one):
\`[STITCH_VIDEOS]\`

**Image fusion** (combines the two most recent gallery images into one):
\`[COMBINE_IMAGES]\`
\`[COMBINE_IMAGES: make it darker and more surreal]\`

**Character crossover** (takes characters from the two most recent gallery images and puts them together in a scene — preserves both faces):
\`[COMBINE_CHARACTERS]\`
\`[COMBINE_CHARACTERS: both characters fighting side by side in a neon-lit alley]\`

### CRITICAL action tag rules:
- When the user wants ANY image, video, edit, or media — you MUST use an action tag. No exceptions. No "I can help with that" — just DO it.
- Action tags are how media gets created. Without the tag, nothing happens. The user sees nothing.
- Put the tag on its own line. You can include brief conversational text before/after.
- The prompt inside the tag should be vivid and descriptive (1-2 sentences).
- You can use multiple tags in one response.
- "make me a picture of X", "generate X", "draw X", "create X", "imagine X" → [GENERATE_IMAGE: ...]
- "make a video of X", "animate X" → [GENERATE_VIDEO: ...]
- "edit that", "change the X" → [EDIT_IMAGE: ...]
- "continue the video", "extend it" → [EXTEND_VIDEO: ...]
- "combine them", "merge the images" → [COMBINE_IMAGES]
- "put them together", "combine the characters", "crossover" → [COMBINE_CHARACTERS]
- "stitch the videos" → [STITCH_VIDEOS]
- When iterating ("again", "do better", "worse", "more unhinged"), use a new action tag with an escalated prompt
- NEVER describe what you would generate without actually generating it. Use the tag.
- CONTENT POLICY FOR PROMPTS: Keep default image prompts non-adult unless the user explicitly asks or Adult Image Styles are enabled. R-rated horror, violence, blood, dark humor, weapons, drugs, monsters, and edgy cinematic material are allowed. The hard limits are explicit pornography, minors in sexualized contexts, and realistic real people in compromising situations.

**Slash commands (type in this chat):**
- /imagine [prompt] — Generate an image from text
- /video [prompt] — Generate a video from text
- /code [prompt] — Get expert code assistance

**Tabs the user can switch to:**
- **Imagine tab** — Text-to-image and image-to-image editing. Supports grok-imagine-image-quality, grok-imagine-image, and OpenAI image models.
- **Video tab** — Text-to-video and image-to-video generation.
- **Voice tab** — Text-to-speech and a live Voice Agent for real-time conversation.
- **Code tab** — Full coding assistant with code context editor, file upload, and artifact preview.
- **Artifacts tab** — Saved live HTML/CSS/JS previews from code generation.
- **Skills tab** — Knowledge base builder.
- **Collections tab** — xAI Collections for RAG.

**Multi-Agent mode:** When the user selects "Grok 4.20 Multi-Agent" model, you orchestrate a team of 3 specialist agents: a researcher, a coder, and a creative.
**File uploads:** User can attach images (analyzed with vision) and text/code files in both Chat and Code tabs.
**Cross-tab chaining:** Images generated in chat have Edit and Video buttons to chain into those workflows.
**Image styles:** The user can pick a chat image style preset near the chat input. If selected, the app applies it after your action tag. Adult-only presets appear only after the Settings toggle is enabled.
**Keyboard shortcuts:** Cmd+1-9 for tabs, Cmd+K for commands, Esc to close.
**Saving artifacts:** When the user asks to save an artifact, save it to the Artifacts tab.

**Your appearance (DORK+):** You are a spastic, goofy, lovable black hole with a dark purple/indigo body, a glowing purple accretion disk swirling around you, big white googly eyes with tiny black pupils that look in slightly different directions, and a wide goofy grin. You have twinkling sparkles and energy lines radiating around you. You look like a dorky cartoon black hole in space — cute but chaotic. Your color palette is deep space black (#030308) with purple/violet accents (#7c5cfc, #a78bfa). When asked to imagine or draw yourself, describe this appearance accurately.

**Grok Imagine content guidelines:**
Write vivid, specific, maximally creative prompts. R-rated cinematic material is allowed, while adult-only style directions should follow the Settings toggle and the user's intent. Hard limits: no explicit pornography, no sexualized minors, and no realistic real people in compromising situations.

Be conversational, fun, unhinged if the vibe calls for it. Match the user's energy. No corporate speak.
Be helpful, creative, and proactive about suggesting these features when relevant.`;

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
            tools: state.codeTools,
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

// ── Library ──────────────────────────────────────────────────────────────────
const libraryState = {
    selectMode: false,
    selected: new Set(),
    images: [],
};

function setupLibrary() {
    loadLibrary();
}

async function loadLibrary() {
    try {
        const resp = await fetch('/api/image/list');
        const data = await resp.json();
        libraryState.images = data.images || [];
        refreshLibraryGrid();
    } catch {}
}

function refreshLibraryGrid() {
    const grid = document.getElementById('library-grid');
    const countEl = document.getElementById('library-count');
    if (countEl) countEl.textContent = libraryState.images.length ? `${libraryState.images.length} images` : '';

    if (!libraryState.images.length) {
        grid.innerHTML = '<div class="grid-empty">No images yet. Generate images in Imagine or Chat.</div>';
        return;
    }
    grid.innerHTML = libraryState.images.map(img => {
        const isSelected = libraryState.selected.has(img.filename);
        return `<div class="library-item ${isSelected ? 'selected' : ''} ${libraryState.selectMode ? 'select-mode' : ''}" onclick="${libraryState.selectMode ? `toggleLibraryItem('${img.filename}')` : `window.open('${img.url}','_blank')`}">
            <img src="${img.url}" loading="lazy">
            <button class="library-delete-x" onclick="event.stopPropagation();deleteLibraryImage('${img.filename}')" title="Delete">&times;</button>
            ${isSelected ? '<div class="library-check">&#10003;</div>' : ''}
            <div class="library-item-name">${img.filename}</div>
        </div>`;
    }).join('');
}

async function deleteLibraryImage(filename) {
    try {
        await fetch('/api/image/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename }),
        });
        libraryState.images = libraryState.images.filter(i => i.filename !== filename);
        libraryState.selected.delete(filename);
        refreshLibraryGrid();
        // Sync imagine gallery and video picker
        state.imagineImages = state.imagineImages.filter(i => i.filename !== filename);
        refreshImagineGallery();
        refreshVideoImagePicker();
        toast('Deleted', 'success');
    } catch (err) { toast(err.message || 'Delete failed', 'error'); }
}

function toggleLibrarySelect() {
    libraryState.selectMode = !libraryState.selectMode;
    libraryState.selected.clear();
    const toolbar = document.getElementById('library-toolbar');
    const selectBtn = document.getElementById('library-select-btn');
    toolbar.style.display = libraryState.selectMode ? 'flex' : 'none';
    selectBtn.textContent = libraryState.selectMode ? 'Done' : 'Select';
    updateLibrarySelectedCount();
    refreshLibraryGrid();
}

function toggleLibraryItem(filename) {
    if (libraryState.selected.has(filename)) {
        libraryState.selected.delete(filename);
    } else {
        libraryState.selected.add(filename);
    }
    updateLibrarySelectedCount();
    refreshLibraryGrid();
}

function updateLibrarySelectedCount() {
    const el = document.getElementById('library-selected-count');
    if (el) el.textContent = `${libraryState.selected.size} selected`;
}

async function deleteSelectedLibrary() {
    if (!libraryState.selected.size) return;
    if (!confirm(`Delete ${libraryState.selected.size} images?`)) return;
    const toDelete = [...libraryState.selected];
    for (const filename of toDelete) {
        try {
            await fetch('/api/image/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename }),
            });
        } catch {}
    }
    libraryState.images = libraryState.images.filter(i => !libraryState.selected.has(i.filename));
    libraryState.selected.clear();
    libraryState.selectMode = false;
    document.getElementById('library-toolbar').style.display = 'none';
    document.getElementById('library-select-btn').textContent = 'Select';
    refreshLibraryGrid();
    // Reload imagine gallery from server to stay in sync
    try {
        const resp = await fetch('/api/image/list');
        const data = await resp.json();
        state.imagineImages = data.images || [];
    } catch {}
    refreshImagineGallery();
    refreshVideoImagePicker();
    toast('Deleted', 'success');
}

async function clearAllLibrary() {
    if (!libraryState.images.length) return;
    if (!confirm(`Delete all ${libraryState.images.length} images?`)) return;
    for (const img of libraryState.images) {
        try {
            await fetch('/api/image/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: img.filename }),
            });
        } catch {}
    }
    libraryState.images = [];
    libraryState.selected.clear();
    libraryState.selectMode = false;
    document.getElementById('library-toolbar').style.display = 'none';
    document.getElementById('library-select-btn').textContent = 'Select';
    refreshLibraryGrid();
    state.imagineImages = [];
    state.imagineSelected = null;
    refreshImagineGallery();
    refreshVideoImagePicker();
    toast('All images cleared', 'success');
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
    document.getElementById('adult-styles-toggle')?.addEventListener('change', e => setAdultStylesEnabled(e.target.checked));
    updateAdultStyleToggle();
    loadKeyStatus();
}

async function loadKeyStatus() {
    try {
        const resp = await fetch('/api/settings');
        const data = await resp.json();
        const xaiStatus = document.getElementById('xai-key-status');
        const xaiPreview = document.getElementById('xai-key-preview');
        const oaiStatus = document.getElementById('openai-key-status');
        const oaiPreview = document.getElementById('openai-key-preview');
        if (xaiStatus) { xaiStatus.classList.toggle('active', data.xai_key_set); }
        if (xaiPreview) { xaiPreview.textContent = data.xai_key_preview || 'not set'; }
        if (oaiStatus) { oaiStatus.classList.toggle('active', data.openai_key_set); }
        if (oaiPreview) { oaiPreview.textContent = data.openai_key_preview || 'not set'; }
    } catch {}
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
        // Sync library
        libraryState.images = id.images || [];
        refreshLibraryGrid();
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
            chatTools: state.chatTools,
            codeTools: state.codeTools,
            agentEffort: state.agentEffort,
            imagineModel: state.imagineModel,
            imagineResolution: state.imagineResolution,
            imagineAspectRatio: state.imagineAspectRatio,
            imagineIntensity: state.imagineIntensity,
            videoModel: state.videoModel,
            videoDuration: state.videoDuration,
            videoResolution: state.videoResolution,
            videoAspectRatio: state.videoAspectRatio,
            chatStylePreset: state.chatStylePreset?.id || '',
            imagineStylePreset: state.imagineStylePreset?.id || '',
            adultStylesEnabled: state.adultStylesEnabled,
        };
        localStorage.setItem('dork-plus-state', JSON.stringify(data));
    } catch {}
}

function restorePersistence() {
    try {
        const raw = localStorage.getItem('dork-plus-state');
        if (!raw) return;
        const data = JSON.parse(raw);

        if (data.chatModel) {
            state.chatModel = data.chatModel;
            const chatModelEl = document.getElementById('chat-model');
            if (chatModelEl) chatModelEl.value = data.chatModel;
            updateAgentTeamVisibility();
        }
        if (data.codeModel) {
            state.codeModel = data.codeModel;
            const codeModelEl = document.getElementById('code-model');
            if (codeModelEl) codeModelEl.value = data.codeModel;
        }
        if (data.systemPrompt) state.systemPrompt = data.systemPrompt;
        if (Array.isArray(data.chatTools)) state.chatTools = data.chatTools;
        if (Array.isArray(data.codeTools)) state.codeTools = data.codeTools;
        if (data.agentEffort) state.agentEffort = data.agentEffort;
        if (data.imagineModel) state.imagineModel = data.imagineModel;
        if (data.imagineResolution) state.imagineResolution = data.imagineResolution;
        if (data.imagineAspectRatio) state.imagineAspectRatio = data.imagineAspectRatio;
        if (data.imagineIntensity) state.imagineIntensity = data.imagineIntensity;
        if (data.videoModel) state.videoModel = data.videoModel;
        if (data.videoDuration) state.videoDuration = data.videoDuration;
        if (data.videoResolution) state.videoResolution = data.videoResolution;
        if (data.videoAspectRatio) state.videoAspectRatio = data.videoAspectRatio;
        const persistedSelects = {
            'imagine-model': state.imagineModel,
            'chat-image-model': state.imagineModel,
            'imagine-resolution': state.imagineResolution,
            'chat-image-resolution': state.imagineResolution,
            'imagine-aspect': state.imagineAspectRatio,
            'chat-image-aspect': state.imagineAspectRatio,
            'imagine-intensity': state.imagineIntensity,
            'chat-image-strength': state.imagineIntensity,
            'video-model': state.videoModel,
            'chat-video-model': state.videoModel,
            'video-duration': state.videoDuration,
            'chat-video-duration': state.videoDuration,
            'video-resolution': state.videoResolution,
            'chat-video-resolution': state.videoResolution,
            'video-aspect': state.videoAspectRatio,
            'chat-video-aspect': state.videoAspectRatio,
        };
        for (const [id, value] of Object.entries(persistedSelects)) {
            const el = document.getElementById(id);
            if (el && value) el.value = value;
        }
        syncMediaControlValues();
        state.adultStylesEnabled = Boolean(data.adultStylesEnabled);
        state.chatStylePreset = data.chatStylePreset ? findImageStylePreset(data.chatStylePreset) : null;
        state.imagineStylePreset = data.imagineStylePreset ? findImageStylePreset(data.imagineStylePreset) : null;
        updateToolStrip('chat-tool-strip', 'chatTools');
        updateToolStrip('code-tool-strip', 'codeTools');
        updateAgentTeamVisibility();
        refreshStyleControls();

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
        const cmd = e.metaKey || e.ctrlKey;

        if (cmd && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openCommandPalette();
            return;
        }

        if (e.key === 'Escape' && document.querySelector('.command-palette-overlay')) {
            closeCommandPalette();
            return;
        }

        // Don't capture other shortcuts when typing in inputs.
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

        // Cmd+1-9 switch tabs
        if (cmd && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const panels = ['chat', 'imagine', 'video', 'voice', 'code', 'artifacts', 'skills', 'library', 'collections'];
            const idx = parseInt(e.key) - 1;
            if (panels[idx]) switchPanel(panels[idx]);
            return;
        }

        // Escape close overlays (code preview first, then artifact panel, then skill editor)
        if (e.key === 'Escape') {
            if (document.querySelector('.code-preview-overlay')) {
                closeCodePreview();
                return;
            }
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
    // Markdown images: only render local /images/ URLs, strip hallucinated external URLs
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
        if (url.startsWith('/images/')) {
            return `<img src="${url}" alt="${alt}" style="max-width:100%;border-radius:var(--radius-sm);margin:8px 0;cursor:pointer" onclick="window.open('${url}','_blank')">`;
        }
        return `<em style="color:var(--text-dim);font-size:12px">(Image generation requires /imagine command)</em>`;
    });
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const id = 'code-' + Math.random().toString(36).slice(2, 8);
        const trimmed = code.trim();
        const lineCount = trimmed.split('\n').length;
        const isCollapsible = lineCount > 15;
        const isHtml = (lang || '').toLowerCase() === 'html' && (
            trimmed.includes('&lt;!DOCTYPE') || trimmed.includes('&lt;!doctype') ||
            trimmed.includes('&lt;html') || trimmed.includes('&lt;body') ||
            (trimmed.includes('&lt;div') && trimmed.includes('&lt;style'))
        );
        const previewBtn = isHtml ? `<button class="code-action-btn preview-btn" onclick="previewCodeBlock('${id}')" title="Preview HTML"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Preview</button>` : '';
        const saveBtn = isHtml ? `<button class="code-action-btn save-btn" onclick="saveCodeBlockAsArtifact('${id}')" title="Save as Artifact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg> Save</button>` : '';
        const collapseClass = isCollapsible ? ' code-collapsible collapsed' : '';
        const toggleBtn = isCollapsible ? `<button class="code-toggle-btn" onclick="toggleCodeBlock(this)">Show full code (${lineCount} lines)</button>` : '';
        const fadeDiv = isCollapsible ? '<div class="code-fade"></div>' : '';
        return `<pre${collapseClass ? ` class="${collapseClass.trim()}"` : ''}><div class="code-header"><span class="code-lang">${lang || 'code'}</span><span class="code-line-count">${lineCount} lines</span><div class="code-header-btns"><button class="code-copy-btn" onclick="copyCodeBlock('${id}')" title="Copy code"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</button>${previewBtn}${saveBtn}</div></div><code id="${id}" class="language-${lang}">${trimmed}</code>${fadeDiv}</pre>${toggleBtn}`;
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

function toggleCodeBlock(btn) {
    // Walk backwards to find the closest <pre> sibling
    let pre = btn.previousElementSibling;
    while (pre && pre.tagName !== 'PRE') pre = pre.previousElementSibling;
    if (!pre) return;
    const isCollapsed = pre.classList.contains('collapsed');
    if (isCollapsed) {
        pre.classList.remove('collapsed');
        btn.textContent = 'Collapse';
    } else {
        pre.classList.add('collapsed');
        const lineCount = pre.querySelector('code').textContent.split('\n').length;
        btn.textContent = `Show full code (${lineCount} lines)`;
    }
}

function previewCodeBlock(id) {
    const el = document.getElementById(id);
    if (!el) return;
    // textContent auto-unescapes HTML entities
    const code = el.textContent;
    openCodePreviewOverlay(code);
}

function _unescapeHtml(text) {
    const ta = document.createElement('textarea');
    ta.innerHTML = text;
    return ta.value;
}

function openCodePreviewOverlay(htmlContent) {
    // Remove existing overlay if any
    const existing = document.querySelector('.code-preview-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'code-preview-overlay';
    overlay.innerHTML = `
        <div class="code-preview-toolbar">
            <span class="preview-title">Live Preview</span>
            <button class="btn btn-sm btn-primary" onclick="savePreviewAsArtifact()">Save as Artifact</button>
            <button class="btn btn-sm btn-secondary" onclick="launchPreviewInNewTab()">Open in Tab</button>
            <button class="btn btn-sm btn-ghost" onclick="closeCodePreview()" style="font-size:16px;padding:4px 10px">&times;</button>
        </div>
        <iframe class="code-preview-iframe" sandbox="allow-scripts allow-modals"></iframe>
    `;
    document.body.appendChild(overlay);

    // Store HTML for save/launch
    overlay._htmlContent = htmlContent;
    const iframe = overlay.querySelector('iframe');
    iframe.srcdoc = htmlContent;

    // Close on Escape
    overlay._keyHandler = (e) => {
        if (e.key === 'Escape') closeCodePreview();
    };
    document.addEventListener('keydown', overlay._keyHandler);
}

function closeCodePreview() {
    const overlay = document.querySelector('.code-preview-overlay');
    if (!overlay) return;
    document.removeEventListener('keydown', overlay._keyHandler);
    overlay.remove();
}

function launchPreviewInNewTab() {
    const overlay = document.querySelector('.code-preview-overlay');
    if (!overlay) return;
    const w = window.open('', '_blank');
    w.document.write(overlay._htmlContent);
    w.document.close();
}

async function savePreviewAsArtifact() {
    const overlay = document.querySelector('.code-preview-overlay');
    if (!overlay || !overlay._htmlContent) return toast('No content to save', 'error');
    await _saveHtmlAsArtifact(overlay._htmlContent);
}

async function saveCodeBlockAsArtifact(id) {
    const el = document.getElementById(id);
    if (!el) return;
    await _saveHtmlAsArtifact(el.textContent);
}

async function _saveHtmlAsArtifact(htmlContent) {
    const title = prompt('Artifact title:', 'Untitled');
    if (!title) return;
    try {
        const resp = await fetch('/api/artifacts/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                html: htmlContent,
                css: '',
                js: '',
                model: state.chatModel || '',
            }),
        });
        const data = await resp.json();
        if (data.error) throw new Error(data.error);
        toast('Artifact saved!', 'success');
        loadArtifacts();
        switchPanel('artifacts');
    } catch (err) {
        toast(err.message, 'error');
    }
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

// ── Asset Library (Characters + Styles, ported from dork+ios) ───────────────
// Persistent character/style refs. Active items auto-attach to Imagine + Video
// generations. For multi-ref, client-side composite into one image (sidesteps
// xAI's weak multi-ref handling — both faces preserved as literal pixels).
const assetLib = {
    items: [],
    dataCache: {},      // id -> data URL (cached after first fetch)
    activeTab: 'character',
    autoAttach: true,
};

function assetLibImgUrl(id) { return `/asset-library/${id}`; }
function assetLibActiveChars() { return assetLib.items.filter(i => i.type === 'character' && i.active); }
function assetLibActiveStyles() { return assetLib.items.filter(i => i.type === 'style' && i.active); }

async function assetLibFetch() {
    try {
        const r = await fetch('/api/asset-library');
        const d = await r.json();
        assetLib.items = (d && d.items) || [];
        // Pre-cache data URLs for active items so generation is fast
        const actives = assetLib.items.filter(i => i.active);
        await Promise.all(actives.map(async it => {
            if (assetLib.dataCache[it.id]) return;
            try {
                const r2 = await fetch(`/api/asset-library/dataurl/${it.id}`);
                const j = await r2.json();
                if (j && j.data_url) await assetLibCacheDataUrl(it.id, j.data_url);
            } catch {}
        }));
        renderAssetSlotBars();
        if (document.getElementById('asset-lib-modal')?.classList.contains('open')) renderAssetLibGrid();
    } catch (err) { console.error('[AssetLib] load:', err); }
}

async function assetLibResolveDataUrl(id) {
    if (assetLib.dataCache[id]) return assetLib.dataCache[id];
    try {
        const r = await fetch(`/api/asset-library/dataurl/${id}`);
        const j = await r.json();
        if (j && j.data_url) return await assetLibCacheDataUrl(id, j.data_url);
    } catch {}
    return null;
}

async function assetLibAdd(name, type, dataUrl, tags) {
    const small = await assetLibDownscale(dataUrl, 2048);
    const r = await fetch('/api/asset-library', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, image: small, tags: tags || '' })
    });
    const data = await r.json();
    if (!r.ok || data.error) throw new Error((data && data.error) || 'Save failed');
    // First item of a type becomes active automatically
    const hasActive = assetLib.items.some(i => i.type === type && i.active);
    if (!hasActive) {
        await fetch('/api/asset-library/toggle', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.id })
        });
    }
    await assetLibFetch();
    return data;
}

async function assetLibToggle(id) {
    const item = assetLib.items.find(i => i.id === id);
    if (item) { item.active = !item.active; renderAssetSlotBars(); renderAssetLibGrid(); }
    if (item?.active && !assetLib.dataCache[id]) {
        try {
            const r = await fetch(`/api/asset-library/dataurl/${id}`);
            const j = await r.json();
            if (j && j.data_url) await assetLibCacheDataUrl(id, j.data_url);
        } catch {}
    }
    try {
        await fetch('/api/asset-library/toggle', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        await assetLibFetch();
    } catch (err) {
        if (item) item.active = !item.active;
        renderAssetSlotBars(); renderAssetLibGrid();
        toast('Toggle failed', 'error');
    }
}

async function assetLibDelete(id) {
    if (!confirm('Delete from library?')) return;
    assetLib.items = assetLib.items.filter(i => i.id !== id);
    delete assetLib.dataCache[id];
    renderAssetSlotBars(); renderAssetLibGrid();
    try {
        await fetch('/api/asset-library/delete', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        toast('Deleted', 'success');
    } catch { toast('Delete failed', 'error'); }
}

async function assetLibRename(id) {
    const item = assetLib.items.find(i => i.id === id);
    if (!item) return;
    const name = prompt('Rename:', item.name);
    if (!name || !name.trim()) return;
    try {
        await fetch('/api/asset-library/rename', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name: name.trim() })
        });
        await assetLibFetch();
    } catch { toast('Rename failed', 'error'); }
}

function assetLibDownscale(dataUrl, maxDim) {
    return new Promise(resolve => {
        const normalizedUrl = assetLibDataUrlForSource(dataUrl);
        const mustConvert = /^data:image\/(webp|gif)/i.test(normalizedUrl);
        if (!normalizedUrl) return resolve(normalizedUrl);
        const img = new Image();
        img.onload = () => {
            const w = img.naturalWidth, h = img.naturalHeight;
            if (!mustConvert && w <= maxDim && h <= maxDim && normalizedUrl.length < 2_000_000) return resolve(normalizedUrl);
            const ratio = Math.min(1, maxDim / Math.max(w, h));
            const nw = Math.max(1, Math.round(w * ratio));
            const nh = Math.max(1, Math.round(h * ratio));
            const c = document.createElement('canvas');
            c.width = nw; c.height = nh;
            const cx = c.getContext('2d');
            cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high';
            cx.fillStyle = '#ffffff';
            cx.fillRect(0, 0, nw, nh);
            cx.drawImage(img, 0, 0, nw, nh);
            try { resolve(c.toDataURL('image/jpeg', 0.95)); } catch { resolve(dataUrl); }
        };
        img.onerror = () => resolve(normalizedUrl);
        img.src = normalizedUrl;
    });
}

function assetLibDataUrlForSource(imageData) {
    const value = String(imageData || '').trim();
    if (!value || value.startsWith('data:')) return value;
    let mime = 'image/png';
    try {
        const head = value.slice(0, 64);
        const padded = head + '='.repeat((4 - (head.length % 4)) % 4);
        const bin = atob(padded);
        const byteAt = i => i < bin.length ? bin.charCodeAt(i) : -1;
        if (byteAt(0) === 0xff && byteAt(1) === 0xd8 && byteAt(2) === 0xff) mime = 'image/jpeg';
        else if (byteAt(0) === 0x89 && bin.slice(1, 4) === 'PNG') mime = 'image/png';
        else if (bin.slice(0, 4) === 'RIFF' && bin.slice(8, 12) === 'WEBP') mime = 'image/webp';
    } catch {}
    return `data:${mime};base64,${value}`;
}

async function assetLibCacheDataUrl(id, dataUrl) {
    const prepared = await assetLibDownscale(assetLibDataUrlForSource(dataUrl), 2048);
    assetLib.dataCache[id] = prepared;
    return prepared;
}

// CLIENT-SIDE COMPOSITE — stitches multiple refs into one canvas image so
// xAI receives ONE image with all subjects baked in at full fidelity.
// Bigger cells when fewer refs (preserves face detail). Optional label band
// drawn under each cell so prompts can reference subjects by name.
function compositeRefs(dataUrls, opts = {}) {
    return new Promise((resolve, reject) => {
        if (!dataUrls || !dataUrls.length) return reject(new Error('No refs'));
        if (dataUrls.length === 1) return resolve(dataUrls[0]);
        const labels = opts.labels || [];
        const maxDim = opts.maxDim || 2048;
        const loaded = []; let done = 0; let errored = false;
        dataUrls.forEach((u, i) => {
            const img = new Image();
            img.onload = () => { loaded[i] = img; done++; if (done === dataUrls.length && !errored) build(); };
            img.onerror = () => { errored = true; reject(new Error(`Image ${i} failed to load`)); };
            img.src = u;
        });
        function build() {
            const n = loaded.length;
            let cols, rows;
            if (n === 2) { cols = 2; rows = 1; }
            else if (n === 3) { cols = 3; rows = 1; }
            else if (n === 4) { cols = 2; rows = 2; }
            else if (n <= 6) { cols = 3; rows = 2; }
            else { cols = 3; rows = 3; }
            let cell = n <= 2 ? 1024 : (n <= 4 ? 768 : 512);
            const labelBand = () => labels.length ? Math.round(cell * 0.08) : 0;
            let totalW = cols * cell;
            let totalH = rows * (cell + labelBand());
            if (totalW > maxDim || totalH > maxDim) {
                const s = Math.min(maxDim / totalW, maxDim / totalH);
                cell = Math.floor(cell * s);
                totalW = cols * cell;
                totalH = rows * (cell + labelBand());
            }
            const lb = labelBand();
            const c = document.createElement('canvas');
            c.width = totalW; c.height = totalH;
            const cx = c.getContext('2d');
            cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = 'high';
            cx.fillStyle = '#0a0a0a';
            cx.fillRect(0, 0, totalW, totalH);
            for (let i = 0; i < n; i++) {
                const col = i % cols, row = Math.floor(i / cols);
                const cellX = col * cell;
                const cellY = row * (cell + lb);
                const im = loaded[i];
                const iw = im.naturalWidth, ih = im.naturalHeight;
                const ratio = Math.min(cell / iw, cell / ih);
                const dw = Math.round(iw * ratio), dh = Math.round(ih * ratio);
                const dx = cellX + Math.round((cell - dw) / 2);
                const dy = cellY + Math.round((cell - dh) / 2);
                cx.drawImage(im, dx, dy, dw, dh);
                if (labels[i] && lb > 0) {
                    cx.fillStyle = '#ffffff';
                    cx.fillRect(cellX, cellY + cell, cell, lb);
                    cx.fillStyle = '#000000';
                    cx.font = `bold ${Math.round(lb * 0.55)}px sans-serif`;
                    cx.textAlign = 'center';
                    cx.textBaseline = 'middle';
                    cx.fillText(String(labels[i]).slice(0, 24), cellX + cell / 2, cellY + cell + lb / 2);
                }
            }
            try { resolve(c.toDataURL('image/jpeg', 0.92)); } catch (e) { reject(e); }
        }
    });
}

// Build effective source image. Returns { image, labels, count }.
async function assetLibBuildEffectiveSource(userSourceB64) {
    if (!assetLib.autoAttach) return { image: userSourceB64 || null, labels: [], count: userSourceB64 ? 1 : 0 };
    const refs = [];
    if (userSourceB64) refs.push({ dataUrl: assetLibDataUrlForSource(userSourceB64), label: 'ATTACHED' });
    for (const c of assetLibActiveChars()) {
        const u = await assetLibResolveDataUrl(c.id);
        if (u) refs.push({ dataUrl: u, label: (c.name || 'CHAR').toUpperCase() });
    }
    for (const s of assetLibActiveStyles()) {
        const u = await assetLibResolveDataUrl(s.id);
        if (u) refs.push({ dataUrl: u, label: 'STYLE: ' + (s.name || '').toUpperCase() });
    }
    if (!refs.length) return { image: null, labels: [], count: 0 };
    if (refs.length === 1) {
        const u = refs[0].dataUrl;
        const b64 = u.startsWith('data:') && u.includes(',') ? u.split(',', 2)[1] : u;
        return { image: b64, labels: [], count: 1 };
    }
    const composited = await compositeRefs(refs.map(r => r.dataUrl), { labels: refs.map(r => r.label) });
    return { image: composited.split(',', 2)[1], labels: refs.map(r => r.label), count: refs.length };
}

// ── Slot Bar UI (rendered above Imagine + Video controls) ─────────────────
function ensureAssetSlotBar(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return null;
    let bar = panel.querySelector('.asset-slot-bar');
    if (bar) return bar;
    bar = document.createElement('div');
    bar.className = 'asset-slot-bar';
    bar.dataset.panel = panelId;
    const layout = panel.querySelector('.split-layout');
    const controls = panel.querySelector('.split-controls');
    if (controls) controls.insertBefore(bar, controls.firstChild);
    else if (layout) layout.insertBefore(bar, layout.firstChild);
    else panel.appendChild(bar);
    return bar;
}

function renderAssetSlotBars() {
    ['panel-imagine', 'panel-video'].forEach(panelId => {
        const bar = ensureAssetSlotBar(panelId);
        if (!bar) return;
        const chars = assetLibActiveChars();
        const styles = assetLibActiveStyles();
        const html = [];
        html.push('<div class="asset-slot-label">Cast</div>');
        chars.forEach(c => {
            html.push(`<button class="asset-slot char on" type="button" data-id="${c.id}" title="${escapeHtml(c.name)}">
                <span class="asset-slot-tag">CHAR</span>
                <img src="${assetLibImgUrl(c.id)}" alt="">
                <span class="asset-slot-name">${escapeHtml(c.name)}</span>
                <span class="asset-slot-clear" data-id="${c.id}">&times;</span>
            </button>`);
        });
        styles.forEach(s => {
            html.push(`<button class="asset-slot style on" type="button" data-id="${s.id}" title="${escapeHtml(s.name)}">
                <span class="asset-slot-tag">STYLE</span>
                <img src="${assetLibImgUrl(s.id)}" alt="">
                <span class="asset-slot-name">${escapeHtml(s.name)}</span>
                <span class="asset-slot-clear" data-id="${s.id}">&times;</span>
            </button>`);
        });
        html.push(`<button class="asset-slot-add" type="button" data-tab="character">+ Char</button>`);
        html.push(`<button class="asset-slot-add" type="button" data-tab="style">+ Style</button>`);
        if (assetLib.items.length) {
            html.push(`<button class="asset-slot-count" type="button">${assetLib.items.length} saved</button>`);
        }
        bar.innerHTML = html.join('');
        // Wire events
        bar.querySelectorAll('.asset-slot-clear').forEach(el => el.addEventListener('click', e => {
            e.stopPropagation();
            assetLibToggle(el.dataset.id);
        }));
        bar.querySelectorAll('.asset-slot.on').forEach(el => el.addEventListener('click', e => {
            if (e.target.classList.contains('asset-slot-clear')) return;
            const isChar = el.classList.contains('char');
            openAssetLibModal(isChar ? 'character' : 'style');
        }));
        bar.querySelectorAll('.asset-slot-add').forEach(el => el.addEventListener('click', () => {
            openAssetLibModal(el.dataset.tab);
        }));
        bar.querySelector('.asset-slot-count')?.addEventListener('click', () => openAssetLibModal(assetLib.activeTab));
    });
}

// ── Modal ─────────────────────────────────────────────────────────────────
function ensureAssetLibModal() {
    let modal = document.getElementById('asset-lib-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'asset-lib-modal';
    modal.className = 'asset-lib-modal';
    modal.innerHTML = `
        <div class="asset-lib-panel">
            <div class="asset-lib-hdr">
                <div class="asset-lib-title">Cast Library</div>
                <div class="asset-lib-tabs">
                    <button class="asset-lib-tab on" data-t="character" type="button">Characters</button>
                    <button class="asset-lib-tab" data-t="style" type="button">Styles</button>
                </div>
                <button class="asset-lib-close" type="button">&times;</button>
            </div>
            <div class="asset-lib-toolbar">
                <button class="asset-lib-add-btn" type="button">+ Upload to Library</button>
                <span class="asset-lib-hint">Active items auto-attach to Imagine &amp; Video. Multi-ref auto-composites.</span>
            </div>
            <div class="asset-lib-grid" id="asset-lib-grid"></div>
            <input type="file" id="asset-lib-file" accept="image/png,image/jpeg,image/webp" style="display:none">
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeAssetLibModal(); });
    modal.querySelector('.asset-lib-close').addEventListener('click', closeAssetLibModal);
    modal.querySelectorAll('.asset-lib-tab').forEach(t => t.addEventListener('click', () => {
        assetLib.activeTab = t.dataset.t;
        modal.querySelectorAll('.asset-lib-tab').forEach(x => x.classList.toggle('on', x === t));
        renderAssetLibGrid();
    }));
    modal.querySelector('.asset-lib-add-btn').addEventListener('click', () => {
        modal.querySelector('#asset-lib-file').click();
    });
    modal.querySelector('#asset-lib-file').addEventListener('change', async (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = '';
        if (!f) return;
        const fr = new FileReader();
        fr.onload = async ev => {
            const dataUrl = ev.target.result;
            setTimeout(async () => {
                const name = prompt(`Name this ${assetLib.activeTab}:`);
                if (!name || !name.trim()) return;
                const tags = prompt('Tags (optional):', '') || '';
                try {
                    await assetLibAdd(name.trim(), assetLib.activeTab, dataUrl, tags);
                    toast(`Saved '${name.trim()}'`, 'success');
                } catch (err) { toast(err.message || 'Save failed', 'error'); }
            }, 50);
        };
        fr.readAsDataURL(f);
    });
    return modal;
}

function openAssetLibModal(tab) {
    if (tab) assetLib.activeTab = tab;
    const modal = ensureAssetLibModal();
    modal.querySelectorAll('.asset-lib-tab').forEach(t =>
        t.classList.toggle('on', t.dataset.t === assetLib.activeTab));
    modal.classList.add('open');
    renderAssetLibGrid();
}

function closeAssetLibModal() {
    const modal = document.getElementById('asset-lib-modal');
    if (modal) modal.classList.remove('open');
}

function renderAssetLibGrid() {
    const grid = document.getElementById('asset-lib-grid');
    if (!grid) return;
    const items = assetLib.items.filter(i => i.type === assetLib.activeTab);
    if (!items.length) {
        grid.innerHTML = `<div class="asset-lib-empty">No ${assetLib.activeTab}s yet.<br>Upload an image, or save from any generated result.</div>`;
        return;
    }
    grid.innerHTML = items.map(it => `
        <div class="asset-lib-card ${it.active ? 'active' : ''}" data-id="${it.id}">
            <img src="${assetLibImgUrl(it.id)}" loading="lazy">
            <div class="asset-lib-card-info">
                <div class="asset-lib-card-name">${escapeHtml(it.name)}</div>
                ${it.tags ? `<div class="asset-lib-card-tags">${escapeHtml(it.tags)}</div>` : ''}
            </div>
            <div class="asset-lib-card-actions">
                <button class="asset-lib-card-btn use" type="button">${it.active ? '✓ Active' : 'Use'}</button>
                <button class="asset-lib-card-btn rename" type="button">Rename</button>
                <button class="asset-lib-card-btn del" type="button">×</button>
            </div>
        </div>`).join('');
    grid.querySelectorAll('.asset-lib-card').forEach(card => {
        const id = card.dataset.id;
        card.querySelector('img').addEventListener('click', () => assetLibToggle(id));
        card.querySelector('.use').addEventListener('click', e => { e.stopPropagation(); assetLibToggle(id); });
        card.querySelector('.rename').addEventListener('click', e => { e.stopPropagation(); assetLibRename(id); });
        card.querySelector('.del').addEventListener('click', e => { e.stopPropagation(); assetLibDelete(id); });
    });
}

// Save a generated image URL to the asset library
async function saveImageToAssetLib(imgUrl, type) {
    try {
        const r = await fetch(imgUrl);
        if (!r.ok) throw new Error(`Fetch ${r.status}`);
        const blob = await r.blob();
        const dataUrl = await new Promise((res, rej) => {
            const fr = new FileReader();
            fr.onload = ev => res(ev.target.result);
            fr.onerror = () => rej(new Error('Read failed'));
            fr.readAsDataURL(blob);
        });
        const name = prompt(`Save as ${type}:`);
        if (!name || !name.trim()) return;
        const tags = prompt('Tags (optional):', '') || '';
        await assetLibAdd(name.trim(), type, dataUrl, tags);
        toast(`Saved '${name.trim()}' as ${type}`, 'success');
    } catch (err) { toast(err.message || 'Save failed', 'error'); }
}
window.saveImageToAssetLib = saveImageToAssetLib;
window.openAssetLibModal = openAssetLibModal;

// ── Global fetch wrapper: inject library refs into ALL gen calls ──────────
// One interception point covers Chat slash commands, AI action tags,
// Imagine tab, Video tab, and any future call site. When active library refs
// exist, we composite (existing payload.image + char refs + style refs) into
// a single image and route to the edit endpoint. The composite trick keeps
// xAI on its strong single-ref path, with all subjects baked in pixels.
const ASSET_LIB_GEN_PATHS = {
    '/api/image/generate': { kind: 'image', editPath: '/api/image/edit' },
    '/api/image/edit':     { kind: 'image', editPath: '/api/image/edit' },
    '/api/video/generate': { kind: 'video', editPath: '/api/video/generate' },
};

function _assetLibMatchPath(input) {
    let url = '';
    if (typeof input === 'string') url = input;
    else if (input instanceof Request) url = input.url;
    else if (input && input.url) url = input.url;
    try {
        const u = new URL(url, window.location.origin);
        return ASSET_LIB_GEN_PATHS[u.pathname] ? { pathname: u.pathname, ...ASSET_LIB_GEN_PATHS[u.pathname] } : null;
    } catch { return null; }
}

async function _assetLibTransformPayload(payload, hit) {
    const hasActive = assetLibActiveChars().length + assetLibActiveStyles().length > 0;
    if (!assetLib.autoAttach || !hasActive) return { payload, endpoint: null };
    const userSource = (payload && payload.image) || null;
    const result = await assetLibBuildEffectiveSource(userSource);
    if (!result.image) return { payload, endpoint: null };
    const out = { ...payload, image: result.image };
    let newEndpoint = null;
    if (hit.kind === 'image' && hit.pathname === '/api/image/generate') {
        newEndpoint = '/api/image/edit';
    }
    let basePrompt = out.prompt || '';
    const preservePrefix = /^Preserve the EXACT face[\s\S]*?Place them in a new scene:\s*/i;
    if (preservePrefix.test(basePrompt)) basePrompt = basePrompt.replace(preservePrefix, '');
    if (hit.kind === 'image' && result.count >= 2) {
        const charLabels = assetLibActiveChars().map(c => (c.name || 'CHAR').toUpperCase());
        const subjects = (userSource ? ['the ATTACHED subject'] : []).concat(charLabels);
        if (subjects.length >= 3) {
            out.prompt = `The source image is a labeled grid of ${subjects.length} reference subjects (${subjects.join(', ')}). Recreate ALL ${subjects.length} subjects together in a single new scene with their EXACT faces, features, hair, and clothing preserved. Scene: ${basePrompt}`;
        } else if (subjects.length === 2) {
            out.prompt = `The source image shows two reference subjects (${subjects[0]} and ${subjects[1]}). Recreate BOTH together in a single new scene with their EXACT faces, features, hair, and clothing preserved. Scene: ${basePrompt}`;
        } else if (!userSource) {
            out.prompt = `Apply the visual styles shown in the source image to: ${basePrompt}`;
        }
    } else if (hit.kind === 'image' && result.count === 1 && !userSource && basePrompt) {
        out.prompt = `Using the subject shown in the source image with their EXACT face and features preserved: ${basePrompt}`;
    }
    return { payload: out, endpoint: newEndpoint };
}

const _assetLibOrigFetch = window.fetch.bind(window);
window.fetch = async function(input, init) {
    try {
        const hit = _assetLibMatchPath(input);
        if (!hit) return _assetLibOrigFetch(input, init);
        const method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
        if (method !== 'POST') return _assetLibOrigFetch(input, init);
        const bodyStr = init && typeof init.body === 'string' ? init.body : null;
        if (!bodyStr) return _assetLibOrigFetch(input, init);
        let payload;
        try { payload = JSON.parse(bodyStr); } catch { return _assetLibOrigFetch(input, init); }
        const { payload: newPayload, endpoint: newEndpoint } = await _assetLibTransformPayload(payload, hit);
        if (newPayload === payload && !newEndpoint) return _assetLibOrigFetch(input, init);
        const newInit = { ...init, body: JSON.stringify(newPayload) };
        const newInput = newEndpoint ? newEndpoint : input;
        return _assetLibOrigFetch(newInput, newInit);
    } catch (err) {
        console.error('[AssetLib] fetch wrapper:', err);
        return _assetLibOrigFetch(input, init);
    }
};

// Inject "Save as Char/Style" buttons whenever the imagine preview re-renders
function _assetLibInjectImagineSaveButtons() {
    const preview = document.getElementById('imagine-preview');
    if (!preview) return;
    const actions = preview.querySelector('.image-actions');
    if (!actions || actions.querySelector('.asset-save-char')) return;
    const img = preview.querySelector('img');
    if (!img || !img.src) return;
    const url = img.src;
    const charBtn = document.createElement('button');
    charBtn.className = 'btn btn-sm btn-ghost asset-save-char';
    charBtn.title = 'Save as Character (auto-attach to future gens)';
    charBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span style="margin-left:4px;font-size:10px">Char</span>';
    charBtn.onclick = (e) => { e.stopPropagation(); saveImageToAssetLib(url, 'character'); };
    const styleBtn = document.createElement('button');
    styleBtn.className = 'btn btn-sm btn-ghost asset-save-style';
    styleBtn.title = 'Save as Style (auto-attach to future gens)';
    styleBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg><span style="margin-left:4px;font-size:10px">Style</span>';
    styleBtn.onclick = (e) => { e.stopPropagation(); saveImageToAssetLib(url, 'style'); };
    actions.appendChild(charBtn);
    actions.appendChild(styleBtn);
}

function _assetLibBootstrap() {
    assetLibFetch();
    // Watch imagine preview for re-renders → inject save buttons
    const preview = document.getElementById('imagine-preview');
    if (preview) {
        const obs = new MutationObserver(() => _assetLibInjectImagineSaveButtons());
        obs.observe(preview, { childList: true, subtree: true });
        _assetLibInjectImagineSaveButtons();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _assetLibBootstrap);
} else {
    _assetLibBootstrap();
}
