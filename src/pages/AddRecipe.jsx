
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function AddRecipe({ onAddRecipe }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    category: "Veg",
    cookingTime: "",
    difficulty: "Easy",
    ingredients: "",
    steps: "",
  });

  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

 

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    switch (name) {
      case "name":
        return trimmedValue ? "" : "Recipe name is required.";

      case "cookingTime":
        if (!trimmedValue) return "Cooking time is required.";
        if (
          !/^\d+$/.test(trimmedValue) ||
          Number(trimmedValue) < 1 ||
          Number(trimmedValue) > 300
        ) {
          return "Enter a cooking time between 1 and 300 minutes.";
        }
        return "";

      case "ingredients":
        return trimmedValue.split("\n").filter((item) => item.trim()).length >= 3
          ? ""
          : "Enter at least 3 ingredients.";

      case "steps":
        return trimmedValue.split("\n").filter((item) => item.trim()).length >= 2
          ? ""
          : "Enter at least 2 preparation steps.";

      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) return;

    setSaving(true);

    const newRecipe = {
      id: Date.now(),
      name: formData.name.trim(),
      ingredients: formData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: formData.steps
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
      prepTimeMinutes: 0,
      cookTimeMinutes: Number(formData.cookingTime),
      difficulty: formData.difficulty,
      cuisine: "Custom",
      mealType: ["Dinner"],
      image: image || "https://cdn.dummyjson.com/recipe-images/1.webp",
      servings: 2,
      isCustom: true,
      isVegetarian: formData.category === "Veg",
    };

    onAddRecipe(newRecipe);
    setSaving(false);
    navigate("/");
  };

  const inputClass = `w-full rounded-lg border px-4 py-3 outline-none text-sm focus:border-amber-500 ${
    theme === "dark"
      ? "border-gray-600 bg-[#26332b] text-white"
      : "border-gray-300 bg-white text-gray-900"
  }`;

  const labelClass = `mb-2 block font-medium ${
    theme === "dark" ? "text-white" : "text-gray-800"
  }`;

  return (
    <main className="mx-auto my-8 w-full max-w-2xl px-4 sm:px-6">
      <h1
        className={`mb-6 text-3xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Add New Recipe
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label className={labelClass}>Recipe Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter recipe name"
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Veg">Veg</option>
            <option value="Non-veg">Non-veg</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            min="1"
            max="300"
            value={formData.cookingTime}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Example: 30"
            className={inputClass}
          />
          {errors.cookingTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.cookingTime}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="5"
            placeholder={"Rice\nOnion\nTomato"}
            className={inputClass}
          />
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ingredients}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Preparation Steps (one per line)
          </label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="6"
            placeholder={"Wash the rice\nAdd water and cook"}
            className={inputClass}
          />

          <p className="mt-1 text-right text-sm text-gray-500">
            {formData.steps.length} characters
          </p>

          {errors.steps && (
            <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className={labelClass}>Recipe Image</label>

          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition hover:border-amber-500 ${
              theme === "dark"
                ? "border-gray-600 text-gray-300"
                : "border-gray-300 text-gray-600"
            }`}
          >
            
            <span className="mt-2 font-medium">
              Click to upload an image
            </span>
            <span className="mt-1 text-xs">
              JPG, PNG or WEBP (Maximum 2 MB)
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {image && (
            <div className="mt-4">
              <p className={labelClass}>Image Preview</p>

              <img
                src={image}
                alt="Recipe preview"
                className="h-52 w-full rounded-lg object-cover"
              />

              <button
                type="button"
                onClick={() => setImage("")}
                className="mt-2 text-sm font-medium text-red-500 hover:underline"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-[#285d3c] px-5 py-3 font-semibold text-white transition hover:bg-[#1f492f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Recipe"}
        </button>
      </form>
    </main>
  );
}

export default AddRecipe;
