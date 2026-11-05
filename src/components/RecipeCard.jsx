import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import isVeg from "../utils/isVeg";
import "./RecipeCard.css";

function RecipeCard({
  recipe,
  favorite,
  onFavorite,
  onSelect,
  selected
}) {
  const vegetarian = isVeg(recipe);
  const navigate = useNavigate();
  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <article
      className={`recipe-card ${selected ? "selected" : ""}`}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <div className="recipe-image">
        <div className="image">
        <img
          className="food-image"
          src={recipe.image}
          alt={recipe.name}
        />
        </div>

        <button
          className="heart-btn"
          onClick={(event) => {
            event.stopPropagation();
            onFavorite(recipe.id);
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

      <div className="recipe-info">
        <h3>{recipe.name}</h3>

        <div className="recipe-meta">
          <span className={vegetarian ? "tag veg" : "tag non-veg"}>
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
