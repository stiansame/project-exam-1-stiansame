//imports
import { blogListcontainer } from "../js/script.js";
import { blogListUrl } from "../js/script.js";
import { message } from "../js/script.js";

//call API to get blogs
async function getBloglist() {
  try {
    const response = await fetch(blogListUrl);
    const json = await response.json();

    blogListcontainer.innerHTML = "";

    const blogList = json;
    console.log({ blogList });

    blogList.forEach((blog) => {
      const categories = blog._embedded["wp:term"][0];
      const catString = categories.map((cat) => cat.name).join(", ");
      console.log(catString);

      blogListcontainer.innerHTML += `<div class="shortBlog">
                <img class="blogList_img" src="${blog._embedded["wp:featuredmedia"][0].source_url}">
                <div class="blogCat">${catString}</div>
                <h2>${blog.title.rendered}</h2>
                <p>${blog.excerpt.rendered}</p>
                <div class="blogAuthor">${blog._embedded.author[0].name}</div>
                </div>`;
    });
  } catch (error) {
    blogListcontainer.innerHTML = message;
  }
}

await getBloglist();
