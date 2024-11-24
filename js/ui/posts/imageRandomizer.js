export function placeImageContainerRandomly() {
  const postContainer = document.querySelector(".blog");
  const postContent = postContainer.querySelector(".postContent");
  const imageContainer = postContent.querySelector(".imageContainer");

  if (!postContent || !imageContainer) return;

  // Get all the existing divs inside postContent, excluding imageContainer
  const otherDivs = Array.from(postContent.children).filter(
    (child) => child !== imageContainer
  );

  // Generate a random index where the imageContainer will be inserted
  const randomIndex = Math.floor(Math.random() * (otherDivs.length + 1));

  // Insert the imageContainer at the random position
  if (randomIndex === otherDivs.length) {
    postContent.appendChild(imageContainer); // Append at the end if the random index is the last one
  } else {
    postContent.insertBefore(imageContainer, otherDivs[randomIndex]); // Insert before the randomly selected div
  }
}
