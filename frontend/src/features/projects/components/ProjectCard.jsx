import { Calendar, MoreVertical, AlertCircle, CheckCircle2 } from "lucide-react";
import { GlassDropdown } from "../../../components/ui";
import ProgressBar from "./ProgressBar";

/**
 * ProjectCard - Pure White Executive Project Tile
 * Matches the dashboard lower card styling with crisp typography, lime badges, and team avatar cluster.
 * 
 * @param {object} project - Project data object
 * @param {function} onClick - Card click handler
 */
export const ProjectCard = ({ project, onClick }) => {
  if (!project) return null;

  const {
    id,
    title,
    name,
    description,
    category,
    tags = [],
    status = "active",
    priority = "medium",
    progress = 0,
    team = [],
    members = [],
    dueDate,
  } = project;

  const displayTitle = title || name || "Untitled Project";
  const displayTeam = team.length > 0 ? team : members;

  // Status Badge Helper
  const getStatusBadge = () => {
    const s = (status || "").toLowerCase();
    if (s === "completed") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completed
        </span>
      );
    }
    if (s === "on-hold" || s === "on hold") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          On Hold
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#C6F432]/30 text-[#0B0B0C] border border-[#C6F432]/50">
        <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
        Active
      </span>
    );
  };

  // Priority Badge Helper
  const getPriorityBadge = () => {
    const p = (priority || "").toLowerCase();
    if (p === "high") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3 h-3" />
          High Priority
        </span>
      );
    }
    if (p === "medium") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Medium Priority
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
        Low Priority
      </span>
    );
  };

  // Dropdown Action Menu
  const actionItems = [
    { label: "View Details", onClick: () => onClick?.(project) },
    { label: "Edit Project", onClick: () => console.log("Edit project", id) },
    { label: "Archive Project", danger: true, onClick: () => console.log("Archive project", id) },
  ];

  return (
    <div
      onClick={() => onClick?.(project)}
      className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer text-[#0B0B0C]"
    >
      {/* Top Header: Category Tag, Badges & Context Menu */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {category && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-zinc-700">
                {category}
              </span>
            )}
            {tags.slice(0, 1).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-50 text-zinc-500 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <GlassDropdown
              trigger={
                <button
                  type="button"
                  aria-label="More options"
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-zinc-600 hover:text-black transition-colors focus:outline-none"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              }
              items={actionItems}
              align="right"
            />
          </div>
        </div>

        {/* Project Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-[#0B0B0C] group-hover:text-black transition-colors leading-snug">
          {displayTitle}
        </h3>

        {description && (
          <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Badges Row */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {getStatusBadge()}
          {getPriorityBadge()}
        </div>
      </div>

      {/* Progress & Metadata Section */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
        {/* Progress Line */}
        <ProgressBar progress={progress} showLabel />

        {/* Footer: Team Avatars & Due Date */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {displayTeam.length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {displayTeam.slice(0, 3).map((member, idx) => {
                const name = member.name || (member.firstName ? `${member.firstName} ${member.lastName}` : "Team Member");
                const initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
                return (
                  <div
                    key={idx}
                    title={name}
                    className="w-7 h-7 rounded-full bg-slate-200 text-[#0B0B0C] ring-2 ring-white flex items-center justify-center text-[10px] font-bold overflow-hidden"
                  >
                    {member.avatar ? (
                      <img src={member.avatar} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                );
              })}
              {displayTeam.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-[#C6F432] text-[#0B0B0C] ring-2 ring-white flex items-center justify-center text-[10px] font-black">
                  +{displayTeam.length - 3}
                </div>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-zinc-400">Unassigned</span>
          )}

          {dueDate && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-mono bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              <Calendar className="w-3.5 h-3.5 text-[#0B0B0C] shrink-0" />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
