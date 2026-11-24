
import { useState, useEffect } from "react";
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
  selectRecipesStatus,
} from "./features/recipes/recipesSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "./hooks/reduxHooks";

import type { Recipe } from "./types/recipe";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  // Redux state
  const status = useAppSelector(selectRecipesStatus);

  // Local UI state
  const [category, setCategory] = useState<string>("All");
  const [mealType, setMealType] = useState<string>("All");

  const { theme } = useTheme();

  // Fetch recipes through Redux
  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  // Add a new recipe through Redux
  const addRecipe = (newRecipe: Recipe): void => {
    dispatch(addRecipeAction(newRecipe));
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
