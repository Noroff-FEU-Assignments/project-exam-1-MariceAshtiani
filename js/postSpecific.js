const postSpecific = document.querySelector(".post-specific");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts/" + id;
console.log(url);

async function fetchPost() {

    try {
        const response = await fetch(url);
        const specific = await response.json();

        console.log(specific);
        
        createHtml(specific);

    } catch(error) {
        console.log(error);
        postSpecific.innerHTML = message("error", error);
    }
}

fetchPost ();

function createHtml(specific) {

    postSpecific.innerHTML = ` <div class="single-post"> 
                                <h1>${specific.title}</h1>
                                <img src="${specific.content}" alt=${specific.title}></img>
                                <p>${specific.excerpt}</p>
                                </div>
                                `
}