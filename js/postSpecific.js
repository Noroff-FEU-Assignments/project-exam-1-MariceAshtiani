const postSpecific = document.querySelector(".post-specific");
const title = document.querySelector(".specific");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts/" + id;

async function fetchPost() {
    try {
        const response = await fetch(url);
        const specific = await response.json();

        title.innerHTML = `Stylex | ${specific.title.rendered}`;
        
        createHtml(specific);
        getModals();

    } catch(error) {
        console.log(error);
        postSpecific.innerHTML = message("error", error);
    }
}

fetchPost();

function createHtml(specific) {
    postSpecific.innerHTML = ` <div class="single-post"> 
                                <h1>${specific.title.rendered}</h1>
                                <div class="content">${specific.content.rendered}</div>
                                </div>
                                `;
}

function getModals() {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");

    const images = document.querySelectorAll(".post-specific img");
    
    images.forEach(function(img) {
        img.addEventListener("click", function(event) {
            const src = event.target.src;
            modal.style.display = "block";
            modalContent.src = src;
        });
    });

    modal.addEventListener("click", function (event) {
        event.target.style.display = "none";
    });

}