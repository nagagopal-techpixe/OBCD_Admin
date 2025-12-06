// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// 1️⃣ Create context
const ThemeContext = createContext();

// 2️⃣ Create provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // 3️⃣ Apply theme to <html> for Tailwind dark mode
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // 4️⃣ Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  console.log(theme);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5️⃣ Custom hook for easy usage
export const useTheme = () => useContext(ThemeContext);
