const sliderWrap = document.querySelector(".container")
const slide = document.querySelector(".img-wrapper")
const sliderImages = document.querySelectorAll(".img-wrapper img")
const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")


let cnt = 1;
const size = sliderImages[0].clientWidth
slide.style.transform = "translateX(" + (-size * cnt) + "px)"
cnt++;


nextBtn.addEventListener("click", function() {
    if (cnt >= sliderImages.length - 1) return;
    slide.style.transition = "transform 0.4s ease-in-out";
    slide.style.transform = "translateX(" + (-size * cnt) + "px)"
    cnt++;

})


prevBtn.addEventListener("click", function() {
    if (cnt <= 0) return;
    slide.style.transition = "transform 0.4s ease-in-out";
    slide.style.transform = "translateX(" + (-size * cnt) + "px)"
    cnt--;

})

slide.addEventListener("transitionend", function() {
    if (sliderImages[cnt].id === "last") {
        slide.style.transition = "none";
        cnt = sliderImages.length - 2;

    }
    if (sliderImages[cnt].id === "first") {
        slide.style.transition = "none";
        cnt = sliderImages.length - cnt

    }

})