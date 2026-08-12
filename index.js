const apiKey = "8fa799d9ed64f37163d9d60cfa8dbdda";
const baseUrl = "https://api.themoviedb.org/3";
const language = "en-US";
const searchButton = document.getElementById("search-button");
const genreFilter = document.getElementById("genre-filter");
const sortBySelect = document.getElementById("sort-by");
const movieList = document.getElementById("movie-list");

searchButton.addEventListener("click", () => {
  const searchTerm = document.getElementById("search").value;
  const selectedGenre = genreFilter.value;

  const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&with_genres=${selectedGenre}&language=${language}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      movieList.innerHTML = "";

      data.results.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = movie.title;

        // Add the click event to the image
        movieImage.addEventListener("click", () => {
          const movieId = movie.id; // Save the clicked movie ID
          openModal(movieId);
        });

        movieCard.appendChild(movieImage);
        movieList.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error("Error al buscar películas:", error);
    });
});

function openModal(movieId) {
  const modal = document.getElementById("movie-modal");
  const modalContent = document.getElementById("modal-content");

  // Make a request to the API to get details of the movie with movieId
  const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${language}`;

  fetch(url)
    .then(response => response.json())
    .then(movieData => {
      // Show the movie details in the modal view
      modalContent.innerHTML = `
        <h2>${movieData.title}</h2>
        <p>${movieData.overview}</p>
        <p>Rating: ${movieData.vote_average}</p>
        <p>Realease Date: ${movieData.release_date}</p>
        <button id="close-button-modal">&times;</button>
      `;

      modal.style.display = "block";

      // Add click event to the modal view's close button
      const closeButtonModal = document.getElementById("close-button-modal");
      closeButtonModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
    })
    .catch(error => {
      console.error("Error al obtener detalles de la película:", error);
    });
}

// Other event and code listeners...
