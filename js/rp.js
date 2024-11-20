import { fetchPostData } from "./api/posts/fetchSingle.js";
import { formatPostData } from "./ui/posts/postFormatter.js";
import {
  setupCommentReplyListeners,
  refreshComments,
  setupMainCommentFormListener,
} from "./handlers/comments/commentHandler.js";
import { renderPost } from "./ui/posts/postRenderer.js";
import { createMessage } from "./message.js";

async function initializeBlogPost() {
  const postId = getPostIdFromUrl();

  try {
    const postDetails = await fetchPostData(postId);
    const formattedPost = formatPostData(postDetails);

    renderPost(formattedPost, postId);

    // Initial render of comments
    await refreshComments(postId);

    // Setup reply functionality
    setupCommentReplyListeners(postId);
    setupMainCommentFormListener(postId);
  } catch (error) {
    console.error("Error initializing blog post:", error);
    document.getElementById("postContainer").innerHTML = createMessage();
    document.title = "Aaaii papi - Something went wrong!";
    document.getElementById("commentsContainer").innerHTML =
      "<p>Failed to load comments.</p>";
  }
}

export function getPostIdFromUrl() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  return params.get("id");
}

initializeBlogPost();
