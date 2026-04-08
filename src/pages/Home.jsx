import { useEffect, useState } from "react";
import getMovies from "../service/movies-service";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import "./Home.css";

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const page = 1;

      try {
        const LATESTMOVIES = await getMovies("now_playing", page);
        setLatestMovies(LATESTMOVIES.results);
        const UPCOMINGMOVIES = await getMovies("upcoming", 2);
        setUpcomingMovies(UPCOMINGMOVIES.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <Search />
      <Hero
        image="/home-hero.png"
        title="Experience the Magic of Cinema"
        subtitle="Discover the latest blockbusters and highly anticipated upcoming releases curated just for you."
      />

      <div className="container py-4">
        <div className="movie-section mb-4">
          <h2 className="section-title">Expected Next: Latest Movies</h2>
          <div className="movies-grid">
            {latestMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <button className="load-more-btn">Load More</button>
          </div>
        </div>

        <div className="movie-section mt-4 pt-4">
          <h2 className="section-title">Upcoming Movies</h2>
          <div className="movies-grid">
            {upcomingMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <button className="load-more-btn">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
