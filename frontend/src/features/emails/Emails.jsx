import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmailsHeader from "./components/EmailsHeader";
import EmailSidebar from "./components/EmailSidebar";
import EmailList from "./components/EmailList";
import EmailDetailView from "./components/EmailDetailView";
import ComposeEmailModal from "./components/ComposeEmailModal";
import { emailService } from "../../services/emailService";
import initialEmails from "./data/emailData";
import { Loader2 } from "lucide-react";

/**
 * Emails - Apple Liquid Glass Master Email & Communications Feature Page
 * Connected to live Express 5 backend with Herric AI summarization and auto-draft reply.
 */
export const Emails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState([]);
  const [folderCounts, setFolderCounts] = useState({ inboxUnread: 0, starred: 0, drafts: 0 });
  const [activeFolder, setActiveFolder] = useState("inbox"); // 'inbox', 'sent', 'starred', 'drafts', 'trash'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEmailId, setSelectedEmailId] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal & Toast state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Auto-trigger compose modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsComposeOpen(true);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("new");
        return next;
      }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const fetchEmailData = useCallback(async () => {
    try {
      setLoading(true);

      const folderParam =
        activeFolder === "starred"
          ? "STARRED"
          : activeFolder.toUpperCase();

      const [emailsRes, countsRes] = await Promise.allSettled([
        emailService.getEmails({ folder: folderParam, limit: 100 }),
        emailService.getFolderCounts(),
      ]);

      if (emailsRes.status === "fulfilled" && emailsRes.value) {
        const resData = emailsRes.value.data ?? emailsRes.value;
        const liveEmails =
          resData.emails ||
          (Array.isArray(resData) ? resData : []);
        setEmails(liveEmails);
        setSelectedEmailId((prevId) => prevId || (liveEmails.length > 0 ? liveEmails[0].id : null));
      } else {
        setEmails([]);
        setSelectedEmailId(null);
      }

      if (countsRes.status === "fulfilled" && countsRes.value) {
        setFolderCounts(countsRes.value.data ?? countsRes.value);
      }
    } catch (err) {
      console.error("Failed to load email hub data:", err);
      setEmails(initialEmails);
    } finally {
      setLoading(false);
    }
  }, [activeFolder]);

  useEffect(() => {
    fetchEmailData();
  }, [fetchEmailData]);

  // Filtered Emails List
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      // Category Filter
      if (categoryFilter !== "all" && email.category !== categoryFilter) {
        return false;
      }

      // Search Query Filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const senderName = email.sender
        ? `${email.sender.firstName || ""} ${email.sender.lastName || ""}`.toLowerCase() ||
          email.sender.name?.toLowerCase() ||
          ""
        : "";

      return (
        email.subject?.toLowerCase().includes(query) ||
        senderName.includes(query) ||
        email.sender?.email?.toLowerCase().includes(query) ||
        email.snippet?.toLowerCase().includes(query) ||
        email.body?.toLowerCase().includes(query)
      );
    });
  }, [emails, categoryFilter, searchTerm]);

  // Currently Selected Email Object
  const selectedEmail = useMemo(() => {
    return emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || null;
  }, [emails, selectedEmailId, filteredEmails]);

  // Handler: Select Email
  const handleSelectEmail = async (email) => {
    setSelectedEmailId(email.id);
    if (!email.isRead) {
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
      );
      try {
        await emailService.toggleRead(email.id);
        const countsRes = await emailService.getFolderCounts();
        if (countsRes?.data) setFolderCounts(countsRes.data);
      } catch (err) {
        console.error("Failed to mark email read:", err);
      }
    }
  };

  // Handler: Toggle Star
  const handleToggleStar = async (emailId) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === emailId ? { ...e, isStarred: !e.isStarred } : e
      )
    );
    try {
      await emailService.toggleStar(emailId);
      const countsRes = await emailService.getFolderCounts();
      if (countsRes?.data) setFolderCounts(countsRes.data);
    } catch (err) {
      console.error("Failed to toggle star:", err);
    }
  };

  // Handler: Delete Email
  const handleDeleteEmail = async (emailId) => {
    const target = emails.find((e) => e.id === emailId);
    setEmails((prev) => prev.filter((e) => e.id !== emailId));
    showToast(`Moved "${target?.subject || "Email"}" to Trash`);

    if (selectedEmailId === emailId) {
      const remaining = emails.filter((e) => e.id !== emailId);
      setSelectedEmailId(remaining[0]?.id || "");
    }

    try {
      await emailService.moveFolder(emailId, "TRASH");
      const countsRes = await emailService.getFolderCounts();
      if (countsRes?.data) setFolderCounts(countsRes.data);
    } catch (err) {
      console.error("Failed to move email to trash:", err);
    }
  };

  // Handler: Send New Email
  const handleSendEmail = async (emailPayload) => {
    try {
      const res = await emailService.sendEmail(emailPayload);
      const created = res?.data || emailPayload;
      setEmails((prev) => [created, ...prev]);
      setSelectedEmailId(created.id);
      showToast("Message dispatched successfully!");
      const countsRes = await emailService.getFolderCounts();
      if (countsRes?.data) setFolderCounts(countsRes.data);
    } catch (err) {
      console.error("Failed to send message:", err);
      throw err;
    }
  };

  // Handler: Save Draft
  const handleSaveDraft = async (draftPayload) => {
    try {
      const res = await emailService.sendEmail(draftPayload);
      const created = res?.data || draftPayload;
      setEmails((prev) => [created, ...prev]);
      showToast("Saved message to Drafts");
      const countsRes = await emailService.getFolderCounts();
      if (countsRes?.data) setFolderCounts(countsRes.data);
    } catch (err) {
      console.error("Failed to save draft:", err);
      throw err;
    }
  };

  // Handler: Quick Reply
  const handleSendReply = async (emailId, replyText) => {
    const target = emails.find((e) => e.id === emailId);
    try {
      await emailService.sendEmail({
        recipientId: target?.senderId || target?.sender?.id || undefined,
        recipientEmail: target?.sender?.email || undefined,
        subject: `Re: ${target?.subject || "Message"}`,
        body: replyText,
        category: target?.category || "Project Sync",
      });
      showToast(`Reply sent to ${target?.sender?.name || target?.sender?.firstName || "colleague"}!`);
    } catch (err) {
      console.error("Failed to send quick reply:", err);
      showToast("Failed to dispatch quick reply.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-2 select-none">
        {/* Toast Alert Popup */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-2xl text-cyan-300 text-xs font-semibold shadow-xl"
            >
              ✨ {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Header Bar */}
        <EmailsHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          onComposeClick={() => setIsComposeOpen(true)}
        />

        {/* Master Mail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-210px)] min-h-[480px]">
          {/* Left Sidebar Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <EmailSidebar
              activeFolder={activeFolder}
              onFolderChange={setActiveFolder}
              counts={folderCounts}
            />
          </div>

          {/* Middle Email List (4 cols) */}
          <div className="lg:col-span-4">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-cyan-400 gap-2">
                <Loader2 className="w-7 h-7 animate-spin" />
                <span className="text-xs text-slate-400">Loading inbox...</span>
              </div>
            ) : (
              <EmailList
                emails={filteredEmails}
                selectedEmailId={selectedEmail?.id}
                onSelectEmail={handleSelectEmail}
                onToggleStar={handleToggleStar}
              />
            )}
          </div>

          {/* Right Detail Reading Pane (5 cols) */}
          <div className="lg:col-span-5">
            <EmailDetailView
              email={selectedEmail}
              onToggleStar={handleToggleStar}
              onDelete={handleDeleteEmail}
              onSendReply={handleSendReply}
            />
          </div>
        </div>

        {/* Compose Email Modal */}
        <ComposeEmailModal
          isOpen={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onSend={handleSendEmail}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    </DashboardLayout>
  );
};

export default Emails;
