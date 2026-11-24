
import type { Recipe } from "./types/recipe";

interface RecipesApiResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getRecipes(): Promise<Recipe[]> {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data: RecipesApiResponse = await response.json();

  return data.recipes;
}
