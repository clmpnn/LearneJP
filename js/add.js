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

let practiceData = {};

const levelInput = document.getElementById('levelInput');
const sectionInput = document.getElementById('sectionInput');
const passageField = document.getElementById('passageField');
const passageInput = document.getElementById('passageInput');
const questionInput = document.getElementById('questionInput');
const audioField = document.getElementById('audioField');
const audioInput = document.getElementById('audioInput');
const imageField = document.getElementById('imageField');
const imageInput = document.getElementById('imageInput');
const imageFile = document.getElementById('imageFile');
const imagePreviewWrap = document.getElementById('imagePreviewWrap');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewInfo = document.getElementById('imagePreviewInfo');
const imageRemoveBtn = document.getElementById('imageRemoveBtn');
const statusMsg = document.getElementById('statusMsg');
const adminForm = document.getElementById('adminForm');
const downloadBtn = document.getElementById('downloadBtn');

// Question data comes from js/practice-data.js, which add.html loads with a
// <script> tag before this file (no fetch involved, so it works on file://
// pages too). Fetching the raw JSON is kept only as a fallback.
if (typeof window.PRACTICE_DATA === 'object' && window.PRACTICE_DATA !== null) {
    practiceData = window.PRACTICE_DATA;
} else {
    loadFromJsonFallback();
}

async function loadFromJsonFallback() {
    const paths = ['../practice-data.json', '../data/practice-data.json'];

    for (const path of paths) {
        try {
            const res = await fetch(path);
            if (!res.ok) continue;
            practiceData = await res.json();
                    return;
        } catch (err) {
            // Try the next path.
        }
    }

    console.error('Could not load practice data — check that js/practice-data.js is loaded by add.html. Starting with empty sets.');
    practiceData = { n5: {}, n4: {}, n3: {}, n2: {}, n1: {} };
}

sectionInput.addEventListener('change', () => {
    toggleFields();
});
toggleFields();

function toggleFields() {
    const section = sectionInput.value;
    passageField.classList.toggle('hidden-field', section !== 'reading');
    audioField.classList.toggle('hidden-field', section !== 'listening');
    imageField.classList.toggle('hidden-field', section !== 'listening');
}

// ===================== IMAGE UPLOAD (Listening) =====================
// A picked image is embedded into the question as a data URL, so it travels
// inside practice-data.js — nothing to copy into an images/ folder. Files up
// to 300 KB are embedded as-is (keeps GIF animation); larger ones are
// downscaled to fit 960×640 and recompressed as JPEG.

let embeddedImage = null;

const EMBED_AS_IS_LIMIT = 300 * 1024;
const EMBED_MAX_W = 960;
const EMBED_MAX_H = 640;

imageFile.addEventListener('change', () => {
    const file = imageFile.files && imageFile.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showStatus('That file is not an image.', 'error');
        imageFile.value = '';
        return;
    }
    if (file.size <= EMBED_AS_IS_LIMIT) {
        const reader = new FileReader();
        reader.onload = () => setEmbeddedImage(reader.result, file, false);
        reader.onerror = () => showStatus('Could not read the image file.', 'error');
        reader.readAsDataURL(file);
    } else {
        compressAndEmbed(file);
    }
});

function compressAndEmbed(file) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
        const scale = Math.min(1, EMBED_MAX_W / img.width, EMBED_MAX_H / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        setEmbeddedImage(canvas.toDataURL('image/jpeg', 0.82), file, true);
    };
    img.onerror = () => {
        URL.revokeObjectURL(url);
        showStatus('Could not load that image.', 'error');
        imageFile.value = '';
    };
    img.src = url;
}

function setEmbeddedImage(dataUrl, file, wasResized) {
    embeddedImage = dataUrl;
    imagePreview.src = dataUrl;
    const kb = Math.round(dataUrl.length * 3 / 4 / 1024);
    imagePreviewInfo.textContent =
        `${file.name} — embedded${wasResized ? ' (resized)' : ''}, ~${kb} KB`;
    imagePreviewWrap.classList.remove('hidden-field');
    imageInput.value = '';
    imageInput.disabled = true;
    showStatus('Image ready — it will be embedded into the question.', 'success');
}

function clearEmbeddedImage() {
    embeddedImage = null;
    imageFile.value = '';
    imagePreview.removeAttribute('src');
    imagePreviewWrap.classList.add('hidden-field');
    imageInput.disabled = false;
}

imageRemoveBtn.addEventListener('click', clearEmbeddedImage);

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const level = levelInput.value;
    const section = sectionInput.value;
    const question = questionInput.value.trim();
    const choices = [
        document.getElementById('choice0').value.trim(),
        document.getElementById('choice1').value.trim(),
        document.getElementById('choice2').value.trim(),
        document.getElementById('choice3').value.trim()
    ];
    const answer = parseInt(document.querySelector('input[name="correctAnswer"]:checked').value);

    if (!question) {
        showStatus('Question text is required.', 'error');
        return;
    }
    if (choices.some(c => !c)) {
        showStatus('All 4 choices must be filled in.', 'error');
        return;
    }

    const item = { question, choices, answer };

    if (section === 'reading') {
        const passage = passageInput.value.trim();
        if (!passage) {
            showStatus('Passage is required for Reading questions.', 'error');
            return;
        }
        item.passage = passage;
    }

    if (section === 'listening') {
        const audio = audioInput.value.trim();
        if (!audio) {
            showStatus('Audio path is required for Listening questions.', 'error');
            return;
        }
        item.audio = audio;
        const image = embeddedImage || imageInput.value.trim();
        if (image) item.image = image;
    }

    if (!practiceData[level]) practiceData[level] = {};
    if (!practiceData[level][section]) practiceData[level][section] = [];
    practiceData[level][section].push(item);

    showStatus(`Added! ${level}.${section} now has ${practiceData[level][section].length} questions. Remember to click "Download Updated JSON" to save.`, 'success');

    questionInput.value = '';
    passageInput.value = '';
    document.getElementById('choice0').value = '';
    document.getElementById('choice1').value = '';
    document.getElementById('choice2').value = '';
    document.getElementById('choice3').value = '';
    audioInput.value = '';
    imageInput.value = '';
    clearEmbeddedImage();
    document.querySelector('input[name="correctAnswer"][value="0"]').checked = true;
});

downloadBtn.addEventListener('click', () => {
    const jsonStr = JSON.stringify(practiceData, null, 2);
    const fileContents =
        '// LearneJP practice questions — generated file.\n' +
        '// Move this into your js/ folder, replacing the old practice-data.js.\n' +
        `window.PRACTICE_DATA = ${jsonStr};\n`;
    const blob = new Blob([fileContents], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'practice-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Downloaded practice-data.js! Move it into your js/ folder, replacing the old one, then reload.', 'success');
});

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = type;
}
