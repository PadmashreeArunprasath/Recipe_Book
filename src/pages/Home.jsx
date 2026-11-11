
import { useSelector } from "react-redux";

import Hero from "../components/Hero";
import FilterButtons from "../components/FilterButton";
import RecipeList from "../components/RecipeList";
import isVeg from "../utils/isVeg";

import {
  selectRecipesByMealType,
  selectRecipesStatus,
  selectRecipesError,
} from "../features/recipes/recipesSlice";

function Home({
  category,
  setCategory,
  mealType,
  setMealType,
}) {
  // Get data directly from Redux
  
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  // Apply meal type selector
  const mealFilteredRecipes = useSelector((state) =>
    selectRecipesByMealType(state, mealType)
  );

  // Apply category filter
  const filteredRecipes = mealFilteredRecipes.filter((recipe) => {
    if (category === "All") return true;
    if (category === "Veg") return isVeg(recipe);
    if (category === "Non-veg") return !isVeg(recipe);

    return true;
  });

  const loading = status === "idle" || status === "loading";

  return (
    <div className="app">
      {/* Hero and Filters */}
      <div className="relative w-full">
        <Hero />

        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1/2 px-[30px] max-[600px]:px-[10px]">
          <FilterButtons
            category={category}
            setCategory={setCategory}
            mealType={mealType}
            setMealType={setMealType}
          />
        </div>
      </div>

      {/* Recipe Section */}
      <main className="w-full px-[30px] max-[600px]:px-[15px]">
        <h2 className="p-[25px] text-center font-[Georgia,serif] text-[25px] font-bold max-[600px]:mb-3 max-[600px]:text-lg">
          {category === "All" ? "All recipes" : `${category} recipes`}
        </h2>

        {loading ? (
          <p className="px-5 py-10 text-center text-base text-[#777]">
            Loading recipes...
          </p>
        ) : status === "failed" ? (
          <p className="px-5 py-10 text-center text-base text-[#777]">
            Unable to load recipes: {error}
          </p>
        ) : filteredRecipes.length === 0 ? (
          <p className="px-5 py-10 text-center text-base text-[#777]">
            No recipes found. Try another filter!
          </p>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}
      </main>
    </div>
  );
}

export default Home;
