import { blogUrlBase, message } from "./script.js";

//call API to get blogs
async function latestPosts() {
  try {
    const response = await fetch(blogUrlBase + "?per_page=4");
    const postList = await response.json();
    console.log({ postList });

    //CREATE DIV
    const sideBar = document.querySelector(".sidebar");
    const lastPostContainer = document.createElement("div");
    lastPostContainer.setAttribute("id", "lastPostContainer");
    const latestPostList = document.createElement("div");
    latestPostList.classList.add("latestPostContainer");

    latestPostList.innerHTML = `
      <h2><Strong>latest posts...</strong></h2>`;

    postList.forEach((list) => {
      const postHeader = document.createElement("div");
      postHeader.classList.add("postHeader");
      postHeader.innerHTML = `
            <a href="../post/index.html?id=${list.id}">  
      <p>${list.title.rendered}</p>
      </a>
      `;
      latestPostList.appendChild(postHeader);
      lastPostContainer.appendChild(latestPostList);
      sideBar.appendChild(lastPostContainer);
    });
  } catch (error) {
    document.getElementsByClassName("sidebar").innerHTML += message;
  }
}

latestPosts();
