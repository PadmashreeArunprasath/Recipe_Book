
import { useState } from "react";
import Hero from "./components/Hero";
import FilterButtons from "./components/FilterButton";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";
import recipes from "./data/recipes.json";

function App() {
  const [category, setCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      category === "All" || recipe.category === category;

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(recipe.id);

    return matchesCategory && matchesFavorites;
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
      <Hero />

      <main className="container">
        <FilterButtons
          category={category}
          setCategory={setCategory}
        />

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

        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onSelect={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
        />

        <RecipeDetails recipe={selectedRecipe} />
      </main>
    </div>
  );
}

export default App;
