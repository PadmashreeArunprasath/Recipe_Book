
function RecipeDetails({ recipe }) {
  if (!recipe) {
    return <p className="no-recipes">Select a recipe to view its details.</p>;
  }

  return (
    <section className="recipe-details">
      <div className="detail-image">
        <img className="food-image" src={recipe.image} alt={recipe.name} />
      </div>

      <div className="detail-content">
        <h2 style={{ textAlign: 'left' }}>{recipe.name}</h2>

        <div className="detail-columns">
          <div>
            <h4>Ingredients</h4>

            <ul>
              {recipe.ingredients.map((item, index) => (
                <li style={{ textAlign: 'left' }} key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Steps</h4>

            <ol>
              {recipe.steps.map((step, index) => (
                <li style={{ textAlign: 'left' }} key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
