export function renderBlogList() {
	// Create the main container div
	const shortBlogDiv = document.createElement("div");
	shortBlogDiv.className = "shortBlog";

	// Create the blog image link
	const blogImgLink = document.createElement("a");
	blogImgLink.className = "blogList_img";
	blogImgLink.href = `../post/index.html?id=${blog.id}`;

	// Create the blog image
	const blogImg = document.createElement("img");
	blogImg.className = "blogList_img";
	blogImg.src = blog._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
	blogImg.alt = blog.title.rendered;

	// Append the image to the link
	blogImgLink.appendChild(blogImg);

	// Create the category div
	const blogCatDiv = document.createElement("div");
	blogCatDiv.className = "blogCat";
	blogCatDiv.textContent = catString;

	// Create the blog header link
	const blogHeaderLink = document.createElement("a");
	blogHeaderLink.className = "blogListHeader";
	blogHeaderLink.href = `../post/index.html?id=${blog.id}`;

	// Create the header div and h2
	const blogHeaderDiv = document.createElement("div");
	blogHeaderDiv.className = "blogListHeader";
	const blogHeaderH2 = document.createElement("h2");
	blogHeaderH2.textContent = blog.title.rendered;

	// Append h2 to the header div, and header div to the link
	blogHeaderDiv.appendChild(blogHeaderH2);
	blogHeaderLink.appendChild(blogHeaderDiv);

	// Create the excerpt div
	const blogExcerptDiv = document.createElement("div");
	blogExcerptDiv.className = "blogListExcerpt";
	const blogExcerptP = document.createElement("p");
	blogExcerptP.innerHTML = blog.excerpt.rendered; // Using innerHTML to preserve HTML formatting

	// Append the paragraph to the excerpt div
	blogExcerptDiv.appendChild(blogExcerptP);

	// Create the author div
	const blogAuthorDiv = document.createElement("div");
	blogAuthorDiv.className = "blogAuthor";

	// Create the author's avatar
	const blogAvatarImg = document.createElement("img");
	blogAvatarImg.className = "bloglistAvatar";
	blogAvatarImg.src = blog._embedded.author[0].avatar_urls[24];

	// Create the author's name and date
	const authorName = document.createElement("b");
	authorName.textContent = blog._embedded.author[0].name;
	const authorDateDiv = document.createElement("div");
	authorDateDiv.textContent = formatDate;

	// Append avatar, name, and date to the author div
	blogAuthorDiv.appendChild(blogAvatarImg);
	blogAuthorDiv.appendChild(authorName);
	blogAuthorDiv.appendChild(authorDateDiv);

	// Append all elements to the main container
	shortBlogDiv.appendChild(blogImgLink);
	shortBlogDiv.appendChild(blogCatDiv);
	shortBlogDiv.appendChild(blogHeaderLink);
	shortBlogDiv.appendChild(blogExcerptDiv);
	shortBlogDiv.appendChild(blogAuthorDiv);

	// Append the main container to the blog list container
	blogListcontainer.appendChild(shortBlogDiv);
}
