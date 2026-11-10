import { AlertOctagon, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";

/**
 * TaskPriorityBadge - Quixotic Task Priority Pill
 * 
 * @param {string} priority - Priority value ('critical', 'high', 'medium', 'low')
 * @param {string} className - Additional CSS classes
 */
export const TaskPriorityBadge = ({
  priority = "medium",
  className = "",
}) => {
  const p = (priority || "").toLowerCase();

  if (p === "critical") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 ${className}`}
      >
        <AlertOctagon className="w-3 h-3" />
        Critical
      </span>
    );
  }

  if (p === "high") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 ${className}`}
      >
        <AlertCircle className="w-3 h-3" />
        High
      </span>
    );
  }

  if (p === "medium") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-700 border border-blue-500/20 ${className}`}
      >
        <ArrowUp className="w-3 h-3" />
        Medium
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-500/10 text-zinc-600 border border-zinc-500/20 ${className}`}
    >
      <ArrowDown className="w-3 h-3" />
      Low
    </span>
  );
};

export default TaskPriorityBadge;
