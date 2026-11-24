
import type { Dispatch, SetStateAction } from "react";
import { useTheme } from "../context/ThemeContext";

interface FilterButtonsProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  mealType: string;
  setMealType: Dispatch<SetStateAction<string>>;
}

function FilterButtons({
  category,
  setCategory,
  mealType,
  setMealType,
}: FilterButtonsProps) {
  const meals = ["All Meals", "Breakfast", "Lunch", "Dinner"];

  const vegMode = category === "Veg";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative z-10 flex w-full items-center gap-1">

      {/* Meal Filters */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
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
              className={`flex min-w-0 shrink items-center justify-center whitespace-nowrap rounded-full border px-1.5 py-2 text-[11px] font-medium shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-all duration-200 sm:shrink-0 sm:px-5 sm:py-2.5 sm:text-sm ${
  isActive
    ? "border-[#E4AD18] bg-[#E4AD18] text-[#14251D]"
    : isDark
      ? "border-[#385744] bg-[#20372B] text-[#E8F0E9] hover:bg-[#2D4938]"
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
          className={`relative flex h-8 w-[58px] items-center rounded-full p-1 transition-colors duration-300 sm:h-[34px] sm:w-[70px] sm:p-[5px] ${
            vegMode
              ? "bg-[#218038]"
              : isDark
                ? "bg-[#52685A]"
                : "bg-[#bdbdbd]"
          }`}
        >
          <span
            className={`absolute z-10 h-[25px] w-[25px] rounded-full bg-white transition-transform duration-300 sm:h-7 sm:w-7 ${
              vegMode
                ? "translate-x-[26px] sm:translate-x-[32px]"
                : "translate-x-0"
            }`}
          />

          <span
            className={`absolute text-[9px] font-bold tracking-wider sm:text-[10px] ${
              vegMode
                ? "left-[5px] text-white"
                : "right-[5px] text-white"
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
