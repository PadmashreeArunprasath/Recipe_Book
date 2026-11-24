
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

// Define theme types
type Theme = "light" | "dark";

// Define context structure
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create typed context
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  function toggleTheme() {
    setTheme((previous) =>
      previous === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
