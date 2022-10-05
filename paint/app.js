const canvas = document.querySelector("#jsCanvas");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const ctx = canvas.getContext("2d");


const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c"


ctx.fillStyle ="white";
ctx.fillRect(0, 0, CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

function startPainting () {
    painting = true;
}

function stopPainting () {
    painting = false;
}

function onMousemove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);   
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleChangeColor (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange (event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeChange () {
    if (filling === true) {
        filling = false;
        mode.innerText = "Paint";
    } else {
        filling = true;
        mode.innerText = "Fill";
    }
}

function handleClickCanvas () {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE,CANVAS_SIZE);
    } 
}

function handleCm (event) {
    event.preventDefalut();
}

function handleSaveClick () {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "JSpaint";
    link.click();
}

function handleClearBtn () {
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMousemove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClickCanvas);
    canvas.addEventListener("contextmenu", handleCm)
}

Array.from(colors).forEach(color =>
    color.addEventListener("click",handleChangeColor));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeChange);
}

if (saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}

if (clearBtn) {
    clearBtn.addEventListener("click", handleClearBtn);
}