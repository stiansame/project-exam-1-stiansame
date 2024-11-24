import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { createPosts } from "../../ui/posts/createPosts.js";
import { getBlogListContainer } from "../../constants/containers.js";

/* export async function displayPosts() {
  const posts = await fetchPosts();
  const container = getBlogListContainer();
  if (container && posts?.length) {
    createPosts(posts, container);
  }
} */

let offset = 0;
const limit = 10;

export async function displayPosts(isInitialLoad = false) {
  const posts = await fetchPosts(offset, limit);
  const container = getBlogListContainer();

  if (posts?.length) {
    createPosts(posts, container, !isInitialLoad);
    offset += posts.length;

    // Check if "Load More" button needs to be added or disabled
    if (isInitialLoad) {
      addLoadMoreButton(container);
    }
    toggleLoadMoreButton(posts.length < limit);
  }
}

function addLoadMoreButton() {
  const btnContainer = document.querySelector(".btnContainer");
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.id = "loadMoreBtn";
  loadMoreBtn.textContent = "Load More";
  loadMoreBtn.onclick = () => displayPosts(false);
  btnContainer.appendChild(loadMoreBtn);
}

function toggleLoadMoreButton(isDisabled) {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.disabled = isDisabled;
    loadMoreBtn.textContent = isDisabled ? "No More Posts" : "Load More";
  }
}
