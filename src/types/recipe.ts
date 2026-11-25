
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  mealType: string[];
  image: string;
  servings: number;

  // Optional fields
  isCustom?: boolean;
  isVegetarian?: boolean;

  // API recipe fields
  rating?: number;
  reviewCount?: number;
  caloriesPerServing?: number;
  userId?: number;
  tags?: string[];
}
