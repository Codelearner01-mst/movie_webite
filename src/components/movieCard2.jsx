import "./movieCard2.css";
import { useNavigate } from "react-router-dom";

function MovieCard2({ movie }) {
  const navigate = useNavigate();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.image;

  console.log(movie);

  // TMDB Overview fallback, and shortening long overviews
  const overviewText = movie.overview
    ? movie.overview.length > 200
      ? movie.overview.substring(0, 200) + "..."
      : movie.overview
    : "No overview available for this movie.";

  return (
    <div className="movie-card2-horizontal">
      <div className="movie-card2-overview">
        <p>{overviewText}</p>
      </div>

      <div className="movie-card2-date">
        <span>{movie.release_date}</span>
      </div>

      <div className="movie-card2-right">
        <button
          onClick={() => {
            navigate(`/movie/${movie.id}`);
          }}
        >
          <div className="movie-card2-image-wrap">
            <img
              src={imageUrl}
              alt={movie.title}
              className="movie-card2-image"
            />
          </div>
          <h3 className="movie-card2-title">{movie.title}</h3>
        </button>
      </div>
    </div>
  );
}

export default MovieCard2;
