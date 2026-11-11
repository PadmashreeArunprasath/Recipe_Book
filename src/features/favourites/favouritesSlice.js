
import { createSlice } from "@reduxjs/toolkit";

// Load saved favourites from localStorage
const loadFavourites = () => {
  try {
    const savedFavourites = JSON.parse(
      localStorage.getItem("favourites")
    );

    return Array.isArray(savedFavourites)
      ? savedFavourites.map(String)
      : [];
  } catch {
    return [];
  }
};

const initialState = {
  ids: loadFavourites(),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    toggleFavourite: (state, action) => {
      const recipeId = String(action.payload);

      if (state.ids.includes(recipeId)) {
        state.ids = state.ids.filter(
          (id) => id !== recipeId
        );
      } else {
        state.ids.push(recipeId);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;

// Selectors
export const selectFavouritesCount = (state) =>
  state.favourites.ids.length;

export const selectFavouriteRecipes = (state) =>
  state.recipes.items.filter((recipe) =>
    state.favourites.ids.includes(String(recipe.id))
  );

export const selectIsFavourite = (state, recipeId) =>
  state.favourites.ids.includes(String(recipeId));

export default favouritesSlice.reducer;
 