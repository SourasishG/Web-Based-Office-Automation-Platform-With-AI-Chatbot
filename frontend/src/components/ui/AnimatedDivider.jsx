import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedDivider - Apple Liquid Glass Translucent Divider
 * 
 * @param {string | React.ReactNode} label - Optional centered text/badge pill
 * @param {'subtle' | 'bright' | 'cyan' | 'blue' | 'purple'} variant - Line gradient tone
 * @param {'horizontal' | 'vertical'} orientation - Divider layout orientation
 * @param {boolean} animated - Enable continuous specular light sheen pulse
 * @param {string} className - Additional CSS classes
 */
export const AnimatedDivider = ({
  label,
  variant = "subtle",
  orientation = "horizontal",
  animated = true,
  className = "",
  ...props
}) => {
  // Line Gradient Variants
  const lineGradients = {
    subtle: "via-white/15",
    bright: "via-white/35",
    cyan: "via-cyan-400/50",
    blue: "via-blue-500/50",
    purple: "via-purple-400/50",
  };

  const selectedGradient = lineGradients[variant] || lineGradients.subtle;

  // Vertical Divider
  if (orientation === "vertical") {
    return (
      <div
        className={`relative inline-flex items-center justify-center self-stretch mx-2 ${className}`}
        {...props}
      >
        <div className={`w-[1px] h-full bg-gradient-to-b from-transparent ${selectedGradient} to-transparent`} />
        
        {/* Animated Light Shimmer Sweep */}
        {animated && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[1px] h-12 bg-gradient-to-b from-transparent via-white/80 to-transparent pointer-events-none"
          />
        )}
      </div>
    );
  }

  // Horizontal Divider
  return (
    <div
      className={`relative flex items-center justify-center w-full my-4 select-none ${className}`}
      {...props}
    >
      {/* Left Line */}
      <div className={`flex-1 h-[1px] bg-gradient-to-r from-transparent ${selectedGradient} to-transparent`} />

      {/* Centered Label / Badge */}
      {label && (
        <span className="px-3.5 py-1 mx-2 text-xs font-medium text-slate-300 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-sm shrink-0">
          {label}
        </span>
      )}

      {/* Right Line */}
      <div className={`flex-1 h-[1px] bg-gradient-to-r from-transparent ${selectedGradient} to-transparent`} />

      {/* Animated Light Shimmer Sweep */}
      {animated && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none"
        />
      )}
    </div>
  );
};

export default AnimatedDivider;