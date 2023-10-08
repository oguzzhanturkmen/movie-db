import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Drawer(props) {

  const [genres, setGenres] = useState([])
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=41e467c96314188cd667403a3df5dddd&language=en-US")
    .then(response => response.json())
    .then(data => setGenres(data.genres))
  }
  , [])
  const handleGenreClick = (genreId, genreName) => {
    
    props.onGenreClick(genreId, genreName);
    
  };
  return (
    <div class={ props.isClicked ? "drawer active" : "drawer"} id="drawer">
      <h2 className='genres-title'>GENRES</h2>

      <div id="genre-list">
        {genres.map(genre => 
          <div className="genre" key={genre.id} onClick={() => handleGenreClick(genre.id , genre.name) }>
            
           <label className= "genre-name"
                >{genre.name}</label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;