import "./Card2.css";
import { useNavigate } from "react-router-dom";

function Card2({ show }) {
  const navigate = useNavigate();
  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : show.image;

  // Determine the correct details endpoint based on media type
  const endpoint = show.media_type === "tv" ? "/tv" : "/movie";

  // TMDB Overview fallback, and shortening long overviews
  const overviewText = show.overview
    ? show.overview.length > 200
      ? show.overview.substring(0, 200) + "..."
      : show.overview
    : "No overview available for this movie.";

  return (
    <div className="movie-card2-horizontal">
      <div className="movie-card2-overview">
        <p>{overviewText}</p>
      </div>

      <div className="movie-card2-date">
        <span>{show.release_date || show.first_air_date}</span>
      </div>

      <div className="movie-card2-right">
        <button
          onClick={() => {
            navigate(`${endpoint}/${show.id}`);
          }}
        >
          <div className="movie-card2-image-wrap">
            <img
              src={imageUrl}
              alt={show.title}
              className="movie-card2-image"
            />
          </div>
          <h3 className="movie-card2-title">{show.title || show.name}</h3>
        </button>
      </div>
    </div>
  );
}

export default Card2;
