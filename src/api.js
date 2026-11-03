const API_URL = "https://dummyjson.com/recipes";

export async function getRecipes() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();

  return data.recipes;
}
