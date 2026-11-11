
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleFavourite,
  selectIsFavourite,
} from "../features/favourites/favouritesSlice";

import { useTheme } from "../context/ThemeContext";

function RecipeDetails({ recipe }) {
  const dispatch = useDispatch();

  const favorite = useSelector((state) =>
    selectIsFavourite(state, recipe.id)
  );

  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`flex flex-col ${
        isDark ? "bg-[#202923] text-[#f5f5f5]" : "bg-white text-[#505b52]"
      }`}
    >
      {/* Recipe Image */}
      <img
        className="block h-[350px] w-full object-cover object-center max-[600px]:h-[300px] max-[360px]:h-[250px]"
        src={recipe.image}
        alt={recipe.name}
      />

      {/* Detail Content */}
      <div
        className={`relative z-10 -mt-3 rounded-t-[22px] px-[35px] pt-7 pb-[35px] max-[768px]:px-[25px] max-[600px]:px-5 max-[600px]:pt-5 max-[360px]:px-[15px] ${
          isDark ? "bg-[#202923]" : "bg-white"
        }`}
      >
        {/* Title and Favourite */}
        <div className="flex items-center justify-between gap-[15px]">
          <h2
            className={`mb-[18px] text-left font-[Georgia,serif] text-[30px] font-bold max-[768px]:text-[26px] max-[600px]:text-[23px] max-[480px]:text-xl ${
              isDark ? "text-white" : "text-[#244b36]"
            }`}
          >
            {recipe.name}
          </h2>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent"
            onClick={() => dispatch(toggleFavourite(recipe.id))}
            aria-label={
              favorite ? "Remove from favourites" : "Add to favourites"
            }
            aria-pressed={favorite}
          >
            <Heart
              size={24}
              fill={favorite ? "#F44336" : "none"}
              color={favorite ? "#F44336" : "#999"}
            />
          </button>
        </div>

        {/* Recipe Metadata */}
        <div className="mb-7 flex flex-wrap gap-3 max-[600px]:mb-5 max-[600px]:gap-2">
          {[
            `Prep: ${recipe.prepTimeMinutes} min`,
            `Cook: ${recipe.cookTimeMinutes} min`,
            `Total: ${totalTime} min`,
            recipe.difficulty,
          ].map((item) => (
            <span
              key={item}
              className={`rounded-full px-[15px] py-[9px] text-xs font-semibold max-[600px]:px-[11px] max-[600px]:py-[7px] max-[600px]:text-[11px] max-[360px]:px-[9px] max-[360px]:py-[6px] max-[360px]:text-[10px] ${
                isDark
                  ? "bg-[#35463a] text-white"
                  : "bg-[#eaf1e6] text-[#315c40]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Ingredients and Preparation */}
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-10 max-[900px]:grid-cols-1 max-[768px]:grid-cols-2 max-[768px]:gap-[25px] max-[600px]:grid-cols-1 max-[600px]:gap-[15px] max-[480px]:gap-[10px]">
          {/* Ingredients */}
          <div>
            <h4
              className={`mb-4 border-b-2 border-[#dce8d6] pb-[10px] text-lg font-semibold max-[600px]:text-[17px] max-[360px]:text-[15px] ${
                isDark ? "border-[#68796d] text-white" : "text-[#244b36]"
              }`}
            >
              Ingredients
            </h4>

            <ul className="list-disc pl-[22px]">
              {recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className={`mb-[10px] text-left text-sm leading-[1.8] max-[600px]:text-[13px] max-[360px]:text-xs max-[360px]:leading-[1.6] ${
                    isDark ? "text-[#e0e6e1]" : "text-[#505b52]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation Steps */}
          <div>
            <h4
              className={`mb-4 border-b-2 border-[#dce8d6] pb-[10px] text-lg font-semibold max-[600px]:text-[17px] max-[360px]:text-[15px] ${
                isDark ? "border-[#68796d] text-white" : "text-[#244b36]"
              }`}
            >
              Preparation Steps
            </h4>

            <ol className="list-decimal pl-[22px]">
              {recipe.instructions.map((step, index) => (
                <li
                  key={index}
                  className={`mb-[10px] text-left text-sm leading-[1.8] max-[600px]:text-[13px] max-[360px]:text-xs max-[360px]:leading-[1.6] ${
                    isDark ? "text-[#e0e6e1]" : "text-[#505b52]"
                  }`}
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
