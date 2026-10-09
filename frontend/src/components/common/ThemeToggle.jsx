import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = ({ showLabel = false, className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
      className={`
        relative flex items-center gap-2.5 rounded-2xl p-2.5
        border border-white/10 dark:border-white/10 light:border-slate-300
        bg-white/10 dark:bg-white/10 light:bg-slate-200/60
        hover:bg-cyan-500/20 hover:border-cyan-500/40
        text-slate-200 light:text-slate-700 hover:text-cyan-400
        backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer
        ${className}
      `}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 1.1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={20} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        ) : (
          <Sun size={20} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
        )}
      </motion.div>

      {showLabel && (
        <span className="text-sm font-medium tracking-wide">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
