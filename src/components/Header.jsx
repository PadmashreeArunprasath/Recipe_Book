import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";
import { useTheme } from "../context/ThemeContext";
import "../App.css";
import "./Header.css";
function Header() {
  const { count } = useFavourites();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <NavLink to="/" className="logo">
        RECIPE BOOK
      </NavLink>

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/favourites">
          Favourites ({count})
        </NavLink>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;