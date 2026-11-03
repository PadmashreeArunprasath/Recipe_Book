
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import FilterButtons from "./components/FilterButton";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import { getRecipes } from "./api";
import isVeg from "./utils/isVeg";
import "./App.css";


function App() {
  const [category, setCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mealType, setMealType] = useState("All");

  // API states
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes when App loads
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      category === "All" ||
      (category === "Veg" && isVeg(recipe)) ||
      (category === "Non-veg" && !isVeg(recipe));

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(recipe.id);

    const matchesMealType =
      mealType === "All" ||
      recipe.mealType.some(
        (meal) => meal.toLowerCase() === mealType.toLowerCase()
      );

    return matchesCategory && matchesFavorites && matchesMealType;
  });

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="app">
      <div className="hero-section">
        <Hero />

        <div className="filter-wrapper">
          <FilterButtons
            category={category}
            setCategory={setCategory}
            mealType={mealType}
            setMealType={setMealType}
          />
        </div>
      </div>

      <main className="container">
        <div className="favorites-section">
          <p>Favorites: {favorites.length}</p>

          <button
            className="favorites-filter-btn"
            onClick={() =>
              setShowFavoritesOnly(!showFavoritesOnly)
            }
          >
            {showFavoritesOnly
              ? "Show All Recipes"
              : "Show Favorites Only"}
          </button>
        </div>

        <h2 className="section-title">
          {showFavoritesOnly
            ? "Favorite recipes"
            : category === "All"
              ? "All recipes"
              : `${category} recipes`}
        </h2>

        {loading ? (
          <p className="loading-message">Loading recipes...</p>
        ) : error ? (
          <p className="error-message">
            Unable to load recipes: {error}
          </p>
        ) : filteredRecipes.length === 0 ? (
          <p className="empty-message">
            No recipes found. Try another filter!
          </p>
        ) : (
          <RecipeList
            recipes={filteredRecipes}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onSelect={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
          />
        )}

       
      </main>
      {selectedRecipe && (
  <div
    className="recipe-modal-overlay"
    onClick={() => setSelectedRecipe(null)}
  >
    <div
      className="recipe-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedRecipe(null)}
      >
        &times;
      </button>

      <RecipeDetails recipe={selectedRecipe} />
    </div>
  </div>
)}
    </div>
  );
}

export default App;
