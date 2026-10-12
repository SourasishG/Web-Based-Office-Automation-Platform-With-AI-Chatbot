import { useState, isValidElement } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import TaskCard from "./TaskCard";
import { Inbox, Plus } from "lucide-react";

/**
 * TaskColumn - Apple Liquid Glass Floating Column Surface
 * Container panel for agile kanban task cards with sticky headers, task counters, and drag-and-drop support.
 * 
 * @param {string} columnKey - Unique column key ('TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED')
 * @param {string} title - Column header title
 * @param {React.ReactNode} icon - Column header icon component
 * @param {'slate' | 'blue' | 'purple' | 'emerald'} accent - Column theme accent
 * @param {Array<object>} tasks - Task cards assigned to this column
 * @param {function} onTaskClick - Task card selection callback
 * @param {function} onDropTask - Drop handler (taskId, targetColumnKey) => void
 * @param {function} onStatusChange - Quick status change callback
 * @param {function} onDeleteTask - Delete task callback
 * @param {function} onQuickAdd - Quick add task to this column
 */
export const TaskColumn = ({
  columnKey,
  title,
  icon: Icon,
  accent = "slate",
  tasks = [],
  onTaskClick,
  onDropTask,
  onStatusChange,
  onDeleteTask,
  onQuickAdd,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Column Accent Badge Variants
  const badgeVariants = {
    slate: "default",
    blue: "primary",
    purple: "purple",
    emerald: "success",
  };

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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId && onDropTask) {
      onDropTask(taskId, columnKey);
    }
  };

  return (
    <motion.div variants={columnVariants} className="w-full">
      <GlassPanel
        variant="default"
        padding="none"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col min-h-130 max-h-200 relative overflow-hidden transition-all duration-200 ${
          isDragOver
            ? "border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400"
            : ""
        }`}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 px-5 py-4 bg-slate-950/70 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                {isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
              </div>
            )}
            <h3 className="text-sm font-semibold text-white tracking-tight">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <GlassBadge variant={badgeVariants[accent] || "default"} size="sm">
              {tasks.length}
            </GlassBadge>

            {onQuickAdd && (
              <button
                type="button"
                onClick={() => onQuickAdd(columnKey)}
                title={`Add task to ${title}`}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Task Cards Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1 custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <TaskCard
                key={task.id || idx}
                task={task}
                onClick={() => onTaskClick && onTaskClick(task)}
                onStatusChange={onStatusChange}
                onDelete={onDeleteTask}
              />
            ))
          ) : (
            <div
              className={`py-16 flex flex-col items-center justify-center text-center transition-colors ${
                isDragOver ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              <Inbox className="w-8 h-8 mb-2 stroke-[1.5]" />
              <span className="text-xs font-medium">
                {isDragOver ? `Drop to move to ${title}` : `No tasks in ${title}`}
              </span>
            </div>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default TaskColumn;