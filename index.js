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
    localStorage.setItem("title", title)
    window.location.href = `${window.location.origin}/index.html`
}