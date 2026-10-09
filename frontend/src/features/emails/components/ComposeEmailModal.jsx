import { useState } from "react";
import { Mail, Sparkles, Send, FileText, User } from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassInput } from "../../../components/ui/GlassInput";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * ComposeEmailModal - Glass modal interface for drafting and sending internal corporate emails
 * 
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Modal close handler callback
 * @param {function} onSend - Send email callback (emailData)
 * @param {function} onSaveDraft - Save draft callback (emailData)
 */
export const ComposeEmailModal = ({
  isOpen = false,
  onClose,
  onSend,
  onSaveDraft,
}) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Project Sync");
  const [body, setBody] = useState("");

  const handleAiDraft = () => {
    if (category === "Announcement") {
      setSubject("📢 Workplace Update: Q4 Milestones & Team Sync");
      setBody(
        `Dear All,\n\nWe are excited to share key updates regarding our upcoming project sprint milestones. Thanks to everyone for their hard work.\n\nBest,\nSourasish Ghosh`
      );
    } else if (category === "IT Alert") {
      setSubject("⚡ IT Notice: Scheduled Server System Update");
      setBody(
        `Team,\n\nPlease note that IT maintenance will occur this weekend. System availability will resume immediately following update verification.\n\nRegards,\nIT Ops`
      );
    } else {
      setSubject("🚀 Project Update & Milestone Status Report");
      setBody(
        `Hi Team,\n\nHere is a quick status update on our latest project sprint. All core deliverables remain on schedule for release.\n\nBest regards,\nSourasish Ghosh`
      );
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!recipient.trim() || !subject.trim() || !body.trim()) return;

    const emailPayload = {
      sender: {
        name: "Sourasish Ghosh",
        email: "sourasish.ghosh@officeaid.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        role: "CEO & Admin",
      },
      recipients: [recipient.trim()],
      subject: subject.trim(),
      snippet: body.trim().slice(0, 80) + "...",
      body: body.trim(),
      category: category,
      folder: "sent",
      isRead: true,
      isStarred: false,
      timestamp: "Just now",
      date: new Date().toISOString().split("T")[0],
    };

    onSend(emailPayload);
    handleReset();
    onClose();
  };

  const handleDraft = () => {
    if (!subject.trim() && !body.trim()) return;

    const draftPayload = {
      sender: {
        name: "Sourasish Ghosh",
        email: "sourasish.ghosh@officeaid.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        role: "CEO & Admin",
      },
      recipients: [recipient.trim() || "Unspecified"],
      subject: subject.trim() || "(No Subject)",
      snippet: body.trim().slice(0, 80) || "(Empty Draft)",
      body: body.trim(),
      category: category,
      folder: "drafts",
      isRead: true,
      isStarred: false,
      timestamp: "Draft",
      date: new Date().toISOString().split("T")[0],
    };

    onSaveDraft(draftPayload);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setRecipient("");
    setSubject("");
    setCategory("Project Sync");
    setBody("");
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Compose Internal Email"
      subtitle="Draft and send workplace communications, executive announcements, and department memos."
      icon={Mail}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSend} className="space-y-4">
        {/* Recipient & Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassInput
            label="To (Recipient Email) *"
            icon={User}
            placeholder="e.g. all-staff@officeaid.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Category Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl bg-slate-950/50 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60"
            >
              <option value="Project Sync" className="bg-slate-900">Project Sync</option>
              <option value="Announcement" className="bg-slate-900">Announcement</option>
              <option value="HR Memo" className="bg-slate-900">HR Memo</option>
              <option value="IT Alert" className="bg-slate-900">IT Alert</option>
              <option value="Meeting Minutes" className="bg-slate-900">Meeting Minutes</option>
            </select>
          </div>
        </div>

        {/* Subject Line & AI Assistant Trigger */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-300">Subject Line *</label>
            <GlassButton
              variant="ghost"
              size="sm"
              icon={Sparkles}
              type="button"
              onClick={handleAiDraft}
              className="text-[11px]"
            >
              Draft Template with AI
            </GlassButton>
          </div>

          <GlassInput
            placeholder="e.g. Q4 Strategic Roadmap & Key Milestones"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* Message Body */}
        <GlassTextarea
          label="Message Body *"
          placeholder="Write your email contents here..."
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-white/10">
          <GlassButton
            variant="ghost"
            type="button"
            icon={FileText}
            onClick={handleDraft}
          >
            Save Draft
          </GlassButton>

          <div className="flex items-center gap-3">
            <GlassButton variant="ghost" type="button" onClick={onClose}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" type="submit" icon={Send}>
              Send Email
            </GlassButton>
          </div>
        </div>
      </form>
    </GlassModal>
  );
};

export default ComposeEmailModal;
