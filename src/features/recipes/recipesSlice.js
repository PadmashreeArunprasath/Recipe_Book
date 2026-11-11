import isVeg from "../../utils/isVeg";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes } from "../../api";

// Restore custom recipes after refresh
const loadCustomRecipes = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("customRecipes"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const data = await getRecipes();
    return data;
  }
);

const initialState = {
  items: loadCustomRecipes(),
  status: "idle",
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,

  reducers: {
    addRecipe: (state, action) => {
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
        state.error = action.error.message;
      });
  },
});

export const { addRecipe } = recipesSlice.actions;

export const selectAllRecipes = (state) => state.recipes.items;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;

export const selectVegRecipes = (state) =>
  state.recipes.items.filter(isVeg);

export const selectNonVegRecipes = (state) =>
  state.recipes.items.filter((recipe) => !isVeg(recipe));

export default recipesSlice.reducer;

export const selectRecipesByMealType = (state, mealType) => {
  if (mealType === "All") {
    return state.recipes.items;
  }

  return state.recipes.items.filter((recipe) =>
    recipe.mealType?.some(
      (type) => type.toLowerCase() === mealType.toLowerCase()
    )
  );
};