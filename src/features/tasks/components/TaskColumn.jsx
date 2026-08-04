import React from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import TaskCard from "./TaskCard";
import { Inbox } from "lucide-react";

/**
 * TaskColumn - Apple Liquid Glass Floating Column Surface
 * Container panel for agile kanban task cards with sticky headers, task counters, and column accents.
 * 
 * @param {string} id - Column identifier
 * @param {string} title - Column header title
 * @param {React.ReactNode} icon - Column header icon component
 * @param {'slate' | 'blue' | 'purple' | 'emerald'} accent - Column theme accent
 * @param {Array<object>} tasks - Task cards assigned to this column
 * @param {function} onTaskClick - Task card selection callback
 */
export const TaskColumn = ({
  id,
  title,
  icon: Icon,
  accent = "slate",
  tasks = [],
  onTaskClick,
}) => {
  // Column Accent Badge Variants
  const badgeVariants = {
    slate: "default",
    blue: "primary",
    purple: "purple",
    emerald: "success",
  };

  // Stagger Motion Variants for Column Cards
  const columnVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 22,
      },
    },
  };

  return (
    <motion.div variants={columnVariants} className="w-full">
      <GlassPanel
        variant="default"
        padding="none"
        className="flex flex-col min-h-130 max-h-200 relative overflow-hidden"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 px-5 py-4 bg-slate-950/70 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
              </div>
            )}
            <h3 className="text-sm font-semibold text-white tracking-tight">
              {title}
            </h3>
          </div>

          <GlassBadge variant={badgeVariants[accent] || "default"} size="sm">
            {tasks.length}
          </GlassBadge>
        </div>

        {/* Scrollable Task Cards Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <TaskCard
                key={task.id || idx}
                task={task}
                onClick={() => onTaskClick && onTaskClick(task)}
              />
            ))
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center text-slate-500">
              <Inbox className="w-8 h-8 mb-2 stroke-[1.5]" />
              <span className="text-xs font-medium">No tasks in {title}</span>
            </div>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default TaskColumn;