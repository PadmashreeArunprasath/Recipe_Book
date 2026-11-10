
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  return (
    <>
      {recipes.length === 0 ? (
        <p className="col-span-full px-5 py-10 text-center text-base text-[#777] max-[600px]:text-[10px]">
          No favourite recipes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-[14px] min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 min-[601px]:gap-5">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RecipeList;
