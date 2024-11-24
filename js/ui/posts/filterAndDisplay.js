//IMPORTS
import { blogListUrl } from "../../constants/apiUrls.js";
import { getBlogListContainer } from "../../constants/containers.js";
import { createPosts } from "./createPosts.js";

export async function filterAndDisplayPosts(categoryName) {
  const blogListContainer = getBlogListContainer();

  try {
    // Fetch all posts
    const response = await fetch(blogListUrl);
    const posts = await response.json();

    // Filter posts by selected category
    const filteredPosts = posts.filter((post) =>
      post.categories_extended.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      )
    );

    if (filteredPosts.length === 0) {
      blogListContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found in category "${categoryName}"</p>
          <a href="/blog/" class="back-link">View all posts</a>
        </div>`;
      return;
    }

    createPosts(filteredPosts);
  } catch (error) {
    blogListContainer.innerHTML = `
      <div class="error">
        <p>Error loading posts for category "${categoryName}"</p>
        <a href="/blog/" class="back-link">View all posts</a>
      </div>`;
  }
}
