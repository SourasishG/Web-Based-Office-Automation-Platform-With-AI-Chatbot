import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const QuixoticTopNavbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [failedAvatarSrc, setFailedAvatarSrc] = useState(null);

  const avatarSrc = user?.avatarUrl || user?.avatar;
  const showAvatarImage = Boolean(avatarSrc) && failedAvatarSrc !== avatarSrc;
  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.name || user?.fullName || "Sourasish Ghosh";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Tasks", path: "/tasks" },
    { label: "Meetings", path: "/meetings" },
    { label: "Employees", path: "/employees" },
    { label: "Emails", path: "/emails" },
    { label: "Tickets", path: "/tickets" },
  ];

  return (
    <header className="w-full pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto bg-[#141416]/90 backdrop-blur-md border border-white/10 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#C6F432] flex items-center justify-center font-black text-[#0B0B0C] text-lg tracking-tighter shadow-md group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C14.336 22 16.486 21.198 18.188 19.852L20.293 21.957C20.684 22.348 21.316 22.348 21.707 21.957C22.098 21.566 22.098 20.934 21.707 20.543L19.676 18.512C21.127 16.758 22 14.484 22 12C22 6.477 17.523 2 12 2ZM12 6C15.314 6 18 8.686 18 12C18 13.567 17.397 14.993 16.41 16.059L13.882 13.531C13.959 13.047 14 12.531 14 12C14 10.895 13.105 10 12 10C11.469 10 10.953 10.041 10.469 10.118L7.941 7.59C9.007 6.603 10.433 6 12 6Z" fill="#0B0B0C" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight hidden sm:inline-block">
            Office<span className="text-[#C6F432]">Aid</span>
          </span>
        </Link>

        {/* Center Pill Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1E1E22]/80 border border-white/5 rounded-full p-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#0B0B0C] shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Notifications, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#1E1E22] border border-white/10 rounded-full px-3 py-1 text-xs text-white">
                <Search className="w-3.5 h-3.5 text-zinc-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search workspace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setSearchOpen(false)}
                  autoFocus
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 w-28 sm:w-40"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-9 h-9 rounded-full bg-[#1E1E22] hover:bg-[#28282D] text-zinc-300 hover:text-white flex items-center justify-center border border-white/5 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Notifications Bell */}
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-[#1E1E22] hover:bg-[#28282D] text-zinc-300 hover:text-white flex items-center justify-center border border-white/5 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C6F432]" />
          </Link>

          {/* User Profile Avatar */}
          <Link
            to="/profile"
            title={displayName}
            aria-label={`View profile for ${displayName}`}
            className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-white/5 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full ring-2 ring-[#C6F432]/60 overflow-hidden bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
              {showAvatarImage ? (
                <img
                  src={avatarSrc}
                  alt={displayName}
                  onError={() => setFailedAvatarSrc(avatarSrc)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#C6F432]">{initials || "SG"}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default QuixoticTopNavbar;
