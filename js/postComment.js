//imports

import { postId } from "./renderPost.js";
import { commentsUrlBase } from "./script.js";

document.getElementById("commentForm").addEventListener("submit", async function (e) {
	e.preventDefault(); // Prevent the form from submitting the traditional way

	// Form data
	const author_name = document.querySelector('input[name="author_name"]').value;
	const author_email = document.querySelector('input[name="author_email"]').value;
	const content = document.querySelector('textarea[name="content"]').value;

	// Replace with your WordPress site URL and the post ID you want to comment on
	// const postID = "123"; // Replace with actual post ID
	// const wordpressSiteURL = "https://yourwordpresssite.com";

	// WordPress REST API endpoint for posting comments
	const url = commentsUrlBase;

	// Comment data object
	const commentData = {
		post: postId, // ID of the post to comment on
		author_name: author_name,
		author_email: author_email,
		content: content
	};

	// Send the data using fetch
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(commentData)
		});
		console.log({ commentData });

		if (response.ok) {
			document.getElementById("responseMessage").innerText = "Comment submitted successfully!";
			document.getElementById("commentForm").reset(); // Clear the form
		} else {
			const errorData = await response.json();
			document.getElementById("responseMessage").innerText = `Error: ${errorData.message}`;
		}
	} catch (error) {
		document.getElementById("responseMessage").innerText = `Error: ${error.message}`;
	}
});
