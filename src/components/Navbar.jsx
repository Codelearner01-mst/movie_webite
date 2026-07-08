import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown("");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Movies",
      path: "#",
      dropdown: [
        { name: "Popular", path: "/popular" },
        { name: "Upcoming", path: "/upcoming" },
        { name: "Latest", path: "/latest" },
        { name: "Top Rated", path: "/top-rated" },
      ],
    },
    {
      name: "TV Shows",
      path: "#",
      dropdown: [
        { name: "Popular", path: "/tv-popular" },
        { name: "Top Rated", path: "/tv-top-rated" },
      ],
    },
    { name: "My Favourite", path: "/favourite" },
  ];

  const isDropdownActive = (name) => {
    const dropdown = navLinks.find(
      (link) =>
        link.dropdown?.length > 0 &&
        link.dropdown.some((item) => item.path === location.pathname),
    );
    if (!dropdown) return false;
    return dropdown.name === name;
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          CINEMA<span>TIX</span>
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </button>

        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`nav-item ${link.dropdown ? "has-dropdown" : ""}`}
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown("")}
            >
              {link.dropdown ? (
                <>
                  <Link
                    to={link.path}
                    className={`nav-link ${isDropdownActive(link.name) ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.innerWidth <= 768) {
                        setActiveDropdown(
                          activeDropdown === link.name ? "" : link.name,
                        );
                      }
                    }}
                  >
                    {link.name}
                    <span className="dropdown-arrow">▼</span>
                  </Link>
                  <ul
                    className={`dropdown-menu ${activeDropdown === link.name ? "show" : ""}`}
                  >
                    {link.dropdown.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className={`dropdown-link ${location.pathname === item.path ? "active" : ""}`}
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
