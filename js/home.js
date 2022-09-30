function getImageModals () {
    const modal = document.querySelector(".home-modal");
    const modalContent = document.querySelector(".home-modalContent");

    const images = document.querySelectorAll(".image-trigger");

    images.forEach(function(img) {
        img.addEventListener("click", function(event) {
            const src = event.target.src;
            modal.getElementsByClassName.display = "block";
            modalContent.src = src;
        });
    });

    modal.addEventListener("click", function (event) {
        event.target.style.display = "none";
    });
}