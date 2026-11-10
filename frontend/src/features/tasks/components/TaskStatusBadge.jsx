import { Circle, Eye, CheckCircle2, Clock } from "lucide-react";

/**
 * TaskStatusBadge - Quixotic Task Status Pill
 * 
 * @param {string} status - Task status value ('todo', 'in-progress', 'review', 'completed')
 * @param {string} className - Additional CSS classes
 */
export const TaskStatusBadge = ({
  status = "todo",
  className = "",
}) => {
  const s = (status || "").toLowerCase().replace(/[\s_]+/g, "-");

  if (s === "in-progress" || s === "inprogress") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/25 ${className}`}
      >
        <Clock className="w-3 h-3" />
        In Progress
      </span>
    );
  }

  if (s === "review" || s === "in-review") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-700 border border-purple-500/25 ${className}`}
      >
        <Eye className="w-3 h-3" />
        Review
      </span>
    );
  }

  if (s === "completed" || s === "done") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50 ${className}`}
      >
        <CheckCircle2 className="w-3 h-3 text-[#386b03]" />
        Completed
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-500/10 text-zinc-600 border border-zinc-500/20 ${className}`}
    >
      <Circle className="w-3 h-3" />
      To Do
    </span>
  );
};

export default TaskStatusBadge;
