import { commentsUrlBase } from "./script";

// Handle submitting comments and replies

// Select necessary elements and define API URL
const postCommentUrl = commentsUrlBase; // Modify `blogUrlBase` to include your site’s comments endpoint

// Application password authentication
const username = "bikes_n_beer_baddie"; // Replace with your WordPress username
const appPassword = "DdSN LfDT FPLl N1gS ZLb6 5NCU"; // Replace with the generated application password
const authString = `${username}:${appPassword}`;
const encodedAuth = btoa(authString); // Encode to Base64

// Function to submit a comment or reply
async function submitComment(
  postId,
  authorName,
  authorEmail,
  content,
  parentId = 0
) {
  try {
    const response = await fetch(postCommentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: postId,
        author_name: authorName,
        author_email: authorEmail,
        content: content,
        parent: parentId, // Use parent ID for replies (0 for new comments)
      }),
    });

    if (!response.ok) throw new Error("Failed to post comment");

    const commentData = await response.json();
    alert("Comment posted successfully!");
    // Re-fetch and render comments to show the new comment
    fetchAndRenderPostWithComments();
  } catch (error) {
    console.error("Error posting comment:", error);
    alert("Could not post comment. Please try again.");
  }
}

// Create and display the reply modal
function openReplyModal(parentId) {
  // Create modal HTML structure
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
		<div class="modal-content">
			<span class="close">&times;</span>
			<h2>Reply to Comment</h2>
			<form id="replyForm">
				<label for="authorName">Name:</label>
				<input type="text" id="authorName" required>
				<label for="authorEmail">Email:</label>
				<input type="email" id="authorEmail" required>
				<label for="commentContent">Comment:</label>
				<textarea id="commentContent" required></textarea>
				<button type="submit">Submit Reply</button>
			</form>
		</div>
	`;

  // Append modal to body
  document.body.appendChild(modal);

  // Close modal when 'x' is clicked or outside the modal
  const closeModal = () => {
    modal.remove();
  };
  modal.querySelector(".close").onclick = closeModal;
  window.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Handle reply form submission
  document.getElementById("replyForm").onsubmit = (e) => {
    e.preventDefault();
    const authorName = document.getElementById("authorName").value;
    const authorEmail = document.getElementById("authorEmail").value;
    const content = document.getElementById("commentContent").value;
    submitComment(postId, authorName, authorEmail, content, parentId);
    closeModal();
  };
}

// Add reply button to each comment
function addReplyButtonToComment(commentElement, commentId) {
  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  replyButton.classList.add("reply-button");
  replyButton.onclick = () => openReplyModal(commentId);
  commentElement.appendChild(replyButton);
}

// Update displayComment function to add reply buttons
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
			<p><strong>${comment.author_name}</strong> | ${newCommentDate}</p>
		</div>
		<p>${comment.content.rendered}</p>
	`;

  // Add the reply button to each comment
  addReplyButtonToComment(commentElement, comment.id);

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

// CSS for modal (optional, add to your main CSS file)
const style = document.createElement("style");
style.innerHTML = `
	.modal { display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); }
	.modal-content { background: #fff; padding: 20px; width: 90%; max-width: 500px; border-radius: 5px; position: relative; }
	.close { position: absolute; top: 10px; right: 10px; cursor: pointer; }
	.reply-button { margin-top: 10px; }
`;
document.head.appendChild(style);
