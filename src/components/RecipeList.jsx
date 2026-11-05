import RecipeCard from "./RecipeCard";
import "./RecipeList.css";
function RecipeList({ recipes }) {
  return (
    <>
      {recipes.length === 0 ? (
        <p className="no-recipes">No favourite recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RecipeList;