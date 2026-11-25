
import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

import { selectFavouritesCount } from "../features/favourites/favouritesSlice";
import { useAppSelector } from "../hooks/reduxHooks";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const count = useAppSelector(selectFavouritesCount);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const navLinkStyles = ({ isActive }: NavLinkRenderProps): string =>
    `whitespace-nowrap text-xs font-[Poppins,sans-serif] sm:text-base no-underline transition-colors duration-200 hover:text-amber-400 ${isActive ? "font-bold text-amber-400" : "text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-[1000] flex flex-col gap-3 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-[3%] sm:py-[18px] ${isDark ? "bg-[#20563B]" : "bg-[#285d3c]"
        }`}
    >
      <NavLink
        to="/"
        className="!bg-transparent whitespace-nowrap self-start font-[Georgia,serif] text-base font-bold !text-[#E4AD18] no-underline hover:!bg-transparent sm:text-xl"
      >
        RECIPE BOOK
      </NavLink>

      <nav className="flex w-full items-center justify-between gap-3 sm:w-auto sm:gap-5">
        <NavLink to="/" end className={navLinkStyles}>
          Home
        </NavLink>

        <NavLink to="/favourites" className={navLinkStyles}>
          Favourites ({count})
        </NavLink>

        <NavLink to="/add" className={navLinkStyles}>
          + Add Recipe
        </NavLink>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center rounded-full bg-transparent p-1 text-white hover:text-amber-400 sm:p-2"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
