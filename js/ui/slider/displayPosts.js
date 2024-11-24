import {
  loaderRemove,
  startSlider,
} from "../../handlers/slider/sliderHelpers.js";
import { fetchPosts } from "../../api/posts/fetchPosts.js";

export const slider = document.querySelector(".slider");

// Display posts in the slider
export async function displayPosts() {
  try {
    const posts = await fetchPosts();
    if (!posts) {
      throw new Error("No posts available");
    }

    loaderRemove();

    posts.slice(0, 4).forEach((post, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");

      const imageSection = document.createElement("div");
      imageSection.classList.add("image-section");
      imageSection.style.backgroundImage = `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})`;

      // Create link element
      const postLink = document.createElement("a");
      postLink.href = `../post/index.html?id=${post.id}`; // Use the post's URL

      const textSection = document.createElement("div");
      textSection.classList.add("text-section");

      // Create h2 and add to link
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.title.rendered.replace(/&amp;/g, "&");
      postLink.appendChild(postTitle);

      const excerpt = document.createElement("p");
      excerpt.textContent = post.excerpt.rendered
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&amp;/g, "&")
        .replace(/&hellip;/g, "...");

      textSection.appendChild(postLink);
      textSection.appendChild(excerpt);

      slide.appendChild(imageSection);
      slide.appendChild(textSection);
      slider.appendChild(slide);
    });

    startSlider();
  } catch (error) {
    console.error("Error displaying posts:", error);
  }
}
