
import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/recipesSlice";
import favouritesReducer from "../features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favourites: favouritesReducer,
  },
  devTools: true,
});

// Infer RootState and AppDispatch from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "favourites",
    JSON.stringify(state.favourites.ids)
  );
});
