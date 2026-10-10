import { Menu, Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = ({ setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitles = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/meetings": "Meetings",
    "/employees": "Employees",
    "/emails": "Emails",
    "/tickets": "Tickets",
    "/notifications": "Notifications",
    "/profile": "Profile",
  };

  const pageTitle = pageTitles[location.pathname] || "Office Aid";

  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        border-white/10
        bg-black/80
        backdrop-blur-xl
        px-6
        text-white
      "
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="mr-4 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-xl font-semibold">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        <ThemeToggle />

        {/* Notification Center Bell Button */}
        <button
          type="button"
          onClick={() => navigate("/notifications")}
          title="Notification Center"
          className="
            relative
            rounded-xl
            p-2
            transition
            hover:bg-white/10
            cursor-pointer
          "
        >
          <Bell size={22} />

          <span
            className="
              absolute
              right-1
              top-1
              h-2.5
              w-2.5
              rounded-full
              bg-cyan-400
              shadow-[0_0_8px_#06b6d4]
              animate-pulse
            "
          />
        </button>

        {/* User Profile Quick Trigger */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          title="View Profile"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-2
            py-1
            transition
            hover:bg-white/10
            cursor-pointer
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-linear-to-br
              from-cyan-500
              to-blue-600
              font-bold
            "
          >
            SG
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold">
              Sourasish Ghosh
            </p>

            <p className="text-xs text-slate-400">
              Admin
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;