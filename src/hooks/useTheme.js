import { useCallback, useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from "../utils/theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getInitialTheme());

  useEffect(() => {
    const dark = getInitialTheme();
    applyTheme(dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}
