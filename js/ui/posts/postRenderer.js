import { collectImagesToContainer, placeImageContainerRandomly } from "./gatherImages.js";
import { setupImageModal } from "./setupImageModal.js";

export function renderPost(postData, postId) {
	const { title, content, categories, date, author } = postData;

	document.title = `BBB Blog | ${title}`;

	const postContainer = document.getElementById("postContainer");
	postContainer.innerHTML = `
    <div class="blog">
      <h1>${title}</h1>
      <div class="cat">${categories}</div>
      <div class="postContent">${content}</div>
      <div class="blogAuthor">
        <img class="avatar" src="${author.avatar}"> 
        <b>${author.name}</b> | 
        <div>${date}</div>
      </div>
    </div>
  `;

	collectImagesToContainer();
	placeImageContainerRandomly();
	setupImageModal();
}
