//IMPORT
import { filterAndDisplayPosts } from "../../ui/posts/filterAndDisplay.js";

export async function ensureBlogPage(categorySlug) {
  // Check if we're already on the blog page
  if (window.location.pathname !== "/blog/") {
    // Redirect to blog page with category
    window.location.href = `/blog/?category=${categorySlug}`;
    return;
  }

  // Update URL without page reload
  const newUrl = `/blog/?category=${categorySlug}`;
  window.history.pushState({ category: categorySlug }, "", newUrl);

  await filterAndDisplayPosts(categorySlug);
}
