import {
  Mail,
  Phone,
  MapPin,
  Star,
  MessageSquare,
  Edit,
  FolderKanban,
  CheckSquare,
  ShieldCheck,
} from "lucide-react";

/**
 * EmployeeCard - Quixotic Pure White Employee Profile Card
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 * 
 * @param {object} employee - Employee record data object
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 */
export const EmployeeCard = ({ employee, onMessageClick, onEditClick }) => {
  if (!employee) return null;

  const {
    name = "Team Member",
    title = "Specialist",
    department = "General",
    roleLevel,
    email,
    phone,
    location,
    status = "online",
    avatar,
    skills = [],
    projectsAssigned = 0,
    tasksCompleted = 0,
    performanceScore = 5.0,
  } = employee;

  const avatarSrc =
    avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0B0B0C&color=C6F432`;

  const getPresenceDot = () => {
    const s = (status || "").toLowerCase();
    if (s === "online") return "bg-[#C6F432] ring-2 ring-white";
    if (s === "meeting" || s === "busy") return "bg-amber-400 ring-2 ring-white";
    if (s === "away") return "bg-yellow-400 ring-2 ring-white";
    return "bg-zinc-400 ring-2 ring-white";
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#C6F432] transition-all duration-200 flex flex-col justify-between h-full group">
      {/* Top Section: Avatar, Badges, Identity & Contact */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={avatarSrc}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 shadow-xs"
            />
            <span
              title={status}
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${getPresenceDot()}`}
            />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-[#0B0B0C] border border-zinc-200">
              {department}
            </span>

            {(roleLevel === "Admin" || roleLevel === "Lead") && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
                <ShieldCheck className="w-3 h-3 text-[#386b03]" />
                {roleLevel}
              </span>
            )}
          </div>
        </div>

        {/* Identity Details */}
        <h3 className="text-lg font-extrabold text-[#0B0B0C] tracking-tight leading-snug">
          {name}
        </h3>
        <p className="text-xs font-semibold text-zinc-600 mt-0.5">{title}</p>

        {/* Contact Info */}
        <div className="mt-4 space-y-1.5 text-xs text-zinc-600">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-[#0B0B0C] transition-colors truncate"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
              <span className="truncate font-medium">{email}</span>
            </a>
          )}

          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
              <span className="font-medium">{phone}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
              <span className="font-medium">{location}</span>
            </div>
          )}
        </div>

        {/* Skills Tag Cloud */}
        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-100 text-zinc-500">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats & Actions */}
      <div className="mt-6 pt-4 border-t border-zinc-100">
        {/* Performance & Activity Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200/70">
            <p className="text-[10px] uppercase font-bold text-zinc-500 flex items-center justify-center gap-1">
              <FolderKanban className="w-3 h-3 text-[#0B0B0C]" /> Projects
            </p>
            <p className="text-sm font-extrabold text-[#0B0B0C] mt-0.5">
              {projectsAssigned}
            </p>
          </div>

          <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200/70">
            <p className="text-[10px] uppercase font-bold text-zinc-500 flex items-center justify-center gap-1">
              <CheckSquare className="w-3 h-3 text-[#0B0B0C]" /> Tasks
            </p>
            <p className="text-sm font-extrabold text-[#0B0B0C] mt-0.5">
              {tasksCompleted}
            </p>
          </div>

          <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-200/70">
            <p className="text-[10px] uppercase font-bold text-zinc-500 flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Rating
            </p>
            <p className="text-sm font-extrabold text-[#0B0B0C] mt-0.5">
              {performanceScore}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMessageClick && onMessageClick(employee)}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Message</span>
          </button>

          <button
            type="button"
            onClick={() => onEditClick && onEditClick(employee)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#0B0B0C] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
