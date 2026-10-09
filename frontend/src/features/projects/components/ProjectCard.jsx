import React from "react";
import { Calendar, MoreVertical, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import {
  GlassCard,
  GlassBadge,
  GlassAvatarGroup,
  GlassDropdown,
  ProgressRing,
} from "../../../components/ui";
import ProgressBar from "./ProgressBar";

/**
 * ProjectCard - Apple Liquid Glass Interactive Project Tile
 * Renders project progress, priority badges, category tags, team avatar stacks, and due dates.
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
      return <GlassBadge variant="success" size="sm" icon={CheckCircle2}>Completed</GlassBadge>;
    }
    if (s === "on-hold" || s === "on hold") {
      return <GlassBadge variant="warning" size="sm">On Hold</GlassBadge>;
    }
    return <GlassBadge variant="cyan" size="sm" dot glow>Active</GlassBadge>;
  };

  // Priority Badge Helper
  const getPriorityBadge = () => {
    const p = (priority || "").toLowerCase();
    if (p === "high") {
      return <GlassBadge variant="danger" size="sm" icon={AlertCircle}>High Priority</GlassBadge>;
    }
    if (p === "medium") {
      return <GlassBadge variant="warning" size="sm">Medium Priority</GlassBadge>;
    }
    return <GlassBadge variant="ghost" size="sm">Low Priority</GlassBadge>;
  };

  // Dropdown Action Menu
  const actionItems = [
    { label: "View Details", onClick: () => onClick?.(project) },
    { label: "Edit Project", onClick: () => console.log("Edit project", id) },
    { label: "Archive Project", danger: true, onClick: () => console.log("Archive project", id) },
  ];

  return (
    <GlassCard
      variant="interactive"
      hoverable
      onClick={() => onClick?.(project)}
      className="p-5 flex flex-col justify-between h-full relative overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {/* Top Header: Category Tag, Badges & Context Menu */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {category && (
              <GlassBadge variant="primary" size="sm">
                {category}
              </GlassBadge>
            )}
            {tags.slice(0, 1).map((tag, idx) => (
              <GlassBadge key={idx} variant="ghost" size="sm">
                {tag}
              </GlassBadge>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <GlassDropdown
              trigger={
                <button
                  type="button"
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors focus:outline-none"
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
        <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {displayTitle}
        </h3>

        {description && (
          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Badges Row */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {getStatusBadge()}
          {getPriorityBadge()}
        </div>
      </div>

      {/* Progress & Metadata Section */}
      <div className="mt-5 pt-4 border-t border-white/10 space-y-4">
        {/* Progress Line */}
        <ProgressBar progress={progress} showLabel />

        {/* Footer: Team Avatars & Due Date */}
        <div className="flex items-center justify-between gap-3">
          {displayTeam.length > 0 ? (
            <GlassAvatarGroup avatars={displayTeam} max={3} size="xs" />
          ) : (
            <span className="text-[11px] text-slate-500">Unassigned</span>
          )}

          {dueDate && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;