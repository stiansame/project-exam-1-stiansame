//imports
import { blogListUrl } from "../../constants/apiUrls.js";
import { message } from "../../script.js";
import { getBlogListContainer } from "../../constants/containers.js";

export async function fetchPosts() {
  try {
    const response = await fetch(blogListUrl);
    return await response.json();
  } catch (error) {
    const blogListcontainer = getBlogListContainer();
    blogListcontainer.innerHTML = message;
    return null;
  }
}
