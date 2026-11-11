
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import AddRecipe from "./pages/AddRecipe";

import {
  fetchRecipes,
  addRecipe as addRecipeAction,
  selectAllRecipes,
  selectRecipesStatus,
  selectRecipesError,
} from "./features/recipes/recipesSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Redux state
  const recipes = useSelector(selectAllRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  // Local UI state
  const [category, setCategory] = useState("All");
  const [mealType, setMealType] = useState("All");

  const { theme } = useTheme();

  // Fetch recipes through Redux
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  // Add a new recipe through Redux
  const addRecipe = (newRecipe) => {
    dispatch(addRecipeAction(newRecipe));
  };

  const loading = status === "idle" || status === "loading";

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
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetail />}
        />

        <Route
          path="/favourites"
          element={<Favourites />}
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
