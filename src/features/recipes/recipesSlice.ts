
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import isVeg from "../../utils/isVeg";
import { getRecipes } from "../../api";
import type { Recipe } from "../../types/recipe";
import type { RootState } from "../../store/store";



// Async thunk for fetching recipes
export const fetchRecipes = createAsyncThunk<Recipe[]>(
  "recipes/fetchRecipes",
  async () => {
    const data = await getRecipes();
    return data;
  }
);

// Define Redux state
interface RecipesState {
  items: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipesState = {
  items: [],
  status: "idle",
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,

  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";

        const customRecipes = state.items.filter(
          (recipe) => recipe.isCustom
        );

        state.items = [...customRecipes, ...action.payload];
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch recipes";
      });
  },
});

export const { addRecipe } = recipesSlice.actions;

// Selectors
export const selectAllRecipes = (state: RootState) =>
  state.recipes.items;

export const selectRecipesStatus = (state: RootState) =>
  state.recipes.status;

export const selectRecipesError = (state: RootState) =>
  state.recipes.error;

export const selectVegRecipes = (state: RootState) =>
  state.recipes.items.filter(isVeg);

export const selectNonVegRecipes = (state: RootState) =>
  state.recipes.items.filter((recipe) => !isVeg(recipe));

export const selectRecipesByMealType = (
  state: RootState,
  mealType: string
): Recipe[] => {
  if (mealType === "All") {
    return state.recipes.items;
  }

  return state.recipes.items.filter((recipe) =>
    recipe.mealType?.some(
      (type) => type.toLowerCase() === mealType.toLowerCase()
    )
  );
};

export default recipesSlice.reducer;
