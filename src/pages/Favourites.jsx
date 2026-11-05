import RecipeList from "../components/RecipeList";
import { useFavourites } from "../context/FavouritesContext";
import "../App.css";

function Favourites({ recipes }) {
  const { favourites } = useFavourites();

  const favoriteRecipes = recipes.filter((recipe) =>
    favourites.includes(recipe.id)
  );

  return (
    <main className="container">
      <h2 className="section-title">My Favourite Recipes</h2>

      {favoriteRecipes.length === 0 ? (
        <p className="empty-message">
          You haven't added any favourite recipes yet!
        </p>
      ) : (
        <RecipeList recipes={favoriteRecipes} />
      )}
    </main>
  );
}

export default Favourites;