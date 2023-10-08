import { useEffect, useState } from "react";

function MovieCard(props) {
  const [movie, setMovie] = useState(false);
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatch , setIsWatch] = useState(false);
  const [id, setId] = useState(null);
  
  
  async function fetchMovie() {
    try {
      // Fetch favorites to get the id
      const favoritesResponse = await fetch("http://localhost:8080/favorites");
      const favoritesData = await favoritesResponse.json();
      
      // Find the id
      const favoriteItem = favoritesData.find((favorite) => favorite.filmId === props.movieId);
      const idToDelete = favoriteItem ? favoriteItem.id : null;
  
      // Use the id to construct the URL for DELETE
      const url = isFavorite ? `http://localhost:8080/favorites/${idToDelete}` : "http://localhost:8080/favorites";
      const data = {
        filmId: props.movieId
      };
      const body = isFavorite ? null : JSON.stringify(data);
  
      // Make the DELETE request
      const response = await fetch(url, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
  
      // Check the response status code
      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  
  

  

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    fetchMovie();
    props.isFavorite(isFavorite);
    

  }

  const handleAddToWatch = () => {
    setIsWatch(!isWatch);
  }

  useEffect(() => {
    if (props.movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=41e467c96314188cd667403a3df5dddd&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => setMovie(data));

      fetch(
        "https://api.themoviedb.org/3/movie/" +
          props.movieId +
          "/credits?api_key=41e467c96314188cd667403a3df5dddd"
      )
        .then((response) => response.json())
        .then((data) => setCast(data.cast.slice(0, 7)));
      console.log(cast + "cast");
      fetch("http://localhost:8080/favorites")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filmIds = data.map((favorite) => favorite.filmId);
          if (filmIds.includes(props.movieId)) {
            setIsFavorite(true);
          }
        }
      })
    }
    
  }, [props.movieId ]);

  return (
    <div
      className={
        movie ? "container-active movie-card-container" : "movie-card-container"
      }
    >
      <div className={movie ? "mdp mdp-active" : "mdp"}>
       

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="w-6 h-6 close-icon "
          onClick={props.onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <img
          className="card-image"
          src={"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}
        />
        <img
          className="poster-image"
          src={"https://image.tmdb.org/t/p/w1280" + movie.poster_path}
        />
        <div className="mdp-content">
          <h2 className="movie-title-mdp">{movie.original_title}</h2>
          {movie && (
            <p className="rating-mdp">
              {movie.vote_average.toString().slice(0, 3)}
            </p>
          )}
          {
            <div className="genre-mdp">
               <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? "#d7d7d7" : "none"}
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 add-to-favorites-icon"
          onClick={handleAddToFavorites}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill= {isWatch ? "#d7d7d7" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 add-to-watchlist-icon"
            onClick={handleAddToWatch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
              {movie &&
                movie.genres.map((genre) => (
                  <span className="genre-name-mdp">{genre.name + " "}</span>
                ))}
            </div>
          }
          <p className="relase-year-mdp">
            {movie && "Release year : " + movie.release_date.substring(0, 4)}
          </p>
          <p className="content-mdp">{movie.overview}</p>
          <div className="cast-container">
            {cast.map((person) => (
              <div className="cast-image-container">
                <img
                  src={"https://image.tmdb.org/t/p/w1280" + person.profile_path}
                  className="cast-image"
                />
                <div className="cast-info">
                  <p className="cast-name">{person.name}</p>
                  <p className="cast-character">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
