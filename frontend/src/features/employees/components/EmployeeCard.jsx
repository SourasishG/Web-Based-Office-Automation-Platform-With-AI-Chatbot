import { Mail, Phone, MapPin, Star, MessageSquare, Edit, FolderKanban, CheckSquare, ShieldCheck } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * EmployeeCard - Apple Liquid Glass Individual Employee Profile Card
 * 
 * @param {object} employee - Employee record data object
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 */
export const EmployeeCard = ({ employee, onMessageClick, onEditClick }) => {
  if (!employee) return null;

  const {
    name,
    title,
    department,
    roleLevel,
    email,
    phone,
    location,
    status,
    avatar,
    skills = [],
    projectsAssigned = 0,
    tasksCompleted = 0,
    performanceScore = 5.0,
  } = employee;

  // Department color accent
  const getDepartmentVariant = (dept) => {
    switch (dept) {
      case "Executive": return "purple";
      case "Engineering": return "cyan";
      case "Design": return "blue";
      case "Product": return "success";
      case "Marketing": return "warning";
      case "HR": return "danger";
      default: return "ghost";
    }
  };

  return (
    <GlassCard
      variant="standard"
      hoverable
      glow="none"
      className="flex flex-col justify-between h-full p-6 group transition-all duration-300"
    >
      {/* Card Header: Avatar, Name & Context Menu */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <GlassAvatar
            src={avatar}
            name={name}
            size="xl"
            status={status}
            glow
            className="shrink-0"
          />

          <div className="flex flex-col items-end gap-1.5">
            <GlassBadge
              variant={getDepartmentVariant(department)}
              size="sm"
            >
              {department}
            </GlassBadge>

            {roleLevel === "Admin" || roleLevel === "Lead" ? (
              <GlassBadge variant="cyan" size="sm" icon={ShieldCheck}>
                {roleLevel}
              </GlassBadge>
            ) : null}
          </div>
        </div>

        {/* Identity Details */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
          {name}
        </h3>
        <p className="text-xs font-medium text-slate-300 mt-0.5">
          {title}
        </p>

        {/* Contact Info */}
        <div className="mt-4 space-y-1.5 text-xs text-slate-400">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors truncate"
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{email}</span>
          </a>

          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{phone}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Skills Tag Cloud */}
        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/5 border border-white/10 text-slate-300"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-white/5 text-slate-400">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats & Actions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        {/* Performance & Activity Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-1">
              <FolderKanban className="w-3 h-3 text-cyan-400" /> Projects
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {projectsAssigned}
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-1">
              <CheckSquare className="w-3 h-3 text-cyan-400" /> Tasks
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {tasksCompleted}
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" /> Rating
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {performanceScore}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <GlassButton
            variant="ghost"
            size="sm"
            icon={MessageSquare}
            className="flex-1 text-xs"
            onClick={() => onMessageClick && onMessageClick(employee)}
          >
            Message
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="sm"
            icon={Edit}
            className="text-xs"
            onClick={() => onEditClick && onEditClick(employee)}
          >
            Edit
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default EmployeeCard;
