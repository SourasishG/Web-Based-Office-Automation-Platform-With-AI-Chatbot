import React from "react";
import { Calendar, MoreVertical } from "lucide-react";
import {
  GlassCard,
  GlassBadge,
  GlassAvatar,
  GlassDropdown,
} from "../../../components/ui";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskProgress from "./TaskProgress";

/**
 * TaskCard - Apple Liquid Glass Interactive Task Tile
 * Renders task execution details, priority/status badges, progress indicators, assignee avatars, and due dates.
 * 
 * @param {object} task - Task data record
 * @param {function} onClick - Selection callback handler
 */
export const TaskCard = ({ task, onClick }) => {
  if (!task) return null;

  const {
    id,
    title = "Untitled Task",
    description,
    category,
    tags = [],
    priority = "medium",
    status = "todo",
    progress = 0,
    assignee,
    dueDate,
  } = task;

  // Dropdown Options
  const actionItems = [
    { label: "View Details", onClick: () => onClick?.(task) },
    { label: "Edit Task", onClick: () => console.log("Edit task", id) },
    { label: "Delete Task", danger: true, onClick: () => console.log("Delete task", id) },
  ];

  return (
    <GlassCard
      variant="interactive"
      hoverable
      onClick={() => onClick?.(task)}
      className="p-4 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {/* Top Bar: Category / Tags & Action Dropdown */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
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

          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <GlassDropdown
              trigger={
                <button
                  type="button"
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors focus:outline-none"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              }
              items={actionItems}
              align="right"
            />
          </div>
        </div>

        {/* Task Title & Description */}
        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {title}
        </h4>

        {description && (
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Badges Bar: Status & Priority */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <TaskStatusBadge status={status} />
          <TaskPriorityBadge priority={priority} />
        </div>
      </div>

      {/* Footer Progress & Assignee Metadata */}
      <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
        {/* Task Progress */}
        <TaskProgress progress={progress} showLabel />

        {/* Assignee Avatar & Due Date */}
        <div className="flex items-center justify-between gap-2">
          {assignee ? (
            <div className="flex items-center gap-2 truncate">
              <GlassAvatar
                src={assignee.avatar}
                name={assignee.name || "Assignee"}
                size="xs"
              />
              <span className="text-[11px] text-slate-300 truncate font-medium">
                {assignee.name}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-500 font-medium">Unassigned</span>
          )}

          {dueDate && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default TaskCard;