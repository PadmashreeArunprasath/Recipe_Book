import { NavLink } from "react-router-dom";
import "../App.css";

function Header({ favoritesCount }) {
  return (
    <header className="site-header">
      <NavLink to="/" className="logo">
        Recipe Book
      </NavLink>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "active-link" : ""}
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Favourites ({favoritesCount})
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;