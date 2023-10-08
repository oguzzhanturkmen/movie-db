import Movie from "./Movie";
import { useState, useEffect } from "react";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [navbarName, setNavbarName] = useState(props.genreName);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoritesSection, setIsFavoritesSection] = useState(false);
  const [page, setPage] = useState(1); // Initial page number
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(props.sendSearchQuery);
  const [isSearchQueryChanged, setIsSearchQueryChanged] = useState(false);
  const [isSearchQuerySubmitted, setIsSearchQuerySubmitted] = useState(false);
  const [isSearchQuerySubmittedChanged, setIsSearchQuerySubmittedChanged] = useState(false);


  const handleClick = (movieId) => {
    props.isMovieClicked(movieId);
  };

  const fetchPopularMovies = () => {
    setNavbarName("Popular"); // Set the navbar name immediately
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
    setNavbarName(props.genreName); // Set the navbar name immediately
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
              setNavbarName("Favorites");
              setIsLoading(false);
            })
            .catch((error) =>
              console.error("Error fetching favorite movies:", error)
            );
        } else {
          console.error("Invalid data structure from the local database.");
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
      setNavbarName(`Search results for: ${searchQuery}`); // Set the navbar name immediately
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
      setIsFavoritesSection(true);
    } else if (props.genreId) {
      fetchMoviesByGenre(props.genreId);
      setIsFavoritesSection(false);
    } else if (props.sendSearchQuery) {
      fetchMoviesBySearchQuery(props.sendSearchQuery);
      setIsFavoritesSection(false);
      setSearchQuery("");
    } else {
      fetchPopularMovies();
    }
  }, [props.genreId, props.genreName, props.isFavoritesClicked, props.sendSearchQuery, props.isFavoriteChanged, searchQuery]);

  return (
    <div className="main main-layout">
      <div className="movie-navbar">{navbarName}</div>
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
