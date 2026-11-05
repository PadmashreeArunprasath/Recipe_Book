import { NavLink } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import "../App.css";
import "./Header.css";
function Header() {
  const { count } = useFavourites();

  return (
    <header className="site-header">
      <NavLink to="/" className="logo">
        RECIPE BOOK
      </NavLink>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Favourites ({count})
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;