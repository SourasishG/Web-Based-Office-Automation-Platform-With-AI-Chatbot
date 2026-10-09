import { useState } from "react";
import { Star, Trash2, Sparkles, Send, CornerUpLeft, Mail } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";

/**
 * EmailDetailView - Reading pane with AI thread summarizer and AI auto-reply drafter
 * 
 * @param {object} email - Active email object record
 * @param {function} onToggleStar - Star button click handler
 * @param {function} onDelete - Delete button click handler
 * @param {function} onSendReply - Send reply callback (replyText)
 */
export const EmailDetailView = ({
  email,
  onToggleStar,
  onDelete,
  onSendReply,
}) => {
  const [replyText, setReplyText] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!email) {
    return (
      <GlassPanel
        variant="inset"
        padding="xl"
        className="h-full flex flex-col items-center justify-center text-center p-12"
      >
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-slate-400 mb-4">
          <Mail className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-white">Select an Email</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Click on any email thread from your inbox to view full contents and AI thread summaries.
        </p>
      </GlassPanel>
    );
  }

  // AI Summarize Handler Simulation
  const handleAiSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary(
        `✨ AI Key Takeaways:\n• Sender: ${email.sender.name} (${email.sender.role})\n• Topic: ${email.subject}\n• Key Points: Strategic roadmap and performance milestones outlined for execution.\n• Action Required: Review documentation and align team priorities.`
      );
      setIsSummarizing(false);
    }, 600);
  };

  // AI Auto-Reply Draft Handler Simulation
  const handleAiDraftReply = () => {
    setReplyText(
      `Hi ${email.sender.name.split(" ")[0]},\n\nThank you for the update regarding "${email.subject}". I have reviewed the details and align with the outlined goals.\n\nBest regards,\nSourasish Ghosh`
    );
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply(email.id, replyText.trim());
    setReplyText("");
  };

  return (
    <GlassPanel variant="floating" padding="lg" className="h-full overflow-y-auto flex flex-col justify-between gap-4">
      <div className="space-y-4 flex-1 pr-1">
        {/* Top Control Bar: Subject, Category Badge & Actions */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GlassBadge variant="cyan" size="sm">
                {email.category}
              </GlassBadge>
              <span className="text-xs font-medium text-slate-400">{email.date} at {email.timestamp}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {email.subject}
            </h2>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <GlassButton
              variant="ghost"
              size="sm"
              icon={Sparkles}
              onClick={handleAiSummarize}
              disabled={isSummarizing}
            >
              {isSummarizing ? "Summarizing..." : "Summarize with AI"}
            </GlassButton>

            <button
              type="button"
              onClick={() => onToggleStar(email.id)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-yellow-400 transition-colors"
            >
              <Star className={`w-4 h-4 ${email.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(email.id)}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sender Identity Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
          <GlassAvatar
            src={email.sender.avatar}
            name={email.sender.name}
            size="lg"
            status="online"
          />
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {email.sender.name}
              <span className="text-[11px] font-normal text-cyan-400">({email.sender.role})</span>
            </h3>
            <p className="text-xs text-slate-400">{email.sender.email}</p>
          </div>
        </div>

        {/* AI Summary Box */}
        {aiSummary && (
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-400/40 text-purple-200 text-xs leading-relaxed space-y-1 animate-fadeIn">
            {aiSummary.split("\n").map((line, idx) => (
              <p key={idx} className={line.startsWith("✨") ? "font-bold text-cyan-300 mb-1" : ""}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Full Message Body */}
        <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {email.body}
        </div>
      </div>

      {/* Quick Reply Form & AI Drafter */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <CornerUpLeft className="w-3.5 h-3.5 text-cyan-400" /> Quick Reply
          </span>

          <GlassButton
            variant="ghost"
            size="sm"
            icon={Sparkles}
            onClick={handleAiDraftReply}
            className="text-[11px]"
          >
            AI Auto-Reply Draft
          </GlassButton>
        </div>

        <form onSubmit={handleReplySubmit} className="space-y-3">
          <GlassTextarea
            placeholder={`Reply to ${email.sender.name}...`}
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />

          <div className="flex items-center justify-end">
            <GlassButton
              variant="primary"
              size="sm"
              icon={Send}
              type="submit"
            >
              Send Reply
            </GlassButton>
          </div>
        </form>
      </div>
    </GlassPanel>
  );
};

export default EmailDetailView;
