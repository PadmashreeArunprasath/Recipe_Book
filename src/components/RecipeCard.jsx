import { Heart } from "lucide-react";
function RecipeCard({
  recipe,
  favorite,
  onFavorite,
  onSelect,
  selected
}) {
  return (
    <article
      className={`recipe-card ${selected ? "selected" : ""}`}
      onClick={() =>
        onSelect(selected ? null : recipe)
      }
    >
      <div className="recipe-image">
        <img className="food-image" src={recipe.image} alt={recipe.name} />

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
          <span
            className={
              recipe.category === "Veg"
                ? "tag veg"
                : "tag non-veg"
            }
          >
            {recipe.category}
          </span>

          <span>◷ {recipe.time} min</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
