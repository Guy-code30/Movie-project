

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("search_btn");

const movieList = document.querySelector(".movie-list");

const filterDropdown = document.getElementById("filters");

// API Key and Base URL

const API_KEY = "490768e9"; // Replace with your OMDB API key

const BASE_URL = "https://www.omdbapi.com/";

// Fetch Movies from OMDB API

async function fetchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);

    const data = await response.json();

    if (data.Response === "True") {
      return data.Search; // Return movie list
    } else {
      return []; // Return empty array if no movies found
    }
  } catch (error) {
    console.error("Error fetching movies:", error);

    return [];
  }
}

// Display Movies

function displayMovies(movies) {
  movieList.innerHTML = ""; // Clear the previous movie list

  if (movies.length === 0) {
    movieList.innerHTML = "<p>No movies found. Please try another search.</p>";

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

 <img src="${movie.Poster}" alt="${movie.Title} Poster" />

 </div>

 `;

    movieList.appendChild(movieDiv);
  });
}

// Handle Search Button Click

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query) {
    fetchMovies(query).then(displayMovies);
  } else {
    movieList.innerHTML = "<p>Please enter a movie title to search.</p>";
  }
});
