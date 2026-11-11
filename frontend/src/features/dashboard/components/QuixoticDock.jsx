import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  BarChart2,
  FolderKanban,
  CalendarDays,
  ListTodo,
  Users,
  Mail,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const QuixoticDock = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const primaryItems = [
    { icon: BarChart2, label: "Analytics", path: "/" },
    { icon: FolderKanban, label: "Projects", path: "/projects" },
    { icon: ListTodo, label: "Tasks", path: "/tasks" },
    { icon: CalendarDays, label: "Meetings", path: "/meetings" },
    { icon: Users, label: "Employees", path: "/employees" },
    { icon: Mail, label: "Emails", path: "/emails" },
    { icon: Sparkles, label: "Herric AI", path: "/chatbot" },
  ];

  return (
    <aside className="hidden lg:flex flex-col items-center justify-between w-16 bg-[#141416]/95 border border-white/10 rounded-3xl py-4 shadow-2xl backdrop-blur-md">
      {/* Top Active App Launcher */}
      <div className="flex flex-col items-center gap-5">
        <Link
          to="/"
          title="Dashboard Home"
          className="w-11 h-11 rounded-2xl bg-[#C6F432] text-[#0B0B0C] flex items-center justify-center shadow-lg shadow-[#C6F432]/20 hover:scale-105 transition-all"
        >
          <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
        </Link>

        {/* Navigation Icons */}
        <div className="flex flex-col items-center gap-3">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                title={item.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#0B0B0C] shadow-md font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Utility Icons: Settings & Logout */}
      <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/10">
        <Link
          to="/profile"
          title="Workspace Settings"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={logout}
          title="Logout"
          className="w-10 h-10 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default QuixoticDock;
