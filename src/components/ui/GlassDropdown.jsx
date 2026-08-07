import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassDropdown - Apple Liquid Glass Action & Context Menu
 * 
 * Uses a React Portal to render the dropdown menu at document.body level,
 * so it is never clipped by ancestor overflow-hidden containers.
 * 
 * @param {React.ReactNode} trigger - Trigger button element
 * @param {Array<{ id?: string, label: string, icon?: React.ReactNode, onClick?: () => void, danger?: boolean, disabled?: boolean, shortcut?: string, divider?: boolean }>} items - Menu items array
 * @param {'left' | 'right'} align - Alignment anchor relative to trigger
 * @param {string} width - Tailind width override (e.g. "w-56")
 * @param {string} className - Extra CSS classes for dropdown container
 */
export const GlassDropdown = ({
  trigger,
  items = [],
  align = "right",
  width = "w-56",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  // Estimated menu width in pixels (w-56 = 14rem = 224px)
  const MENU_WIDTH = 224;
  const MENU_PADDING = 8; // gap from viewport edges

  // Compute the menu position using fixed positioning (viewport-relative)
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // Position directly below the trigger with an 8px gap
    let top = rect.bottom + 8;
    let left;

    if (align === "right") {
      // Right-align: menu right edge aligns with trigger right edge
      left = rect.right - MENU_WIDTH;
    } else {
      // Left-align: menu left edge aligns with trigger left edge
      left = rect.left;
    }

    // Clamp horizontal position to stay within viewport
    if (left + MENU_WIDTH > viewportW - MENU_PADDING) {
      left = viewportW - MENU_WIDTH - MENU_PADDING;
    }
    if (left < MENU_PADDING) {
      left = MENU_PADDING;
    }

    // If menu would overflow the bottom, flip it above the trigger
    // (rough estimate: 5 items * 40px = 200px max menu height)
    const estimatedMenuHeight = items.length * 40 + 16;
    if (top + estimatedMenuHeight > viewportH - MENU_PADDING) {
      top = rect.top - estimatedMenuHeight - 8;
      if (top < MENU_PADDING) top = MENU_PADDING;
    }

    setMenuPos({ top, left });
  }, [align, items.length]);

  // Update position when opening
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  // Recalculate on scroll or resize while open
  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => updatePosition();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, updatePosition]);

  // Close when clicking outside trigger or menu
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      const clickedTrigger = triggerRef.current && triggerRef.current.contains(event.target);
      const clickedMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!clickedTrigger && !clickedMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <div ref={triggerRef} className="relative inline-block text-left select-none">
      {/* Trigger Slot */}
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </div>

      {/* Floating Glass Dropdown Menu — rendered via Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={animations.spring.snappy}
              style={{
                position: "fixed",
                top: menuPos.top,
                left: menuPos.left,
                transformOrigin: align === "right" ? "top right" : "top left",
                zIndex: 9999,
              }}
              className={`
                py-2 rounded-2xl overflow-hidden text-slate-100
                bg-slate-900/80 backdrop-blur-3xl border border-white/15
                shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                ${glass.specular.subtle}
                ${width}
                ${className}
              `}
            >
              {items.map((item, idx) => {
                if (item.divider) {
                  return <div key={`divider-${idx}`} className="my-1.5 h-[1px] bg-white/10" />;
                }

                const Icon = item.icon;

                return (
                  <button
                    key={item.id || idx}
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled && item.onClick) {
                        item.onClick();
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium
                      transition-all duration-150 cursor-pointer
                      ${
                        item.disabled
                          ? "opacity-40 cursor-not-allowed"
                          : item.danger
                          ? "text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {Icon && (
                        <span className="shrink-0 text-current">
                          {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
                        </span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Optional Shortcut Tag (e.g. ⌘E) */}
                    {item.shortcut && (
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/10">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default GlassDropdown;