
import { useTheme } from "../context/ThemeContext";

function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className={`min-h-[190px] px-10 pt-4 pb-12 text-left text-white max-[600px]:min-h-[175px] max-[600px]:px-4 max-[600px]:pt-4 ${
        theme === "dark" ? "bg-[#4e6656]" : "bg-[#2D5D3B]"
      }`}
    >
      <h1 className="mb-4 mt-0 font-[Georgia,serif] text-[56px] font-bold leading-[1.1] tracking-[-0.5px] max-[600px]:text-[27px]">
        Discover Recipes
      </h1>

      <p className="max-w-[450px] font-[Poppins,sans-serif] text-base font-normal leading-[1.5] max-[600px]:max-w-[310px] max-[600px]:text-xs">
        Simple home-style recipes, from quick breakfasts to Sunday biryani.
      </p>
    </section>
  );
}

export default Hero;
