import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassFloatingAction - Apple Liquid Glass Speed Dial & Quick Action FAB
 */
export const GlassFloatingAction = ({
  actions = [],
  icon: MainIcon = Plus,
  label,
  position = "bottom-right",
  glow = "cyan",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionStyles = {
    "bottom-right": "fixed bottom-6 right-6 z-40",
    "bottom-left": "fixed bottom-6 left-6 z-40",
    "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
  };

  const glowStyles = {
    blue: "shadow-[0_10px_35px_rgba(0,122,255,0.45)] border-blue-400/40",
    cyan: "shadow-[0_10px_35px_rgba(6,182,212,0.45)] border-cyan-400/40",
    purple: "shadow-[0_10px_35px_rgba(168,85,247,0.45)] border-purple-400/40",
    white: "shadow-[0_10px_35px_rgba(255,255,255,0.25)] border-white/40",
  };

  return (
    <div className={`${positionStyles[position]} ${className}`}>
      {/* Click Outside Dismiss Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Speed Dial Actions Popup List */}
      <div className="relative z-40 flex flex-col items-end gap-3 mb-3">
        <AnimatePresence>
          {isOpen &&
            actions.map((action, idx) => (
              <motion.div
                key={action.id || idx}
                initial={{ opacity: 0, y: 15, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{
                  ...animations.spring.snappy,
                  delay: (actions.length - 1 - idx) * 0.04,
                }}
                className="flex items-center gap-3"
              >
                {action.label && (
                  <span className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-100 bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-lg select-none whitespace-nowrap">
                    {action.label}
                  </span>
                )}

                <button
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  className="p-3 rounded-2xl text-white select-none bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-3xl border border-white/20 hover:border-cyan-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-200 focus:outline-none"
                >
                  {React.isValidElement(action.icon) ? (
                    action.icon
                  ) : (
                    <action.icon className="w-5 h-5 text-cyan-400" />
                  )}
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Main Trigger FAB Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={animations.spring.snappy}
        className={`
          relative z-40 flex items-center justify-center gap-2.5 px-4 h-14 rounded-[22px]
          bg-slate-900/70 backdrop-blur-3xl text-white font-medium select-none
          border transition-colors duration-300 focus:outline-none
          ${glass.specular.bright}
          ${glowStyles[glow]}
          ${label ? "pr-5" : "w-14 px-0"}
        `}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={animations.spring.snappy}
          className="shrink-0"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <MainIcon className="w-6 h-6 text-cyan-400" />}
        </motion.div>

        {label && <span className="text-sm font-semibold tracking-tight">{label}</span>}
      </motion.button>
    </div>
  );
};

export default GlassFloatingAction;