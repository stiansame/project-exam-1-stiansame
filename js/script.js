//imports here
import { createMessage } from "../js/message.js";
import { displayPosts } from "./handlers/posts/displayPosts.js";
import { displayCategories } from "./handlers/categories/displayCategories.js";
import { latestPosts } from "./ui/posts/latestPosts.js";

//Display message
export const message = createMessage();

//Display bloglist
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", displayPosts)
  : displayPosts(true);
displayCategories();
latestPosts();
