import { slider } from "../../ui/slider/displayPosts.js";

let currentIndex = 0;
const intervalTime = 15000;
let slideInterval;

// Move to the next slide
export function nextSlide() {
  currentIndex = (currentIndex + 1) % slider.childElementCount;
  updateSlider();
}

// Move to the previous slide
export function prevSlide() {
  currentIndex =
    (currentIndex - 1 + slider.childElementCount) % slider.childElementCount;
  updateSlider();
}

// Update slider position
export function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-play slider
export function startSlider() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

// Reset interval when user manually changes slide
export function resetInterval() {
  clearInterval(slideInterval);
  startSlider();
}

// Remove loader
export function loaderRemove() {
  let loaderContainer = document.getElementById("loaderHome");
  loaderContainer.remove();
}
