const apiKey = "8b3af569a84f4de4873a4fd186aeba97";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



//added click event listener to search button
searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim();

    if (query !== "") {
        try {
            articles = await fetchNewsQuery(query);
            displayBlogs(articles);

        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})

//async func for fetching random queries in search bar 
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


//function to display blog cards dynamically 
function displayBlogs(response) {
    const articles = response.articles; // Extract articles array from response
    blogContainer.innerHTML = "";

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description.length > 100 ? article.description.slice(0, 100) + "...." : article.description;
        description.textContent = truncatedDes;

        const author = document.createElement("span");
        author.textContent = article.author;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.appendChild(author);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard);
    });
}

//async func for fetching random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        // console.log(data);
        return data;


    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);

    } catch (error) {
        console.error("Error fetching random news", error);

    }
})();