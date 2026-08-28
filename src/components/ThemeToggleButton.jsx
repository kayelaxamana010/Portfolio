import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggleButton({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-light-bg-secondary dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-soft dark:shadow-none transition-all duration-200 hover:scale-105 ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-light-text" />
      )}
    </button>
  );
}
