import { commentsUrl } from "../../constants/apiUrls.js";

const username = "bikes_n_beer_baddie";
const appPassword = "DdSN LfDT FPLl N1gS ZLb6 5NCU";
const authString = `${username}:${appPassword}`;
const encodedAuth = btoa(authString); // Encode to Base64

export async function submitComment(commentData) {
  try {
    const response = await fetch(commentsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuth}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to submit comment: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Comment submission error:", error);
    throw error;
  }
}
