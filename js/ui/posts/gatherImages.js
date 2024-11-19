export function collectImagesToContainer() {
  // Select the parent div with class "postContent"

  const postContainer = document.querySelector(".blog");
  const postContent = postContainer.querySelector(".postContent");

  // Check if postContent exists to avoid errors if not found
  if (!postContent) {
    console.error("No element with class 'postContent' found.");
    return;
  }

  // Collect all divs with class "wp-block-image" within postContent
  const imageDivs = postContent.querySelectorAll(".wp-block-image");

  // If there are no image divs, exit the function
  if (imageDivs.length === 0) {
    console.log("No 'wp-block-image' divs found in 'postContent'.");
    return;
  }

  // Create a new div with class "imageContainer"
  const imageContainer = document.createElement("div");
  imageContainer.className = "imageContainer";

  // Move each wp-block-image div into the imageContainer
  imageDivs.forEach((div) => {
    imageContainer.appendChild(div);
  });

  // Append the imageContainer to the postContent div
  postContent.appendChild(imageContainer);
}

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
