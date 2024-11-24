//imports
import { fetchPostData } from "../../api/posts/fetchSingle.js";
import { submitComment } from "../../api/comments/submitComment.js";

export function buildCommentHTML(comment, postId) {
  const commentDate = new Date(comment.date);
  const commentDateFormatter = new Intl.DateTimeFormat("NO", {
    dateStyle: "long",
  });
  const formattedDate = commentDateFormatter.format(commentDate);

  return `
    <div class="blogAuthor">
      <img class="avatar" src="${comment.author_avatar_urls[24]}">
      <p><strong>${comment.author_name}</strong> | ${formattedDate}</p>
    <button class="reply-btn" data-comment-id="${comment.id}" data-post-id="${postId}">Reply</button>
      </div>
    <p>${comment.content.rendered}</p>

  `;
}

export function createReplyForm(postId, parentCommentId) {
  return `
    <form class="reply-form" data-post-id="${postId}" data-parent-id="${parentCommentId}">
      <input type="text" name="author_name" placeholder="Your Name" required>
      <input type="email" name="author_email" placeholder="Your Email" required>
      <textarea name="content" placeholder="Your Reply" required></textarea>
      <button type="submit"><i class="fa-regular fa-paper-plane"></i></button>
      <button type="button" class="cancel-reply"><i class="fa-solid fa-xmark"></i></button>
    </form>
  `;
}

export function sortComments(comments) {
  return comments.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function processComments(comments, container, postId) {
  // Clear existing comments
  container.innerHTML = "";

  // Create a map to store comments by their ID for easy lookup
  const commentMap = new Map();

  // First pass: create comment elements without replies
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.id = `comment-${comment.id}`;
    commentElement.dataset.commentId = comment.id;
    commentElement.innerHTML = buildCommentHTML(comment, postId);

    // Store the comment element in the map
    commentMap.set(comment.id, commentElement);
  });

  // Second pass: add replies to their parent comments
  comments.forEach((comment) => {
    if (comment.parent !== 0) {
      const parentElement = commentMap.get(comment.parent);
      if (parentElement) {
        // Create replies container if it doesn't exist
        let repliesContainer = parentElement.querySelector(".replies");
        if (!repliesContainer) {
          repliesContainer = document.createElement("div");
          repliesContainer.classList.add("replies");
          parentElement.appendChild(repliesContainer);
        }

        // Get the comment element from the map
        const replyElement = commentMap.get(comment.id);
        if (replyElement) {
          repliesContainer.appendChild(replyElement);
        }
      }
    }
  });

  // Third pass: append top-level comments to the container
  comments
    .filter((comment) => comment.parent === 0)
    .forEach((comment) => {
      const commentElement = commentMap.get(comment.id);
      if (commentElement) {
        container.appendChild(commentElement);
      }
    });
}

export function setupCommentReplyListeners(postId) {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply-btn")) {
      const commentId = e.target.dataset.commentId;
      const commentElement = e.target.closest(".comment");

      // Remove any existing reply forms
      const existingForms = document.querySelectorAll(".reply-form");
      existingForms.forEach((form) => form.remove());

      // Create and append reply form
      const replyForm = createReplyForm(postId, commentId);
      commentElement.insertAdjacentHTML("beforeend", replyForm);
    }

    if (e.target.classList.contains("cancel-reply")) {
      e.target.closest(".reply-form").remove();
    }
  });

  document.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("reply-form")) {
      e.preventDefault();
      const formData = new FormData(e.target);

      try {
        // Disable submit button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        const commentData = {
          post: parseInt(postId),
          parent: parseInt(e.target.dataset.parentId),
          author_name: formData.get("author_name"),
          author_email: formData.get("author_email"),
          content: formData.get("content"),
        };

        // Submit comment
        await submitComment(commentData);

        // Refresh comments
        await refreshComments(postId);

        // Remove the form
        e.target.remove();
      } catch (error) {
        console.error("Comment submission error:", error);

        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Failed to submit reply. Please try again.";
        e.target.insertAdjacentElement("afterend", errorMessage);

        setTimeout(() => errorMessage.remove(), 3000);
      } finally {
        // Re-enable submit button if form still exists
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = false;
      }
    }
  });
}

export async function refreshComments(postId) {
  try {
    // Fetch the most up-to-date post data with embedded comments
    const updatedPostData = await fetchPostData(postId);

    // Extract comments from embedded data
    const comments = updatedPostData._embedded?.replies
      ? updatedPostData._embedded.replies[0]
      : [];

    const commentsContainer = document.getElementById("commentsContainer");

    if (comments.length > 0) {
      // Sort and process comments
      const sortedComments = sortComments(comments);
      processComments(sortedComments, commentsContainer, postId);
    } else {
      commentsContainer.innerHTML =
        "<p>No comments yet. Be the first to comment!</p>";
    }

    return true;
  } catch (error) {
    console.error("Error refreshing comments:", error);
    return false;
  }
}

export function setupMainCommentFormListener(postId) {
  const commentForm = document.getElementById("commentForm");
  const responseMessage = document.getElementById("responseMessage");

  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      // Disable submit button
      const submitButton = e.target.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      const commentData = {
        post: parseInt(postId),
        parent: 0, // Top-level comment
        author_name: formData.get("author_name"),
        author_email: formData.get("author_email"),
        content: formData.get("content"),
      };

      // Submit comment
      await submitComment(commentData);

      // Refresh comments
      await refreshComments(postId);

      // Clear form
      e.target.reset();

      // Show success message
      responseMessage.textContent = "Comment submitted successfully!";
      responseMessage.classList.add("success-message");
      setTimeout(() => {
        responseMessage.textContent = "";
        responseMessage.classList.remove("success-message");
      }, 3000);
    } catch (error) {
      console.error("Comment submission error:", error);

      // Show error message
      responseMessage.textContent =
        "Failed to submit comment. Please try again.";
      responseMessage.classList.add("error-message");
      setTimeout(() => {
        responseMessage.textContent = "";
        responseMessage.classList.remove("error-message");
      }, 3000);
    } finally {
      // Re-enable submit button
      const submitButton = e.target.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = false;
    }
  });
}
