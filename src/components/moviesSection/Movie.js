function Movie(props) {

  
  
  return (
    <div className="movie">
      <img
        className="movie-image"
        src={"https://image.tmdb.org/t/p/w1280" + props.image}
        alt=""
      />
      <span className="movie-rank">{props.rank.toString().slice(0,3)}</span>
      <p className="movie-title">{props.title}</p>
      <span className="movie-date-span">{props.year}</span>
    </div>
  )
}

export default Movie;