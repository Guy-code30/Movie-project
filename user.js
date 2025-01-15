const movieListEl = document.querySelector('.movie-list');

async function onSearchChange(event) {
  const title = event.target.value
  const movie = await fetch(
    `https://www.omdbapi.com/?apikey=490768e9&s=Fast${title}`
  );
  const movieData = await movie.json();
    movieListEl.innerHTML = movieData.map(movie => `
    <div class="movie">
      <div class="movie_title">${movie.title}</div>
      <p class="movie_body">${movie.body}</p>
    </div>`
    )
    .join("");
}



async function main() {
  const title = localStorage.getItem("title");
  //   Were fectching a dynamic API
  const movie = await fetch(
    `https://www.omdbapi.com/?apikey=490768e9&s=Fast${title}`
  );
  const movieData = await movie.json();
  console.log(moviesData);

  movieListEl.innerHTML = movieData.map(movie => `
    <div class="movie">
      <div class="movie_title">${movie.title}</div>
      <p class="movie_body">${movie.body}</p>
    </div>`
    )
    .join("");
}

main();
