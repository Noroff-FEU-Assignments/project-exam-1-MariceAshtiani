const images = document.querySelectorAll(".image-trigger img");
const modal = document.querySelector(".home-modal");
const modalImg = document.querySelector(".homeModalImg");

images.forEach((image) => {
    image.addEventListener("click", () => {
        modalImg.src = image.src;
        modal.classList.add("appear");

    window.addEventListener("click", () => {
        modal.classList.remove("appear");
    });
    });
});