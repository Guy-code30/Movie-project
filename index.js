async function movies() {
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=490768e9&s=Fast"
  );
  const movieData = await response.json();
  const movieListEl = document.querySelector(".movielist");
  movieListEl.innerHTML = movieData.map((movie) => movieHTML(movie)).join("");
}
movies();

function showMovie(title) {
  localStorage.setItem("title", title);
  window.location.href = `${window.location.origin}/index.html`;
}

// Bottom code is for user.html

const movieListEl = document.querySelector(".movie-list");

async function onSearchChange(event) {
  const title = event.target.value;
  const movie = await fetch(
    `https://www.omdbapi.com/?apikey=490768e9&s=${title}`
  );
  const movieData = await movie.json();
  movieListEl.innerHTML = movieData
    .map(
      (movie) => `
    <div class="movie">
      <div class="movie_title">${movie.title}</div>
      <p class="movie_body">${movie.body}</p>
    </div>`
    )
    .join("");
}

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("search_btn");
const movieList = document.querySelector(".movie-list");
const filterDropdown = document.getElementById("filters");

const API_KEY = "?apikey=490768e9&s=Fast"
const BASE_URL = "https://www.omdbapi.com/"

async function fetchMovies(query) {
    try {
    const response = await fetch(`${BASE_URL}&apikey=${API_KEY}&${query}`);
    const data = await response.json();
    if (data.Response === "True") {
        return data.Search;
    } else {
        return [];
    }
}}

function displayMovies(movies) {
    // movieList.innerHTML = "";
    if (movies.length === 0) {
        movieList.innerHTML = "<p>No movies found. Please try another search.</p>;";
        return;
    }
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-card";
        movieDiv.innerHTML = `
        <div class="movie_card--container">
        <h2>${movie.Title}</h2>
        <p><b>Year:</b> ${movie.Year}</p>
        <p><b>Type:</b> ${movie.Type}</p>
        <img src="${movie.Poster}" alt="${movie.Title} Poster" /> </div>`;
        movieList.appendChild(movieDiv);

    });
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query).then(displayMovies);
    } else {
        movieList.innerHTML = "<p>Please enter a movie title to search.</p>";
    }
});

