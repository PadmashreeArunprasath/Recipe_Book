
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  function toggleFavourite(id) {
    const recipeId = String(id);

    setFavourites((previous) =>
      previous.some((item) => String(item) === recipeId)
        ? previous.filter((item) => String(item) !== recipeId)
        : [...previous, recipeId]
    );
  }

  function isFavourite(id) {
    return favourites.some(
      (item) => String(item) === String(id)
    );
  }

  const count = favourites.length;

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        count,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error(
      "useFavourites must be used within FavouritesProvider"
    );
  }

  return context;
}
