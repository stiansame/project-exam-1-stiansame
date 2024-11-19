export function formatPostData(postDetails) {
  const category = postDetails._embedded["wp:term"][0];
  const catList = category.map((cat) => cat.name).join(",");

  const date = new Date(postDetails.date);
  const dateTimeFormatter = new Intl.DateTimeFormat("NO", {
    dateStyle: "long",
  });
  const formatDate = dateTimeFormatter.format(date);

  return {
    title: postDetails.title.rendered,
    content: postDetails.content.rendered,
    categories: catList,
    date: formatDate,
    author: {
      name: postDetails._embedded.author[0].name,
      avatar: postDetails._embedded.author[0].avatar_urls[24],
    },
  };
}
