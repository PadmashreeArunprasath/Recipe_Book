const nonVegKeywords = [
  "chicken",
  "mutton",
  "fish",
  "egg",
  "beef",
  "pork",
  "shrimp",
];

function isVeg(recipe) {
  return !recipe.ingredients.some((ingredient) =>
    nonVegKeywords.some((keyword) =>
      ingredient.toLowerCase().includes(keyword)
    )
  );
}

export default isVeg;