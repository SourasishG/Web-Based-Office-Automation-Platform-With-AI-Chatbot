import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { glass } from "../../theme/glass";

/**
 * GlassSearchBar - Apple Raycast / Spotlight Style Search Control
 * 
 * @param {string} value - Controlled search text value
 * @param {function} onChange - Input change callback (value) => void
 * @param {function} onSearch - Submit callback (e.g. on Enter key)
 * @param {string} placeholder - Placeholder text
 * @param {string} shortcutKey - Shortcut tag text (e.g. "⌘K" or "Ctrl+K")
 * @param {boolean} isLoading - Async search loading state
 * @param {boolean} autoFocus - Auto focus on mount
 * @param {string} className - Additional CSS classes
 */
export const GlassSearchBar = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search projects, tasks, employees...",
  shortcutKey = "⌘K",
  isLoading = false,
  autoFocus = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Global Keyboard Shortcut Listener (e.g. Cmd+K / Ctrl+K focus)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    if (onChange) onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <motion.div
      animate={{ scale: isFocused ? 1.008 : 1 }}
      transition={{ duration: 0.15 }}
      className={`
        relative flex items-center w-full h-11 px-4 rounded-2xl overflow-hidden select-none
        bg-slate-950/50 backdrop-blur-3xl border transition-all duration-300
        ${glass.specular.subtle}
        ${
          isFocused
            ? "border-cyan-400/60 shadow-[0_0_25px_-5px_rgba(6,182,212,0.35)] bg-slate-900/60"
            : "border-white/10 hover:border-white/20 shadow-inner"
        }
        ${className}
      `}
    >
      {/* Search Icon or Spinner */}
      <div className="shrink-0 mr-3 text-slate-400">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
        ) : (
          <Search className={`w-4 h-4 transition-colors ${isFocused ? "text-cyan-400" : "text-slate-400"}`} />
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none border-none selection:bg-cyan-500/30 selection:text-white"
        {...props}
      />

      {/* Clear Button or Shortcut Key Pill */}
      <div className="shrink-0 ml-2 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors focus:outline-none"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : shortcutKey ? (
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white/5 rounded-md border border-white/10">
            {shortcutKey}
          </kbd>
        ) : null}
      </div>
    </motion.div>
  );
};

export default GlassSearchBar;