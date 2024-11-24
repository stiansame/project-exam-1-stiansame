//IMPORTS

/* import { blogListUrl } from "../../constants/apiUrls.js";
import { getBlogListContainer } from "../../constants/containers.js";
import { createPosts } from "../posts/createPosts.js"; */
import { filterAndDisplayPosts } from "../posts/filterAndDisplay.js";
import { ensureBlogPage } from "../../handlers/categories/ensureBlogPage.js";
import { loadAllPosts } from "../../api/posts/fetchPosts.js";

export function createCategories(categories) {
  const sideBar = document.querySelector(".sidebar");
  const catContainer = document.createElement("div");
  catContainer.setAttribute("id", "categoriesContainer");
  const catList = document.createElement("div");
  catList.classList.add("catListContainer");

  catList.innerHTML = `
    <h2><strong>categories...</strong></h2>`;

  categories.forEach((category) => {
    const catHeader = document.createElement("div");
    catHeader.classList.add("catHeader");

    // Create category link with URL-friendly slug
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
    const categoryLink = document.createElement("a");
    categoryLink.href = `/blog/?category=${categorySlug}`;
    categoryLink.dataset.categorySlug = categorySlug;
    categoryLink.innerHTML = `<p>${category.name}</p>`;

    // Add click handler for category filtering
    categoryLink.addEventListener("click", async (e) => {
      e.preventDefault();

      // Ensure we're on the blog page before filtering
      await ensureBlogPage(categorySlug);
    });

    catHeader.appendChild(categoryLink);
    catList.appendChild(catHeader);
    catContainer.appendChild(catList);
    sideBar.appendChild(catContainer);
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (category) {
      await filterAndDisplayPosts(category);
    } else {
      // If no category parameter, show all posts
      await loadAllPosts();
    }
  });

  // Initial load - check if there's a category in URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  if (initialCategory) {
    filterAndDisplayPosts(initialCategory);
  }
}
