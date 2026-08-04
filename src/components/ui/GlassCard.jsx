import React from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassCard - Apple Liquid Glass Container
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional Tailwind utility overrides
 * @param {'standard' | 'flat' | 'floating' | 'inset' | 'interactive'} variant - Glass depth style
 * @param {'none' | 'blue' | 'cyan' | 'purple' | 'white'} glow - Ambient glow accent
 * @param {boolean} specular - Enable top edge specular light reflection
 * @param {boolean} hoverable - Enable spring lift & liquid shine interaction
 * @param {function} onClick - Click handler
 */
export const GlassCard = ({
  children,
  className = "",
  variant = "standard",
  glow = "none",
  specular = true,
  hoverable = false,
  onClick,
  ...props
}) => {
  // Variant mapping
  const variantStyle = glass.surface[variant] || glass.surface.standard;

  // Ambient Glow Styling
  const glowStyles = {
    none: "",
    blue: "shadow-[0_0_40px_-8px_rgba(0,122,255,0.3)] border-blue-500/30",
    cyan: "shadow-[0_0_40px_-8px_rgba(6,182,212,0.3)] border-cyan-500/30",
    purple: "shadow-[0_0_40px_-8px_rgba(168,85,247,0.3)] border-purple-500/30",
    white: "shadow-[0_0_35px_-8px_rgba(255,255,255,0.2)] border-white/30",
  };

  // Specular top light edge
  const specularStyle = specular ? glass.specular.subtle : "";

  return (
    <motion.div
      onClick={onClick}
      variants={hoverable || onClick ? animations.cardHover : undefined}
      initial="rest"
      whileHover={hoverable || onClick ? "hover" : undefined}
      whileTap={hoverable || onClick ? "tap" : undefined}
      transition={animations.spring.snappy}
      className={`
        relative overflow-hidden rounded-3xl p-6 text-slate-100
        transition-colors duration-300
        ${variantStyle}
        ${glowStyles[glow]}
        ${specularStyle}
        ${glass.reflection}
        ${onClick ? "cursor-pointer select-none" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Liquid sheen highlight gradient */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Card Content Layer */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;