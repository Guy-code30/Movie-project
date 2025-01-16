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

document.getElementById("searchButton").addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  if (searchInput) {
    fetchMovies(searchInput).then((movies) => {
      movies.forEach((movie) => {
        const movieDiv = document.createdElement("div");
        movieDov.className = "movie";
        movieDiv.innerHTML = `
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
        <p><img src="${movie.Poster}" alt="${movie.Title} Poster"></p>`;
        resultsDiv.appendChild(movieDiv);
      });
    } else {
        resultsDiv.innerHTML = '<p>No movies found.</p>';
    }).catch(error => {
        resultsDiv.innerHTML = '<p>There was an error fetching the movie.';
    });
  } else {
    resultsDiv.innerHTML = '<p>Please enter a movie title to search</p>';
  }
});


async function fetchMovies(query) {
    const apiKey = (`https://www.omdbapi.com/?${query}&apikey=${490768e9&s=Fast}`);
    const data = await response.json();
    if (data.Response === 'True') {
        return data.Search;
    } else {
        return [];
    }
}