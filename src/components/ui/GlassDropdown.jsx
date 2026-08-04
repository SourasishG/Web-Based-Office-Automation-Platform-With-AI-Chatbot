import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassDropdown - Apple Liquid Glass Action & Context Menu
 * 
 * @param {React.ReactNode} trigger - Trigger button element
 * @param {Array<{ id?: string, label: string, icon?: React.ReactNode, onClick?: () => void, danger?: boolean, disabled?: boolean, shortcut?: string, divider?: boolean }>} items - Menu items array
 * @param {'left' | 'right'} align - Alignment anchor relative to trigger
 * @param {string} width - Tailind width override (e.g. "w-56")
 * @param {string} className - Extra CSS classes for dropdown container
 */
export const GlassDropdown = ({
  trigger,
  items = [],
  align = "right",
  width = "w-56",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside dropdown container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Alignment Presets
  const alignStyles = {
    left: "left-0 origin-top-left",
    right: "right-0 origin-top-right",
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      {/* Trigger Slot */}
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </div>

      {/* Floating Glass Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={animations.spring.snappy}
            className={`
              absolute z-50 mt-2 py-2 rounded-2xl overflow-hidden text-slate-100
              bg-slate-900/80 backdrop-blur-3xl border border-white/15
              shadow-[0_20px_50px_rgba(0,0,0,0.7)]
              ${glass.specular.subtle}
              ${alignStyles[align]}
              ${width}
              ${className}
            `}
          >
            {items.map((item, idx) => {
              if (item.divider) {
                return <div key={`divider-${idx}`} className="my-1.5 h-[1px] bg-white/10" />;
              }

              const Icon = item.icon;

              return (
                <button
                  key={item.id || idx}
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled && item.onClick) {
                      item.onClick();
                      setIsOpen(false);
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium
                    transition-all duration-150 cursor-pointer
                    ${
                      item.disabled
                        ? "opacity-40 cursor-not-allowed"
                        : item.danger
                        ? "text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {Icon && (
                      <span className="shrink-0 text-current">
                        {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Optional Shortcut Tag (e.g. ⌘E) */}
                  {item.shortcut && (
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/10">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlassDropdown;