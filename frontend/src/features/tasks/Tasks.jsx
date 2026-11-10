import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Plus, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import TasksHeader from "./components/TasksHeader";
import TaskStats from "./components/TaskStats";
import TaskBoard from "./components/TaskBoard";
import CreateTaskModal from "./components/CreateTaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";

import { taskService } from "../../services/taskService";
import TaskData from "./data/TaskData";

/**
 * Tasks - Executive Quixotic Tasks Workspace
 * Strictly aligned with Dashboard styling and theme:
 * - 60% Midnight Black (#0B0B0C) at top, 30% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalStatus, setCreateModalStatus] = useState("TODO");
  const [selectedTask, setSelectedTask] = useState(null);

  // Live second-by-second ticker for current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = useMemo(() => {
    const dateStr = currentDateTime.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = currentDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${dateStr} • ${timeStr}`;
  }, [currentDateTime]);

  // Auto-trigger create modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsCreateModalOpen(true);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("new");
        return next;
      }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [tasksRes, statsRes] = await Promise.allSettled([
        taskService.getAllTasks(),
        taskService.getTaskStats(),
      ]);

      if (tasksRes.status === "fulfilled" && tasksRes.value) {
        const resData = tasksRes.value.data ?? tasksRes.value;
        const liveTasks = Array.isArray(resData)
          ? resData
          : resData.tasks || [];
        setTasks(liveTasks.length > 0 ? liveTasks : TaskData);
      } else {
        setTasks(TaskData);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setTaskStats(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to fetch task workspace data:", err);
      setTasks(TaskData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Drag and Drop Column Reorder
  const handleDropTask = async (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.reorderTask(taskId, newStatus, 0);
      const statsRes = await taskService.getTaskStats();
      if (statsRes?.data) setTaskStats(statsRes.data);
    } catch (err) {
      console.error("Failed to reorder task:", err);
      fetchData();
    }
  };

  // Quick Status Transition
  const handleStatusChange = async (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.updateTask(taskId, { status: newStatus });
      const statsRes = await taskService.getTaskStats();
      if (statsRes?.data) setTaskStats(statsRes.data);
    } catch (err) {
      console.error("Failed to change task status:", err);
      fetchData();
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }

    try {
      await taskService.deleteTask(taskId);
      const statsRes = await taskService.getTaskStats();
      if (statsRes?.data) setTaskStats(statsRes.data);
    } catch (err) {
      console.error("Failed to delete task:", err);
      fetchData();
    }
  };

  // Task Created Callback
  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    taskService.getTaskStats().then((res) => {
      if (res?.data) setTaskStats(res.data);
    });
  };

  // Task Updated Callback
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(updatedTask);
    taskService.getTaskStats().then((res) => {
      if (res?.data) setTaskStats(res.data);
    });
  };

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        if (statusFilter !== "all") {
          const s = (task.status || "").toLowerCase().replace(/[\s_]+/g, "-");
          const target = statusFilter.toLowerCase().replace(/[\s_]+/g, "-");
          if (s !== target) return false;
        }

        if (priorityFilter !== "all") {
          if ((task.priority || "").toLowerCase() !== priorityFilter.toLowerCase()) {
            return false;
          }
        }

        if (!searchTerm) return true;

        const query = searchTerm.toLowerCase();
        const assigneeName = task.assignee
          ? `${task.assignee.firstName || ""} ${task.assignee.lastName || ""}`.toLowerCase()
          : typeof task.assignee === "string"
          ? task.assignee.toLowerCase()
          : "";

        return (
          (task.title || "").toLowerCase().includes(query) ||
          (task.description || "").toLowerCase().includes(query) ||
          (task.project?.title || "").toLowerCase().includes(query) ||
          (task.category || "").toLowerCase().includes(query) ||
          assigneeName.includes(query) ||
          (task.tags || []).some((tag) => tag.toLowerCase().includes(query))
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
          case "progress": {
            const calcA =
              Array.isArray(a.subtasks) && a.subtasks.length > 0
                ? (a.subtasks.filter((s) => s.completed).length / a.subtasks.length) * 100
                : a.status === "COMPLETED"
                ? 100
                : 0;
            const calcB =
              Array.isArray(b.subtasks) && b.subtasks.length > 0
                ? (b.subtasks.filter((s) => s.completed).length / b.subtasks.length) * 100
                : b.status === "COMPLETED"
                ? 100
                : 0;
            return calcB - calcA;
          }
          case "dueDate": {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          default:
            return (a.title || "").localeCompare(b.title || "");
        }
      });
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] pb-16 transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
      }}
    >
      {/* Top Floating Rounded Pill Navbar */}
      <QuixoticTopNavbar />

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Tasks Canvas */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Title & Status */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Task</span>
                <span className="text-[#C6F432]">Command Center</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>Active Kanban Flow • Drag-and-drop agile task execution</span>
              </p>
            </div>

            {/* Current Date & Time Pill + Lime Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              {/* Primary Action Button: Lime Green */}
              <button
                type="button"
                onClick={() => {
                  setCreateModalStatus("TODO");
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Task</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <TaskStats tasks={tasks} statsData={taskStats} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <TasksHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onCreateClick={() => {
                setCreateModalStatus("TODO");
                setIsCreateModalOpen(true);
              }}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: Kanban Board */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="pt-2"
          >
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center text-[#C6F432] gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium text-zinc-400">
                  Synchronizing Kanban state...
                </span>
              </div>
            ) : (
              <TaskBoard
                tasks={filteredTasks}
                onTaskClick={(task) => setSelectedTask(task)}
                onDropTask={handleDropTask}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
                onQuickAdd={(columnKey) => {
                  setCreateModalStatus(columnKey);
                  setIsCreateModalOpen(true);
                }}
              />
            )}
          </motion.div>
        </main>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        defaultStatus={createModalStatus}
      />

      {/* Task Details & Subtasks Modal */}
      <TaskDetailsModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleDeleteTask}
      />
    </div>
  );
};

export default Tasks;
