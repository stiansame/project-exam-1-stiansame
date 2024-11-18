import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { renderBlogList } from "../../ui/renderBlogList.js";

export function displayPosts() {
	document.addEventListener("DOMContentLoaded", async () => {
		const posts = await fetchPosts();
		renderBlogList();
	});
}
