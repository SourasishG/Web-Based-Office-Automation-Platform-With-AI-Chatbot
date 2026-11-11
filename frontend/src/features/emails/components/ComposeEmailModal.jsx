import { useState, useEffect } from "react";
import {
  Mail,
  Sparkles,
  Send,
  FileText,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import { GlassSelect } from "../../../components/ui/GlassSelect";
import { employeeService } from "../../../services/employeeService";
import { aiService } from "../../../services/aiService";

export const ComposeEmailModal = ({
  isOpen = false,
  onClose,
  onSend,
  onSaveDraft,
}) => {
  const [recipientId, setRecipientId] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Project Sync");
  const [body, setBody] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRecipientId("");
      setRecipientEmail("");
      setSubject("");
      setCategory("Project Sync");
      setBody("");
      setError("");

      employeeService
        .getAllEmployees()
        .then((res) => {
          const list = res?.data?.employees || res?.data || [];
          setEmployees(list);
        })
        .catch((err) =>
          console.warn("Failed to load employees for compose:", err)
        );
    }
  }, [isOpen]);

  const handleRecipientSelect = (val) => {
    setRecipientId(val);
    const found = employees.find((e) => e.id === val);
    if (found) {
      setRecipientEmail(found.email);
    }
  };

  const handleAiDraft = async () => {
    try {
      setLoadingAi(true);
      setError("");
      const instructions = `Draft a workplace email regarding ${category}${
        subject ? `: "${subject}"` : ""
      }. Keep it polished, executive, and structured.`;
      const res = await aiService.draftReply({
        instructions,
        tone: "PROFESSIONAL",
      });
      const draftText = res?.data?.draft || res?.draft || "";
      if (draftText) {
        setBody(draftText);
        if (!subject.trim()) {
          setSubject(`${category} Update & Next Steps`);
        }
      }
    } catch (err) {
      console.error("Herric AI draft error:", err);
      setBody(
        `Dear Team,\n\nHere is an update regarding our ongoing project milestones and next deliverables. Please review the details and let me know if you have any questions.\n\nBest regards,\nOffice Aid Team`
      );
      if (!subject.trim()) {
        setSubject(`${category} Status Update`);
      }
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (
      (!recipientId && !recipientEmail.trim()) ||
      !subject.trim() ||
      !body.trim()
    ) {
      setError("Please specify a recipient, subject line, and message body.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        recipientId: recipientId || undefined,
        recipientEmail: recipientEmail.trim() || undefined,
        subject: subject.trim(),
        body: body.trim(),
        category,
        folder: "INBOX",
      };

      await onSend(payload);
      onClose();
    } catch (err) {
      console.error("Failed to send email:", err);
      setError(err.response?.data?.message || "Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    if (!subject.trim() && !body.trim()) {
      setError("Please provide at least a subject or body for your draft.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        recipientId: recipientId || undefined,
        recipientEmail: recipientEmail.trim() || undefined,
        subject: subject.trim() || "(No Subject)",
        body: body.trim() || "(Empty Draft)",
        category,
        folder: "DRAFTS",
      };

      await onSaveDraft(payload);
      onClose();
    } catch (err) {
      console.error("Failed to save draft:", err);
      setError("Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "Project Sync", label: "Project Sync" },
    { value: "Announcement", label: "Announcement" },
    { value: "IT Alert", label: "IT Alert" },
    { value: "HR Operations", label: "HR Operations" },
    { value: "General", label: "General" },
  ];

  const employeeOptions = employees.map((e) => ({
    value: e.id,
    label: `${e.firstName || ""} ${e.lastName || ""}`.trim() || e.email,
  }));

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Compose Workplace Message"
      subtitle="Draft corporate communication with Herric AI assistance"
      icon={Mail}
      maxWidth="2xl"
    >
      <form onSubmit={handleSend} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Recipient Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <GlassSelect
            label="Recipient Colleague"
            icon={User}
            options={employeeOptions}
            value={recipientId}
            onChange={handleRecipientSelect}
            searchable
            placeholder="Select team member..."
          />

          <GlassInput
            label="Or Direct Email"
            placeholder="colleague@officeaid.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>

        {/* Subject & Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <GlassInput
              label="Subject *"
              placeholder="e.g. Q3 Performance Milestones & Strategic Sync"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <GlassSelect
            label="Category Tag"
            options={categoryOptions}
            value={category}
            onChange={(val) => setCategory(val)}
          />
        </div>

        {/* Herric AI Drafter Trigger */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-zinc-300">
            Message Content
          </span>
          <button
            type="button"
            onClick={handleAiDraft}
            disabled={loadingAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C6F432]/15 hover:bg-[#C6F432]/25 border border-[#C6F432]/35 text-[#C6F432] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {loadingAi ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{loadingAi ? "Herric Writing..." : "Draft with Herric"}</span>
          </button>
        </div>

        {/* Message Body */}
        <GlassTextarea
          placeholder="Type your message or ask Herric to generate a draft..."
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        {/* Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleDraft}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Save as Draft</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              )}
              <span>{loading ? "Sending..." : "Send Message"}</span>
            </button>
          </div>
        </div>
      </form>
    </GlassModal>
  );
};

export default ComposeEmailModal;
