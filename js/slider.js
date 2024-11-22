import { fetchPosts } from "../js/api/posts/fetchPosts.js"; // Adjust path as needed

const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let currentIndex = 0;
const intervalTime = 15000;
let slideInterval;

// Display posts in the slider
async function displayPosts() {
	try {
		const posts = await fetchPosts();
		console.log(posts);
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
			postTitle.textContent = post.title.rendered;
			postLink.appendChild(postTitle);

			const excerpt = document.createElement("p");
			excerpt.textContent = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");

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

// Remove loader
function loaderRemove() {
	let loaderContainer = document.getElementById("loaderHome");
	loaderContainer.remove();
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
displayPosts();
