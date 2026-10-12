import { useState, useEffect, useCallback } from "react";
import {
  CheckSquare,
  User,
  FolderKanban,
  AlertCircle,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  GlassModal,
  GlassInput,
  GlassTextarea,
  GlassSelect,
  GlassButton,
} from "../../../components/ui";
import { taskService } from "../../../services/taskService";
import { projectService } from "../../../services/projectService";
import { employeeService } from "../../../services/employeeService";

export const CreateTaskModal = ({
  isOpen,
  onClose,
  onTaskCreated,
  defaultStatus = "TODO",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [error, setError] = useState("");

  const loadDropdownData = useCallback(async () => {
    try {
      setLoadingOptions(true);
      const [projRes, empRes] = await Promise.allSettled([
        projectService.getAllProjects(),
        employeeService.getAllEmployees(),
      ]);

      if (projRes.status === "fulfilled" && projRes.value?.data) {
        setProjects(projRes.value.data.projects || projRes.value.data || []);
      }
      if (empRes.status === "fulfilled" && empRes.value?.data) {
        setEmployees(empRes.value.data.employees || empRes.value.data || []);
      }
    } catch (err) {
      console.error("Failed to load options for task modal:", err);
    } finally {
      setLoadingOptions(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setStatus(defaultStatus || "TODO");
      setPriority("MEDIUM");
      setDueDate("");
      setProjectId("");
      setAssigneeId("");
      setSubtasks([]);
      setNewSubtaskTitle("");
      setError("");

      loadDropdownData();
    }
  }, [isOpen, defaultStatus, loadDropdownData]);

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setSubtasks((prev) => [
      ...prev,
      {
        id: `subtask-${Date.now()}`,
        title: newSubtaskTitle.trim(),
        completed: false,
      },
    ]);
    setNewSubtaskTitle("");
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        projectId: projectId || undefined,
        assigneeId: assigneeId || undefined,
        subtasks,
      };

      const res = await taskService.createTask(payload);
      const createdTask = res?.data || res;
      if (onTaskCreated) {
        onTaskCreated(createdTask);
      }
      onClose();
    } catch (err) {
      console.error("Failed to create task:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "TODO", label: "To Do" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "REVIEW", label: "Review" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "LOW", label: "Low Priority" },
    { value: "MEDIUM", label: "Medium Priority" },
    { value: "HIGH", label: "High Priority" },
    { value: "CRITICAL", label: "Critical Priority" },
  ];

  const projectOptions = [
    { value: "", label: "No Project (Standalone)" },
    ...projects.map((p) => ({
      value: p.id,
      label: p.title || p.name,
    })),
  ];

  const assigneeOptions = [
    { value: "", label: "Unassigned" },
    ...employees.map((e) => ({
      value: e.id,
      label: `${e.firstName || ""} ${e.lastName || ""}`.trim() || e.email,
    })),
  ];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      subtitle="Dispatch a new agile deliverable to your workspace"
      icon={CheckSquare}
      maxWidth="lg"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <GlassButton variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </GlassButton>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={loading}
            icon={loading ? Loader2 : Plus}
          >
            {loading ? "Creating..." : "Create Task"}
          </GlassButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <GlassInput
          label="Task Title *"
          placeholder="e.g., Implement OAuth2 Provider Flow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <GlassTextarea
          label="Description"
          placeholder="Add comprehensive specifications, acceptance criteria, or context..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassSelect
            label="Initial Status"
            options={statusOptions}
            value={status}
            onChange={(val) => setStatus(val)}
          />

          <GlassSelect
            label="Priority Level"
            options={priorityOptions}
            value={priority}
            onChange={(val) => setPriority(val)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassSelect
            label="Associated Project"
            options={projectOptions}
            value={projectId}
            onChange={(val) => setProjectId(val)}
            searchable
            placeholder="Select Project..."
            icon={FolderKanban}
          />

          <GlassSelect
            label="Assignee"
            options={assigneeOptions}
            value={assigneeId}
            onChange={(val) => setAssigneeId(val)}
            searchable
            placeholder="Assign to team member..."
            icon={User}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1.5">
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="pt-2 border-t border-white/10">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
            <span>Actionable Subtasks ({subtasks.length})</span>
            <span className="text-[11px] text-slate-400">Optional</span>
          </label>

          <div className="flex items-center gap-2 mb-3">
            <GlassInput
              placeholder="e.g. Write integration test suite"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
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

          {subtasks.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {subtasks.map((subtask, idx) => (
                <div
                  key={subtask.id || idx}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200"
                >
                  <span className="truncate">{subtask.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </GlassModal>
  );
};

export default CreateTaskModal;
