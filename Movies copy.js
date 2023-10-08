import Movie from "./Movie";
import { useState, useEffect } from "react";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [navbarName, setNavbarName] = useState("Popular");
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (movieId) => {
    props.isMovieClicked(movieId);
  };

  const fetchPopularMovies = () => {
    setIsLoading(true);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41e467c96314188cd667403a3df5dddd&page="
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setIsLoading(false);
      });
  };

  const fetchMoviesByGenre = (genreId) => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41e467c96314188cd667403a3df5dddd&with_genres=${genreId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
        setIsLoading(false);
      });
  };

  const fetchFavoritedMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/favorites");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const filmIds = data.map((favorite) => favorite.filmId);
          const fetchPromises = filmIds.map((filmId) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${filmId}?api_key=41e467c96314188cd667403a3df5dddd&language=en-US`
            )
              .then((response) => response.json())
              .catch((error) =>
                console.error("Error fetching favorite movie:", error)
              )
          );
          Promise.all(fetchPromises)
            .then((favoriteMovies) => {
              setMovies(favoriteMovies);
              setIsLoading(false);
            })
            .catch((error) =>
              console.error("Error fetching favorite movies:", error)
            );
        } else {
          console.error("Invalid data structure from local database.");
          setIsLoading(false);
        }
      } else {
        console.error("Error fetching favorite movies from the local database.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesBySearchQuery = (searchQuery) => {
    if (searchQuery.length > 3) {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=41e467c96314188cd667403a3df5dddd&query=${searchQuery}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies by search query:", error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (props.isFavoritesClicked) {
      fetchFavoritedMovies();
      setNavbarName("Favorites");
    } else if (props.genreId) {
      fetchMoviesByGenre(props.genreId);
      setNavbarName(props.genreName);
    } else if (props.sendSearchQuery) {
      fetchMoviesBySearchQuery(props.sendSearchQuery);
      setNavbarName(`Search results for: ${props.sendSearchQuery}`);
    } else {
      fetchPopularMovies();
      setNavbarName("Popular");
    }
  }, [props.genreId, props.isFavoritesClicked, props.sendSearchQuery]);

  return (
    <div className="main main-layout">
      <div className="movie-navbar">
        {navbarName}
      </div>
      <div className="movies" id="main">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <div onClick={() => handleClick(movie.id)} key={movie.id}>
              <Movie
                title={movie.title}
                year={movie.release_date}
                rank={movie.vote_average}
                image={movie.poster_path}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
