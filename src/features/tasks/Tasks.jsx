import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TasksHeader from "./components/TasksHeader";
import TaskStats from "./components/TaskStats";
import TaskBoard from "./components/TaskBoard";
import TaskData from "./data/TaskData";

/**
 * Tasks - Apple Liquid Glass Executive Tasks Workspace
 */
const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  const rawTasks = useMemo(() => {
    if (Array.isArray(TaskData)) return TaskData;
    if (Array.isArray(TaskData?.tasks)) return TaskData.tasks;
    return [];
  }, []);

  const taskStats = TaskData?.stats ?? [];

  const filteredTasks = useMemo(() => {
    return [...rawTasks]
      .filter((task) => {
        if (statusFilter !== "all") {
          if ((task.status || "").toLowerCase() !== statusFilter.toLowerCase()) {
            return false;
          }
        }

        if (priorityFilter !== "all") {
          if ((task.priority || "").toLowerCase() !== priorityFilter.toLowerCase()) {
            return false;
          }
        }

        if (!searchTerm) return true;

        const query = searchTerm.toLowerCase();

        return (
          (task.title || "").toLowerCase().includes(query) ||
          (task.description || "").toLowerCase().includes(query) ||
          (task.category || "").toLowerCase().includes(query) ||
          (task.assignee?.name || "").toLowerCase().includes(query) ||
          (task.tags || []).some((tag) =>
            tag.toLowerCase().includes(query)
          )
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "priority": {
            const weights = {
              critical: 4,
              high: 3,
              medium: 2,
              low: 1,
            };

            return (
              (weights[(b.priority || "").toLowerCase()] || 0) -
              (weights[(a.priority || "").toLowerCase()] || 0)
            );
          }

          case "progress":
            return (b.progress || 0) - (a.progress || 0);

          case "dueDate":
            return new Date(a.dueDate) - new Date(b.dueDate);

          default:
            return (a.title || "").localeCompare(b.title || "");
        }
      });
  }, [
    rawTasks,
    searchTerm,
    statusFilter,
    priorityFilter,
    sortBy,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
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
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1600px] space-y-6 select-none"
      >
        <motion.div variants={itemVariants}>
          <TasksHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TaskStats
            tasks={rawTasks}
            statsData={taskStats}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TaskBoard tasks={filteredTasks} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Tasks;