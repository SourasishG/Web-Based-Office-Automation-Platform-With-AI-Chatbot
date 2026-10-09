import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmailsHeader from "./components/EmailsHeader";
import EmailSidebar from "./components/EmailSidebar";
import EmailList from "./components/EmailList";
import EmailDetailView from "./components/EmailDetailView";
import ComposeEmailModal from "./components/ComposeEmailModal";

import initialEmails from "./data/emailData";

/**
 * Emails - Apple Liquid Glass Master Email & Communications Feature Page
 * Assembles header control bar, folder navigation sidebar, message list, detail reading pane, and compose modal.
 */
export const Emails = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [activeFolder, setActiveFolder] = useState("inbox"); // 'inbox', 'sent', 'starred', 'drafts', 'trash'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEmailId, setSelectedEmailId] = useState("MAIL-201");

  // Modal & Toast state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Folder and Unread Counters
  const counts = useMemo(() => {
    const inboxUnread = emails.filter((e) => e.folder === "inbox" && !e.isRead).length;
    const starred = emails.filter((e) => e.isStarred).length;
    const drafts = emails.filter((e) => e.folder === "drafts").length;
    return { inboxUnread, starred, drafts };
  }, [emails]);

  // Filtered Emails List
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      // Folder Filter
      if (activeFolder === "starred") {
        if (!email.isStarred) return false;
      } else if (email.folder !== activeFolder) {
        return false;
      }

      // Category Filter
      if (categoryFilter !== "all" && email.category !== categoryFilter) {
        return false;
      }

      // Search Query Filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      return (
        email.subject?.toLowerCase().includes(query) ||
        email.sender.name?.toLowerCase().includes(query) ||
        email.sender.email?.toLowerCase().includes(query) ||
        email.snippet?.toLowerCase().includes(query) ||
        email.body?.toLowerCase().includes(query)
      );
    });
  }, [emails, activeFolder, categoryFilter, searchTerm]);

  // Currently Selected Email Object
  const selectedEmail = useMemo(() => {
    return emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || null;
  }, [emails, selectedEmailId, filteredEmails]);

  // Handler: Select Email
  const handleSelectEmail = (email) => {
    setSelectedEmailId(email.id);
    // Mark as read when selected
    if (!email.isRead) {
      setEmails((prev) =>
        prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
      );
    }
  };

  // Handler: Toggle Star
  const handleToggleStar = (emailId) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === emailId ? { ...e, isStarred: !e.isStarred } : e
      )
    );
  };

  // Handler: Delete Email
  const handleDeleteEmail = (emailId) => {
    const target = emails.find((e) => e.id === emailId);
    setEmails((prev) =>
      prev.map((e) => (e.id === emailId ? { ...e, folder: "trash" } : e))
    );
    showToast(`Moved "${target?.subject || "Email"}" to Trash`);
    if (selectedEmailId === emailId) {
      setSelectedEmailId("");
    }
  };

  // Handler: Send New Email
  const handleSendEmail = (emailPayload) => {
    const fullEmail = {
      ...emailPayload,
      id: `MAIL-${emails.length + 101}`,
    };
    setEmails((prev) => [fullEmail, ...prev]);
    setSelectedEmailId(fullEmail.id);
    showToast(`Email sent successfully to ${fullEmail.recipients.join(", ")}!`);
  };

  // Handler: Save Draft
  const handleSaveDraft = (draftPayload) => {
    const fullDraft = {
      ...draftPayload,
      id: `MAIL-DRAFT-${emails.length + 101}`,
    };
    setEmails((prev) => [fullDraft, ...prev]);
    showToast("Saved draft to Drafts folder");
  };

  // Handler: Quick Reply
  const handleSendReply = (emailId, replyText) => {
    const target = emails.find((e) => e.id === emailId);
    showToast(`Sent reply to ${target?.sender.name || "sender"}: "${replyText.slice(0, 20)}..."`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-2">
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
              counts={counts}
            />
          </div>

          {/* Middle Email List (4 cols) */}
          <div className="lg:col-span-4">
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmail?.id}
              onSelectEmail={handleSelectEmail}
              onToggleStar={handleToggleStar}
            />
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
