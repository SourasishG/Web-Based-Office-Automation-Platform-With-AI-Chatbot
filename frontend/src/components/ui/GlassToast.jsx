import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, Sparkles, X } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassToast - Apple VisionOS / iOS Dynamic Island Floating Alert Banner
 * 
 * @param {string | React.ReactNode} title - Toast alert title
 * @param {string | React.ReactNode} message - Optional body message
 * @param {'success' | 'error' | 'warning' | 'info' | 'ai'} type - Alert status type
 * @param {number} duration - Auto dismiss timeout in milliseconds (0 = manual close)
 * @param {boolean} isVisible - Toast visibility state
 * @param {function} onClose - Close / dismiss callback handler
 * @param {React.ReactNode} action - Optional action button (e.g. "Undo")
 * @param {'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'} position - Floating screen position
 * @param {string} className - Additional CSS classes
 */
export const GlassToast = ({
  title,
  message,
  type = "info",
  duration = 4000,
  isVisible = true,
  onClose,
  action,
  position = "top-right",
  className = "",
}) => {
  // Auto Dismiss Timer
  useEffect(() => {
    if (duration > 0 && isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, onClose]);

  // Position Presets
  const positionStyles = {
    "top-right": "fixed top-5 right-5 z-50",
    "top-center": "fixed top-5 left-1/2 -translate-x-1/2 z-50",
    "bottom-right": "fixed bottom-5 right-5 z-50",
    "bottom-center": "fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
  };

  // Status Configurations
  const typeConfigs = {
    success: {
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-400/40",
      glow: "shadow-[0_10px_35px_rgba(16,185,129,0.35)]",
    },
    error: {
      icon: XCircle,
      color: "text-rose-400 bg-rose-500/20 border-rose-400/40",
      glow: "shadow-[0_10px_35px_rgba(244,63,94,0.35)]",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/20 border-amber-400/40",
      glow: "shadow-[0_10px_35px_rgba(245,158,11,0.35)]",
    },
    info: {
      icon: Info,
      color: "text-cyan-400 bg-cyan-500/20 border-cyan-400/40",
      glow: "shadow-[0_10px_35px_rgba(6,182,212,0.35)]",
    },
    ai: {
      icon: Sparkles,
      color: "text-purple-400 bg-purple-500/20 border-purple-400/40",
      glow: "shadow-[0_10px_35px_rgba(168,85,247,0.35)]",
    },
  };

  const config = typeConfigs[type] || typeConfigs.info;
  const TypeIcon = config.icon;

  return (
    <div className={`${positionStyles[position]} pointer-events-none select-none`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position.startsWith("top") ? -20 : 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position.startsWith("top") ? -15 : 15, scale: 0.9 }}
            transition={animations.spring.snappy}
            className={`
              pointer-events-auto relative overflow-hidden min-w-[320px] max-w-md p-4 rounded-2xl
              bg-slate-900/85 backdrop-blur-3xl border text-slate-100 flex items-start gap-3.5
              ${glass.specular.bright}
              ${config.glow}
              ${className}
            `}
          >
            {/* Type Status Icon */}
            <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${config.color}`}>
              <TypeIcon className="w-4 h-4" />
            </div>

            {/* Message Body */}
            <div className="flex-1 min-w-0 pr-2">
              {title && <h4 className="text-xs font-semibold text-white tracking-tight">{title}</h4>}
              {message && <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">{message}</p>}
              {action && <div className="mt-2">{action}</div>}
            </div>

            {/* Close Button */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Progress Countdown Line */}
            {duration > 0 && (
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlassToast;