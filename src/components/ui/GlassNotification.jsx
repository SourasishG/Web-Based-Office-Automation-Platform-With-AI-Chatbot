import React from "react";
import { motion } from "framer-motion";
import { Info, CheckCircle2, AlertTriangle, XCircle, Sparkles, Calendar, X } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassNotification - Apple Liquid Glass Notification List Card Item
 * 
 * @param {string | React.ReactNode} title - Notification title
 * @param {string | React.ReactNode} message - Detailed notification body message
 * @param {string} timestamp - Relative timestamp (e.g. "2m ago")
 * @param {'info' | 'success' | 'warning' | 'error' | 'ai' | 'meeting'} type - Notification category type
 * @param {boolean} unread - Unread state flag
 * @param {React.ReactNode} avatar - Custom avatar element or avatar image URL
 * @param {React.ReactNode} actions - Action buttons slot (e.g. "Accept", "Decline")
 * @param {function} onClick - Click handler for card
 * @param {function} onDismiss - Dismiss callback handler
 * @param {string} className - Additional CSS classes
 */
export const GlassNotification = ({
  title,
  message,
  timestamp,
  type = "info",
  unread = false,
  avatar,
  actions,
  onClick,
  onDismiss,
  className = "",
  ...props
}) => {
  // Category Icon & Accent Mapping
  const typeConfigs = {
    info: {
      icon: Info,
      color: "text-cyan-400 bg-cyan-500/20 border-cyan-400/30",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    },
    success: {
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-400/30",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/20 border-amber-400/30",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    },
    error: {
      icon: XCircle,
      color: "text-rose-400 bg-rose-500/20 border-rose-400/30",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.25)]",
    },
    ai: {
      icon: Sparkles,
      color: "text-purple-400 bg-purple-500/20 border-purple-400/30",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    },
    meeting: {
      icon: Calendar,
      color: "text-blue-400 bg-blue-500/20 border-blue-400/30",
      glow: "shadow-[0_0_20px_rgba(0,122,255,0.25)]",
    },
  };

  const config = typeConfigs[type] || typeConfigs.info;
  const TypeIcon = config.icon;

  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { scale: 1.01, y: -1 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={animations.spring.snappy}
      className={`
        relative overflow-hidden rounded-2xl p-4 select-none
        bg-slate-900/60 backdrop-blur-2xl border transition-all duration-300 text-slate-100
        ${unread ? "border-cyan-400/40 bg-slate-800/60 shadow-lg" : "border-white/10 hover:border-white/20"}
        ${glass.specular.subtle}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Unread Glowing Dot Accent */}
      {unread && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
      )}

      <div className="flex items-start gap-3.5">
        {/* Left Avatar or Type Icon */}
        <div className="shrink-0 mt-0.5">
          {avatar ? (
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20">
              {typeof avatar === "string" ? (
                <img src={avatar} alt="Notification Avatar" className="w-full h-full object-cover" />
              ) : (
                avatar
              )}
            </div>
          ) : (
            <div className={`p-2 rounded-xl border ${config.color} ${config.glow}`}>
              <TypeIcon className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-semibold text-white truncate">{title}</h4>
            {timestamp && <span className="text-[10px] text-slate-400 shrink-0">{timestamp}</span>}
          </div>

          {message && <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">{message}</p>}

          {/* Action Buttons Slot */}
          {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GlassNotification;