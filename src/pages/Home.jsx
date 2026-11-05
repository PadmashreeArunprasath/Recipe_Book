import Hero from "../components/Hero";
import FilterButtons from "../components/FilterButton";
import RecipeList from "../components/RecipeList";
import "./Home.css";
import isVeg from "../utils/isVeg";

function Home({
    category,
    setCategory,
    mealType,
    setMealType,
    recipes,
    favorites,
    onFavorite,
    loading,
    error
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
            <div className="hero-section">
                <Hero />
            </div>
            <div className="sticky-filters">
                <div className="filter-wrapper">
                    <FilterButtons
                        category={category}
                        setCategory={setCategory}
                        mealType={mealType}
                        setMealType={setMealType}
                    />
                    
                </div>
            </div>

            <main className="container">
                <h2 className="section-title">
                    {category === "All" ? "All recipes" : `${category} recipes`}
                </h2>

                {loading ? (
                    <p className="loading-message">Loading recipes...</p>
                ) : error ? (
                    <p className="error-message">
                        Unable to load recipes: {error}
                    </p>
                ) : filteredRecipes.length === 0 ? (
                    <p className="empty-message">
                        No recipes found. Try another filter!
                    </p>
                ) : (
                    <RecipeList
                        recipes={filteredRecipes}
                        favorites={favorites}
                        onFavorite={onFavorite}
                    />
                )}
            </main>
        </div>
    );
}

export default Home;
