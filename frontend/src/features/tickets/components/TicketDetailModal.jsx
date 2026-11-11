import { useState, useEffect } from "react";
import {
  Ticket,
  Clock,
  Sparkles,
  ShieldAlert,
  Loader2,
  Send,
  Trash2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { GlassModal } from "../../../components/ui/GlassModal";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassTextarea } from "../../../components/ui/GlassTextarea";
import HerricMarkdown from "../../../components/common/HerricMarkdown";
import { ticketService } from "../../../services/ticketService";
import { aiService } from "../../../services/aiService";

export const TicketDetailModal = ({
  isOpen = false,
  onClose,
  ticket,
  onStatusChange,
  onTicketUpdated,
  onTicketDeleted,
}) => {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [aiDraft, setAiDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ticket && isOpen) {
      setCurrentTicket(ticket);
      setAiDraft("");
      setError("");
      setCommentText("");

      if (ticket.id) {
        ticketService
          .getTicketById(ticket.id)
          .then((res) => {
            const data = res?.data || res;
            if (data) {
              setCurrentTicket(data);
              if (Array.isArray(data.comments)) {
                setComments(data.comments);
              }
            }
          })
          .catch((err) => {
            console.warn("Could not load fresh ticket comments:", err);
            setComments(Array.isArray(ticket.comments) ? ticket.comments : []);
          });
      }
    }
  }, [ticket, isOpen]);

  if (!currentTicket) return null;

  const {
    id,
    ticketNumber,
    title,
    description,
    category,
    priority = "MEDIUM",
    status = "OPEN",
    requester,
    assignee,
    slaDueAt,
    slaTime,
    createdAt,
    createdDate,
    createdTime,
  } = currentTicket;

  const displayId = ticketNumber || id?.slice(0, 8) || "TCK";

  const requesterName = requester
    ? `${requester.firstName || ""} ${requester.lastName || ""}`.trim() ||
      requester.name ||
      "Requester"
    : "Requester";
  const requesterEmail = requester?.email || "No email";
  const requesterAvatar = requester?.avatarUrl || requester?.avatar;

  const assigneeName = assignee
    ? `${assignee.firstName || ""} ${assignee.lastName || ""}`.trim() ||
      assignee.name ||
      "Unassigned"
    : "Unassigned";
  const assigneeRole =
    assignee?.jobTitle || assignee?.role || "IT Support Engineer";
  const assigneeAvatar = assignee?.avatarUrl || assignee?.avatar;

  const formatCategory = (cat) => {
    if (!cat) return "General";
    const map = {
      ACCESS_SECURITY: "Access & Security",
      INFRASTRUCTURE: "IT Infrastructure",
      SOFTWARE_TOOLS: "Software & Tools",
      FACILITIES: "Facilities",
      HR_OPS: "HR Operations",
    };
    return map[cat] || cat;
  };

  const getSlaLabel = () => {
    if (slaTime) return slaTime;
    if (!slaDueAt) return "Standard SLA";
    const diff = new Date(slaDueAt) - new Date();
    if (diff <= 0) return "SLA Breached";
    const hours = Math.round(diff / (1000 * 60 * 60));
    return `${hours} hrs remaining`;
  };

  const handleGenerateAiResolution = async () => {
    try {
      setIsGenerating(true);
      setError("");

      const res = await aiService.ticketAssist({
        ticketId: currentTicket.id,
        title: currentTicket.title,
        description: currentTicket.description,
        category: currentTicket.category,
      });

      const reply = res?.data?.reply || res?.reply || res?.data?.diagnostic || "";
      setAiDraft(reply);
    } catch (err) {
      console.error("Herric ticket diagnosis error:", err);
      setError(
        err.response?.data?.message ||
          "Herric diagnostic service encountered an error."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyDraftToComment = () => {
    if (!aiDraft) return;
    setCommentText(aiDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleStatusSelect = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await ticketService.updateTicket(currentTicket.id, {
        status: newStatus,
      });
      const updated = res?.data || { ...currentTicket, status: newStatus };
      setCurrentTicket(updated);
      if (onStatusChange) onStatusChange(currentTicket.id, newStatus);
      if (onTicketUpdated) onTicketUpdated(updated);
    } catch (err) {
      console.error("Failed to update ticket status:", err);
      setError("Failed to update status on server.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setIsPostingComment(true);
      setError("");

      const res = await ticketService.addComment(currentTicket.id, {
        message: commentText.trim(),
        isAiGenerated: Boolean(
          aiDraft && commentText.includes(aiDraft.slice(0, 30))
        ),
      });

      const createdComment = res?.data || {
        id: `local-${Date.now()}`,
        message: commentText.trim(),
        createdAt: new Date().toISOString(),
        author: {
          firstName: "You",
          lastName: "",
          avatarUrl: "",
        },
      };

      setComments((prev) => [...prev, createdComment]);
      setCommentText("");

      if (onTicketUpdated) {
        onTicketUpdated({
          ...currentTicket,
          comments: [...comments, createdComment],
          commentsCount: (currentTicket.commentsCount || comments.length) + 1,
        });
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Failed to post update to ticket stream.");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete support ticket ${displayId}?`)) return;
    try {
      await ticketService.deleteTicket(currentTicket.id);
      if (onTicketDeleted) onTicketDeleted(currentTicket.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete ticket:", err);
      setError("Failed to delete ticket.");
    }
  };

  const normPriority = (priority || "").toUpperCase();
  const normStatus = (status || "").toUpperCase().replace(/-/g, "_");

  const formattedCreated = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : createdDate
    ? `${createdDate} ${createdTime || ""}`
    : "Recently";

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${displayId}: ${title}`}
      subtitle={`Submitted by ${requesterName} • ${formattedCreated}`}
      icon={Ticket}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Top Control Bar: Status Dropdown & Priority */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-300">Status:</span>
            <select
              value={normStatus}
              onChange={handleStatusSelect}
              className="px-3 py-1.5 rounded-xl bg-[#0B0B0C] border border-white/15 text-xs font-bold text-[#C6F432] focus:outline-none focus:border-[#C6F432] transition-colors cursor-pointer"
            >
              <option value="OPEN" className="bg-[#141416] text-white">
                Open Queue
              </option>
              <option value="IN_PROGRESS" className="bg-[#141416] text-white">
                In Progress
              </option>
              <option value="REVIEW" className="bg-[#141416] text-white">
                Under Review
              </option>
              <option value="RESOLVED" className="bg-[#141416] text-white">
                Resolved
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <GlassBadge
              variant={
                normPriority === "CRITICAL"
                  ? "danger"
                  : normPriority === "HIGH"
                  ? "warning"
                  : "default"
              }
              size="sm"
            >
              {normPriority === "CRITICAL" && (
                <ShieldAlert className="w-3 h-3 mr-1 inline" />
              )}
              {normPriority} Priority
            </GlassBadge>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/15 text-[#C6F432] border border-[#C6F432]/30">
              {formatCategory(category)}
            </span>
          </div>
        </div>

        {/* Requester & Assignee Profile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <GlassAvatar src={requesterAvatar} name={requesterName} size="md" />
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">
                Requester
              </p>
              <h4 className="text-xs font-bold text-white">{requesterName}</h4>
              <p className="text-[11px] text-zinc-400">{requesterEmail}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <GlassAvatar src={assigneeAvatar} name={assigneeName} size="md" />
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">
                Assigned Engineer
              </p>
              <h4 className="text-xs font-bold text-white">{assigneeName}</h4>
              <p className="text-[11px] text-[#C6F432] font-medium">
                {assigneeRole}
              </p>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-zinc-300">
            Ticket Description
          </h4>
          <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>

        {/* Herric AI Resolution Diagnostics */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C6F432]" /> Herric IT Copilot Diagnostics
            </span>

            <button
              type="button"
              onClick={handleGenerateAiResolution}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#C6F432]/10 border border-[#C6F432]/30 text-[#C6F432] hover:bg-[#C6F432]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>
                {isGenerating ? "Herric Analyzing Issue..." : "Diagnose with Herric"}
              </span>
            </button>
          </div>

          {aiDraft && (
            <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-[#C6F432]/30 text-zinc-100 text-xs leading-relaxed space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[11px] font-bold text-[#C6F432] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C6F432]" /> Herric Diagnostic Assessment
                </span>
                <button
                  type="button"
                  onClick={handleApplyDraftToComment}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-[11px] font-semibold text-white transition-all cursor-pointer"
                >
                  {copiedDraft ? (
                    <Check className="w-3 h-3 text-[#C6F432]" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-300" />
                  )}
                  <span>{copiedDraft ? "Copied to Update" : "Use in Response"}</span>
                </button>
              </div>

              <div className="text-xs text-zinc-200 max-h-64 overflow-y-auto pr-1">
                <HerricMarkdown content={aiDraft} />
              </div>
            </div>
          )}
        </div>

        {/* Conversation Stream Timeline */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <h4 className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Conversation Stream ({comments.length})</span>
            <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-[#C6F432]" /> {getSlaLabel()}
            </span>
          </h4>

          {comments.length > 0 ? (
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {comments.map((c) => {
                const authorName = c.author
                  ? `${c.author.firstName || ""} ${c.author.lastName || ""}`.trim() ||
                    "Agent"
                  : "Support Agent";
                return (
                  <div
                    key={c.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GlassAvatar
                          src={c.author?.avatarUrl}
                          name={authorName}
                          size="xs"
                        />
                        <span className="text-xs font-semibold text-white">
                          {authorName}
                        </span>
                        {c.isAiGenerated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6F432]/15 text-[#C6F432] border border-[#C6F432]/30">
                            <Sparkles className="w-2.5 h-2.5" />
                            Herric Assisting
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line pl-6">
                      {c.message}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic py-2">
              No replies yet. Post the first update or diagnostic notes below.
            </p>
          )}
        </div>

        {/* Add Comment / Update Log */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 pt-1">
          <GlassTextarea
            placeholder="Write a message, diagnostic log, or resolution update for this ticket..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <GlassButton
              variant="danger"
              size="sm"
              icon={Trash2}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </GlassButton>

            <button
              type="submit"
              disabled={isPostingComment || !commentText.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isPostingComment ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              )}
              <span>{isPostingComment ? "Posting..." : "Post Update"}</span>
            </button>
          </div>
        </form>
      </div>
    </GlassModal>
  );
};

export default TicketDetailModal;
