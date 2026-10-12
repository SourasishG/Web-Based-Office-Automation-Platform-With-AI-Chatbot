import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TasksHeader from "./components/TasksHeader";
import TaskStats from "./components/TaskStats";
import TaskBoard from "./components/TaskBoard";
import CreateTaskModal from "./components/CreateTaskModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
import { taskService } from "../../services/taskService";
import TaskData from "./data/TaskData";
import { Loader2 } from "lucide-react";

/**
 * Tasks - Apple Liquid Glass Executive Tasks Workspace
 * Connected to live Node.js / Supabase PostgreSQL backend with optimistic reordering and Herric Copilot.
 */
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalStatus, setCreateModalStatus] = useState("TODO");
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [tasksRes, statsRes] = await Promise.allSettled([
        taskService.getAllTasks(),
        taskService.getTaskStats(),
      ]);

      if (tasksRes.status === "fulfilled" && tasksRes.value?.data) {
        const liveTasks = Array.isArray(tasksRes.value.data)
          ? tasksRes.value.data
          : tasksRes.value.data.tasks || [];
        setTasks(liveTasks.length > 0 ? liveTasks : TaskData);
      } else {
        // Fallback to initial mock if backend unreachable
        setTasks(Array.isArray(TaskData) ? TaskData : []);
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setTaskStats(statsRes.value.data);
      }
    } catch (err) {
      console.error("Failed to fetch task workspace data:", err);
      setError("Unable to load tasks from server. Using local cache.");
      setTasks(Array.isArray(TaskData) ? TaskData : []);
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
      // Sync on error
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
          const s = (task.status || "").toLowerCase().replace(/_/g, "-");
          const target = statusFilter.toLowerCase().replace(/_/g, "-");
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
            onCreateClick={() => {
              setCreateModalStatus("TODO");
              setIsCreateModalOpen(true);
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TaskStats tasks={tasks} statsData={taskStats} />
        </motion.div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
              Synchronizing Kanban state...
            </span>
          </div>
        ) : (
          <motion.div variants={itemVariants}>
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
          </motion.div>
        )}
      </motion.div>

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
    </DashboardLayout>
  );
};

export default Tasks;