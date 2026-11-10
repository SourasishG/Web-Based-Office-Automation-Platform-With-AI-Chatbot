import { useMemo } from "react";
import { Calendar, MoreVertical, GripVertical } from "lucide-react";
import { GlassDropdown } from "../../../components/ui";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskProgress from "./TaskProgress";

/**
 * TaskCard - Quixotic Pure White Task Tile
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
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

  const avatarUrl =
    task.assignee?.avatarUrl ||
    task.assignee?.avatar ||
    (assigneeName
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          assigneeName
        )}&background=0B0B0C&color=C6F432`
      : null);

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
      <div
        onClick={() => onClick?.(task)}
        className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#C6F432] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
      >
        {/* Top Bar: Category / Tags & Action Dropdown */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="text-zinc-400 group-hover:text-[#0B0B0C] transition-colors p-0.5">
                <GripVertical className="w-3.5 h-3.5" />
              </div>
              {displayCategory && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                  {displayCategory}
                </span>
              )}
            </div>

            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
              <GlassDropdown
                trigger={
                  <button
                    type="button"
                    className="p-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-[#0B0B0C] transition-colors focus:outline-none"
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
          <h4 className="text-sm font-bold text-[#0B0B0C] group-hover:text-black transition-colors leading-snug">
            {title}
          </h4>

          {description && (
            <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed font-normal">
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
        <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2.5">
          {/* Task Progress */}
          <TaskProgress progress={computedProgress} showLabel />

          {/* Assignee Avatar & Due Date */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {assigneeName ? (
              <div className="flex items-center gap-2 truncate">
                <img
                  src={avatarUrl}
                  alt={assigneeName}
                  className="w-5 h-5 rounded-full object-cover border border-zinc-200 shrink-0"
                />
                <span className="text-[11px] text-zinc-700 truncate font-semibold">
                  {assigneeName}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-zinc-400 font-medium">Unassigned</span>
            )}

            {formattedDueDate && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                <Calendar className="w-3 h-3 text-[#0B0B0C]" />
                <span>{formattedDueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
