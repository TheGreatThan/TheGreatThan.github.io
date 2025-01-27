const movies = [
    {
      name: "Chị Dâu - Chi Dau",
      director: "Khương Ngọc",
      release: 2024,
      genre: "Drama, Comedy",
      rating: 4,
      image: "/FilmsReview/pic/chidau.jpg",
      link: "/FilmsReview/rv/chidau/chidauphone.html",
    },
    { 
      name: "Howl's Moving Castle",
      director: "Hayao Miyazaki",
      release: 2004,
      genre: "Anime",
      rating: 4,
      image: "/FilmsReview/pic/howls.jpg",
      link: "https://www.imdb.com/title/tt1375666/",
    },
  ];
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 })
      .map((_, i) => (i < rating ? "🌟" : "⭐"))
      .join("");
  };
  
  const filterMovies = () => {
    const search = document.getElementById("search-input").value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.name.toLowerCase().includes(search)
    );
  
    if (filteredMovies.length > 0) {
      document.getElementById("no-results").classList.add("hidden");
      renderMovies(filteredMovies);
    } else {
      document.getElementById("no-results").classList.remove("hidden");
      document.getElementById("movie-grid").innerHTML = "";
    }
  };
  
  const renderMovies = (movies) => {
    const movieGrid = document.getElementById("movie-grid");
    movieGrid.innerHTML = "";
  
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
  
      card.innerHTML = `
        <a href="${movie.link}" target="_blank">
              <img src="${movie.image}" alt="${movie.name}" class="interactable">
        </a>
        <a href="${movie.link}" target="_blank">
          <h2 class="interactable"=>${movie.name}</h2>
        </a>
        <p>Director: ${movie.director}</p>
        <p>Release: ${movie.release}</p>
        <p>Genre: ${movie.genre}</p>
        <p>Rating: ${renderStars(movie.rating)}</p>
      `;
  
      movieGrid.appendChild(card);
    });
  };
  
  document.getElementById("search-input").addEventListener("input", filterMovies);
  
  // Initial setup
  renderMovies(movies);
  

  let nav = document.querySelector("#navArea");
let btn = document.querySelector(".toggle-btn");
let mask = document.querySelector("#mask");

btn.onclick = () => {
  nav.classList.toggle("open");
};

mask.onclick = () => {
  nav.classList.toggle("open");
};


document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  let timeoutId;

  const resetCursorTimeout = () => {
    cursor.style.opacity = '1'; // Show the cursor
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cursor.style.opacity = '0'; // Hide the cursor
    }, 3000); // 3 seconds
  };

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    resetCursorTimeout();
  });

  const interactableClasses = ['interactable', 'toggle-btn'];

  interactableClasses.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);

      elements.forEach(element => {
          element.addEventListener('mouseenter', () => {
              cursor.classList.add('interacting');
          });

          element.addEventListener('mouseleave', () => {
              cursor.classList.remove('interacting');
          });
      });
  });
});
