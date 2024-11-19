import { postsUrl } from "../../constants/apiUrls.js";

export async function fetchPostData(postId) {
  const finalUrl = `${postsUrl}/${postId}?_embed&per_page=100`;

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
}
