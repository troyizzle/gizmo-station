import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const AVAILABLE_THEMES = ["lofi", "moon"];

const ThemeContext = createContext({} as ThemeContextType);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<string>("theme", "lofi");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div
      id="theme"
      style={{
        backgroundImage: `url(/${theme}.jpg)`,
        backgroundSize: "cover",
        height: "100vh"
      }}
      >{children}</div>
    </ThemeContext.Provider>
  );
}
