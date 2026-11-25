
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
    <div className="relative z-10 flex w-fit min-w-0 items-center gap-3 pl-0.5 max-[600px]:w-full max-[600px]:gap-1.5 min-[350px]:max-[400px]:gap-1">

      {/* Meal Filters */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 max-[600px]:flex-nowrap max-[600px]:gap-1 min-[350px]:max-[400px]:gap-[3px]">
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
              className={`flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium shadow-[0_3px_7px_rgba(0,0,0,0.08)] transition-all duration-200
                max-[600px]:px-2 max-[600px]:py-1.5 max-[600px]:text-[10px]
             
          
                min-[350px]:max-[450px]:px-[7px]
                min-[350px]:max-[450px]:py-1.5
                min-[350px]:max-[450px]:!text-[12px]
                ${isActive
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
          className={`relative flex h-[34px] w-[70px] shrink-0 items-center rounded-full p-[5px] transition-colors duration-300
    max-[900px]:h-8 max-[900px]:w-[70px]
    max-[600px]:w-14 max-[600px]:h-7 max-[600px]:p-[3px]
    min-[350px]:max-[450px]:!w-12
    min-[350px]:max-[450px]:!h-7
    min-[350px]:max-[450px]:!p-[2px]
    ${vegMode
              ? "bg-[#218038]"
              : isDark
                ? "bg-[#52685A]"
                : "bg-[#bdbdbd]"
            }`}
        >
          {/* Slider Knob */}
          <span
            className={`absolute z-10 h-7 w-7 rounded-full bg-white transition-transform duration-300
      max-[900px]:h-[26px] max-[900px]:w-[26px]
      max-[600px]:h-[22px] max-[600px]:w-[22px]
      max-[380px]:h-5 max-[380px]:w-5
      min-[350px]:max-[450px]:!h-5
      min-[350px]:max-[450px]:!w-5
      ${vegMode
                ? "translate-x-[32px] max-[900px]:translate-x-[26px] max-[600px]:translate-x-[26px] max-[380px]:translate-x-[14px] min-[350px]:max-[450px]:!translate-x-[22px]"
                : "max-[900px]:translate-x-0 min-[350px]:max-[450px]:translate-x-0.5"
              }`}
          />

          {/* VEG Label */}
          <span
            className={`absolute text-[10px] font-bold tracking-wider text-white transition-colors
      max-[600px]:text-[8px]
      max-[380px]:text-[7px]
      min-[350px]:max-[450px]:!text-[8px]
      ${vegMode
                ? "left-[6px] max-[600px]:left-[4px] max-[380px]:left-[3px] min-[350px]:max-[450px]:!left-[5px]"
                : "right-[8px] max-[600px]:right-[4px] max-[380px]:right-[3px] min-[350px]:max-[450px]:!right-[5px]"
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
