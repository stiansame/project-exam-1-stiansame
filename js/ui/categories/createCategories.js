//IMPORTS

import { blogListUrl } from "../../constants/apiUrls.js";
import { getBlogListContainer } from "../../constants/containers.js";
import { createPosts } from "../posts/createPosts.js";

export function createCategories(categories) {
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
		categoryLink.href = "#";
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
