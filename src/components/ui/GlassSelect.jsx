import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassSelect - Apple Liquid Glass Custom Select Picker
 * 
 * @param {string} label - Select label text
 * @param {Array<{ value: string|number, label: string, icon?: React.ReactNode, description?: string, disabled?: boolean }>} options - Options list
 * @param {string | number} value - Controlled active value
 * @param {function} onChange - Selection callback (value) => void
 * @param {string} placeholder - Placeholder text when unselected
 * @param {string} error - Error message text
 * @param {string} helperText - Optional helper text below
 * @param {React.ReactNode} icon - Optional left icon on trigger
 * @param {boolean} searchable - Enable option search filtering
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS for trigger button
 * @param {string} containerClassName - Additional CSS for container wrapper
 */
export const GlassSelect = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  error,
  helperText,
  icon: Icon,
  searchable = false,
  isDisabled = false,
  className = "",
  containerClassName = "",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const selectId = id || (label ? `glass-select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options if searchable
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={containerRef} className={`w-full flex flex-col gap-1.5 relative ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium text-slate-300 tracking-wide ml-1"
        >
          {label}
        </label>
      )}

      {/* Select Trigger Pill */}
      <button
        id={selectId}
        type="button"
        disabled={isDisabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          relative flex items-center justify-between w-full h-11 px-4 rounded-2xl
          bg-slate-950/40 backdrop-blur-2xl border transition-all duration-300 text-left select-none
          ${glass.specular.subtle}
          ${
            error
              ? "border-rose-500/60 shadow-[0_0_20px_-3px_rgba(244,63,94,0.3)]"
              : isOpen
              ? "border-cyan-400/60 shadow-[0_0_25px_-5px_rgba(6,182,212,0.35)] bg-slate-900/50"
              : "border-white/10 hover:border-white/20 shadow-inner"
          }
          ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
          ${className}
        `}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          {Icon && (
            <span className="text-slate-400 shrink-0">
              {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
            </span>
          )}

          {selectedOption ? (
            <div className="flex items-center gap-2 truncate">
              {selectedOption.icon && (
                <span className="shrink-0 text-cyan-400">
                  {React.isValidElement(selectedOption.icon) ? (
                    selectedOption.icon
                  ) : (
                    <selectedOption.icon className="w-4 h-4" />
                  )}
                </span>
              )}
              <span className="text-sm text-slate-100 truncate">{selectedOption.label}</span>
            </div>
          ) : (
            <span className="text-sm text-slate-500 truncate">{placeholder}</span>
          )}
        </div>

        {/* Chevron Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={animations.spring.snappy}
          className="text-slate-400 shrink-0 ml-1"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Options Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={animations.spring.snappy}
            className={`
              absolute top-full left-0 right-0 z-50 mt-2 p-1.5 rounded-2xl overflow-hidden
              bg-slate-900/85 backdrop-blur-3xl border border-white/15
              shadow-[0_20px_50px_rgba(0,0,0,0.75)] text-slate-100 max-h-60 overflow-y-auto
              ${glass.specular.subtle}
            `}
          >
            {/* Search Input Filter */}
            {searchable && (
              <div className="p-1.5 mb-1 border-b border-white/10 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-10">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search options..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                const OptionIcon = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-left
                      transition-colors duration-150 cursor-pointer my-0.5
                      ${
                        option.disabled
                          ? "opacity-40 cursor-not-allowed"
                          : isSelected
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {OptionIcon && (
                        <span className={`shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-400"}`}>
                          {React.isValidElement(OptionIcon) ? OptionIcon : <OptionIcon className="w-4 h-4" />}
                        </span>
                      )}
                      <div className="truncate">
                        <div className="truncate font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-[10px] text-slate-400 truncate">{option.description}</div>
                        )}
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-xs text-center text-slate-500">
                No matching options
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error or Helper Text */}
      {error ? (
        <span className="text-xs text-rose-400 font-medium ml-1 animate-fadeIn">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 font-normal ml-1">{helperText}</span>
      ) : null}
    </div>
  );
};

export default GlassSelect;