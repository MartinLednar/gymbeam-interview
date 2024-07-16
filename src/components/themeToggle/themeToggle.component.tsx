"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={handleToggleTheme}
      className="px-2.5 py-2.5 rounded-md border-2 border-gray-600/50 bg-transparent"
      suppressHydrationWarning
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};
