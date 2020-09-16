const canvas = document.getElementById("js-canvas")
const ctx = canvas.getContext("2d");
const rangeBtn = document.querySelector(".color-range")
const colorBtn = document.querySelectorAll(".color")
const mode = document.querySelector(".mode")
const saveBtn = document.querySelector(".save-btn")

canvas.width = 400;
canvas.height = 400;

let painting = false;
let filling = false;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
let currentColor;
ctx.strokeStyle = "black"
ctx.lineWidth = 2.5;
let x = 0;
let y = 0;


function modeChange() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Paint"
        handleCanvasClick()
    } else {
        filling = true;
        mode.innerText = "Fill"

    }
}


function startPainting() {
    painting = true;
}

function doPainting(e) {
    x = e.offsetX
    y = e.offsetY
    if (painting === true) {
        ctx.lineTo(x, y);
        ctx.stroke();

    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);

    }

}

function stopPainting() {
    painting = false;
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

}

function handleSave() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a")
    link.href = image;
    link.download = "Paint"
    link.click()
}


canvas.addEventListener("mousemove", doPainting)
canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mouseleave", stopPainting)
canvas.addEventListener("mouseup", stopPainting)
canvas.addEventListener("click", handleCanvasClick)
mode.addEventListener("click", modeChange)

colorBtn.forEach(color => {
    color.addEventListener("click", function() {
        let currentColor = color.style.backgroundColor
        ctx.strokeStyle = currentColor
        ctx.fillStyle = currentColor

    })
})

rangeBtn.addEventListener("change", function(e) {
    let currentWidth = e.target.value;
    ctx.lineWidth = currentWidth;
})

saveBtn.addEventListener("click", handleSave)