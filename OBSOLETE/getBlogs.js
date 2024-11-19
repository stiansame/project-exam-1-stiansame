//imports
import { blogListcontainer } from "../js/constants/containers.js";
import { blogListUrl } from "../js/constants/apiUrls.js";
import { message } from "../js/script.js";
import { createPosts } from "./ui/posts/createPosts.js";

//call API to get blogs
export async function getBloglist() {
  try {
    const response = await fetch(blogListUrl);
    const json = await response.json();

    blogListcontainer.innerHTML = "";

    const blogList = json;
    console.log({ blogList });
    createPosts(blogList);
  } catch (error) {
    blogListcontainer.innerHTML = message;
  }
}

// await getBloglist();
