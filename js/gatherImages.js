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
