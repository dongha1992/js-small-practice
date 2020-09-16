const productSelect = document.querySelector(".user-select-product")
const ratingSelect = document.querySelector(".user-rating-product")
const body = document.querySelector("body")

const ratings = {
    iphone: 5,
    lg: 4,
    samsung: 3,
    mac: 2,
    dongha: 5
}

let product;
const totalRating = 5;

productSelect.addEventListener("change", function(e) {
    product = e.target.value;
    ratingSelect.disabled = false;
    ratingSelect.value = ratings[product]
})
ratingSelect.addEventListener("input", function(e) {
    let rating = e.target.value
    if (rating > 5) {
        body.style.backgroundColor = "red"
        return;
    }
    body.style.backgroundColor = ""
    ratings[product] = rating;
    getRating()

})

function getRating() {
    for (rating in ratings) {
        const percentage = (ratings[rating] / totalRating) * 100;
        const rounded = `${Math.round(percentage /10) *10}%`
        document.querySelector(`.${rating} .stars-inner`).style.width = rounded
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating]

    }
}

getRating()