//DOM elements
const getNews = document.querySelector(".search");

const newsContainer = document.querySelector(".news-container");

//Fetch news from News API after clicking get news button

getNews.addEventListener("click", async function () {
  //console.log("Click me");
  const topic = document.querySelector("#topic").value;
  const apiKey = "c391ab653cd74ed0a3d131cfaa839f41";
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, { mode: "cors" });

    //Print error if encountered
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news: ", error.message);
  }
});

const displayNews = (articles) => {
  // Clear previous news
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const source = document.createElement("p");
    source.textContent = `Source: ${article.source.name}`;

    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = "Read More..";

    //Append to card
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(source);
    card.appendChild(link);

    //Append to news container
    newsContainer.appendChild(card);
  });
};
