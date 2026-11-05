import RecipeList from "../components/RecipeList";
import "./Favourites.css";

function Favourites({ recipes, favorites, onFavorite }) {
  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <main className="container">
      <h2 className="section-title">My Favourite Recipes</h2>

      {favoriteRecipes.length === 0 ? (
        <p className="empty-message">
          You haven't added any favourite recipes yet!
        </p>
      ) : (
        <RecipeList
          recipes={favoriteRecipes}
          favorites={favorites}
          onFavorite={onFavorite}
        />
      )}
    </main>
  );
}

export default Favourites;
