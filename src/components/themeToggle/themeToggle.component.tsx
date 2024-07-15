"use client";

import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");
  return <button onClick={handleToggleTheme}>THEME</button>;
};
