import React from "react";
import { Circle, Eye, CheckCircle2 } from "lucide-react";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * TaskStatusBadge - Apple Liquid Glass Task Status Badge
 * Renders status badges across To Do, In Progress, Review, and Completed lifecycle states.
 * 
 * @param {string} status - Task status value ('todo', 'in-progress', 'review', 'completed')
 * @param {'sm' | 'md' | 'lg'} size - Badge size preset
 * @param {string} className - Additional CSS classes
 */
export const TaskStatusBadge = ({
  status = "todo",
  size = "sm",
  className = "",
}) => {
  const s = (status || "").toLowerCase().replace(/\s+/g, "-");

  if (s === "in-progress" || s === "in_progress" || s === "inprogress") {
    return (
      <GlassBadge
        variant="cyan"
        size={size}
        dot
        glow
        className={className}
      >
        In Progress
      </GlassBadge>
    );
  }

  if (s === "review" || s === "in-review") {
    return (
      <GlassBadge
        variant="purple"
        size={size}
        icon={Eye}
        className={className}
      >
        Review
      </GlassBadge>
    );
  }

  if (s === "completed" || s === "done") {
    return (
      <GlassBadge
        variant="success"
        size={size}
        icon={CheckCircle2}
        className={className}
      >
        Completed
      </GlassBadge>
    );
  }

  return (
    <GlassBadge
      variant="default"
      size={size}
      icon={Circle}
      className={className}
    >
      To Do
    </GlassBadge>
  );
};

export default TaskStatusBadge;