import React from "react";
import { AlertOctagon, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * TaskPriorityBadge - Apple Liquid Glass Task Priority Indicator
 * Renders priority classification badges with distinct neon glass tints, glowing borders, and icons.
 * 
 * @param {string} priority - Priority value ('critical', 'high', 'medium', 'low')
 * @param {'sm' | 'md' | 'lg'} size - Badge size preset
 * @param {string} className - Additional CSS classes
 */
export const TaskPriorityBadge = ({
  priority = "medium",
  size = "sm",
  className = "",
}) => {
  const p = (priority || "").toLowerCase();

  if (p === "critical") {
    return (
      <GlassBadge
        variant="danger"
        size={size}
        icon={AlertOctagon}
        glow
        className={className}
      >
        Critical
      </GlassBadge>
    );
  }

  if (p === "high") {
    return (
      <GlassBadge
        variant="danger"
        size={size}
        icon={AlertCircle}
        className={className}
      >
        High
      </GlassBadge>
    );
  }

  if (p === "medium") {
    return (
      <GlassBadge
        variant="warning"
        size={size}
        icon={ArrowUp}
        className={className}
      >
        Medium
      </GlassBadge>
    );
  }

  return (
    <GlassBadge
      variant="ghost"
      size={size}
      icon={ArrowDown}
      className={className}
    >
      Low
    </GlassBadge>
  );
};

export default TaskPriorityBadge;