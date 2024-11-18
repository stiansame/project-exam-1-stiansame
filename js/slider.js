import { postsUrl } from "../js/constants/apiUrls.js";

const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let currentIndex = 0;
const intervalTime = 15000;
let slideInterval;

// Fetch posts from WordPress API
async function fetchPosts() {
	try {
		const response = await fetch(postsUrl + "?_embed&per_page=4");
		const posts = await response.json();
		loaderRemove();
		posts.forEach((post, index) => {
			const slide = document.createElement("div");
			slide.classList.add("slide");

			const imageSection = document.createElement("div");
			imageSection.classList.add("image-section");
			imageSection.style.backgroundImage = `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url})`;

			const textSection = document.createElement("div");
			textSection.classList.add("text-section");
			textSection.innerHTML = `
        <h2>${post.title.rendered}</h2>
        <p>${post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}</p>
      `;

			slide.appendChild(imageSection);
			slide.appendChild(textSection);
			slider.appendChild(slide);
		});

		startSlider();
	} catch (error) {
		console.error("Error fetching posts:", error);
	}
}

// Move to the next slide
function nextSlide() {
	currentIndex = (currentIndex + 1) % slider.childElementCount;
	updateSlider();
}

// Move to the previous slide
function prevSlide() {
	currentIndex = (currentIndex - 1 + slider.childElementCount) % slider.childElementCount;
	updateSlider();
}

// Update slider position
function updateSlider() {
	slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-play slider
function startSlider() {
	slideInterval = setInterval(nextSlide, intervalTime);
}

// Reset interval when user manually changes slide
function resetInterval() {
	clearInterval(slideInterval);
	startSlider();
}

// Event listeners
rightArrow.addEventListener("click", () => {
	nextSlide();
	resetInterval();
});

leftArrow.addEventListener("click", () => {
	prevSlide();
	resetInterval();
});

// Initialize slider

//remove loader
function loaderRemove() {
	let loaderContainer = document.getElementById("loaderHome");
	loaderContainer.remove();
}

fetchPosts();
