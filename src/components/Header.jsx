
import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";

import { selectFavouritesCount } from "../features/favourites/favouritesSlice";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

function Header() {
  const count = useSelector(selectFavouritesCount);
  const { theme, toggleTheme } = useTheme();

  const navLinkStyles = ({ isActive }) =>
    `whitespace-nowrap text-xs font-[Poppins,sans-serif] sm:text-base no-underline transition-colors duration-200 hover:text-amber-400 ${
      isActive ? "font-bold text-amber-400" : "text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-[1000] flex flex-row items-center justify-between gap-2 px-3 py-3 text-base text-white sm:px-[3%] sm:py-[18px] max-[360px]:flex-col max-[360px]:items-start ${
        theme === "dark" ? "bg-[#4e6656]" : "bg-[#285d3c]"
      }`}
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="whitespace-nowrap font-[Georgia,serif] text-base font-semibold text-white no-underline sm:text-xl"
      >
        RECIPE BOOK
      </NavLink>

      {/* Navigation */}
      <nav className="flex items-center gap-2 sm:gap-5 max-[360px]:w-full max-[360px]:justify-between">
        <NavLink to="/" end className={navLinkStyles}>
          Home
        </NavLink>

        <NavLink to="/favourites" className={navLinkStyles}>
          Favourites ({count})
        </NavLink>

        <NavLink to="/add" className={navLinkStyles}>
          + Add Recipe
        </NavLink>

        {/* Theme Toggle */}
        <button
          type="button"
          className="flex shrink-0 items-center justify-center rounded-full bg-transparent p-1 text-white transition-colors hover:text-amber-400 sm:p-2"
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
