import { useState } from "react";
import { Ticket, Clock, Sparkles, ShieldAlert } from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";

/**
 * TicketDetailModal - Modal view displaying complete ticket timeline, SLA timers, and AI resolution generator
 * 
 * @param {boolean} isOpen - Modal visibility state
 * @param {function} onClose - Modal close handler
 * @param {object} ticket - Active ticket object
 * @param {function} onStatusChange - Status change callback (ticketId, newStatus)
 * @param {function} onAddComment - Add comment callback (ticketId, commentText)
 */
export const TicketDetailModal = ({
  isOpen = false,
  onClose,
  ticket,
  onStatusChange,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const [aiDraft, setAiDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!ticket) return null;

  const {
    id,
    title,
    description,
    category,
    priority,
    status,
    requester,
    assignee,
    slaTime,
    createdDate,
    createdTime,
  } = ticket;

  // AI Resolution Generator Simulation
  const handleGenerateAiResolution = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiDraft(
        `✨ AI Recommended Resolution Draft:\n\n1. Diagnostic Root Cause: Observed connection/authentication timeout on ${category} service.\n2. Fix Applied: Re-issued security token, flushed cached connection pool, and verified gateway logs.\n3. Status: Issue resolved. Please verify connection.`
      );
      setIsGenerating(false);
    }, 600);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(id, commentText.trim());
    setCommentText("");
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${id}: ${title}`}
      subtitle={`Submitted by ${requester.name} on ${createdDate} at ${createdTime}`}
      icon={Ticket}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Control Bar: Status Dropdown & Priority */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">Status:</span>
            <select
              value={status}
              onChange={(e) => onStatusChange(id, e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950/60 border border-white/10 text-xs font-semibold text-cyan-300 focus:outline-none"
            >
              <option value="open" className="bg-slate-900">Open Queue</option>
              <option value="in-progress" className="bg-slate-900">In Progress</option>
              <option value="review" className="bg-slate-900">Under Review</option>
              <option value="resolved" className="bg-slate-900">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <GlassBadge
              variant={priority === "Critical" ? "danger" : priority === "High" ? "warning" : "purple"}
              size="sm"
            >
              {priority === "Critical" && <ShieldAlert className="w-3 h-3 mr-1 inline" />}
              {priority} Priority
            </GlassBadge>

            <GlassBadge variant="cyan" size="sm">
              {category}
            </GlassBadge>
          </div>
        </div>

        {/* Requester & Assignee Profile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <GlassAvatar src={requester.avatar} name={requester.name} size="md" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Requester</p>
              <h4 className="text-xs font-bold text-white">{requester.name}</h4>
              <p className="text-[11px] text-slate-400">{requester.email}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <GlassAvatar src={assignee?.avatar} name={assignee?.name || "Unassigned"} size="md" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Assigned Engineer</p>
              <h4 className="text-xs font-bold text-white">{assignee?.name || "Unassigned"}</h4>
              <p className="text-[11px] text-cyan-400">{assignee?.role || "IT Support Pool"}</p>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-slate-300">Ticket Description</h4>
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>

        {/* AI Resolution Draft Generator */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Resolution Assistant
            </span>

            <GlassButton
              variant="ghost"
              size="sm"
              icon={Sparkles}
              onClick={handleGenerateAiResolution}
              disabled={isGenerating}
            >
              {isGenerating ? "Analyzing Issue..." : "Generate AI Fix Draft"}
            </GlassButton>
          </div>

          {aiDraft && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-400/40 text-purple-200 text-xs leading-relaxed whitespace-pre-line">
              {aiDraft}
            </div>
          )}
        </div>

        {/* Add Comment / Update Log */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2">
          <GlassTextarea
            placeholder="Write a comment or resolution note for this ticket..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> SLA Target: {slaTime}
            </span>

            <GlassButton variant="primary" size="sm" type="submit">
              Post Update
            </GlassButton>
          </div>
        </form>
      </div>
    </GlassModal>
  );
};

export default TicketDetailModal;
