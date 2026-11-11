import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import EmailsHeader from "./components/EmailsHeader";
import EmailSidebar from "./components/EmailSidebar";
import EmailList from "./components/EmailList";
import EmailDetailView from "./components/EmailDetailView";
import ComposeEmailModal from "./components/ComposeEmailModal";

import { emailService } from "../../services/emailService";
import initialEmails from "./data/emailData";

/**
 * Emails - Executive Quixotic Email & Communications Feature Page
 * Strictly aligned with Dashboard, Projects, Tasks, Meetings, Employees, Tickets, Profile, and Notifications:
 * - 60% Midnight Black (#0B0B0C) at top, 40% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
export const Emails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState([]);
  const [folderCounts, setFolderCounts] = useState({
    inboxUnread: 0,
    starred: 0,
    drafts: 0,
  });
  const [activeFolder, setActiveFolder] = useState("inbox"); // 'inbox', 'sent', 'starred', 'drafts', 'trash'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEmailId, setSelectedEmailId] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal & Toast state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Live second-by-second ticker for current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = useMemo(() => {
    const dateStr = currentDateTime.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = currentDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${dateStr} • ${timeStr}`;
  }, [currentDateTime]);

  // Auto-trigger compose modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsComposeOpen(true);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("new");
          return next;
        },
        { replace: true }
      );
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
        activeFolder === "starred" ? "STARRED" : activeFolder.toUpperCase();

      const [emailsRes, countsRes] = await Promise.allSettled([
        emailService.getEmails({ folder: folderParam, limit: 100 }),
        emailService.getFolderCounts(),
      ]);

      if (emailsRes.status === "fulfilled" && emailsRes.value) {
        const resData = emailsRes.value.data ?? emailsRes.value;
        const liveEmails =
          resData.emails || (Array.isArray(resData) ? resData : []);
        const fallbackList =
          liveEmails.length > 0
            ? liveEmails
            : activeFolder === "inbox"
            ? initialEmails
            : [];
        setEmails(fallbackList);
        setSelectedEmailId((prevId) =>
          prevId && fallbackList.some((e) => e.id === prevId)
            ? prevId
            : fallbackList[0]?.id || ""
        );
      } else {
        const fallbackList = activeFolder === "inbox" ? initialEmails : [];
        setEmails(fallbackList);
        setSelectedEmailId(fallbackList[0]?.id || "");
      }

      if (countsRes.status === "fulfilled" && countsRes.value) {
        setFolderCounts(countsRes.value.data ?? countsRes.value);
      }
    } catch (err) {
      console.error("Failed to load email hub data:", err);
      const fallbackList = activeFolder === "inbox" ? initialEmails : [];
      setEmails(fallbackList);
      setSelectedEmailId(fallbackList[0]?.id || "");
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
      if (categoryFilter !== "all" && email.category !== categoryFilter) {
        return false;
      }

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
    return (
      emails.find((e) => e.id === selectedEmailId) ||
      filteredEmails[0] ||
      null
    );
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
      showToast(
        `Reply sent to ${
          target?.sender?.name || target?.sender?.firstName || "colleague"
        }!`
      );
    } catch (err) {
      console.error("Failed to send quick reply:", err);
      showToast("Failed to dispatch quick reply.");
    }
  };

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] pb-16 transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
      }}
    >
      {/* Top Floating Rounded Pill Navbar */}
      <QuixoticTopNavbar />

      {/* Toast Alert Popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-[#141416] border border-[#C6F432]/50 backdrop-blur-2xl text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Mail Canvas */}
        <main className="flex-1 min-w-0 space-y-6 select-none">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Internal</span>
                <span className="text-[#C6F432]">Mail</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>
                  Communications Hub • Corporate threads, broadcasts & AI summaries
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsComposeOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Compose Email</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <EmailsHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              onComposeClick={() => setIsComposeOpen(true)}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: Master Mail Split Layout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[calc(100vh-280px)] min-h-[540px] pt-1"
          >
            {/* Left Folder Sidebar (3 cols) */}
            <div className="lg:col-span-3 min-h-0">
              <EmailSidebar
                activeFolder={activeFolder}
                onFolderChange={setActiveFolder}
                counts={folderCounts}
                activeCategory={categoryFilter}
                onCategorySelect={setCategoryFilter}
              />
            </div>

            {/* Middle Email List (4 cols) */}
            <div className="lg:col-span-4 min-h-0">
              {loading ? (
                <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm h-full flex flex-col items-center justify-center text-[#0B0B0C] gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#0B0B0C]" />
                  <span className="text-xs font-semibold text-zinc-500">
                    Loading inbox...
                  </span>
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
            <div className="lg:col-span-5 min-h-0">
              <EmailDetailView
                key={selectedEmail?.id || "empty"}
                email={selectedEmail}
                onToggleStar={handleToggleStar}
                onDelete={handleDeleteEmail}
                onSendReply={handleSendReply}
              />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Compose Email Modal */}
      <ComposeEmailModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
};

export default Emails;
