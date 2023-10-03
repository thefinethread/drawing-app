const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeRange = document.getElementById('size-range');
const shapes = document.querySelectorAll('.shape');
const colors = document.querySelector('.colors').children;
const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-canvas');
const saveBtn = document.getElementById('save-canvas');

let isDrawing = false;
let x, y;
let size;
let colorVal = '#11111';

const startDrawing = (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
};

const draw = (e) => {
    if (isDrawing) {
        drawLine(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
};

const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = size;
    ctx.strokeStyle = colorVal;
    ctx.stroke();
};

const stopDrawing = () => {
    isDrawing = false;
};

const setCanvasDimensions = () => {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
};

// add css to the selected shape element
shapes.forEach((shape) => {
    shape.addEventListener('click', () => {
        if (shape.classList.contains('active')) {
            shape.classList.remove('active');
            return;
        }
        // remove the active class from the other shapes element
        document
            .querySelectorAll('.shape.active')
            .forEach((el) => el.classList.remove('active'));
        // add active class to the selected element
        shape.classList.add('active');
    });
});

// select color
Array.from(colors).forEach((color) => {
    color.addEventListener('click', (e) => {
        document
            .querySelectorAll('.color.selected')
            .forEach((el) => el.classList.remove('selected'));
        color.classList.add('selected');
        colorVal = color.dataset.color;
    });
});

setCustomColor = (e) => {
    colors[4].style.backgroundColor = e.target.value;
    colorVal = e.target.value;
};

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = 'drawing.jpeg';
    link.href = dataUrl;
    link.click();
});

colorPicker.addEventListener('change', setCustomColor);

sizeRange.addEventListener('change', () => (size = sizeRange.value));

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

window.addEventListener('DOMContentLoaded', setCanvasDimensions);
