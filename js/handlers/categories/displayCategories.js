import { fetchCategories } from "../../api/categories/fetchCategories.js";
import { getSidebar } from "../../constants/containers.js";
import { createCategories } from "../../ui/categories/createCategories.js";

export async function displayCategories() {
  const cat = await fetchCategories();
  const container = getSidebar();
  if (container && cat?.length) {
    createCategories(cat, container);
  }
}
