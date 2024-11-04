//imports
import { blogListcontainer } from "./script";
import { blogListUrl } from "./script";


//call API to get blogs
async function getBloglist() {
    try {
        const response = await fetch(blogListUrl);
        const json = await response.json();

        blogListcontainer.innerHTML = "";

        const blogList = json;
        console.log({ blogList })
        
        blogList.forEach(function (blog) {
        blogListcontainer.innerHTML += `<div class="blogExcerpt">
                                            <p>HEADER: ${title.rendered}                                
            </div > `
        })

    }
}
