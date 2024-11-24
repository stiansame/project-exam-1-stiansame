import { blogCategories, message } from "./script.js";

//call API to get blogs
async function categories() {
  try {
    const response = await fetch(blogCategories);
    const categoryList = await response.json();
    console.log({ categoryList });

    //CREATE DIV
    const sideBar = document.querySelector(".sidebar");
    const catContainer = document.createElement("div");
    catContainer.setAttribute("id", "categoriesContainer");
    const catList = document.createElement("div");
    catList.classList.add("catListContainer");

    catList.innerHTML = `
      <h2><Strong>categories...</strong></h2>`;

    categoryList.forEach((cat) => {
      const catHeader = document.createElement("div");
      catHeader.classList.add("catHeader");
      catHeader.innerHTML = `
      <a href="#" data-category-slug="${cat.name}">
      <p>${cat.name}</p></a>
      `;
      catList.appendChild(catHeader);
      catContainer.appendChild(catList);
      sideBar.appendChild(catContainer);
    });
  } catch (error) {
    document.getElementsByClassName("sidebar").innerHTML += message;
  }
}

categories();
