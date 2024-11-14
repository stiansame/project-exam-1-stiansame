// render spesific blogpage

//imports
import { createMessage } from "./message.js";
import { blogUrlBase } from "./script.js";
import { collectImagesToContainer } from "./gatherImages.js";
import { placeImageContainerRandomly } from "./gatherImages.js";

const message = createMessage();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

export const postId = params.get("id");

const embed = "?_embed";

const postUrl = blogUrlBase + postId + embed;

async function fetchAndRenderPostWithComments() {
  try {
    // Fetch post details with embedded comments and replies
    const response = await fetch(postUrl);
    const postDetails = await response.json();
    console.log(postDetails);

    //set document title
    document.title = `BBB Blog | ${postDetails.title.rendered}`;

    //Arrange categories
    const category = postDetails._embedded["wp:term"][0];
    const catList = category.map((cat) => cat.name).join(",");

    //format date
    const date = new Date(postDetails.date);
    const dateTimeFormatter = new Intl.DateTimeFormat("NO", {
      dateStyle: "long",
    });
    const formatDate = dateTimeFormatter.format(date);

    // Render post content
    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = `<div class="blog">
      <h1>${postDetails.title.rendered}</h1>
      <div class="cat">${catList}</div>
      <div class="postContent">${postDetails.content.rendered}</div>
      <div class="blogAuthor"><img class="avatar" src="${postDetails._embedded.author[0].avatar_urls[24]}"> <b>${postDetails._embedded.author[0].name}</b> | 
      <div> ${formatDate}</div>
      </div>
      </div>
    `;

    collectImagesToContainer();
    placeImageContainerRandomly();

    // Check if there are embedded comments
    const comments = postDetails._embedded?.replies
      ? postDetails._embedded.replies[0]
      : [];
    console.log(comments);
    // Sort comments by date (oldest to newest)
    comments.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Create a container to hold comments
    const commentsContainer = document.getElementById("commentsContainer");
    commentsContainer.innerHTML = ""; // Clear any previous content

    // Helper function to recursively display comments with replies
    function displayComment(comment, container) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const commentDate = new Date(comment.date);
      const commentDateFormatter = new Intl.DateTimeFormat("NO", {
        dateStyle: "long",
      });
      const newCommentDate = commentDateFormatter.format(commentDate);

      commentElement.innerHTML = `
      <div class="blogAuthor">
      <img class="avatar" src="${comment.author_avatar_urls[24]}">
        <p><strong>${comment.author_name}</strong> | ${newCommentDate}</p></div>
        <p>${comment.content.rendered}</p>
      `;

      // Append the comment to the container
      container.appendChild(commentElement);

      // Find replies to this comment
      const replies = comments.filter((reply) => reply.parent === comment.id);

      if (replies.length > 0) {
        // Sort replies by date
        replies.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Create a container for replies
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("replies");
        commentElement.appendChild(repliesContainer);

        // Display each reply
        replies.forEach((reply) => displayComment(reply, repliesContainer));
      }
    }

    // Loop through top-level comments and display each one
    comments.forEach((comment) => {
      if (comment.parent === 0) {
        // Display only top-level comments first
        displayComment(comment, commentsContainer);
      }
    });
  } catch (error) {
    console.error("Error fetching post or comments:", error);
    document.getElementById("postContainer").innerHTML = message;
    document.title = "Aaaii papi - Something went wrong!";
    document.getElementById("commentsContainer").innerHTML =
      "<p>Failed to load comments.</p>";
  }
}

fetchAndRenderPostWithComments();
