
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails";
import { useTheme } from "../context/ThemeContext";

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const { theme } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError(null);

        // First, check whether the recipe exists in local state
        const localRecipe = recipes.find(
          (item) => String(item.id) === id
        );

        if (localRecipe) {
          setRecipe(localRecipe);
          return;
        }

        // If not found locally, fetch from DummyJSON
        const response = await fetch(
          `https://dummyjson.com/recipes/${id}`
        );

        if (!response.ok) {
          throw new Error("Recipe not found");
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id, recipes]);

  const messageStyles = `flex min-h-[60vh] items-center justify-center px-5 text-center text-base ${
    theme === "dark"
      ? "bg-[#202923] text-white"
      : "bg-white text-[#555]"
  }`;

  if (loading) {
    return <p className={messageStyles}>Loading recipe...</p>;
  }

  if (error) {
    return <p className={messageStyles}>{error}</p>;
  }

  if (!recipe) {
    return <p className={messageStyles}>Recipe not found.</p>;
  }

  return <RecipeDetails recipe={recipe} />;
}

export default RecipeDetail;
