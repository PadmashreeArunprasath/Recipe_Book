import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError(null);

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
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return <RecipeDetails recipe={recipe} />;
}

export default RecipeDetail;
