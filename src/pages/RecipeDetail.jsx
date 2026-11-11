
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import RecipeDetails from "../components/RecipeDetails";
import { useTheme } from "../context/ThemeContext";

import {
  selectAllRecipes,
  selectRecipesStatus,
} from "../features/recipes/recipesSlice";

function RecipeDetail() {
  const { id } = useParams();
  const { theme } = useTheme();

  const recipes = useSelector(selectAllRecipes);
  const status = useSelector(selectRecipesStatus);

  const recipe = recipes.find(
    (item) => String(item.id) === id
  );

  const messageStyles = `flex min-h-[60vh] items-center justify-center px-5 text-center text-base ${
    theme === "dark"
      ? "bg-[#202923] text-white"
      : "bg-white text-[#555]"
  }`;

  if (status === "idle" || status === "loading") {
    return <p className={messageStyles}>Loading recipe...</p>;
  }

  if (status === "failed") {
    return (
      <p className={messageStyles}>
        Unable to load recipe. Please try again.
      </p>
    );
  }

  if (!recipe) {
    return <p className={messageStyles}>Recipe not found.</p>;
  }

  return <RecipeDetails recipe={recipe} />;
}

export default RecipeDetail;
