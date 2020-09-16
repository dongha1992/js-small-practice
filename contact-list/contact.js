const ul = document.querySelector("#names")
const nameIndex = document.querySelector(".list-index")
const nameItems = document.querySelectorAll(".list-item a")
const input = document.querySelector("input")

input.addEventListener("keyup", findName)

function findName() {

    let val = input.value
    for (let i = 0; i < nameItems.length; i++) {
        let letter = nameItems[i].innerHTML;

        if (letter.indexOf(val) > -1) {
            nameItems[i].style.display = ""
        } else {
            nameItems[i].style.display = "none"
        }
    }

}