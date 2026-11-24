
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Load saved favourites from localStorage
const loadFavourites = (): string[] => {
  try {
    const savedFavourites = localStorage.getItem("favourites");

    if (!savedFavourites) return [];

    const parsed: unknown = JSON.parse(savedFavourites);

    return Array.isArray(parsed)
      ? parsed.map(String)
      : [];
  } catch {
    return [];
  }
};

// Define favourites state
interface FavouritesState {
  ids: string[];
}

const initialState: FavouritesState = {
  ids: loadFavourites(),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    toggleFavourite: (
      state,
      action: PayloadAction<number | string>
    ) => {
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
export const selectFavouritesCount = (state: RootState): number =>
  state.favourites.ids.length;

export const selectFavouriteRecipes = (state: RootState) =>
  state.recipes.items.filter((recipe) =>
    state.favourites.ids.includes(String(recipe.id))
  );

export const selectIsFavourite = (
  state: RootState,
  recipeId: number | string
): boolean =>
  state.favourites.ids.includes(String(recipeId));

export default favouritesSlice.reducer;
