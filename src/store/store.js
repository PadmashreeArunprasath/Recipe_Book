
import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/recipesSlice";
import favouritesReducer from "../features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favourites: favouritesReducer,
  },
});

// Persist favourites whenever the Redux store changes

store.subscribe(() => {
  const state = store.getState();

  // Save favourites
  localStorage.setItem(
    "favourites",
    JSON.stringify(state.favourites.ids)
  );

  // Save custom recipes without temporary image URLs
  const customRecipes = state.recipes.items
    .filter((recipe) => recipe.isCustom)
    .map((recipe) => ({
      ...recipe,
      image: "",
    }));

  localStorage.setItem(
    "customRecipes",
    JSON.stringify(customRecipes)
  );
});


