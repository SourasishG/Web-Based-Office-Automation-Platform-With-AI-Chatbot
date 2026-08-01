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
  LogOut,
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
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        animate={{
          width: collapsed ? 82 : 270,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-slate-950/95 px-4 py-6 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 font-bold shadow-lg shadow-cyan-500/30"
            >
              O
            </motion.div>

            {!collapsed && (
              <motion.h1
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="text-xl font-bold tracking-wide"
              >
                Office Aid
              </motion.h1>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  x: 6,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-4 rounded-2xl px-3 py-3 font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-400"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={21} />

                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 font-bold">
              SG
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">
                  Sourasish Ghosh
                </p>

                <p className="text-xs text-slate-400">
                  Administrator
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400">
              <LogOut size={16} />
              Logout
            </button>
          )}
        </motion.div>

        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 180,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
          }}
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-6 right-4 hidden h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl transition-all hover:bg-cyan-500/20 hover:text-cyan-400 lg:flex"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </motion.button>
      </motion.aside>
    </>
  );
};

export default Sidebar;