import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upcoming from './pages/Upcoming';
import Latest from './pages/Latest';
import Favourite from './pages/Favourite';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/favourite" element={<Favourite />} />
          </Routes>
        </main>
        <footer style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid #ebebeb', marginTop: 'auto', backgroundColor: 'var(--secondary-bg)' }}>
          <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 Cinematix. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
