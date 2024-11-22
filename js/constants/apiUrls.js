//main url
export const baseUrl = "https://stianrostad.no/wordpress/wp-json/wp/v2";

//post url
export const postsUrl = `${baseUrl}/posts`;

//bloglist url
export const blogListUrl = `${postsUrl}?_embed`;

//comments url
export const commentsUrl = `${baseUrl}/comments`;

//categories url
export const categoriesUrl = `${baseUrl}/categories`;
