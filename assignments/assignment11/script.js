const getMovies = async () => {
  const url = "https://portiaportia.github.io/json/movies.json";

  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const showMovies = async () => {
  const movies = await getMovies();
  const moviesContainer = document.getElementById("movies-container");
  movies.forEach((movie) => {
    moviesContainer.append(getMovieItem(movie));
  });
};

const getMovieItem = (movie) => {
  const section = document.createElement("section");
  const imgDiv = document.createElement("div");

  const image = document.createElement("img");
  image.src = "https://portiaportia.github.io/json/" + movie.img;
  imgDiv.append(image);

  const textDiv = document.createElement("div");

  const title = document.createElement("h2");
  title.innerHTML = movie.title;
  title.classList.add("bold");
  textDiv.append(title);

  const director = document.createElement("p");
  director.innerHTML = `<span class="bold">Director:</span> ${movie.director}`;
  textDiv.append(director);

  const actors = document.createElement("p");
  actors.innerHTML = `<span class="bold">Actors:</span> `;
  movie.actors.forEach((actor) => {
    actors.innerHTML += actor;
    if (actor != movie.actors[movie.actors.length - 1]) {
      actors.innerHTML += ", ";
    }
  });
  textDiv.append(actors);

  const year = document.createElement("p");
  year.innerHTML = `<span class="bold">Year Released:</span> ${movie.year}`;
  textDiv.append(year);

  const genres = document.createElement("p");
  genres.innerHTML = `<span class="bold">Genres:</span> `;
  movie.genres.forEach((genre) => {
    genres.innerHTML += genre;
    if (genre != movie.genres[movie.genres.length - 1]) {
      genres.innerHTML += ", ";
    }
  });
  textDiv.append(genres);

  const description = document.createElement("p");

  description.innerHTML = movie.description;
  textDiv.append(description);

  imgDiv.id = "movie-img";
  textDiv.id = "movie-text";

  section.append(imgDiv);
  section.append(textDiv);
  return section;
};

window.onload = () => showMovies();
