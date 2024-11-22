//IMPORTS

import { blogListUrl } from "../../constants/apiUrls.js";
import { getBlogListContainer } from "../../constants/containers.js";
import { createPosts } from "../posts/createPosts.js";

/* export function createCategories(categories) {
	// CREATE DIV
	const sideBar = document.querySelector(".sidebar");
	const catContainer = document.createElement("div");
	catContainer.setAttribute("id", "categoriesContainer");
	const catList = document.createElement("div");
	catList.classList.add("catListContainer");

	catList.innerHTML = `
    <h2><strong>categories...</strong></h2>`;

	categories.forEach((category) => {
		const catHeader = document.createElement("div");
		catHeader.classList.add("catHeader");

		// Create category link
		const categoryLink = document.createElement("a");
		const categorySlug = encodeURIComponent(category.name.toLowerCase());
		categoryLink.href = `/blog/index.html?category=${categorySlug}`;
		categoryLink.dataset.categorySlug = category.name;
		categoryLink.innerHTML = `<p>${category.name}</p>`;

		// Add click handler for category filtering
		categoryLink.addEventListener("click", async (e) => {
			e.preventDefault();

			try {
				// Fetch all posts
				const response = await fetch(blogListUrl);
				const posts = await response.json();
				console.log(posts);

				// Filter posts by selected category
				const filteredPosts = posts.filter((post) => post.categories_extended.some((cat) => cat.name === category.name));
				console.log({ filteredPosts });

				// Update the blog list container with filtered posts
				const blogListContainer = getBlogListContainer();

				if (filteredPosts.length === 0) {
					blogListContainer.innerHTML = `<p>No posts found in category "${category.name}"</p>`;
					return;
				}

				// Clear existing posts
				blogListContainer.innerHTML = "";

				// Render filtered posts (assuming you have a renderPosts function)
				// You'll need to implement or import your post rendering logic here
				createPosts(filteredPosts);
			} catch (error) {
				const blogListContainer = getBlogListContainer();
				blogListContainer.innerHTML = `Error loading posts for category "${category.name}"`;
			}
		});

		catHeader.appendChild(categoryLink);
		catList.appendChild(catHeader);
		catContainer.appendChild(catList);
		sideBar.appendChild(catContainer);
	});
}
 */

/* export function createCategories(categories) {
	const sideBar = document.querySelector(".sidebar");
	const catContainer = document.createElement("div");
	catContainer.setAttribute("id", "categoriesContainer");
	const catList = document.createElement("div");
	catList.classList.add("catListContainer");

	catList.innerHTML = `
    <h2><strong>categories...</strong></h2>`;

	categories.forEach((category) => {
		const catHeader = document.createElement("div");
		catHeader.classList.add("catHeader");

		// Create category link with URL-friendly slug
		const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
		const categoryLink = document.createElement("a");
		categoryLink.href = `/blog/?category=${categorySlug}`;
		categoryLink.dataset.categorySlug = categorySlug;
		categoryLink.innerHTML = `<p>${category.name}</p>`;

		// Add click handler for category filtering
		categoryLink.addEventListener("click", async (e) => {
			e.preventDefault();

			// Update URL without page reload
			const newUrl = `/blog/?category=${categorySlug}`;
			window.history.pushState({ category: categorySlug }, "", newUrl);

			await filterAndDisplayPosts(category.name);
		});

		catHeader.appendChild(categoryLink);
		catList.appendChild(catHeader);
		catContainer.appendChild(catList);
		sideBar.appendChild(catContainer);
	});

	// Handle browser back/forward buttons
	window.addEventListener("popstate", async (event) => {
		const urlParams = new URLSearchParams(window.location.search);
		const category = urlParams.get("category");

		if (category) {
			await filterAndDisplayPosts(category);
		} else {
			// If no category parameter, show all posts
			await loadAllPosts();
		}
	});

	// Initial load - check if there's a category in URL
	const urlParams = new URLSearchParams(window.location.search);
	const initialCategory = urlParams.get("category");
	if (initialCategory) {
		filterAndDisplayPosts(initialCategory);
	}
}

async function filterAndDisplayPosts(categoryName) {
	const blogListContainer = getBlogListContainer();

	try {
		// Fetch all posts
		const response = await fetch(blogListUrl);
		const posts = await response.json();

		// Filter posts by selected category
		const filteredPosts = posts.filter((post) => post.categories_extended.some((cat) => cat.name.toLowerCase() === categoryName.toLowerCase()));

		if (filteredPosts.length === 0) {
			blogListContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found in category "${categoryName}"</p>
          <a href="/blog/" class="back-link">View all posts</a>
        </div>`;
			return;
		}

		createPosts(filteredPosts);
	} catch (error) {
		blogListContainer.innerHTML = `
      <div class="error">
        <p>Error loading posts for category "${categoryName}"</p>
        <a href="/blog/" class="back-link">View all posts</a>
      </div>`;
	}
}

async function loadAllPosts() {
	const blogListContainer = getBlogListContainer();
	blogListContainer.innerHTML = "<p>Loading posts...</p>";

	try {
		const response = await fetch(blogListUrl);
		const posts = await response.json();
		createPosts(posts);
	} catch (error) {
		blogListContainer.innerHTML = `
      <div class="error">
        <p>Error loading posts</p>
      </div>`;
	}
} */

export function createCategories(categories) {
	const sideBar = document.querySelector(".sidebar");
	const catContainer = document.createElement("div");
	catContainer.setAttribute("id", "categoriesContainer");
	const catList = document.createElement("div");
	catList.classList.add("catListContainer");

	catList.innerHTML = `
    <h2><strong>categories...</strong></h2>`;

	categories.forEach((category) => {
		const catHeader = document.createElement("div");
		catHeader.classList.add("catHeader");

		// Create category link with URL-friendly slug
		const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
		const categoryLink = document.createElement("a");
		categoryLink.href = `/blog/?category=${categorySlug}`;
		categoryLink.dataset.categorySlug = categorySlug;
		categoryLink.innerHTML = `<p>${category.name}</p>`;

		// Add click handler for category filtering
		categoryLink.addEventListener("click", async (e) => {
			e.preventDefault();

			// Ensure we're on the blog page before filtering
			await ensureBlogPage(categorySlug);
		});

		catHeader.appendChild(categoryLink);
		catList.appendChild(catHeader);
		catContainer.appendChild(catList);
		sideBar.appendChild(catContainer);
	});

	// Handle browser back/forward buttons
	window.addEventListener("popstate", async (event) => {
		const urlParams = new URLSearchParams(window.location.search);
		const category = urlParams.get("category");

		if (category) {
			await filterAndDisplayPosts(category);
		} else {
			// If no category parameter, show all posts
			await loadAllPosts();
		}
	});

	// Initial load - check if there's a category in URL
	const urlParams = new URLSearchParams(window.location.search);
	const initialCategory = urlParams.get("category");
	if (initialCategory) {
		filterAndDisplayPosts(initialCategory);
	}
}

async function ensureBlogPage(categorySlug) {
	// Check if we're already on the blog page
	if (window.location.pathname !== "/blog/") {
		// Redirect to blog page with category
		window.location.href = `/blog/?category=${categorySlug}`;
		return;
	}

	// Update URL without page reload
	const newUrl = `/blog/?category=${categorySlug}`;
	window.history.pushState({ category: categorySlug }, "", newUrl);

	await filterAndDisplayPosts(categorySlug);
}

async function filterAndDisplayPosts(categoryName) {
	const blogListContainer = getBlogListContainer();

	try {
		// Fetch all posts
		const response = await fetch(blogListUrl);
		const posts = await response.json();

		// Filter posts by selected category
		const filteredPosts = posts.filter((post) => post.categories_extended.some((cat) => cat.name.toLowerCase() === categoryName.toLowerCase()));

		if (filteredPosts.length === 0) {
			blogListContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found in category "${categoryName}"</p>
          <a href="/blog/" class="back-link">View all posts</a>
        </div>`;
			return;
		}

		createPosts(filteredPosts);
	} catch (error) {
		blogListContainer.innerHTML = `
      <div class="error">
        <p>Error loading posts for category "${categoryName}"</p>
        <a href="/blog/" class="back-link">View all posts</a>
      </div>`;
	}
}

async function loadAllPosts() {
	const blogListContainer = getBlogListContainer();
	blogListContainer.innerHTML = "<p>Loading posts...</p>";

	try {
		const response = await fetch(blogListUrl);
		const posts = await response.json();
		createPosts(posts);
	} catch (error) {
		blogListContainer.innerHTML = `
      <div class="error">
        <p>Error loading posts</p>
      </div>`;
	}
}
