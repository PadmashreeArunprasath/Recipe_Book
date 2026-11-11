
import { useSelector } from "react-redux";
import RecipeList from "../components/RecipeList";
import { selectFavouriteRecipes } from "../features/favourites/favouritesSlice";
import { useTheme } from "../context/ThemeContext";

function Favourites() {
  const favoriteRecipes = useSelector(selectFavouriteRecipes);
  const { theme } = useTheme();

  return (
    <main className="w-full px-[30px] max-[600px]:px-[15px]">
      <h2
        className={`p-[25px] font-[Georgia,serif] text-[25px] font-bold max-[600px]:mb-3 max-[600px]:text-lg ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        My Favourite Recipes
      </h2>

      {favoriteRecipes.length === 0 ? (
        <p className="col-span-full px-5 py-10 text-center text-base text-[#777]">
          You haven't added any favourite recipes yet!
        </p>
      ) : (
        <RecipeList recipes={favoriteRecipes} />
      )}
    </main>
  );
}

export default Favourites;
