//imports
import { baseUrl } from "../../constants/apiUrls.js";

export async function fetchPosts() {
	const response = await fetch(baseUrl);
	const posts = await response.json();
	return posts;
}
