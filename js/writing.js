// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn

const canvas = document.getElementById('writingCanvas');
const wrapper = document.getElementById('canvasWrapper');
const zoomLevelDisplay = document.getElementById('zoomLevel');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');
const clearBtn = document.getElementById('clearCanvas');
// `desynchronized` asks the browser for a low-latency canvas path (it may
// bypass a compositing step), which is exactly what pen/finger drawing wants.
const ctx = canvas.getContext('2d', { desynchronized: true }) || canvas.getContext('2d');

// ===================== KANA TRACING =====================
// A chosen character is painted as a faint template inside a practice square
// (world coordinates, aligned to the major grid), underneath the user's
// strokes. Works for any character — writing.html#trace=き (or a kanji) opens
// the page with that template active.

const traceSelect = document.getElementById('traceSelect');
const tracePrevBtn = document.getElementById('tracePrevBtn');
const traceNextBtn = document.getElementById('traceNextBtn');

const HIRAGANA_TRACE =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめも' +
    'やゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ';
const KATAKANA_TRACE = [...HIRAGANA_TRACE]
    .map(c => String.fromCharCode(c.charCodeAt(0) + 0x60)).join('');
const TRACE_LIST = [...HIRAGANA_TRACE, ...KATAKANA_TRACE];

const tracePlayBtn = document.getElementById('tracePlayBtn');
const traceCustom = document.getElementById('traceCustom');

const TRACE_BOX = 200; // world units — two major grid squares
let traceChar = null;

// Stroke-order data (js/stroke-data.js → window.STROKE_DATA), extracted from
// the KanjiVG project. Paths live in a 109×109 coordinate space, one SVG path
// per stroke, in writing order.
const STROKES = (typeof window.STROKE_DATA === 'object' && window.STROKE_DATA !== null)
    ? window.STROKE_DATA
    : {};
const HAS_PATH2D = typeof Path2D === 'function';
const KVG_SIZE = 109;

let strokePaths = null;   // Path2D[] for the current character
let strokeStarts = null;  // {x, y}[] — where each stroke begins (number anchors)
let strokeLengths = null; // number[] — path lengths for smooth playback, if measurable
let playback = null;      // { index, progress, lastTs, acc } while animating

function parseStrokeStart(d) {
    const m = /^[Mm]\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(d);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
}

// Measuring path lengths needs a real SVG DOM; where unsupported we fall back
// to revealing whole strokes one at a time during playback.
function measureStrokeLengths(ds) {
    try {
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        const path = document.createElementNS(ns, 'path');
        svg.appendChild(path);
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        document.body.appendChild(svg);
        const lengths = ds.map(d => {
            path.setAttribute('d', d);
            return path.getTotalLength();
        });
        document.body.removeChild(svg);
        return lengths.every(n => isFinite(n) && n > 0) ? lengths : null;
    } catch (err) {
        return null;
    }
}

function prepareStrokes(char) {
    const ds = char ? STROKES[char] : null;
    if (!ds || !HAS_PATH2D) {
        strokePaths = strokeStarts = strokeLengths = null;
        return;
    }
    strokePaths = ds.map(d => new Path2D(d));
    strokeStarts = ds.map(parseStrokeStart);
    strokeLengths = measureStrokeLengths(ds);
}

function populateTraceSelect() {
    const free = document.createElement('option');
    free.value = '';
    free.textContent = 'Free drawing';
    traceSelect.appendChild(free);

    [['Hiragana', HIRAGANA_TRACE], ['Katakana', KATAKANA_TRACE]].forEach(([label, chars]) => {
        const group = document.createElement('optgroup');
        group.label = label;
        [...chars].forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            group.appendChild(opt);
        });
        traceSelect.appendChild(group);
    });
}
populateTraceSelect();

function setTrace(char) {
    stopStrokePlayback(false);
    traceChar = char || null;
    prepareStrokes(traceChar);
    tracePlayBtn.classList.toggle('hidden-field', !strokePaths);
    traceSelect.value = TRACE_LIST.includes(char) ? char : '';
    if (document.activeElement !== traceCustom) traceCustom.value = '';
    if (traceChar) {
        strokes = [];
        currentStroke = null;
        centerTraceView();
    } else {
        render();
    }
}

function centerTraceView() {
    const rect = wrapper.getBoundingClientRect();
    const fitted = Math.min(rect.width, rect.height) * 0.7 / TRACE_BOX;
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, fitted || 1));
    panX = rect.width / 2 - (TRACE_BOX / 2) * zoom;
    panY = rect.height / 2 - (TRACE_BOX / 2) * zoom;
    zoomLevelDisplay.textContent = `${Math.round(zoom * 100)}%`;
    render();
}

function drawTraceTemplate() {
    if (!traceChar) return;
    const s = TRACE_BOX;
    ctx.save();

    // Practice square
    ctx.strokeStyle = 'rgba(255, 140, 66, 0.8)';
    ctx.lineWidth = 2 / zoom;
    ctx.strokeRect(0, 0, s, s);

    // Dashed centre guides, genkōyōshi style
    ctx.setLineDash([6 / zoom, 6 / zoom]);
    ctx.strokeStyle = 'rgba(255, 140, 66, 0.45)';
    ctx.lineWidth = 1 / zoom;
    ctx.beginPath();
    ctx.moveTo(s / 2, 0);
    ctx.lineTo(s / 2, s);
    ctx.moveTo(0, s / 2);
    ctx.lineTo(s, s / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (strokePaths) {
        drawStrokeGuide(s);
    } else {
        // No stroke data for this character: fall back to a faint font glyph.
        ctx.fillStyle = 'rgba(90, 58, 34, 0.16)';
        // Same textbook stack as --font-jp-study in css/style.css: this glyph is
        // a tracing guide, so it has to show handwritten forms, not print ones.
        ctx.font = `${s * 0.82}px "UD デジタル教科書体 N-R", "UD Digi Kyokasho N-R", ` +
                   `"YuKyokasho", "Klee One", "Hiragino Mincho ProN", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(traceChar, s / 2, s / 2 + s * 0.04);
    }

    ctx.restore();
}

// The real stroke-order guide: KanjiVG strokes scaled into the practice box,
// numbered at each stroke's starting point. During playback, finished strokes
// darken, the current one draws itself, and upcoming ones fade back.
function drawStrokeGuide(s) {
    const k = s / KVG_SIZE;
    ctx.save();
    ctx.scale(k, k);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokePaths.forEach((path, i) => {
        ctx.lineWidth = 5;
        if (!playback) {
            ctx.strokeStyle = 'rgba(90, 58, 34, 0.22)';
            ctx.stroke(path);
        } else if (i < playback.index) {
            ctx.strokeStyle = 'rgba(90, 58, 34, 0.55)';
            ctx.stroke(path);
        } else if (i === playback.index && strokeLengths) {
            ctx.strokeStyle = 'rgba(90, 58, 34, 0.55)';
            ctx.setLineDash([Math.max(0.01, playback.progress), 100000]);
            ctx.stroke(path);
            ctx.setLineDash([]);
        } else {
            ctx.strokeStyle = 'rgba(90, 58, 34, 0.08)';
            ctx.stroke(path);
        }
    });

    if (!playback) {
        ctx.fillStyle = 'rgba(235, 90, 20, 0.9)';
        ctx.font = '600 8px "Poppins", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        strokeStarts.forEach((pt, i) => {
            ctx.fillText(String(i + 1), pt.x - 4.5, pt.y - 4.5);
        });
    }
    ctx.restore();
}

// ----- Stroke playback -----

const rafOrTimeout = typeof window.requestAnimationFrame === 'function'
    ? window.requestAnimationFrame.bind(window)
    : (cb => setTimeout(() => cb(Date.now()), 16));

function startStrokePlayback() {
    if (!strokePaths) return;
    playback = { index: 0, progress: 0, lastTs: null, acc: 0 };
    tracePlayBtn.textContent = '■';
    rafOrTimeout(tickPlayback);
}

function stopStrokePlayback(rerender = true) {
    playback = null;
    if (tracePlayBtn) tracePlayBtn.textContent = '▶';
    if (rerender) render();
}

function tickPlayback(ts) {
    if (!playback) return;
    const now = ts || Date.now();

    if (strokeLengths) {
        if (playback.lastTs === null) playback.lastTs = now;
        const dt = Math.min(64, now - playback.lastTs);
        playback.lastTs = now;
        playback.progress += dt * 0.09; // ≈90 KanjiVG units per second
        if (playback.progress >= strokeLengths[playback.index] + 15) {
            playback.index += 1;
            playback.progress = 0;
        }
    } else {
        playback.acc += 16;
        if (playback.acc >= 420) {
            playback.acc = 0;
            playback.index += 1;
        }
    }

    if (playback.index >= strokePaths.length) {
        stopStrokePlayback();
        return;
    }
    requestRender();
    rafOrTimeout(tickPlayback);
}

tracePlayBtn.addEventListener('click', () => {
    if (playback) stopStrokePlayback();
    else startStrokePlayback();
});

traceCustom.addEventListener('input', () => {
    const ch = [...traceCustom.value.trim()][0];
    if (ch) setTrace(ch);
});

traceSelect.addEventListener('change', () => setTrace(traceSelect.value || null));

function stepTrace(direction) {
    const index = TRACE_LIST.indexOf(traceChar);
    const next = index === -1
        ? 0
        : (index + direction + TRACE_LIST.length) % TRACE_LIST.length;
    setTrace(TRACE_LIST[next]);
}
tracePrevBtn.addEventListener('click', () => stepTrace(-1));
traceNextBtn.addEventListener('click', () => stepTrace(1));

function readTraceHash() {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

    // The dictionary moved to its own page. A #q= link meant for it — an old
    // bookmark, or a cached copy of the kanji reference — is forwarded there
    // instead of being ignored.
    const forDictionary = hash.get('q');
    if (forDictionary) {
        window.location.replace('dictionary.html#q=' + encodeURIComponent(forDictionary));
        return;
    }

    const fromHash = hash.get('trace');
    if (fromHash) setTrace(fromHash.trim());
}
window.addEventListener('hashchange', readTraceHash);

// Re-render once the handwriting font is ready so the template uses Klee One.
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => render());
}

const CELL_SIZE = 20;
const MAJOR_EVERY = 5;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;

let zoom = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let isDrawing = false;
let lastPanPoint = { x: 0, y: 0 };
let lastTouchDistance = null;

let strokes = [];
let currentStroke = null;

// getBoundingClientRect() forces the browser to recompute layout, and the old
// code called it on *every* pointer move (and several times per render). The
// rect only changes on resize/scroll, so it is cached and invalidated instead.
let cachedRect = null;

function getRect() {
    if (!cachedRect) cachedRect = wrapper.getBoundingClientRect();
    return cachedRect;
}

function invalidateRect() {
    cachedRect = null;
}

window.addEventListener('scroll', invalidateRect, { passive: true, capture: true });
window.addEventListener('orientationchange', invalidateRect);

// Beyond 2x, extra device pixels cost real fill time while adding almost no
// visible sharpness — capping keeps high-DPI phones responsive.
const MAX_DPR = 2;

function getDpr() {
    return Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

// Input events can fire several times per displayed frame (120Hz screens,
// coalesced touch). Rendering on each one does redundant work and adds
// latency; one render per animation frame keeps up without falling behind.
let renderQueued = false;

function requestRender() {
    if (renderQueued) return;
    renderQueued = true;
    rafOrTimeout(() => {
        renderQueued = false;
        render();
    });
}

function resizeCanvas() {
    invalidateRect();
    const rect = getRect();
    const dpr = getDpr();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    render();
}

function screenToWorld(clientX, clientY) {
    const rect = getRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    return {
        x: (sx - panX) / zoom,
        y: (sy - panY) / zoom
    };
}

function render() {
    const rect = getRect();
    const dpr = getDpr();

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    drawInfiniteGrid(rect);
    drawTraceTemplate();
    drawStrokes();

    ctx.restore();
}

function drawInfiniteGrid(rect) {
    const topLeft = screenToWorld(rect.left, rect.top);
    const bottomRight = screenToWorld(rect.left + rect.width, rect.top + rect.height);

    const startX = Math.floor(topLeft.x / CELL_SIZE) * CELL_SIZE;
    const endX = Math.ceil(bottomRight.x / CELL_SIZE) * CELL_SIZE;
    const startY = Math.floor(topLeft.y / CELL_SIZE) * CELL_SIZE;
    const endY = Math.ceil(bottomRight.y / CELL_SIZE) * CELL_SIZE;

    // One path per line style instead of one stroke() call per line: when
    // zoomed out this collapses hundreds of draw calls into two.
    const majorStep = CELL_SIZE * MAJOR_EVERY;

    // Lines closer together than a few screen pixels just smear into a solid
    // wash, so skip that level of detail rather than paying to draw it.
    if (CELL_SIZE * zoom >= 4) {
        ctx.lineWidth = 1 / zoom;
        ctx.strokeStyle = 'rgba(255, 140, 66, 0.25)';
        ctx.beginPath();
        for (let x = startX; x <= endX; x += CELL_SIZE) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += CELL_SIZE) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();
    }

    if (majorStep * zoom >= 4) {
        const majorStartX = Math.floor(topLeft.x / majorStep) * majorStep;
        const majorStartY = Math.floor(topLeft.y / majorStep) * majorStep;

        ctx.lineWidth = 1.5 / zoom;
        ctx.strokeStyle = 'rgba(255, 140, 66, 0.55)';
        ctx.beginPath();
        for (let x = majorStartX; x <= endX; x += majorStep) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
        }
        for (let y = majorStartY; y <= endY; y += majorStep) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
        }
        ctx.stroke();
    }
}

function drawStrokes() {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#5a3a22';
    ctx.lineWidth = 4 / zoom;

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    allStrokes.forEach(stroke => {
        if (stroke.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
    });
}

function startDraw(clientX, clientY) {
    isDrawing = true;
    const p = screenToWorld(clientX, clientY);
    currentStroke = { points: [p] };
}

function moveDraw(clientX, clientY) {
    if (!isDrawing) return;
    const p = screenToWorld(clientX, clientY);
    const points = currentStroke.points;
    const previous = points[points.length - 1];
    points.push(p);

    // The fastest possible path for the common case: nothing on screen changes
    // except one new bit of ink, so draw just that segment instead of clearing
    // and rebuilding the grid, template and every earlier stroke.
    drawLiveSegment(previous, p);
}

function drawLiveSegment(from, to) {
    const dpr = getDpr();
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#5a3a22';
    ctx.lineWidth = 4 / zoom;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.restore();
}

function endDraw() {
    if (isDrawing && currentStroke) {
        strokes.push(currentStroke);
    }
    isDrawing = false;
    currentStroke = null;
    render();
}

function setZoom(newZoom, focalX, focalY) {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    const rect = wrapper.getBoundingClientRect();
    const fx = focalX !== undefined ? focalX - rect.left : rect.width / 2;
    const fy = focalY !== undefined ? focalY - rect.top : rect.height / 2;

    const worldX = (fx - panX) / zoom;
    const worldY = (fy - panY) / zoom;

    zoom = clamped;
    panX = fx - worldX * zoom;
    panY = fy - worldY * zoom;

    zoomLevelDisplay.textContent = `${Math.round(zoom * 100)}%`;
    requestRender();
}

function resetView() {
    zoom = 1;
    panX = 0;
    panY = 0;
    zoomLevelDisplay.textContent = '100%';
    render();
}

canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.shiftKey) return;
    startDraw(e.clientX, e.clientY);
});
window.addEventListener('mousemove', (e) => moveDraw(e.clientX, e.clientY));
window.addEventListener('mouseup', endDraw);

wrapper.addEventListener('mousedown', (e) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
        isPanning = true;
        lastPanPoint = { x: e.clientX, y: e.clientY };
        wrapper.classList.add('panning');
        e.preventDefault();
    }
});
window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX += e.clientX - lastPanPoint.x;
    panY += e.clientY - lastPanPoint.y;
    lastPanPoint = { x: e.clientX, y: e.clientY };
    requestRender();
});
window.addEventListener('mouseup', () => {
    isPanning = false;
    wrapper.classList.remove('panning');
});

wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(zoom + delta * zoom, e.clientX, e.clientY);
}, { passive: false });

function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCentroid(touches) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < touches.length; i++) {
        x += touches[i].clientX;
        y += touches[i].clientY;
    }
    return { x: x / touches.length, y: y / touches.length };
}

// Two fingers can mean two things, so the gesture declares itself first:
// change the distance between them straight away and it's a pinch-zoom; hold
// them still for a moment instead and it locks into panning, after which
// sliding moves the view. Neither fires during the brief undecided window.
const PAN_HOLD_MS = 250;
const PINCH_SLOP = 12; // px of finger-distance change that means "pinch"

let touchGesture = null; // { mode: 'undecided' | 'zoom' | 'pan', startTime, startDistance, centroid }
let panHoldTimer = null;

function beginTwoFingerGesture(touches) {
    clearTimeout(panHoldTimer);
    touchGesture = {
        mode: 'undecided',
        startTime: Date.now(),
        startDistance: getTouchDistance(touches),
        centroid: getTouchCentroid(touches)
    };
    lastTouchDistance = touchGesture.startDistance;
    panHoldTimer = setTimeout(() => {
        if (touchGesture && touchGesture.mode === 'undecided') {
            touchGesture.mode = 'pan';
            wrapper.classList.add('panning');
        }
    }, PAN_HOLD_MS);
}

function endTwoFingerGesture() {
    clearTimeout(panHoldTimer);
    panHoldTimer = null;
    touchGesture = null;
    lastTouchDistance = null;
    wrapper.classList.remove('panning');
}

wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        startDraw(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length >= 2) {
        isDrawing = false;
        currentStroke = null;
        beginTwoFingerGesture(e.touches);
    }
}, { passive: false });

wrapper.addEventListener('touchmove', (e) => {
    e.preventDefault();

    if (e.touches.length === 1 && isDrawing) {
        moveDraw(e.touches[0].clientX, e.touches[0].clientY);
        return;
    }
    if (e.touches.length < 2 || !touchGesture) return;

    const distance = getTouchDistance(e.touches);
    const centroid = getTouchCentroid(e.touches);

    if (touchGesture.mode === 'undecided') {
        if (Math.abs(distance - touchGesture.startDistance) > PINCH_SLOP) {
            clearTimeout(panHoldTimer);
            touchGesture.mode = 'zoom';
        } else if (Date.now() - touchGesture.startTime >= PAN_HOLD_MS) {
            touchGesture.mode = 'pan';
            wrapper.classList.add('panning');
        } else {
            // Still undecided — hold the view steady, but keep tracking so
            // whichever gesture wins starts from where the fingers are now.
            lastTouchDistance = distance;
            touchGesture.centroid = centroid;
            return;
        }
    }

    if (touchGesture.mode === 'pan') {
        panX += centroid.x - touchGesture.centroid.x;
        panY += centroid.y - touchGesture.centroid.y;
        requestRender();
    } else if (lastTouchDistance) {
        setZoom(zoom * (distance / lastTouchDistance), centroid.x, centroid.y);
    }

    lastTouchDistance = distance;
    touchGesture.centroid = centroid;
}, { passive: false });

function touchGestureCleanup(e) {
    if (e.touches.length >= 2) {
        // Finger count changed but a gesture is still in progress: restart
        // arbitration, which reseeds the pinch baseline so zoom can't jump.
        beginTwoFingerGesture(e.touches);
    } else {
        endTwoFingerGesture();
    }
    if (e.touches.length === 0) endDraw();
}

wrapper.addEventListener('touchend', touchGestureCleanup, { passive: false });
wrapper.addEventListener('touchcancel', touchGestureCleanup, { passive: false });

zoomInBtn.addEventListener('click', () => setZoom(zoom + 0.25));
zoomOutBtn.addEventListener('click', () => setZoom(zoom - 0.25));
zoomResetBtn.addEventListener('click', resetView);

clearBtn.addEventListener('click', () => {
    strokes = [];
    currentStroke = null;
    render();
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
readTraceHash();