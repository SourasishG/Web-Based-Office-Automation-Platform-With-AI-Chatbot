import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassModal - Apple Liquid Glass Dialog Overlay
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Close callback handler
 * @param {string | React.ReactNode} title - Modal header title
 * @param {string | React.ReactNode} subtitle - Optional header subtitle
 * @param {React.ReactNode} icon - Optional header icon component
 * @param {React.ReactNode} children - Modal body content
 * @param {React.ReactNode} footer - Optional modal action footer bar
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} maxWidth - Width sizing preset
 * @param {boolean} closeOnOverlayClick - Close when backdrop clicked
 * @param {string} className - Additional CSS for modal dialog body
 */
export const GlassModal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    icon: Icon,
    children,
    footer,
    maxWidth = "md",
    closeOnOverlayClick = true,
    className = "",
}) => {
    // Lock body scrolling when modal is active
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Width Presets
    const maxWidthStyles = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-5xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop Blur Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeOnOverlayClick ? onClose : undefined}
                        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl"
                    />

                    {/* Floating Glass Dialog Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 12 }}
                        transition={animations.spring.snappy}
                        className={`
              relative w-full z-10 overflow-hidden rounded-[28px]
              bg-slate-900/60 backdrop-blur-3xl border border-white/15
              shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-slate-100
              ${glass.specular.bright}
              ${maxWidthStyles[maxWidth]}
              ${className}
            `}
                    >
                        {/* Header */}
                        {(title || Icon) && (
                            <div className="relative px-6 pt-6 pb-4 flex items-start justify-between border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    {Icon && (
                                        <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-white/10 text-cyan-400 shrink-0">
                                            {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
                                        </div>
                                    )}
                                    <div>
                                        {title && (
                                            <h3 className="text-lg font-semibold text-white tracking-tight">
                                                {title}
                                            </h3>
                                        )}
                                        {subtitle && (
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Close Pill Button */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors focus:outline-none"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Modal Body */}
                        <div className="p-6 relative z-10 max-h-[75vh] overflow-y-auto">
                            {children}
                        </div>

                        {/* Modal Footer */}
                        {footer && (
                            <div className="px-6 py-4 bg-slate-950/40 border-t border-white/10 flex items-center justify-end gap-3">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GlassModal;