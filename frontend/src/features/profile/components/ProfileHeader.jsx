import { Edit3, MessageSquare, ShieldCheck, MapPin, Mail } from "lucide-react";

/**
 * ProfileHeader - Quixotic Executive Profile Banner
 * Positioned in the upper 60% Midnight Black region with lime accents.
 *
 * @param {object} user - User profile data object
 * @param {function} onEditClick - Edit profile button handler
 * @param {function} onMessageClick - Message button handler
 */
export const ProfileHeader = ({ user, onEditClick, onMessageClick }) => {
  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : user?.name || user?.fullName || "Sourasish Ghosh";
  const role = user?.jobTitle || user?.role || "Administrator";
  const department = user?.department || "General";
  const location = user?.location || "Kolkata, India";
  const email = user?.email || "sourasish.ghosh@officeaid.com";
  const status = (user?.presenceStatus || user?.status || "ONLINE").toLowerCase();
  const avatar =
    user?.avatarUrl ||
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=C6F432&color=0B0B0C`;

  const verifiedBadge =
    user?.role === "ADMIN"
      ? "Verified Admin"
      : user?.role === "MANAGER"
      ? "Team Manager"
      : "Verified Staff";

  const getPresenceRing = () => {
    if (status === "online") return "bg-[#C6F432]";
    if (status === "busy" || status === "meeting") return "bg-amber-400";
    if (status === "away") return "bg-yellow-400";
    return "bg-zinc-500";
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Subtle Lime Ambient Accent Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C6F432]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Left: Large Avatar & Profile Identity */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6">
          <div className="relative shrink-0">
            <img
              src={avatar}
              alt={fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#C6F432]/50 shadow-lg"
            />
            <span
              title={status}
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-4 ring-[#141416] ${getPresenceRing()}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {fullName}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {verifiedBadge}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-300">
              {role} •{" "}
              <span className="text-[#C6F432] font-semibold">{department}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1E] border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#C6F432] shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1E] border border-white/10">
                <Mail className="w-3.5 h-3.5 text-[#C6F432] shrink-0" />
                <span className="font-mono">{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 pt-5 md:pt-0 border-t border-white/10 md:border-t-0 w-full md:w-auto justify-start md:justify-end">
          <button
            type="button"
            onClick={onMessageClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1A1E] hover:bg-white/10 border border-white/10 hover:border-[#C6F432]/40 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C6F432]" />
            <span>Message</span>
          </button>

          <button
            type="button"
            onClick={onEditClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
