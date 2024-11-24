//IMPORTS
import { displayPosts } from "./displayPosts.js";
import {
  nextSlide,
  prevSlide,
  resetInterval,
} from "../../handlers/slider/sliderHelpers.js";

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// Initialize slider
displayPosts();

// Event listeners
rightArrow.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

leftArrow.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});
