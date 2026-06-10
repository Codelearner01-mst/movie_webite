import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Latest from "./pages/Latest";
import Popular from "./pages/popular";
import TopRated from "./pages/topRated";
import Favourite from "./pages/Favourite";
import MovieDetails from "./pages/MovieDetails";
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
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/searchresults" element={<SearchResults />} />
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
