//imports
import { blogListUrl } from "../../constants/apiUrls.js";
import { message } from "../../script.js";
import { getBlogListContainer } from "../../constants/containers.js";

/* export async function fetchPosts() {
  try {
    const response = await fetch(blogListUrl);
    return await response.json();
  } catch (error) {
    const blogListcontainer = getBlogListContainer();
    blogListcontainer.innerHTML = message;
    return null;
  }
}
 */

export async function fetchPosts(offset = 0, limit = 10) {
  try {
    const url = `${blogListUrl}&offset=${offset}&per_page=${limit}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    const blogListContainer = getBlogListContainer();
    blogListContainer.innerHTML = message;
    return null;
  }
}
