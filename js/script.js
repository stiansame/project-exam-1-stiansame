//imports here

import { createMessage } from "../js/message.js";

//URL for api call
export const blogListUrl =
  "https://stianrostad.no/wordpress/wp-json/wp/v2/posts?_embed&per_page=10";

//Define DIVS to display API-call results
export const blogListcontainer = document.querySelector(".bloglist");

//Display message
export const message = createMessage();
