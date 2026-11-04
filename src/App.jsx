import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import { getRecipes } from "./api";
import "./App.css";

function App() {
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [mealType, setMealType] = useState("All");

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="app">
      <Header favoritesCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              category={category}
              setCategory={setCategory}
              mealType={mealType}
              setMealType={setMealType}
              recipes={recipes}
              favorites={favorites}
              onFavorite={toggleFavorite}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetail />}
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              recipes={recipes}
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
