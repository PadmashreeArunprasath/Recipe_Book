import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  function toggleFavourite(id) {
    setFavourites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function isFavourite(id) {
    return favourites.includes(id);
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