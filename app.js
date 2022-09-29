const canvas = document.querySelector('canvas');
const form = document.querySelector('.signature-pad-form');
const clearBtn = document.querySelector('.clear-button');

const ctx = canvas.getContext('2d');
let writingMode = false;

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();
    const [posX, posY] = getCursorPosition(event);
    ctx.moveTo(posX, posY);
}

const handlePointerUp = () => {
    writingMode = false;
}

const handlePointerMove = (event) => {
    if (!writingMode) return;
    const [posX, posY] = getCursorPosition(event);
    ctx.lineTo(posX, posY);
    ctx.stroke();
}

const getCursorPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;
    return [positionX, positionY];
}

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = canvas.toDataURL();
    const img = document.createElement('img');
    img.src = url;
    img.height = canvas.height;
    img.width = canvas.width;
    img.style.display = 'block';
    form.appendChild(img);
    clearPad();
});

const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
});

canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
canvas.addEventListener('pointermove', handlePointerMove, {passive: true});
