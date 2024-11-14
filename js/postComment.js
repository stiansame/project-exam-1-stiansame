//imports

import { postId } from "./renderPost.js";

const wordpressSiteURL = "https://stianrostad.no/wordpress";
const postID = postId; // Replace with the actual post ID
const url = `${wordpressSiteURL}/wp-json/wp/v2/comments`;

// Authorization setup
const username = "bikes_n_beer_baddie"; // Replace with your WordPress username
const appPassword = "DdSN LfDT FPLl N1gS ZLb6 5NCU"; // Replace with the generated application password
const authString = `${username}:${appPassword}`;
const encodedAuth = btoa(authString); // Encode to Base64

// Initial fetch to load comments
async function loadComments() {
  const response = await fetch(`${url}?post=${postID}`);
  if (response.ok) {
    const comments = await response.json();
    displayComments(comments);
  }
}

function displayComments(comments) {
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = ""; // Clear previous comments
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `
      <p><strong>${comment.author_name}</strong> says:</p>
      <p>${comment.content.rendered}</p>
      <button onclick="openReplyModal(${comment.id})">Reply</button>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

// Handle main comment submission
document
  .getElementById("commentForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const author_name = document.querySelector(
      'input[name="author_name"]'
    ).value;
    const author_email = document.querySelector(
      'input[name="author_email"]'
    ).value;
    const content = document.querySelector('textarea[name="content"]').value;

    const commentData = {
      post: postID,
      author_name: author_name,
      author_email: author_email,
      content: content,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedAuth}`,
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        document.getElementById("responseMessage").innerText =
          "Comment submitted successfully!";
        document.getElementById("commentForm").reset();
        loadComments(); // Refresh comments after submission
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

// Reply functionality
function openReplyModal(parentCommentID) {
  document.getElementById("replyModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("replyForm").onsubmit = (e) =>
    submitReply(e, parentCommentID);
}

function closeReplyModal() {
  document.getElementById("replyModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}

async function submitReply(e, parentCommentID) {
  e.preventDefault();

  const author_name = document.querySelector(
    '#replyForm input[name="author_name"]'
  ).value;
  const author_email = document.querySelector(
    '#replyForm input[name="author_email"]'
  ).value;
  const content = document.querySelector(
    '#replyForm textarea[name="content"]'
  ).value;

  const replyData = {
    post: postID,
    parent: parentCommentID, // Set the parent comment ID to make this a reply
    author_name: author_name,
    author_email: author_email,
    content: content,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuth}`,
      },
      body: JSON.stringify(replyData),
    });

    if (response.ok) {
      document.getElementById("responseMessage").innerText =
        "Reply submitted successfully!";
      document.getElementById("replyForm").reset();
      closeReplyModal();
      loadComments(); // Refresh comments after reply submission
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
}

// Load comments on page load
loadComments();
