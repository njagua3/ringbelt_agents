import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300 active:scale-90 border",
        "bg-white/10 border-white/20 hover:bg-white/20",
        "dark:bg-brand-gold/10 dark:border-brand-gold/20 dark:hover:bg-brand-gold/20",
        "text-inherit"
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
