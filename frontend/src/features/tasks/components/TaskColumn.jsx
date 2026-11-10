import { useState, isValidElement } from "react";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { Inbox, Plus } from "lucide-react";

/**
 * TaskColumn - Quixotic Kanban Column Surface
 * Positioned in the lower 40% Pure White region with smooth drag-and-drop feedback.
 * 
 * @param {string} columnKey - Unique column key ('TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED')
 * @param {string} title - Column header title
 * @param {React.ReactNode} icon - Column header icon component
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
  tasks = [],
  onTaskClick,
  onDropTask,
  onStatusChange,
  onDeleteTask,
  onQuickAdd,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

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
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col min-h-130 max-h-200 rounded-3xl bg-zinc-50 border transition-all duration-200 overflow-hidden shadow-sm ${
          isDragOver
            ? "border-[#C6F432] ring-2 ring-[#C6F432]/60 bg-[#C6F432]/5"
            : "border-zinc-200/80"
        }`}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="w-7 h-7 rounded-xl bg-zinc-100 border border-zinc-200 text-[#0B0B0C] flex items-center justify-center shrink-0">
                {isValidElement(Icon) ? Icon : <Icon className="w-3.5 h-3.5 stroke-[2.2]" />}
              </div>
            )}
            <h3 className="text-sm font-bold text-[#0B0B0C] tracking-tight">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-[#0B0B0C] border border-zinc-200">
              {tasks.length}
            </span>

            {onQuickAdd && (
              <button
                type="button"
                onClick={() => onQuickAdd(columnKey)}
                title={`Add task to ${title}`}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-[#C6F432] text-zinc-600 hover:text-[#0B0B0C] border border-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Task Cards Body */}
        <div className="p-3.5 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
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
                isDragOver ? "text-[#0B0B0C]" : "text-zinc-400"
              }`}
            >
              <Inbox className="w-8 h-8 mb-2 stroke-[1.5]" />
              <span className="text-xs font-medium">
                {isDragOver ? `Drop to move to ${title}` : `No tasks in ${title}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskColumn;
