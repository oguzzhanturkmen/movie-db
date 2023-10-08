
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Movies from "./components/moviesSection/Movies";
import Sidebar from "./components/sidebar/Sidebar";
import MovieCard from "./components/MovieCard";
import './styles.css';

function App() {
  
  const [genreId, setGenreId] = useState(false);
  const [genreName, setGenreName] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


const genreIdIs = (genreId, genreName) => {
  setGenreId(genreId);
  setGenreName(genreName);
  

}

const [searchQuery, setSearchQuery] = useState(false);

const searchQueryIs = (searchQueryy) => {
  console.log("oguz");
  setSearchQuery(searchQueryy);
}

const movieClickedIs= (movieId) => {
  console.log("test");
  setSelectedMovie(movieId);
  console.log(movieId);
  
  
}





  return (
    <div>
      {selectedMovie &&
      (<MovieCard
      movieId = {selectedMovie}
      onClose = {() => setSelectedMovie(null)}
      
       ></MovieCard>)
      }
      
      <Header searchTerm= {searchQueryIs}> </Header>
      <Sidebar
      getGenreId = {genreIdIs}
      > 
      </Sidebar>
      
      <Movies genreId = {genreId}
      genreName = {genreName}
      sendSearchQuery = {searchQuery}
      
      isMovieClicked = {movieClickedIs}
              > </Movies>


    </div>
  );
}

export default App;




  