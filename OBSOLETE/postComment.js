//imports

import { postId } from "./renderPost.js";

document.addEventListener("DOMContentLoaded", function () {
  const replyModal = document.getElementById("replyModal");
  const closeModal = document.getElementById("closeModal");
  let parentCommentID = null;

  // Function to open the modal with the comment ID to reply to
  function openReplyModal(commentID) {
    parentCommentID = commentID; // Set parent comment ID for the reply
    replyModal.style.display = "flex"; // Show the modal
  }

  // Event listener for closing the modal
  closeModal.addEventListener("click", () => {
    replyModal.style.display = "none";
  });

  // Add event listeners to each reply button
  document.querySelectorAll(".replyButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const commentID = e.target
        .closest(".comment")
        .getAttribute("data-comment-id");
      openReplyModal(commentID);
    });
  });

  // Form submission for replies
  document
    .getElementById("replyForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      // Form data
      const author_name = document.querySelector(
        '#replyForm input[name="author_name"]'
      ).value;
      const author_email = document.querySelector(
        '#replyForm input[name="author_email"]'
      ).value;
      const content = document.querySelector(
        '#replyForm textarea[name="content"]'
      ).value;

      // Replace with your WordPress site URL and the post ID you want to comment on
      const postID = postId; // Replace with actual post ID
      const wordpressSiteURL = "https://stianrostad.no/wordpress";

      // WordPress REST API endpoint for posting comments
      const url = `${wordpressSiteURL}/wp-json/wp/v2/comments`;

      // Application password authentication
      const username = "bikes_n_beer_baddie"; // Replace with your WordPress username
      const appPassword = "DdSN LfDT FPLl N1gS ZLb6 5NCU"; // Replace with the generated application password
      const authString = `${username}:${appPassword}`;
      const encodedAuth = btoa(authString); // Encode to Base64

      // Comment data object for reply, including parent comment ID
      const commentData = {
        post: postID, // ID of the post to comment on
        parent: parentCommentID, // Set parent comment ID to make it a reply
        author_name: author_name,
        author_email: author_email,
        content: content,
      };

      // Send the data using fetch
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedAuth}`, // Add Basic Auth header
          },
          body: JSON.stringify(commentData),
        });

        if (response.ok) {
          document.getElementById("responseMessage").innerText =
            "Reply submitted successfully!";
          replyModal.style.display = "none"; // Hide the modal after submitting
          document.getElementById("replyForm").reset(); // Clear the form
        } else {
          const errorData = await response.json();
          document.getElementById(
            "responseMessage"
          ).innerText = `Error: ${errorData.message}`;
        }
      } catch (error) {
        document.getElementById(
          "responseMessage"
        ).innerText = `Error: ${error.message}`;
      }
    });
});
