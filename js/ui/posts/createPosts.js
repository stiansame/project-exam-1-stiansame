import { getBlogListContainer } from "../../constants/containers.js";

export function createPosts(
  posts,
  container = getBlogListContainer(),
  isAppending = false
) {
  if (!isAppending) {
    container.innerHTML = "";
  }

  posts.forEach((blog) => {
    const categories = blog._embedded["wp:term"][0];
    const catString = categories.map((cat) => cat.name).join(", ");

    const date = new Date(blog.date);
    const dateTimeFormatter = new Intl.DateTimeFormat("NO", {
      dateStyle: "long",
    });
    const formatDate = dateTimeFormatter.format(date);

    const shortBlog = document.createElement("div");
    shortBlog.className = "shortBlog";

    // Create and append the blog image link
    const imgLink = document.createElement("a");
    imgLink.className = "blogList_img";
    imgLink.href = `../post/index.html?id=${blog.id}`;

    const img = document.createElement("img");
    img.className = "blogList_img";
    img.src =
      blog._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium.source_url;
    img.alt = blog.title.rendered;

    imgLink.appendChild(img);
    shortBlog.appendChild(imgLink);

    // Create and append the category div
    const blogCat = document.createElement("div");
    blogCat.className = "blogCat";
    blogCat.textContent = catString;
    shortBlog.appendChild(blogCat);

    // Create and append the blog header link
    const headerLink = document.createElement("a");
    headerLink.className = "blogListHeader";
    headerLink.href = `../post/index.html?id=${blog.id}`;

    const headerDiv = document.createElement("div");
    headerDiv.className = "blogListHeader";

    const header = document.createElement("h2");
    header.innerHTML = blog.title.rendered;

    headerDiv.appendChild(header);
    headerLink.appendChild(headerDiv);
    shortBlog.appendChild(headerLink);

    // Create and append the excerpt div
    const excerptDiv = document.createElement("div");
    excerptDiv.className = "blogListExcerpt";

    const excerpt = document.createElement("p");
    excerpt.innerHTML = blog.excerpt.rendered;

    excerptDiv.appendChild(excerpt);
    shortBlog.appendChild(excerptDiv);

    // Create and append the author section
    const authorDiv = document.createElement("div");
    authorDiv.className = "blogAuthor";

    const avatar = document.createElement("img");
    avatar.className = "bloglistAvatar";
    avatar.src = blog._embedded.author[0].avatar_urls[24];

    const authorName = document.createElement("b");
    authorName.textContent = blog._embedded.author[0].name;

    const dateDiv = document.createElement("div");
    dateDiv.textContent = formatDate;

    authorDiv.appendChild(avatar);
    authorDiv.appendChild(authorName);
    authorDiv.appendChild(dateDiv);

    shortBlog.appendChild(authorDiv);

    // Append the shortBlog div to the container
    container.appendChild(shortBlog);
  });
}
