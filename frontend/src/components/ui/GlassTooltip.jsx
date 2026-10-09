import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassTooltip - Apple Liquid Glass Floating Tooltip
 * 
 * @param {string | React.ReactNode} content - Tooltip label text/content
 * @param {React.ReactNode} children - Trigger element
 * @param {'top' | 'bottom' | 'left' | 'right'} position - Tooltip alignment
 * @param {number} delay - Show delay in milliseconds
 * @param {string} className - Additional CSS for tooltip bubble
 */
export const GlassTooltip = ({
  content,
  children,
  position = "top",
  delay = 150,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Position Presets
  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  };

  // Motion origin points for spring scaling
  const motionOrigins = {
    top: { opacity: 0, scale: 0.9, y: 5 },
    bottom: { opacity: 0, scale: 0.9, y: -5 },
    left: { opacity: 0, scale: 0.9, x: 5 },
    right: { opacity: 0, scale: 0.9, x: -5 },
  };

  if (!content) return <>{children}</>;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {/* Trigger Target */}
      {children}

      {/* Floating Tooltip Bubble */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={motionOrigins[position]}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={motionOrigins[position]}
            transition={animations.spring.snappy}
            className={`
              absolute z-50 pointer-events-none whitespace-nowrap px-3 py-1.5
              text-xs font-medium text-slate-100 rounded-xl select-none
              bg-slate-900/85 backdrop-blur-2xl border border-white/20
              shadow-[0_10px_25px_rgba(0,0,0,0.6)]
              ${glass.specular.subtle}
              ${positionStyles[position]}
              ${className}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlassTooltip;