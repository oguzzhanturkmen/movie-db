import React, { useState } from "react";
import Header from "./components/header/Header";
import Movies from "./components/moviesSection/Movies";
import Sidebar from "./components/sidebar/Sidebar";
import MovieCard from "./components/MovieCard";
import './styles.css';




function Home(props) {

    const [genreId, setGenreId] = useState(false);
    const [genreName, setGenreName] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favoriteClick, setFavoriteClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(false);
  
  const genreIdIs = (genreId, genreName) => {
    setGenreId(genreId);
    setGenreName(genreName);
    
  
  }
  const favoriteChangeHandle = (isFavorite) => {
    setIsFavoriteChanged(isFavorite);
    console.log("test");
  }

  
  
  const searchQueryIs = (searchQueryy) => {
    console.log("oguz");
    setSearchQuery(searchQueryy);
  }
  
  const movieClickedIs= (movieId) => {
    console.log("test");
    setSelectedMovie(movieId);
    console.log(movieId);
    
    
  }

  const handleFavoritesClick = (isClicked) => {
    setFavoriteClick(isClicked);
  }
  return (
    <div>
    {selectedMovie &&
    (<MovieCard
    movieId = {selectedMovie}
    onClose = {() => setSelectedMovie(null)}
    isFavorite = {favoriteChangeHandle}
     ></MovieCard>)
    }
    
    <Header searchTerm= {searchQueryIs}> </Header>
    <Sidebar
    getGenreId = {genreIdIs}
    isClickedFavorites = {handleFavoritesClick}
    > 
    </Sidebar>
    
    <Movies genreId = {genreId}
    genreName = {genreName}
    sendSearchQuery = {searchQuery}
    isFavoritesClicked = {favoriteClick}
    isMovieClicked = {movieClickedIs}
    isFavoriteChanged ={isFavoriteChanged}
            > </Movies>


  </div>
  );
}

export default Home;