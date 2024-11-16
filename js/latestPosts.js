import { blogUrlBase, message } from "./script.js";

//call API to get blogs
async function latestPosts() {
  try {
    const response = await fetch(blogUrlBase + "?per_page=4");
    const postList = await response.json();
    console.log({ postList });

    //CREATE DIV
    const sideBar = document.querySelector(".sidebar");
    const latestPostList = document.createElement("div");
    latestPostList.classList.add("latestPostContainer");

    postList.forEach((list) => {
      const postHeader = document.createElement("div");
      postHeader.classList.add("postHeader");

      postHeader.innerHTML = `
      <a href="../post/index.html?id=${list.id}">  
      <p>${list.title.rendered}</p>
      </a>
      `;
      latestPostList.appendChild(postHeader);
      sideBar.appendChild(latestPostList);
    });
  } catch (error) {
    document.getElementsByClassName("sidebar").innerHTML += message;
  }
}

latestPosts();
