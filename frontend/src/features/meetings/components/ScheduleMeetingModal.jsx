import { useState, useEffect } from "react";
import {
  Video,
  Calendar,
  Clock,
  Link,
  Users,
  AlertCircle,
  Plus,
  Check,
} from "lucide-react";
import {
  GlassModal,
  GlassInput,
  GlassTextarea,
  GlassSelect,
  GlassButton,
  GlassAvatar,
} from "../../../components/ui";
import { meetingService } from "../../../services/meetingService";
import { employeeService } from "../../../services/employeeService";

export const ScheduleMeetingModal = ({
  isOpen = false,
  onClose,
  onMeetingCreated,
  initialDate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("10:30 AM");
  const [platform, setPlatform] = useState("GOOGLE_MEET");
  const [meetingLink, setMeetingLink] = useState("");
  const [selectedAttendeeIds, setSelectedAttendeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setDate(initialDate || new Date().toISOString().split("T")[0]);
      setStartTime("10:00 AM");
      setEndTime("10:30 AM");
      setPlatform("GOOGLE_MEET");
      // Auto-generate realistic meeting code
      const code = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
      setMeetingLink(`https://meet.google.com/${code}`);
      setSelectedAttendeeIds([]);
      setError("");

      employeeService
        .getAllEmployees()
        .then((res) => {
          const list =
            res?.employees ||
            res?.data?.employees ||
            (Array.isArray(res) ? res : res?.data || []);
          setEmployees(Array.isArray(list) ? list : []);
        })
        .catch((err) => console.warn("Failed to load employees for meeting:", err));
    }
  }, [isOpen, initialDate]);

  const toggleAttendee = (id) => {
    setSelectedAttendeeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePlatformChange = (newPlatform) => {
    setPlatform(newPlatform);
    const code = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    if (newPlatform === "ZOOM") {
      setMeetingLink(`https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    } else if (newPlatform === "TEAMS") {
      setMeetingLink(`https://teams.microsoft.com/l/meetup-join/${code}`);
    } else {
      setMeetingLink(`https://meet.google.com/${code}`);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime) {
      setError("Please fill in meeting title, date, and schedule times.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let formattedLink = meetingLink?.trim();
      if (formattedLink && !/^https?:\/\//i.test(formattedLink)) {
        formattedLink = `https://${formattedLink}`;
      }

      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        date: new Date(date).toISOString(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        platform,
        meetingLink: formattedLink || undefined,
        status: "SCHEDULED",
        attendeeIds: selectedAttendeeIds.length > 0 ? selectedAttendeeIds : undefined,
      };

      const res = await meetingService.createMeeting(payload);
      const created = res?.data || res;
      if (onMeetingCreated) onMeetingCreated(created);
      onClose();
    } catch (err) {
      console.error("Failed to schedule meeting:", err);
      const msg =
        err.errors?.[0]?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to schedule meeting.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const platformOptions = [
    { value: "GOOGLE_MEET", label: "Google Meet" },
    { value: "ZOOM", label: "Zoom Video" },
    { value: "TEAMS", label: "Microsoft Teams" },
  ];

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Workspace Sync"
      subtitle="Create a video sync and invite team members"
      icon={Video}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <GlassButton variant="ghost" onClick={onClose} isDisabled={loading}>
            Cancel
          </GlassButton>
          <GlassButton
            variant="primary"
            type="submit"
            form="schedule-meeting-form"
            onClick={handleSubmit}
            isDisabled={loading}
            isLoading={loading}
            icon={Plus}
          >
            {loading ? "Scheduling..." : "Schedule Sync"}
          </GlassButton>
        </div>
      }
    >
      <form id="schedule-meeting-form" onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <GlassInput
          label="Meeting Title *"
          placeholder="e.g. Q4 Sprint Planning & Product Review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Start Time
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="10:00 AM"
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> End Time
            </label>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="10:30 AM"
              className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassSelect
            label="Video Platform"
            options={platformOptions}
            value={platform}
            onChange={handlePlatformChange}
          />

          <GlassInput
            label="Meeting URL"
            icon={Link}
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </div>

        <GlassTextarea
          label="Agenda & Notes"
          placeholder="Meeting agenda items, deliverables to discuss, or prep material..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Invite Team Members */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" /> Invite Colleagues ({selectedAttendeeIds.length})
            </span>
            <span className="text-[11px] text-slate-400">Optional</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
            {employees.map((emp) => {
              const isSelected = selectedAttendeeIds.includes(emp.id);
              const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || emp.email;
              return (
                <div
                  key={emp.id}
                  onClick={() => toggleAttendee(emp.id)}
                  className={`flex items-center justify-between gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-400 text-white"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <GlassAvatar
                      src={emp.avatarUrl}
                      name={fullName}
                      size="xs"
                    />
                    <div className="truncate">
                      <div className="text-xs font-medium truncate">{fullName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{emp.jobTitle || emp.department}</div>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                      isSelected
                        ? "bg-cyan-500 border-cyan-400 text-black"
                        : "border-white/30 bg-slate-900/60"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </GlassModal>
  );
};

export default ScheduleMeetingModal;
