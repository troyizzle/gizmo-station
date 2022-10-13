import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const AVAILABLE_THEMES = ["lofi.gif", "moon.jpg"];

const ThemeContext = createContext({} as ThemeContextType);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<string>("theme", "lofi.gif");
  useEffect(() => {
    const html = document.documentElement;
    html.style.background = `url(${theme}) no-repeat center center fixed`
    html.style.backgroundSize = "cover";
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
