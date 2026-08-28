import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const DarkModeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-12 h-12 rounded-full 
                       bg-white/80 dark:bg-dark-bg-secondary/80 
                       backdrop-blur-sm border border-gray-200 dark:border-gray-700
                       shadow-soft dark:shadow-dark-soft
                       hover:scale-110 hover:shadow-soft-lg dark:hover:shadow-dark-soft-lg
                       transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            aria-label="Toggle dark mode"
        >
            <div className="relative w-6 h-6">
                <Sun
                    className={`absolute inset-0 w-6 h-6 text-amber-500 
                               transition-all duration-300 ease-in-out
                               ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                />
                <Moon
                    className={`absolute inset-0 w-6 h-6 text-indigo-400 
                               transition-all duration-300 ease-in-out
                               ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}
                />
            </div>
        </button>
    );
};

export default DarkModeToggle;
