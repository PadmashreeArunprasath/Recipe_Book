# Recipe Book

A responsive recipe browsing application built using React.js and Vite. The application allows users to explore recipes, filter them by category, manage their favourite recipes, and view detailed cooking instructions.

## Features

- **Recipe Listing:** Displays recipes in a responsive card layout.
- **Category Filtering:** Filter recipes by All, Veg, and Non-veg categories.
- **Favourite Management:** Add or remove recipes from the favourites list using the heart icon.
- **Live Favourites Count:** Automatically updates the total number of favourite recipes.
- **Show Favourites Only:** View only the recipes marked as favourites.
- **Recipe Details:** View ingredients and preparation steps by selecting a recipe.
- **Recipe Selection:** Select and deselect recipe cards to show or hide their details.
- **Responsive Design:** Optimised for desktop, tablet, and mobile screens.

## Technologies Used

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Lucide React

## Project Structure

    recipe-book/
    ├── public/
    │   └── images/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Hero.jsx
    │   │   ├── FilterButton.jsx
    │   │   ├── RecipeCard.jsx
    │   │   ├── RecipeList.jsx
    │   │   └── RecipeDetails.jsx
    │   ├── data/
    │   │   └── recipes.json
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── README.md

## Installation and Setup

### 1. Clone the Repository

    git clone https://github.com/PadmashreeArunprasath/Recipe-Book-reactUI.git

### 2. Navigate to the Project Directory

    cd Recipe-Book-reactUI

### 3. Install Dependencies

    npm install

### 4. Start the Development Server

    npm run dev

Open the local URL displayed in the terminal to view the application.

## Application Usage

1. Browse the available recipes on the home page.
2. Use the category buttons to filter vegetarian and non-vegetarian recipes.
3. Click the heart icon to add or remove a recipe from favourites.
4. Use the Show Favourites Only button to display favourite recipes.
5. Select a recipe card to view its ingredients and preparation instructions.
6. Select the same card again to deselect it.

## Future Enhancements

- Search recipes by name.
- Add new recipes dynamically.
- Store favourite recipes using local storage.
- Add cooking instructions with preparation images.

## Author

**Padma Shree A**

GitHub: [PadmashreeArunprasath](https://github.com/PadmashreeArunprasath)

---

Developed as a React.js practice project to demonstrate component-based development, state management, event handling, and responsive UI design.
