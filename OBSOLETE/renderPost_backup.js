// render spesific blogpage

//imports
import { createMessage } from "./message.js";
import { blogUrlBase } from "./script.js";
import { blogContainer } from "./script.js";

const message = createMessage();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const blogId = params.get("id");

const embed = "?_embed";

const queryTag = "?id=";

const blogUrl = blogUrlBase + blogId + embed;

async function getDetails() {
  try {
    const blogResponse = await fetch(blogUrl);
    const blogJson = await blogResponse.json();
    const postDetails = blogJson;
    console.log(postDetails);

    renderPost(postDetails);
  } catch (error) {
    blogContainer.innerHTML = message;
    document.title = "Aaaii papi - Something went wrong!";
  }
}

await getDetails();

function renderPost(postDetails) {
  const category = postDetails._embedded["wp:term"][0];
  const catList = category.map((cat) => cat.name).join(",");
  console.log(catList);

  const date = new Date(postDetails.date);
  const dateTimeFormatter = new Intl.DateTimeFormat("NO", {
    dateStyle: "long",
  });
  const formatDate = dateTimeFormatter.format(date);
  comments(postDetails);
  const newComments = comments(postDetails);
  console.log(newComments);
  blogContainer.innerHTML += `<div class="blog">
                                <h1>${postDetails.title.rendered}</h1>
                                <div class="Cat">${catList}</div>
                                <div class="postContent">${postDetails.content.rendered}</div>
                                <div> ${formatDate}</div>
                                <div class="blogAuthor"><img class="Avatar" src="${postDetails._embedded.author[0].avatar_urls[24]}"> ${postDetails._embedded.author[0].name}
                               <div> ${formatDate}</div>
                                </div>
                                </div>`;

  newComments.forEach((comment) => {
    blogContainer.innerHTML += `<div>
                                <p>${comment.author_name} replied:</p>
                                <p>${comment.content.rendered}</p>     
                                </div>`;
  });
}

function comments(postDetails) {
  let commentArray;

  if (
    postDetails._embedded.replies &&
    postDetails._embedded.replies[0].length > 0
  ) {
    commentArray = postDetails._embedded.replies[0];
  } else {
    commentArray = [];
  }

  return commentArray;
}
