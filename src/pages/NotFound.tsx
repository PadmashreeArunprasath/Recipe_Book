
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function NotFound() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`flex min-h-[70vh] flex-col items-center justify-center px-5 py-[30px] text-center ${
        isDarkMode ? "bg-[#13251c]" : "bg-[#f7f5ec]"
      }`}
    >
      <h1
        className={`m-0 text-[100px] font-bold max-[600px]:text-[75px] ${
          isDarkMode ? "text-[#e9a900]" : "text-[#285d3c]"
        }`}
      >
        404
      </h1>

      <h2
        className={`my-[10px] font-[Georgia,serif] text-2xl font-bold max-[600px]:text-xl ${
          isDarkMode ? "text-[#f7f5ec]" : "text-[#285d3c]"
        }`}
      >
        Oops! Recipe Not Found
      </h2>

      <p
        className={`max-w-[400px] leading-[1.6] max-[600px]:text-sm ${
          isDarkMode ? "text-[#d1d5db]" : "text-[#555]"
        }`}
      >
        Looks like this page is not on our menu.
        Let's get you back to something delicious!
      </p>

      <Link
        to="/"
        className="mt-5 inline-block rounded-full bg-[#e9a900] px-[25px] py-3 font-semibold text-[#222] no-underline transition-colors duration-200 hover:bg-[#d89500]"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
