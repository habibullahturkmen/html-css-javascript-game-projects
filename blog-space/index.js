const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const form = document.querySelector(".post-form");
let postArray = [];

function renderPosts() {
    let html = ""
    for (let post of postArray) {
        html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `;
    }
    document.getElementById("blog-list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postArray = data.slice(0, 5);
        renderPosts();
    });

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = {
        title: titleInput.value,
        body: bodyInput.value,
    }
    form.reset();

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(post => {
            const singlePost = {
                userId: 1,
                id: postArray.length + 1,
                title: post.title,
                body: post.body,
            }
            postArray.unshift(singlePost)
            renderPosts();
        });
});

