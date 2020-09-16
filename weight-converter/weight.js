const input = document.querySelector(".user-input input")
const result = document.querySelector(".result")
const poundResult = document.querySelector(".pound-result")
const gramsResult = document.querySelector(".grams-result")
const ounceResult = document.querySelector(".ounce-result")

result.style.visibility = "hidden"

input.addEventListener("input", function() {

    let val = input.value;
    result.style.visibility = "visible"
    poundResult.innerHTML = val * 2.204623
    gramsResult.innerHTML = val * 1000
    ounceResult.innerHTML = val * 35.273962
})