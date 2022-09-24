const carouselPost = document.querySelector(".slider");
const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts?_embed&per_page=5";


async function getCarouselPost() {

    try {
        const response = await fetch(url);
        const results = await response.json();


        for(let i = 0; i < results.length; i++) {
            console.log(results[i]);

            carouselPost.innerHTML += `<div class="slide"> 
                                        <h2>${results[i].title.rendered}</h2>
                                        <p>${results[i].excerpt.rendered}</p>
                                        </div>`
        }
    } catch (error) {
        console.log(error);
        carouselPost.innerHTML = message("error", error);
    }
}

getCarouselPost();


const slides = document.querySelectorAll(".slide");

slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
});

const nextSlide = document.querySelector(".next-button");

let curSlide = 0;

let maxSlide = slides.length -1;

nextSlide.addEventListener("click", function() {
    if (curSlide === maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
});

const prevSlide = document.querySelector(".prev-button");

prevSlide.addEventListener("click", function() {
    if (curSlide === 0) {
        curSlide = maxSlide;
    } else {
        curSlide--;
    }

    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        console.log(indx);
    });
});

