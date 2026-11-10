import { useTheme } from "../context/ThemeContext";

function FilterButtons({
  category,
  setCategory,
  mealType,
  setMealType,
}) {
  const meals = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  const vegMode = category === "Veg";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative z-10 flex w-full items-center gap-3 pl-0.5 max-[600px]:gap-2">

      {/* Meal Filters */}
      <div className="flex flex-wrap items-center gap-2 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:py-1">

        {meals.map((item) => {
          const isActive =
            (item === "All Meals" && mealType === "All") ||
            mealType === item;

          return (
            <button
              key={item}
              onClick={() =>
                setMealType(item === "All Meals" ? "All" : item)
              }
              className={`flex shrink-0 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium shadow-[0_3px_7px_rgba(0,0,0,0.08)] transition-all duration-200  max-[600px]:px-3 max-[600px]:py-2 max-[600px]:text-xs ${
                isActive
                  ? "border-[#dba612] bg-[#dba612] text-[#172d1e]"
                  : isDark
                    ? "border-[#26332b] bg-[#26332b] text-white"
                    : "border-[#dce8d9] bg-white text-black"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Veg Mode Toggle */}
      <button
        onClick={() => setCategory(vegMode ? "All" : "Veg")}
        aria-label="Toggle Veg Mode"
        aria-pressed={vegMode}
        className="shrink-0"
      >
        <span
          className={`relative flex h-[34px] w-[70px] items-center rounded-full p-[5px] transition-colors duration-300 max-[900px]:h-8 max-[900px]:w-[70px] max-[600px]:w-16 ${
            vegMode ? "bg-[#218038]" : "bg-[#bdbdbd]"
          }`}
        >
          <span
            className={`absolute z-10 h-7 w-7 rounded-full bg-white transition-transform duration-300 max-[900px]:h-[26px] max-[900px]:w-[26px] max-[600px]:h-[26px] max-[600px]:w-[26px] ${
              vegMode
  ? "translate-x-[32px] max-[900px]:translate-x-[26px] max-[600px]:translate-x-[20px]"
  : "translate-x-0"
            }`}
          />

          <span
  className={`absolute text-[10px] font-bold tracking-wider transition-colors max-[600px]:text-[9px] ${
    vegMode
      ? "left-[6px] text-white"
      : "right-[6px] text-[#1f1d1d]"
  }`}
>
  VEG
</span>
        </span>
      </button>
    </div>
  );
}

export default FilterButtons;
