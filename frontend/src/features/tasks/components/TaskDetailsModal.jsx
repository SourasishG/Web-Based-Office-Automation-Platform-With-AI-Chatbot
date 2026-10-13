import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Circle,
  Trash2,
  Plus,
  Sparkles,
  Loader2,
  FolderKanban,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  GlassModal,
  GlassButton,
  GlassAvatar,
  GlassInput,
} from "../../../components/ui";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskProgress from "./TaskProgress";
import { taskService } from "../../../services/taskService";
import { aiService } from "../../../services/aiService";

export const TaskDetailsModal = ({
  isOpen,
  onClose,
  task,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  const [currentTask, setCurrentTask] = useState(task);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [status, setStatus] = useState("TODO");
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
      setSubtasks(Array.isArray(task.subtasks) ? task.subtasks : []);
      setStatus(task.status || "TODO");
      setNewSubtaskTitle("");
      setError("");
      setAiMessage("");
    }
  }, [task]);

  if (!currentTask) return null;

  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const progressPercent = totalSubtasks > 0
    ? Math.round((completedSubtasks / totalSubtasks) * 100)
    : status === "COMPLETED"
    ? 100
    : status === "REVIEW"
    ? 80
    : status === "IN_PROGRESS"
    ? 45
    : 0;

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return;
    try {
      setStatus(newStatus);
      const res = await taskService.updateTask(currentTask.id, { status: newStatus });
      const updated = res?.data || { ...currentTask, status: newStatus };
      setCurrentTask(updated);
      if (onTaskUpdated) onTaskUpdated(updated);
    } catch (err) {
      console.error("Failed to update status:", err);
      setStatus(currentTask.status);
      setError("Failed to update status");
    }
  };

  const handleToggleSubtask = async (subtaskId) => {
    const updatedSubtasks = subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    setSubtasks(updatedSubtasks);

    // Auto-update to COMPLETED if all subtasks are done
    const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every((st) => st.completed);
    const newStatus = allDone ? "COMPLETED" : status;

    try {
      const res = await taskService.updateTask(currentTask.id, {
        subtasks: updatedSubtasks,
        status: newStatus,
      });
      const updated = res?.data || { ...currentTask, subtasks: updatedSubtasks, status: newStatus };
      setCurrentTask(updated);
      if (allDone) setStatus("COMPLETED");
      if (onTaskUpdated) onTaskUpdated(updated);
    } catch (err) {
      console.error("Failed to update subtask:", err);
      setSubtasks(currentTask.subtasks || []);
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    const newSubtask = {
      id: `subtask-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    const updatedSubtasks = [...subtasks, newSubtask];
    setSubtasks(updatedSubtasks);
    setNewSubtaskTitle("");

    try {
      const res = await taskService.updateTask(currentTask.id, {
        subtasks: updatedSubtasks,
      });
      const updated = res?.data || { ...currentTask, subtasks: updatedSubtasks };
      setCurrentTask(updated);
      if (onTaskUpdated) onTaskUpdated(updated);
    } catch (err) {
      console.error("Failed to add subtask:", err);
    }
  };

  const handleRemoveSubtask = async (subtaskId) => {
    const updatedSubtasks = subtasks.filter((st) => st.id !== subtaskId);
    setSubtasks(updatedSubtasks);

    try {
      const res = await taskService.updateTask(currentTask.id, {
        subtasks: updatedSubtasks,
      });
      const updated = res?.data || { ...currentTask, subtasks: updatedSubtasks };
      setCurrentTask(updated);
      if (onTaskUpdated) onTaskUpdated(updated);
    } catch (err) {
      console.error("Failed to delete subtask:", err);
    }
  };

  const handleGenerateSubtasksHerric = async () => {
    try {
      setLoadingAi(true);
      setError("");
      setAiMessage("");

      const prompt = `Break down this task into 3 to 4 actionable, granular engineering/work subtasks for our team.
Task Title: "${currentTask.title}"
Task Description: "${currentTask.description || "N/A"}"

Return ONLY a valid JSON array of strings, for example:
["Write automated tests", "Update API endpoints", "Review security checks"]
Do not include explanations or markdown fences.`;

      const aiRes = await aiService.sendMessage(prompt);
      const reply = aiRes?.data?.reply || aiRes?.reply || "";

      let parsed = [];
      try {
        const cleaned = reply.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        // Fallback: split by lines
        parsed = reply
          .split("\n")
          .map((l) => l.replace(/^[-*•0-9.]+\s*/, "").trim())
          .filter(Boolean)
          .slice(0, 4);
      }

      if (Array.isArray(parsed) && parsed.length > 0) {
        const newGenerated = parsed.map((item, idx) => ({
          id: `ai-st-${Date.now()}-${idx}`,
          title: typeof item === "string" ? item : item.title || "Subtask",
          completed: false,
        }));

        const combined = [...subtasks, ...newGenerated];
        setSubtasks(combined);

        const res = await taskService.updateTask(currentTask.id, {
          subtasks: combined,
        });
        const updated = res?.data || { ...currentTask, subtasks: combined };
        setCurrentTask(updated);
        if (onTaskUpdated) onTaskUpdated(updated);
        setAiMessage(`Herric generated ${newGenerated.length} subtasks!`);
      }
    } catch (err) {
      console.error("Herric AI subtask generation error:", err);
      setError("Herric could not generate subtasks right now.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm(`Are you sure you want to delete "${currentTask.title}"?`)) {
      return;
    }
    try {
      setLoadingDelete(true);
      await taskService.deleteTask(currentTask.id);
      if (onTaskDeleted) onTaskDeleted(currentTask.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task");
    } finally {
      setLoadingDelete(false);
    }
  };

  const formattedDueDate = currentTask.dueDate
    ? new Date(currentTask.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const assigneeName = currentTask.assignee
    ? `${currentTask.assignee.firstName || ""} ${currentTask.assignee.lastName || ""}`.trim()
    : typeof currentTask.assignee === "string"
    ? currentTask.assignee
    : "Unassigned";

  const statusPills = [
    { key: "TODO", label: "To Do", icon: Circle },
    { key: "IN_PROGRESS", label: "In Progress", icon: Clock },
    { key: "REVIEW", label: "Review", icon: Eye },
    { key: "COMPLETED", label: "Completed", icon: CheckCircle2 },
  ];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={currentTask.title}
      subtitle={currentTask.project?.title || "Agile Task Workspace"}
      icon={CheckCircle2}
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <GlassButton
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={handleDeleteTask}
            disabled={loadingDelete}
          >
            {loadingDelete ? "Deleting..." : "Delete"}
          </GlassButton>

          <GlassButton variant="primary" size="sm" onClick={onClose}>
            Done
          </GlassButton>
        </div>
      }
    >
      <div className="space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {aiMessage && (
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>{aiMessage}</span>
          </div>
        )}

        {/* Status Switcher Bar */}
        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-2">
            Workflow Stage
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statusPills.map((p) => {
              const Icon = p.icon;
              const isActive = status === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handleStatusChange(p.key)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isActive
                      ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Priority & Meta Chips */}
        <div className="flex flex-wrap items-center gap-3 py-2 px-3.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Priority:</span>
            <TaskPriorityBadge priority={currentTask.priority} />
          </div>

          {currentTask.project && (
            <div className="flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs text-slate-200">
                {currentTask.project.title}
              </span>
            </div>
          )}

          {formattedDueDate && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-300 font-mono">
                {formattedDueDate}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {currentTask.description ? (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-1.5">Description</h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/10">
              {currentTask.description}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No description provided.</p>
        )}

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <TaskProgress progress={progressPercent} showLabel />
        </div>

        {/* Assignee Card */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <GlassAvatar
              src={currentTask.assignee?.avatarUrl}
              name={assigneeName}
              size="sm"
            />
            <div>
              <div className="text-xs font-semibold text-white">
                {assigneeName}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentTask.assignee?.jobTitle || currentTask.assignee?.email || "Assignee"}
              </div>
            </div>
          </div>
        </div>

        {/* Subtasks Checklist */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-white">
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </h4>
            </div>

            {/* AI Generator CTA */}
            <GlassButton
              variant="outline"
              size="xs"
              icon={loadingAi ? Loader2 : Sparkles}
              onClick={handleGenerateSubtasksHerric}
              disabled={loadingAi}
              className="text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10"
            >
              {loadingAi ? "Herric thinking..." : "Ask Herric to Generate"}
            </GlassButton>
          </div>

          {/* Add Subtask Input */}
          <div className="flex items-center gap-2">
            <GlassInput
              placeholder="Add step or criterion..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
              className="flex-1"
            />
            <GlassButton
              type="button"
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={handleAddSubtask}
            >
              Add
            </GlassButton>
          </div>

          {/* Subtasks List */}
          {subtasks.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  onClick={() => handleToggleSubtask(subtask.id)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                    subtask.completed
                      ? "bg-emerald-500/10 border-emerald-500/20 text-slate-400 line-through"
                      : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-cyan-400/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                        subtask.completed
                          ? "bg-emerald-500 border-emerald-400 text-black"
                          : "border-white/30 bg-slate-900/60"
                      }`}
                    >
                      {subtask.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs truncate">{subtask.title}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSubtask(subtask.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-4 italic">
              No subtasks yet. Click "Ask Herric" to auto-generate them!
            </p>
          )}
        </div>
      </div>
    </GlassModal>
  );
};

export default TaskDetailsModal;
