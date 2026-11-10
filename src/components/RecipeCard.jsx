
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useTheme } from "../context/ThemeContext";
import isVeg from "../utils/isVeg";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const { isFavourite, toggleFavourite } = useFavourites();
  const { theme } = useTheme();

  const favorite = isFavourite(recipe.id);
  const vegetarian = isVeg(recipe);
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const isDark = theme === "dark";

  return (
    <article
      className={`cursor-pointer overflow-hidden rounded-[17px] border ${
        isDark
          ? "border-[#64766a] bg-[#28362d]"
          : "border-[#dce8d9] bg-white"
      }`}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      {/* Recipe Image */}
      <div
        className={`relative flex h-[150px] items-center justify-center max-[600px]:h-[115px] ${
          isDark ? "bg-[#0d1410]" : "bg-[#f0f5ee]"
        }`}
      >
        <img
          className="h-full w-full object-contain p-5"
          src={recipe.image}
          alt={recipe.name}
        />

        {/* Favourite Button */}
        <button
          type="button"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-transparent"
          onClick={(event) => {
            event.stopPropagation();
            toggleFavourite(recipe.id);
          }}
        >
          <Heart
            size={20}
            fill={favorite ? "#F44336" : "#D9D9D9"}
            color={favorite ? "#F44336" : "#D9D9D9"}
            strokeWidth={0}
          />
        </button>
      </div>

      {/* Recipe Information */}
      <div className="px-4 pt-3 pb-4 max-[600px]:px-3 max-[600px]:pt-[9px] max-[600px]:pb-3">
        <h3 className="mb-[9px] font-[Georgia,serif] text-[19px] font-bold max-[600px]:text-sm">
          {recipe.name}
        </h3>

        {/* Recipe Metadata */}
        <div
          className={`flex flex-wrap items-center gap-[10px] text-[13px] max-[600px]:gap-2 max-[600px]:text-[11px] ${
            isDark ? "text-white" : "text-[#64766a]"
          }`}
        >
          <span
            className={`rounded-full px-[10px] py-[3px] text-xs font-semibold ${
              vegetarian
                ? "bg-[#e0f0dc] text-[#26803c]"
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
