function FilterButtons({
  category,
  setCategory,
  mealType,
  setMealType
}) {
  const meals = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  const vegMode = category === "Veg";

  return (
    <div className="filter-buttons">

      <div className="meal-filters">
        {meals.map((item) => (
          <button
            key={item}
            className={`filter-btn ${(item === "All Meals" && mealType === "All") ||
              mealType === item
              ? "active"
              : ""
              }`}
            onClick={() =>
              setMealType(item === "All Meals" ? "All" : item)
            }
          >
            {item}
          </button>
        ))}
      </div>


      <button
        className={`veg-mode ${vegMode ? "enabled" : ""}`}
        onClick={() => setCategory(vegMode ? "All" : "Veg")}
        aria-label="Toggle Veg Mode"
        aria-pressed={vegMode}
      >
        <span className="toggle-track">
          <span className="toggle-track">
            <span className="toggle-label">VEG</span>
            <span className="toggle-circle"></span>
          </span>
        </span>
      </button>


    </div>
  );
}

export default FilterButtons;
