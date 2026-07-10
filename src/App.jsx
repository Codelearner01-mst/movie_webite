import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Latest from "./pages/Latest";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import PopularTvShows from "./pages/PopularTvShows";
import TopRatedTvShows from "./pages/TopRatedTvShows";
import Favourite from "./pages/Favourite";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import "./App.css";
import SearchResults from "./pages/searchResults";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/tv-popular" element={<PopularTvShows />} />
            <Route path="/tv-top-rated" element={<TopRatedTvShows />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TVDetails />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p className="footer-brand">
            CINEMA<span>TIX</span>
          </p>
          <p className="footer-tagline">Where every frame tells a story</p>
          <p className="footer-copy">
            &copy; 2026 Cinematix. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
