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

        console.log(specific);
        
        createHtml(specific);
        

     //   const parser = new DOMParser();
       // const content1 = specific;
        //const parsedDocument = parser.parseFromString(
          //  content1.content.rendered, "text/html"
        //);
        //const img = parsedDocument.querySelector("img");
        //console.log(img);

        title.innerHTML = `Stylex | ${specific.title.rendered}`;
        

    } catch(error) {
        console.log(error);
        postSpecific.innerHTML = message("error", error);
    }
}

fetchPost ();

function createHtml(specific) {

    postSpecific.innerHTML = ` <div class="single-post"> 
                                <h1>${specific.title.rendered}</h1>
                                <div class="content">${specific.content.rendered}</div>
                                </div>
                                `
}

const trigger = postSpecific.querySelectorAll("img");
const modal = document.querySelector(".modal");


function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

    trigger.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

