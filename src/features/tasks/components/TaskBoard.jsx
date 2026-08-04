import React from "react";
import { motion } from "framer-motion";
import TaskColumn from "./TaskColumn";
import { Circle, Clock, Eye, CheckCircle2 } from "lucide-react";

/**
 * TaskBoard - Apple Liquid Glass Central Kanban Workspace
 * Renders agile workflow columns (To Do, In Progress, Review, Completed) with floating glass depth.
 * 
 * @param {Array<object>} tasks - List of task objects to distribute into columns
 * @param {function} onTaskClick - Task selection callback
 */
export const TaskBoard = ({ tasks = [], onTaskClick }) => {
  // Kanban Column Definitions
  const columns = [
    {
      id: "todo",
      title: "To Do",
      icon: Circle,
      accent: "slate",
      statusKeys: ["todo", "to-do", "to_do"],
    },
    {
      id: "in-progress",
      title: "In Progress",
      icon: Clock,
      accent: "blue",
      statusKeys: ["in-progress", "in_progress", "inprogress"],
    },
    {
      id: "review",
      title: "Review",
      icon: Eye,
      accent: "purple",
      statusKeys: ["review", "in-review"],
    },
    {
      id: "completed",
      title: "Completed",
      icon: CheckCircle2,
      accent: "emerald",
      statusKeys: ["completed", "done"],
    },
  ];

  // Helper: Filter tasks for a specific column
  const getTasksForColumn = (statusKeys) => {
    return tasks.filter((t) => {
      const s = (t.status || "").toLowerCase().replace(/\s+/g, "-");
      return statusKeys.some((k) => s === k);
    });
  };

  // Staggered Entrance Motion
  const boardVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={boardVariants}
      initial="hidden"
      animate="show"
      className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start"
    >
      {columns.map((column) => {
        const columnTasks = getTasksForColumn(column.statusKeys);
        return (
          <TaskColumn
            key={column.id}
            id={column.id}
            title={column.title}
            icon={column.icon}
            accent={column.accent}
            tasks={columnTasks}
            onTaskClick={onTaskClick}
          />
        );
      })}
    </motion.div>
  );
};

export default TaskBoard;