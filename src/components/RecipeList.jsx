
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

function RecipeList({
  recipes,
  favorites,
  onFavorite,
  onSelect,
  selectedRecipe
}) {
  return (
    <>
      {recipes.length === 0 ? (
        <p className="no-recipes">
          No favourite recipes found.
        </p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favorite={favorites.includes(recipe.id)}
              onFavorite={onFavorite}
              onSelect={onSelect}
              selected={selectedRecipe?.id === recipe.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RecipeList;
