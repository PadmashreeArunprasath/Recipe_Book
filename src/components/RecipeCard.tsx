
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  toggleFavourite,
  selectIsFavourite,
} from "../features/favourites/favouritesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/reduxHooks";
import { useTheme } from "../context/ThemeContext";
import isVeg from "../utils/isVeg";
import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const favorite = useAppSelector((state) =>
    selectIsFavourite(state, recipe.id)
  );

  const { theme } = useTheme();

  const vegetarian = isVeg(recipe);
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const isDark = theme === "dark";

  return (
    <article
      className={`cursor-pointer overflow-hidden rounded-[17px] border transition-all duration-200 hover:-translate-y-1 ${isDark
          ? "border-[#304B39] bg-[#17251D] text-[#F0F3EF] shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:border-[#496B52]"
          : "border-[#dce8d9] bg-white hover:shadow-md"
        }`}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      {/* Recipe Image */}
      <div
        className={`relative flex h-[170px] items-center justify-center overflow-hidden max-[600px]:h-[125px] ${isDark ? "bg-[#101A15]" : "bg-[#f0f5ee]"
          }`}
      >
        <img
          className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          src={recipe.image}
          alt={recipe.name}
        />

        {/* Favourite Button */}
        <button
          type="button"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favorite}
          className={`absolute right-3 top-3 flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors ${isDark
              ? "bg-[#17251D]/90 hover:bg-[#304B39]"
              : "bg-white/90 hover:bg-white"
            }`}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            dispatch(toggleFavourite(recipe.id));
          }}
        >
          <Heart
            size={20}
            fill={favorite ? "#F44336" : "none"}
            color={favorite ? "#F44336" : isDark ? "#A9B9AD" : "#A0A0A0"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Recipe Information */}
      <div className="px-4 pt-3 pb-4 max-[600px]:px-3 max-[600px]:pt-[9px] max-[600px]:pb-3">
        <h3
          className={`mb-[10px] font-[Georgia,serif] text-[19px] font-bold max-[600px]:text-sm ${isDark ? "text-[#F0F3EF]" : "text-black"
            }`}
        >
          {recipe.name}
        </h3>

        {/* Recipe Metadata */}
        <div
          className={`flex flex-wrap items-center gap-[10px] text-[13px] max-[600px]:gap-2 max-[600px]:text-[11px] ${isDark ? "text-[#B3C4B6]" : "text-[#64766a]"
            }`}
        >
          <span
            className={`rounded-full px-[10px] py-[3px] text-xs font-semibold ${vegetarian
                ? isDark
                  ? "bg-[#294A35] text-[#B9E8C3]"
                  : "bg-[#e0f0dc] text-[#26803c]"
                : isDark
                  ? "bg-[#59332F] text-[#FFD0C8]"
                  : "bg-[#fbe1dc] text-[#c6382b]"
              }`}
          >
            {vegetarian ? "Veg" : "Non-veg"}
          </span>

          <span>◷ {totalTime} min</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
