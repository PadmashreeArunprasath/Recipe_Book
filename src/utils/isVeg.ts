
import type { Recipe } from "../types/recipe";

const nonVegKeywords: string[] = [
  "chicken",
  "mutton",
  "fish",
  "egg",
  "beef",
  "pork",
  "shrimp",
];

function isVeg(recipe: Recipe): boolean {
  return !recipe.ingredients.some((ingredient) =>
    nonVegKeywords.some((keyword) =>
      ingredient.toLowerCase().includes(keyword)
    )
  );
}

export default isVeg;
