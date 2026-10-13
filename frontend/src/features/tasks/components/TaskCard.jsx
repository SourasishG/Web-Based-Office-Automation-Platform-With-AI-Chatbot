import { useMemo } from "react";
import { Calendar, MoreVertical, GripVertical } from "lucide-react";
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
 * Supports HTML5 native drag-and-drop, quick status transitions, and dynamic subtask progress.
 * 
 * @param {object} task - Task data record
 * @param {function} onClick - Selection callback handler
 * @param {function} onStatusChange - Quick status change callback
 * @param {function} onDelete - Delete callback
 */
export const TaskCard = ({ task, onClick, onStatusChange, onDelete }) => {
  const computedProgress = useMemo(() => {
    if (!task) return 0;
    if (typeof task.progress === "number") return task.progress;
    if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
      const completed = task.subtasks.filter((s) => s.completed).length;
      return Math.round((completed / task.subtasks.length) * 100);
    }
    const s = (task.status || "").toUpperCase();
    if (s === "COMPLETED") return 100;
    if (s === "REVIEW") return 80;
    if (s === "IN_PROGRESS") return 45;
    return 0;
  }, [task]);

  if (!task) return null;

  const {
    id,
    title = "Untitled Task",
    description,
    priority = "MEDIUM",
    status = "TODO",
  } = task;

  const assigneeName = task.assignee
    ? `${task.assignee.firstName || ""} ${task.assignee.lastName || ""}`.trim() ||
      task.assignee.name ||
      "Assignee"
    : typeof task.assignee === "string"
    ? task.assignee
    : null;

  const avatarUrl = task.assignee?.avatarUrl || task.assignee?.avatar;

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const displayCategory = task.project?.title || task.category;

  // Dropdown quick actions
  const normStatus = (status || "").toUpperCase();
  const actionItems = [
    { label: "View Details", onClick: () => onClick?.(task) },
    ...(normStatus !== "TODO"
      ? [{ label: "Move to To Do", onClick: () => onStatusChange?.(id, "TODO") }]
      : []),
    ...(normStatus !== "IN_PROGRESS"
      ? [{ label: "Move to In Progress", onClick: () => onStatusChange?.(id, "IN_PROGRESS") }]
      : []),
    ...(normStatus !== "REVIEW"
      ? [{ label: "Move to Review", onClick: () => onStatusChange?.(id, "REVIEW") }]
      : []),
    ...(normStatus !== "COMPLETED"
      ? [{ label: "Mark as Completed", onClick: () => onStatusChange?.(id, "COMPLETED") }]
      : []),
    ...(onDelete
      ? [
          {
            label: "Delete Task",
            danger: true,
            onClick: () => onDelete(id),
          },
        ]
      : []),
  ];

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grab active:cursor-grabbing transition-transform"
    >
      <GlassCard
        variant="interactive"
        hoverable
        onClick={() => onClick?.(task)}
        className="p-4 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
      >
        {/* Top Bar: Category / Tags & Action Dropdown */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="text-slate-500 group-hover:text-cyan-400 transition-colors p-0.5">
                <GripVertical className="w-3.5 h-3.5" />
              </div>
              {displayCategory && (
                <GlassBadge variant="primary" size="sm">
                  {displayCategory}
                </GlassBadge>
              )}
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
          <TaskProgress progress={computedProgress} showLabel />

          {/* Assignee Avatar & Due Date */}
          <div className="flex items-center justify-between gap-2">
            {assigneeName ? (
              <div className="flex items-center gap-2 truncate">
                <GlassAvatar
                  src={avatarUrl}
                  name={assigneeName}
                  size="xs"
                />
                <span className="text-[11px] text-slate-300 truncate font-medium">
                  {assigneeName}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 font-medium">Unassigned</span>
            )}

            {formattedDueDate && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>{formattedDueDate}</span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default TaskCard;