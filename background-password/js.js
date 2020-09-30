function animate() {
    const arrows = document.querySelectorAll(".fa-arrow-down")

    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            const currentInput = arrow.previousElementSibling;
            const parent = arrow.parentElement
            const next = arrow.parentElement.nextElementSibling

            if (currentInput.type === "text" && validationUser(currentInput)) {
                nextSlide(parent, next)
            }
        })
    })
}

function validationUser(user) {
    if (user.value.length < 6) {
        error()
    } else {
        return true;
    }
}

function error() {
    document.querySelector("body").style.backgroundColor = "red"
}