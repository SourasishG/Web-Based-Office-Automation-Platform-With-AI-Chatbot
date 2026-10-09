import React from "react";
import { motion } from "framer-motion";
import { Bell, Sparkles, ChevronRight } from "lucide-react";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassNavbar - Apple Liquid Glass Top Header Navigation Bar
 * 
 * @param {string | React.ReactNode} title - Current page / module title
 * @param {Array<{ label: string, onClick?: () => void }>} breadcrumbs - Optional breadcrumb array
 * @param {React.ReactNode} searchBar - Optional integrated search input element
 * @param {React.ReactNode} actions - Custom right-side action buttons
 * @param {{ count?: number, onClick?: () => void }} notifications - Notification bell button props
 * @param {function} onAiClick - AI Assistant launcher callback
 * @param {{ name: string, avatar?: string, role?: string, onClick?: () => void }} user - User profile object
 * @param {boolean} isFloating - Floating rounded panel vs full-width sticky header
 * @param {string} className - Additional CSS classes
 */
export const GlassNavbar = ({
  title,
  breadcrumbs = [],
  searchBar,
  actions,
  notifications,
  onAiClick,
  user,
  isFloating = false,
  className = "",
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={animations.spring.gentle}
      className={`
        relative z-30 flex items-center justify-between px-6 h-16 select-none
        bg-slate-950/60 backdrop-blur-3xl border-b border-white/10 text-slate-100
        shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        ${glass.specular.subtle}
        ${isFloating ? "m-4 rounded-2xl border border-white/15" : ""}
        ${className}
      `}
    >
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex items-center gap-3">
        {breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-1.5 text-xs text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span
                  onClick={crumb.onClick}
                  className={`hover:text-white transition-colors ${
                    crumb.onClick ? "cursor-pointer" : ""
                  }`}
                >
                  {crumb.label}
                </span>
                {idx < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : title ? (
          <h1 className="text-lg font-semibold text-white tracking-tight">
            {title}
          </h1>
        ) : null}
      </div>

      {/* Center: Search Bar */}
      {searchBar && (
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          {searchBar}
        </div>
      )}

      {/* Right: Actions, Notifications, AI Pill & User Profile */}
      <div className="flex items-center gap-3">
        {/* Custom Actions */}
        {actions}

        {/* AI Assistant Quick Pill */}
        {onAiClick && (
          <button
            onClick={onAiClick}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 border border-cyan-400/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-xs font-medium text-slate-100 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        )}

        {/* Notifications Pill */}
        {notifications && (
          <button
            onClick={notifications.onClick}
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            {notifications.count && notifications.count > 0 ? (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-cyan-500 rounded-full border border-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                {notifications.count > 99 ? "99+" : notifications.count}
              </span>
            ) : null}
          </button>
        )}

        {/* User Profile Quick Avatar */}
        {user && (
          <button
            onClick={user.onClick}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 border border-white/20 flex items-center justify-center text-xs font-bold text-white overflow-hidden shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            {user.name && (
              <span className="hidden lg:inline text-xs font-medium text-slate-200 truncate pr-1">
                {user.name}
              </span>
            )}
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default GlassNavbar;