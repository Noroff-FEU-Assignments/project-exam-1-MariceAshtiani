const postContainer = document.querySelector(".post-container");
const morePosts = document.querySelector(".load-more");

let pageNumber = 0

const parser = new DOMParser();

function extractImages(htmlString) {
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.querySelectorAll('img');
}

async function getPosts() {
    pageNumber = pageNumber + 1;

    if (pageNumber === 1) {
        postContainer.innerHTML = "";
    }

    const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts?_embed&page=" + pageNumber;

    try {
        const response = await fetch(url);
        const totalPages = response.headers.get("x-wp-totalpages");
        const results = await response.json();

        if (Number(totalPages) === pageNumber) {
            morePosts.style.display = "none";
        }

        for(let i = 0; i < results.length; i++) {
            console.log(results[i]);

            const images = [...extractImages(results[i].content.rendered)];

            const imageTags = images.map(
                (image) => `<img src="${image.src}" alt ="image" class="post-image"/>`,
            );

            postContainer.innerHTML += `<div class="post-preview"> 
                                        <a class="post-specific" href="blogspecific.html?id=${results[i].id}">
                                        <h2>${results[i].title.rendered}</h2>
                                        <div class="post-content">
                                        ${imageTags[0]}
                                        <div class="post-text">${results[i].excerpt.rendered}</div>
                                        </a>
                                        </div>
                                        </div>`
        }
    } catch (error) {
        console.log(error);
        postContainer.innerHTML = message("error", error);
    }
}

getPosts();

morePosts.onclick = function() {
getPosts();
};