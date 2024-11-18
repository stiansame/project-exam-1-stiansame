import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { createPosts } from "../../ui/posts/createPosts.js";
import { getBlogListContainer } from "../../constants/containers.js";

export async function displayPosts() {
  const posts = await fetchPosts();
  const container = getBlogListContainer();
  if (container && posts?.length) {
    createPosts(posts, container);
  }
}
