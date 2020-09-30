function animate() {
    const arrows = document.querySelectorAll(".fa-arrow-down")

    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            const currentInput = arrow.previousElementSibling;
            const parent = arrow.parentElement
            const next = arrow.parentElement.nextElementSibling

            if (currentInput.type === "text" && validationUser(currentInput)) {
                nextSlide(parent, next)
            } else if (validationEmail(currentInput) && currentInput.type === "email") {
                nextSlide(parent, next)
            } else if (validationPassword(currentInput) && currentInput.type === "password") {
                nextSlide(parent, next)
            } else {
                parent.style.animation = "shake 0.1s ease-in"
                alert("short")
            }
            parent.addEventListener("animationend", () => {
                parent.style.animation = "";

            });




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

function validationEmail(email) {
    const check = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
    if (check.test(email.value)) {
        return true;
    } else {

        error()

    }
}

function validationPassword(password) {
    if (password.value < 5) {

        error()
    } else {
        return true;
    }
}

function error() {
    document.querySelector("body").style.backgroundColor = "red"
}

function nextSlide(parent, next) {
    parent.classList.add("inactive")
    next.classList.remove("inactive")
    next.classList.add("active")
}

animate()