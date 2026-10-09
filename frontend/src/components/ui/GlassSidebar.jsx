import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassSidebar - Apple Liquid Glass Floating / Docked Sidebar Navigation
 * 
 * @param {Array<{ id: string, label: string, icon: React.ReactNode, badge?: string|number, isActive?: boolean, onClick?: () => void }>} items - Primary menu items
 * @param {Array<{ id: string, label: string, icon: React.ReactNode, onClick?: () => void }>} bottomItems - Bottom utility items
 * @param {{ logo?: React.ReactNode, title: string, subtitle?: string }} brand - App logo & branding
 * @param {{ name: string, role: string, avatar?: string }} user - Optional user profile footer
 * @param {boolean} isCollapsed - Collapsed state
 * @param {function} onToggleCollapse - Toggle callback
 * @param {string} className - Additional CSS
 */
export const GlassSidebar = ({
  items = [],
  bottomItems = [],
  brand = { title: "Office Aid", subtitle: "Intelligent Assistant" },
  user,
  isCollapsed = false,
  onToggleCollapse,
  className = "",
}) => {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 84 : 260 }}
      transition={animations.spring.snappy}
      className={`
        relative h-screen flex flex-col justify-between p-3.5 z-40 select-none
        bg-slate-950/65 backdrop-blur-3xl border-r border-white/10 text-slate-100
        shadow-[10px_0_40px_rgba(0,0,0,0.5)]
        ${glass.specular.subtle}
        ${className}
      `}
    >
      {/* Top Section: Brand & Collapse Toggle */}
      <div>
        <div className="flex items-center justify-between px-2 py-3 mb-4">
          <div className="flex items-center gap-3 overflow-hidden">
            {brand.logo ? (
              <div className="shrink-0">{brand.logo}</div>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,122,255,0.5)] shrink-0">
                O
              </div>
            )}
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  <h1 className="text-sm font-semibold tracking-tight text-white leading-none">
                    {brand.title}
                  </h1>
                  {brand.subtitle && (
                    <span className="text-[10px] text-cyan-400 font-medium tracking-wide">
                      {brand.subtitle}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse Toggle Pill */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Primary Navigation Menu */}
        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`
                  relative w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-sm font-medium
                  transition-all duration-200 group
                  ${item.isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}
                `}
              >
                {/* Active Gliding Pill Background */}
                {item.isActive && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    transition={animations.spring.snappy}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  />
                )}

                {/* Icon */}
                <div className={`relative z-10 shrink-0 ${item.isActive ? "text-cyan-400" : "group-hover:text-slate-200"}`}>
                  {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
                </div>

                {/* Label & Badge */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 flex-1 flex items-center justify-between whitespace-nowrap overflow-hidden text-left"
                    >
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Utilities & User Footer */}
      <div className="space-y-3">
        {/* Bottom Utility Items */}
        {bottomItems.length > 0 && (
          <div className="pt-3 border-t border-white/10 space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3.5 px-3 py-2 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="shrink-0">
                    {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
                  </div>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* User Profile Footer */}
        {user && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-cyan-400 shrink-0">
                {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-xl object-cover" /> : user.name.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.role}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default GlassSidebar;