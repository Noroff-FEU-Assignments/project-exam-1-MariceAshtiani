const url = "https://zelda-epona.site/stylex/wp-json/wp/v2/posts?_embed";
const proxy = "https://noroffcors.herokuapp.com/";
const corsFix = proxy + url + "&per_page=10";

const postContainer = document.querySelector(".post-container");
const morePosts = document.querySelector(".load-more");

async function getPosts() {
    try {
        const response = await fetch(corsFix);
        const results = await response.json();

        postContainer.innerHTML = "";

        for(let i = 0; i < results.length; i++) {
            console.log(results[i]);

            postContainer.innerHTML += `<div class="post-preview"> 
            <a class="post-specific" href="blogspecific.html?id=${results[i].id}">
            <h2>${results[i].title.rendered}</h2>
            <img src="${results[i].content.rendered}" class="post-image" alt="${results[i].title.rendered}"></img>
            <p>${results[i].excerpt}</p>
            </a>
            </div>
            `
        }
    } catch (error) {
        console.log(error);
        postContainer.innerHTML = message("error", error);
    }
}

getPosts();

morePosts.onclick = function() {
    const newUrl = proxy + url + "&per_page=20";
    postContainer.innerHTML = "";
    blogList(newUrl);
    morePosts.style.display = "none";
}