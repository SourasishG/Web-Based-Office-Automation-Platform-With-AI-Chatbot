import { useState } from "react";
import {
  Star,
  Trash2,
  Sparkles,
  Send,
  CornerUpLeft,
  Mail,
  Loader2,
} from "lucide-react";
import HerricMarkdown from "../../../components/common/HerricMarkdown";
import { aiService } from "../../../services/aiService";

/**
 * EmailDetailView - Quixotic Pure White Reading Pane with Herric AI Summarizer & Auto-Reply
 *
 * @param {object} email - Active email object record
 * @param {function} onToggleStar - Star button click handler
 * @param {function} onDelete - Delete button click handler
 * @param {function} onSendReply - Send reply callback (emailId, replyText)
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
  const [isDrafting, setIsDrafting] = useState(false);

  if (!email) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm h-full flex flex-col items-center justify-center text-center p-12 text-[#0B0B0C]">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-[#0B0B0C] tracking-tight">
          Select an Email
        </h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">
          Click on any email thread from your inbox to view full contents and
          Herric AI summaries.
        </p>
      </div>
    );
  }

  const senderName = email.sender
    ? `${email.sender.firstName || ""} ${email.sender.lastName || ""}`.trim() ||
      email.sender.name ||
      "Colleague"
    : "Colleague";
  const senderEmail = email.sender?.email || "";
  const senderRole =
    email.sender?.jobTitle || email.sender?.role || "Team Member";
  const senderAvatar =
    email.sender?.avatarUrl ||
    email.sender?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      senderName
    )}&background=0B0B0C&color=C6F432`;

  const formattedDate = email.createdAt
    ? new Date(email.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : email.date || "Recent";

  const handleAiSummarize = async () => {
    try {
      setIsSummarizing(true);
      const res = await aiService.summarizeEmail({
        emailId: email.id,
        subject: email.subject,
        content: email.body,
      });
      const summary =
        res?.data?.summary || res?.summary || res?.data?.reply || "";
      setAiSummary(summary);
    } catch (err) {
      console.error("Herric email summarizer error:", err);
      setAiSummary(
        `**Herric Key Takeaways:**\n- **Sender:** ${senderName} (${senderRole})\n- **Topic:** ${email.subject}\n- **Summary:** Communication regarding workplace operations.\n- **Action Required:** Review content and coordinate response.`
      );
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleAiDraftReply = async () => {
    try {
      setIsDrafting(true);
      const res = await aiService.draftReply({
        emailId: email.id,
        subject: email.subject,
        threadContent: email.body,
        instructions:
          "Draft a clear, professional reply acknowledging receipt and confirming next steps.",
        tone: "PROFESSIONAL",
      });
      const draft = res?.data?.draft || res?.draft || "";
      setReplyText(draft);
    } catch (err) {
      console.error("Herric draft reply error:", err);
      setReplyText(
        `Hi ${senderName.split(" ")[0]},\n\nThank you for the update regarding "${email.subject}". I have reviewed the details and will proceed accordingly.\n\nBest regards,\nOffice Aid Team`
      );
    } finally {
      setIsDrafting(false);
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply(email.id, replyText.trim());
    setReplyText("");
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-5 sm:p-6 shadow-sm h-full overflow-y-auto flex flex-col justify-between gap-4 text-[#0B0B0C]">
      <div className="space-y-4 flex-1">
        {/* Top Control Bar: Subject, Category Badge & Actions */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-zinc-200/80">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
                {email.category || "General"}
              </span>
              <span className="text-xs font-medium text-zinc-500 font-mono">
                {formattedDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0C] tracking-tight">
              {email.subject}
            </h2>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAiSummarize}
              disabled={isSummarizing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0B0B0C] hover:bg-zinc-800 text-[#C6F432] text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSummarizing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{isSummarizing ? "Summarizing..." : "Summarize"}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleStar(email.id)}
              aria-label="Toggle star"
              className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-500 hover:text-amber-500 transition-colors cursor-pointer"
            >
              <Star
                className={`w-4 h-4 ${
                  email.isStarred ? "fill-amber-400 text-amber-400" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => onDelete(email.id)}
              aria-label="Delete email"
              className="p-2 rounded-full bg-zinc-100 hover:bg-rose-500/10 border border-zinc-200 text-zinc-500 hover:text-rose-600 hover:border-rose-500/30 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sender Identity Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <div className="relative shrink-0">
            <img
              src={senderAvatar}
              alt={senderName}
              className="w-11 h-11 rounded-full object-cover border border-zinc-200"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#C6F432] ring-2 ring-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-[#0B0B0C] flex items-center gap-2 flex-wrap">
              <span>{senderName}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#C6F432]/25 text-[#244203]">
                {senderRole}
              </span>
            </h3>
            <p className="text-xs text-zinc-500 font-mono truncate">
              {senderEmail}
            </p>
          </div>
        </div>

        {/* AI Summary Box */}
        {aiSummary && (
          <div className="p-4 rounded-2xl bg-[#141416] border border-[#C6F432]/40 text-zinc-100 text-xs leading-relaxed space-y-2 shadow-md">
            <div className="flex items-center gap-1.5 font-bold text-[#C6F432] mb-1 border-b border-white/10 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C6F432]" />
              <span>Herric AI Executive Summary</span>
            </div>
            <div className="text-zinc-200">
              <HerricMarkdown content={aiSummary} />
            </div>
          </div>
        )}

        {/* Full Message Body */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-sm text-[#0B0B0C] leading-relaxed whitespace-pre-line">
          {email.body}
        </div>
      </div>

      {/* Quick Reply Form & AI Drafter */}
      <div className="pt-4 border-t border-zinc-200/80 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#0B0B0C] flex items-center gap-1.5">
            <CornerUpLeft className="w-3.5 h-3.5 text-[#386b03]" />
            <span>Quick Reply</span>
          </span>

          <button
            type="button"
            onClick={handleAiDraftReply}
            disabled={isDrafting}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6F432]/25 hover:bg-[#C6F432]/40 border border-[#C6F432]/50 text-[#244203] text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {isDrafting ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            <span>{isDrafting ? "Herric Drafting..." : "Herric Auto-Draft Reply"}</span>
          </button>
        </div>

        <form onSubmit={handleReplySubmit} className="space-y-3">
          <textarea
            placeholder={`Reply to ${senderName}...`}
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm text-[#0B0B0C] placeholder-zinc-400 focus:outline-none focus:border-[#0B0B0C] focus:bg-white transition-colors resize-none"
          />

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Send Reply</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailDetailView;
