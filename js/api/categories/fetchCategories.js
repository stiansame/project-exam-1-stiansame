//imports
import { categoriesUrl } from "../../constants/apiUrls.js";
import { message } from "../../script.js";
import { getSidebar } from "../../constants/containers.js";

export async function fetchCategories() {
  try {
    const response = await fetch(categoriesUrl);
    return await response.json();
  } catch (error) {
    sidebarContainer = getSidebar();
    sidebarContainer.innerHTML = message;
    return null;
  }
}
