const btn = document.querySelector("button")
const span = document.querySelector(".hexcode span")
const body = document.querySelector('body')

const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]




function colorHandler() {
    const temp = [];
    const hexLen = hex.length

    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * hexLen)
        temp.push(hex[random])
    }
    let result = temp.join("")

    body.style.backgroundColor = `#${result}`
    span.textContent = `#${result}`
    console.log(result)
}


function init() {

    btn.addEventListener("click", colorHandler)

}
init()