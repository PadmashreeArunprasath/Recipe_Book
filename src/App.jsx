
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import AddRecipe from "./pages/AddRecipe";

import { getRecipes } from "./api";
import "./App.css";

function App() {
  const [category, setCategory] = useState("All");
  const [mealType, setMealType] = useState("All");

  // Load custom recipes from localStorage
  const [customRecipes, setCustomRecipes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("customRecipes")) || [];
    } catch {
      return [];
    }
  });

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme } = useTheme();

  // Save custom recipe details whenever they change
  useEffect(() => {
    localStorage.setItem(
      "customRecipes",
      JSON.stringify(customRecipes)
    );
  }, [customRecipes]);

  // Fetch API recipes and combine them with custom recipes
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipes();

        setRecipes([
          ...customRecipes,
          ...data,
        ]);
      } catch (error) {
        setError(error.message);
        setRecipes(customRecipes);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Add a new recipe
  const addRecipe = (newRecipe) => {
    // Keep the uploaded image temporary.
    // Only recipe details are saved in localStorage.
    const savedRecipe = {
      ...newRecipe,
      image: "",
    };

    setCustomRecipes((previous) => [
      savedRecipe,
      ...previous,
    ]);

    setRecipes((previous) => [
      newRecipe,
      ...previous,
    ]);
  };

  return (
    <div className={`app ${theme}`}>
      <Header />

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
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetail recipes={recipes} />}
        />

        <Route
          path="/favourites"
          element={<Favourites recipes={recipes} />}
        />

        <Route
          path="/add"
          element={<AddRecipe onAddRecipe={addRecipe} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
