import { collectImagesToContainer } from "./imageCollector.js";
import { placeImageContainerRandomly } from "./imageRandomizer.js";
import { setupImageModal } from "./setupImageModal.js";

export function renderPost(postData, postId) {
  const { title, content, categories, date, author } = postData;

  document.title = `BBB Blog | ${title}`;

  const postContainer = document.getElementById("postContainer");
  const removeLoader = document.getElementById("loaderPost");
  if (removeLoader) {
    removeLoader.remove();
  }

  postContainer.innerHTML = `
    <div class="blog">
      <h2>${title}</h2>
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
