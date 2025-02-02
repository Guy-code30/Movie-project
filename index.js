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

// Filters

let currentMovies = [];

// Then in your fetchMovies add currentMovies = data.Search

if (data.Response === "True") {
  currentMovies = data.Search;
  return data.Search;
}

function sortMovies(movies, filterValue) {
  const sortedMovies = [...movies];

  switch (filterValue) {
    case "OLD_TO_NEW":
      sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      break;
    case "NEW_TO_OLD":
      sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      break;

    default:
      break;
  }
  return sortedMovies;
}

// Add eventlisteners

filterDropdown.addEventListener("change", (e) => {
  const sortedMovies = sortMovies(currentMovies, e.target.value);
  displayMovies(sortedMovies);
});

// Search button event listener
searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query) {
    const movies = await fetchMovies(query);
    // Reset the filter dropdown when performing a new search
    filterDropdown.selectedIndex = 0;
    displayMovies(movies);
  } else {
    movieList.innerHTML = "<p>Please enter a movie title to search.</p>";
  }
});

// Enter key on search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
