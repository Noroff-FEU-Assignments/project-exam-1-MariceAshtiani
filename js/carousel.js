const carouselPost = document.querySelector(".slider");
const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts?_embed&per_page=5";

const parser = new DOMParser();

function extractImages(htmlString) {
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.querySelectorAll('img');
}

async function getCarouselPost() {

    try {
        const response = await fetch(url);
        const results = await response.json();


        for(let i = 0; i < results.length; i++) {
            console.log(results[i]);

            const images = [...extractImages(results[i].content.rendered)];
            const imageTags = images.map(
                (image) => `<img src="${image.src}" alt ="${image.alt}" class="carousel-image"/>`,
            );

            carouselPost.innerHTML += `<div class="slide"> 
                                        <a class="post-specific" href="blogspecific.html?id=${results[i].id}">
                                        <h2>${results[i].title.rendered}</h2>
                                        <p>${results[i].excerpt.rendered}</p>
                                        </a>
                                        </div>`
        }

        createSlider();
    } catch (error) {
        console.log(error);
        carouselPost.innerHTML = message("error", error);
    }
}

getCarouselPost();


function createSlider() {
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

}

