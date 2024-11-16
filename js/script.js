//imports here

import { createMessage } from "../js/message.js";

//URL for api call
export const blogListUrl =
  "https://stianrostad.no/wordpress/wp-json/wp/v2/posts?_embed&per_page=10";

export const blogUrlBase =
  "https://stianrostad.no/wordpress/wp-json/wp/v2/posts/";

export const commentsUrlBase =
  "https://stianrostad.no/wordpress/wp-json/wp/v2/comments";

export const blogCategories =
  "https://stianrostad.no/wordpress/wp-json/wp/v2/categories";

//Define DIVS to display API-call results
export const blogListcontainer = document.querySelector(".bloglist");

//Display message
export const message = createMessage();
