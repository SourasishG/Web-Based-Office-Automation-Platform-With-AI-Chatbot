import React from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassPanel - Apple Liquid Glass Section Panel / Widget Surface
 * 
 * @param {React.ReactNode} children - Panel body content
 * @param {string | React.ReactNode} title - Panel section title
 * @param {string | React.ReactNode} subtitle - Optional section subtitle
 * @param {React.ReactNode} icon - Optional section header icon
 * @param {React.ReactNode} action - Right-aligned header action (buttons, dropdowns)
 * @param {'default' | 'floating' | 'inset' | 'bordered'} variant - Glass surface depth
 * @param {'none' | 'sm' | 'md' | 'lg' | 'xl'} padding - Body inner padding
 * @param {boolean} specular - Enable top specular highlight line
 * @param {string} className - Extra Tailwind CSS classes for root panel
 * @param {string} headerClassName - Extra classes for header bar
 * @param {string} bodyClassName - Extra classes for body container
 */
export const GlassPanel = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  variant = "default",
  padding = "md",
  specular = true,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  ...props
}) => {
  // Surface depth mapping
  const variantStyles = {
    default: "bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-xl shadow-black/40",
    floating: "bg-slate-900/55 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)]",
    inset: "bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-inner",
    bordered: "bg-slate-900/30 backdrop-blur-xl border-2 border-white/15 shadow-2xl",
  };

  // Inner Padding Mapping
  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={animations.spring.gentle}
      className={`
        relative overflow-hidden rounded-[28px] text-slate-100
        ${variantStyles[variant]}
        ${specular ? glass.specular.subtle : ""}
        ${glass.reflection}
        ${className}
      `}
      {...props}
    >
      {/* Header Bar */}
      {(title || Icon || action) && (
        <div
          className={`
            relative z-10 flex items-center justify-between px-6 pt-6 pb-4
            border-b border-white/10
            ${headerClassName}
          `}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
              </div>
            )}
            <div>
              {title && (
                <h2 className="text-base font-semibold text-white tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Header Actions */}
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
        </div>
      )}

      {/* Panel Body */}
      <div className={`relative z-10 ${paddingStyles[padding]} ${bodyClassName}`}>
        {children}
      </div>
    </motion.section>
  );
};

export default GlassPanel;