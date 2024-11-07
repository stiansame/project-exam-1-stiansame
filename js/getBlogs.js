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

      const date = new Date(blog.date);
      const dateTimeFormatter = new Intl.DateTimeFormat("NO", {
        dateStyle: "long",
      });
      const formatDate = dateTimeFormatter.format(date);

      blogListcontainer.innerHTML += `<div class="shortBlog">
                <a class="blogList_img" href="../post/index.html?id=${blog.id}">
                <img class="blogList_img" src="${blog._embedded["wp:featuredmedia"][0].source_url}" alt=${blog.title.rendered}></a>
                <div class="blogCat">${catString}</div>
                <a class="blogListHeader" href="../post/index.html?id=${blog.id}">
                <div class="blogListHeader"><h2>${blog.title.rendered}</h2></div></a>
                <div class="blogListExcerpt"><p>${blog.excerpt.rendered}</p></div>
                <div class="blogAuthor"><img class="bloglistAvatar" src="${blog._embedded.author[0].avatar_urls[24]}"> ${blog._embedded.author[0].name}
                <div> ${formatDate}</div>
                </div>
                </div>`;
    });
  } catch (error) {
    blogListcontainer.innerHTML = message;
  }
}

await getBloglist();
