import Hero from "../components/Hero";
import FilterButtons from "../components/FilterButton";
import RecipeList from "../components/RecipeList";
import isVeg from "../utils/isVeg";

function Home({
  category,
  setCategory,
  mealType,
  setMealType,
  recipes,
  loading,
  error,
}) {
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      category === "All" ||
      (category === "Veg" && isVeg(recipe)) ||
      (category === "Non-veg" && !isVeg(recipe));

    const matchesMealType =
      mealType === "All" ||
      recipe.mealType.some(
        (meal) => meal.toLowerCase() === mealType.toLowerCase()
      );

    return matchesCategory && matchesMealType;
  });

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
        ) : error ? (
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
