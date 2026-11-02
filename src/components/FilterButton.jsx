
function FilterButtons({ category, setCategory }) {
  const categories = ["All", "Veg", "Non-veg"];

  return (
    <div className="filter-buttons">
      {categories.map((item) => (
        <button
          key={item}
          className={`filter-btn ${category.toLowerCase() === item.toLowerCase()
              ? "active"
              : ""
            }`}
          onClick={() =>
            setCategory(
              item === "Non-veg" ? "Non-veg" : item
            )
          }
        >
          {item === "Veg" && <span className="veg-circle"></span>}
          {item === "Non-veg" && <span className="nonveg-circle"></span>}
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
