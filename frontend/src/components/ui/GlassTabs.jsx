import React from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassTabs - Apple Liquid Glass Segmented Control & Tab Switcher
 * 
 * @param {Array<{ id: string, label: string, icon?: React.ReactNode, badge?: string|number, disabled?: boolean }>} tabs - Tab items array
 * @param {string} activeTab - Currently active tab ID
 * @param {function} onChange - Tab change handler callback (tabId) => void
 * @param {'sm' | 'md' | 'lg'} size - Component size preset
 * @param {boolean} fullWidth - Equal width stretching for tab buttons
 * @param {string} className - Extra CSS classes for container
 */
export const GlassTabs = ({
  tabs = [],
  activeTab,
  onChange,
  size = "md",
  fullWidth = false,
  className = "",
}) => {
  // Unique layoutId for smooth gliding active tab pill across instances
  const layoutId = React.useId();

  // Size Presets
  const sizeStyles = {
    sm: "h-9 text-xs px-3 rounded-xl gap-1.5",
    md: "h-11 text-sm px-4 rounded-2xl gap-2",
    lg: "h-13 text-base px-5 rounded-2xl gap-2.5",
  };

  return (
    <div
      className={`
        inline-flex items-center p-1.5 select-none rounded-[22px]
        bg-slate-950/60 backdrop-blur-2xl border border-white/10 shadow-inner
        ${glass.specular.subtle}
        ${fullWidth ? "w-full flex" : ""}
        ${className}
      `}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={`
              relative flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none
              ${sizeStyles[size]}
              ${fullWidth ? "flex-1" : ""}
              ${
                tab.disabled
                  ? "opacity-40 cursor-not-allowed text-slate-500"
                  : isActive
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }
            `}
          >
            {/* Gliding Active Liquid Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId={`glassTabsPill-${layoutId}`}
                transition={animations.spring.snappy}
                className="absolute inset-0 rounded-[18px] bg-slate-900/90 backdrop-blur-3xl border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              />
            )}

            {/* Icon */}
            {Icon && (
              <span className={`relative z-10 shrink-0 ${isActive ? "text-cyan-400" : ""}`}>
                {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
              </span>
            )}

            {/* Label */}
            <span className="relative z-10 truncate">{tab.label}</span>

            {/* Badge */}
            {tab.badge !== undefined && (
              <span
                className={`
                  relative z-10 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors
                  ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }
                `}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GlassTabs;