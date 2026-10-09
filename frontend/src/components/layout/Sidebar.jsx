import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  CalendarDays,
  Mail,
  Ticket,
  Bell,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: ListTodo,
  },
  {
    name: "Meetings",
    path: "/meetings",
    icon: CalendarDays,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    name: "Emails",
    path: "/emails",
    icon: Mail,
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: Ticket,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Glass Sidebar */}
      <motion.aside
        animate={{
          width: collapsed ? 82 : 270,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header: Brand Logo & Title */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 font-extrabold text-white shadow-lg shadow-cyan-500/30"
            >
              O
            </motion.div>

            {!collapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-extrabold tracking-wide text-white truncate"
              >
                Office Aid
              </motion.h1>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden pr-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ x: collapsed ? 0 : 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-2.5 font-medium transition-all duration-200 select-none ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30 shadow-sm"
                        : "text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />

                  {!collapsed && (
                    <span className="text-sm truncate">{item.name}</span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section: Profile Card & Collapse Toggle */}
        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3 shrink-0">
          {/* User Identity Pill */}
          <div
            className={`
              flex items-center rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-xl transition-all
              ${collapsed ? "justify-center" : "justify-between gap-3"}
            `}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-md">
                SG
              </div>

              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    Sourasish Ghosh
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    Administrator
                  </p>
                </div>
              )}
            </div>

            {!collapsed && (
              <NavLink
                to="/profile"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="View Profile"
              >
                <User size={16} />
              </NavLink>
            )}
          </div>

          {/* Collapse Sidebar Toggle Button */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className={`
              hidden lg:flex items-center justify-center h-10 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-all duration-300
              ${collapsed ? "w-full" : "w-full flex justify-between px-3 text-xs font-semibold"}
            `}
          >
            {!collapsed && <span>Collapse Sidebar</span>}
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;