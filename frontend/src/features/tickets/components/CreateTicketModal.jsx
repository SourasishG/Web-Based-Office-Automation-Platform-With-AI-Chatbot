import { useState, useEffect } from "react";
import {
  Ticket,
  ShieldAlert,
  Sparkles,
  Building,
  CheckSquare,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassSelect } from "../../../components/ui/GlassSelect";
import { ticketService } from "../../../services/ticketService";
import { employeeService } from "../../../services/employeeService";

export const CreateTicketModal = ({
  isOpen = false,
  onClose,
  onTicketCreated,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SOFTWARE_TOOLS");
  const [priority, setPriority] = useState("HIGH");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setCategory("SOFTWARE_TOOLS");
      setPriority("HIGH");
      setDescription("");
      setAssigneeId("");
      setError("");

      employeeService
        .getAllEmployees()
        .then((res) => {
          const list = res?.data?.employees || res?.data || [];
          setEmployees(list);
        })
        .catch((err) => console.warn("Failed to load employees for ticket modal:", err));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please fill out both the ticket title and description.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        assigneeId: assigneeId || undefined,
      };

      const res = await ticketService.createTicket(payload);
      const createdTicket = res?.data || res;
      if (onTicketCreated) {
        onTicketCreated(createdTicket);
      }
      onClose();
    } catch (err) {
      console.error("Failed to submit ticket:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit ticket to helpdesk."
      );
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "SOFTWARE_TOOLS", label: "Software & Tools" },
    { value: "ACCESS_SECURITY", label: "Access & Security" },
    { value: "INFRASTRUCTURE", label: "IT Infrastructure" },
    { value: "FACILITIES", label: "Facilities & Workplace" },
    { value: "HR_OPS", label: "HR Operations" },
  ];

  const priorityOptions = [
    { value: "CRITICAL", label: "Critical Priority (SLA: 4 hrs)" },
    { value: "HIGH", label: "High Priority (SLA: 12 hrs)" },
    { value: "MEDIUM", label: "Medium Priority (SLA: 24 hrs)" },
    { value: "LOW", label: "Low Priority (SLA: 72 hrs)" },
  ];

  const assigneeOptions = [
    { value: "", label: "Auto-assign to IT Pool" },
    ...employees.map((e) => ({
      value: e.id,
      label: `${e.firstName || ""} ${e.lastName || ""}`.trim() || e.email,
    })),
  ];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit IT Support Ticket"
      subtitle="Log technical issues, software requests, access permissions, or facility tickets."
      icon={Ticket}
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <GlassButton
            variant="ghost"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </GlassButton>
          <GlassButton
            variant="primary"
            type="button"
            icon={loading ? Loader2 : Sparkles}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Ticket"}
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

        {/* Ticket Title */}
        <GlassInput
          label="Ticket Title *"
          icon={CheckSquare}
          placeholder="e.g. VPN Access Timeout & SSL Certificate Error"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Category & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassSelect
            label="Category Tag"
            icon={Building}
            options={categoryOptions}
            value={category}
            onChange={(val) => setCategory(val)}
          />

          <GlassSelect
            label="Priority Level"
            icon={ShieldAlert}
            options={priorityOptions}
            value={priority}
            onChange={(val) => setPriority(val)}
          />
        </div>

        {/* Assignee Picker */}
        <GlassSelect
          label="Assign Support Engineer (Optional)"
          icon={User}
          options={assigneeOptions}
          value={assigneeId}
          onChange={(val) => setAssigneeId(val)}
          searchable
          placeholder="Select an engineer..."
        />

        {/* Detailed Issue Description */}
        <GlassTextarea
          label="Detailed Description *"
          placeholder="Describe the issue, error messages, or requested software access..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </form>
    </GlassModal>
  );
};

export default CreateTicketModal;
