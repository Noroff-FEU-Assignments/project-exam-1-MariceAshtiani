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

        return specific;
        

    } catch(error) {
        console.log(error);
        postSpecific.innerHTML = message("error", error);
    }
}

function createHtml(specific) {

    postSpecific.innerHTML = ` <div class="single-post"> 
                                <h1>${specific.title.rendered}</h1>
                                <div class="content">${specific.content.rendered}</div>
                                </div>
                                `
}

const modal = document.querySelector(".modal");
const parser = new DOMParser();

function extractImagesProperly(htmlString) {
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.querySelectorAll("img")
}

const imgs = extractImagesProperly(post.content.rendered);


function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

async function fetchAll() {
    const post = await fetchPost();
    createHtml(post)
    document.querySelectorAll("img").forEach(function(img) {
        img.addEventListener("click", toggleModal)
        window.addEventListener("click", windowOnClick);
    })

    return "ready!";
}

fetchAll().then(console.log);