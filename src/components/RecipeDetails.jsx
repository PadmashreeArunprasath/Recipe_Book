import { Heart } from "lucide-react";
import { useFavourites } from "../context/FavouritesContext";
import "./RecipeDetails.css";

function RecipeDetails({ recipe }) {
  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const { isFavourite, toggleFavourite } = useFavourites();

  const favorite = isFavourite(recipe.id);

  return (
    <section className="recipe-details">
      <img
        className="food-image"
        src={recipe.image}
        alt={recipe.name}
      />

      <div className="detail-content">
        <div className="detail-title">
          <h2>{recipe.name}</h2>

          <button
            className="heart-btn"
            onClick={() => toggleFavourite(recipe.id)}
            aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              size={24}
              fill={favorite ? "#F44336" : "none"}
              color={favorite ? "#F44336" : "#999"}
            />
          </button>
        </div>

        <div className="detail-meta">
          <span>Prep: {recipe.prepTimeMinutes} min</span>
          <span>Cook: {recipe.cookTimeMinutes} min</span>
          <span>Total: {totalTime} min</span>
          <span>{recipe.difficulty}</span>
        </div>

        <div className="detail-columns">
          <div>
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Preparation Steps</h4>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;