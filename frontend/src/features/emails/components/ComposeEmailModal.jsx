import { useState, useEffect } from "react";
import { Mail, Sparkles, Send, FileText, User, AlertCircle, Loader2 } from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import { GlassButton } from "../../../components/ui/GlassButton";
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
        .catch((err) => console.warn("Failed to load employees for compose:", err));
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
      const instructions = `Draft a workplace email regarding ${category}${subject ? `: "${subject}"` : ""}. Keep it polished, executive, and structured.`;
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
      // Fallback
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
    if ((!recipientId && !recipientEmail.trim()) || !subject.trim() || !body.trim()) {
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
          <span className="text-xs font-semibold text-slate-300">Message Content</span>
          <GlassButton
            type="button"
            variant="ghost"
            size="xs"
            icon={loadingAi ? Loader2 : Sparkles}
            onClick={handleAiDraft}
            disabled={loadingAi}
            className="text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10"
          >
            {loadingAi ? "Herric Writing..." : "Draft with Herric"}
          </GlassButton>
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
        <div className="pt-3 flex items-center justify-between border-t border-white/10">
          <GlassButton
            variant="ghost"
            type="button"
            icon={FileText}
            onClick={handleDraft}
            disabled={loading}
          >
            Save as Draft
          </GlassButton>

          <div className="flex items-center gap-2">
            <GlassButton
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </GlassButton>
            <GlassButton
              variant="primary"
              type="submit"
              icon={loading ? Loader2 : Send}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </GlassButton>
          </div>
        </div>
      </form>
    </GlassModal>
  );
};

export default ComposeEmailModal;
