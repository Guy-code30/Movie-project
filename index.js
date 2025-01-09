document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    fetchMovies(searchInput);
});

function fetchMovies(searchTerm) {
    const apiKey = '490768e9';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                document.getElementById('movieResults').innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('movieResults').innerHTML = '<p>An error occurred. Please try again later.</p>';
        });
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const movieImage = document.createElement('img');
        movieImage.src = movie.Poster;
        movieElement.appendChild(movieImage);

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.Title;
        movieElement.appendChild(movieTitle);

        const movieYear = document.createElement('p');
        movieYear.textContent = `Year: ${movie.Year}`;
        movieElement.appendChild(movieYear);

        movieResults.appendChild(movieElement);
    });
}