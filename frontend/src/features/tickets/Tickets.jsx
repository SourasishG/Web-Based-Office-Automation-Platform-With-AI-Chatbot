import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import TicketStatsWidget from "./components/TicketStatsWidget";
import TicketsHeader from "./components/TicketsHeader";
import TicketList from "./components/TicketList";
import TicketKanban from "./components/TicketKanban";
import TicketDetailModal from "./components/TicketDetailModal";
import CreateTicketModal from "./components/CreateTicketModal";

import { ticketService } from "../../services/ticketService";
import initialTickets from "./data/ticketData";

/**
 * Tickets - Executive Quixotic IT Helpdesk & Support Feature Page
 * Strictly aligned with Dashboard, Projects, Tasks, Meetings, and Employees theme:
 * - 60% Midnight Black (#0B0B0C) at top, 40% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
export const Tickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Layout State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeViewMode, setActiveViewMode] = useState("list"); // 'list', 'kanban'

  // Modals & Feedback State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
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

  // Auto-trigger create modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsCreateOpen(true);
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

  const fetchTicketData = useCallback(async () => {
    try {
      setLoading(true);
      const [ticketsRes, statsRes] = await Promise.allSettled([
        ticketService.getAllTickets({ limit: 100 }),
        ticketService.getTicketStats(),
      ]);

      if (ticketsRes.status === "fulfilled" && ticketsRes.value) {
        const resData = ticketsRes.value.data ?? ticketsRes.value;
        const liveTickets =
          resData.tickets ||
          (Array.isArray(resData) ? resData : []);
        setTickets(liveTickets.length > 0 ? liveTickets : initialTickets);
      } else {
        setTickets(initialTickets);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStatsData(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to load tickets workspace data:", err);
      setTickets(initialTickets);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTicketData();
  }, [fetchTicketData]);

  // Normalization Helpers
  const normalizeCategory = (cat) => {
    if (!cat) return "";
    const upper = cat.toUpperCase().replace(/\s+&\s+|\s+/g, "_");
    if (upper.includes("ACCESS") || upper.includes("SECURITY"))
      return "ACCESS_SECURITY";
    if (upper.includes("INFRASTRUCTURE")) return "INFRASTRUCTURE";
    if (upper.includes("SOFTWARE") || upper.includes("TOOL"))
      return "SOFTWARE_TOOLS";
    if (upper.includes("FACILIT")) return "FACILITIES";
    if (upper.includes("HR")) return "HR_OPS";
    return upper;
  };

  // Filtered Tickets List
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (activeCategory !== "all") {
        const tCatNorm = normalizeCategory(t.category);
        const filterCatNorm = normalizeCategory(activeCategory);
        if (tCatNorm !== filterCatNorm) return false;
      }

      if (priorityFilter !== "all") {
        const tPrio = (t.priority || "").toUpperCase();
        const filterPrio = priorityFilter.toUpperCase();
        if (tPrio !== filterPrio) return false;
      }

      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const requesterName = t.requester
        ? `${t.requester.firstName || ""} ${t.requester.lastName || ""}`.toLowerCase() ||
          t.requester.name?.toLowerCase() ||
          ""
        : "";
      const assigneeName = t.assignee
        ? `${t.assignee.firstName || ""} ${t.assignee.lastName || ""}`.toLowerCase() ||
          t.assignee.name?.toLowerCase() ||
          ""
        : "";

      return (
        t.ticketNumber?.toLowerCase().includes(query) ||
        t.id?.toLowerCase().includes(query) ||
        t.title?.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        requesterName.includes(query) ||
        assigneeName.includes(query)
      );
    });
  }, [tickets, activeCategory, priorityFilter, searchTerm]);

  // Handler: Status Change
  const handleStatusChange = async (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    showToast(`Updated ticket status to "${newStatus}"`);
    try {
      await ticketService.updateTicket(ticketId, { status: newStatus });
      const statsRes = await ticketService.getTicketStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  // Handler: Quick Resolve
  const handleQuickResolve = async (ticket) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticket.id
          ? {
              ...t,
              status: "RESOLVED",
              resolutionNotes: "Quick resolved by agent",
            }
          : t
      )
    );
    showToast(`Ticket ${ticket.ticketNumber || ticket.id} marked as Resolved!`);

    try {
      await ticketService.updateTicket(ticket.id, {
        status: "RESOLVED",
        resolutionNotes: "Quick resolved by agent",
      });
      const statsRes = await ticketService.getTicketStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to resolve ticket:", err);
    }
  };

  // Handler: Ticket Created
  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    showToast(
      `Created support ticket ${newTicket.ticketNumber || newTicket.id}!`
    );
    ticketService.getTicketStats().then((res) => {
      if (res?.data) setStatsData(res.data);
    });
  };

  // Handler: Ticket Updated
  const handleTicketUpdated = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
    setSelectedTicket(updatedTicket);
    ticketService.getTicketStats().then((res) => {
      if (res?.data) setStatsData(res.data);
    });
  };

  // Handler: Ticket Deleted
  const handleTicketDeleted = (ticketId) => {
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(null);
    }
    showToast("Support ticket removed.");
    ticketService.getTicketStats().then((res) => {
      if (res?.data) setStatsData(res.data);
    });
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

        {/* Center Helpdesk Canvas */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Title & Status */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>IT Helpdesk &</span>
                <span className="text-[#C6F432]">Tickets</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>
                  SLA Queue • Submit, route & resolve technical support requests
                </span>
              </p>
            </div>

            {/* Current Date & Time Pill + Lime Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <TicketStatsWidget tickets={tickets} statsData={statsData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <TicketsHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeViewMode={activeViewMode}
              onViewModeChange={setActiveViewMode}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              onCreateClick={() => setIsCreateOpen(true)}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: List or Kanban Board */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="pt-2"
          >
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center text-[#C6F432] gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium text-zinc-400">
                  Synchronizing Helpdesk Queue...
                </span>
              </div>
            ) : activeViewMode === "list" ? (
              <TicketList
                tickets={filteredTickets}
                onSelectTicket={(ticket) => setSelectedTicket(ticket)}
                onResolveTicket={handleQuickResolve}
              />
            ) : (
              <TicketKanban
                tickets={filteredTickets}
                onSelectTicket={(ticket) => setSelectedTicket(ticket)}
                onResolveTicket={handleQuickResolve}
                onStatusChange={handleStatusChange}
              />
            )}
          </motion.div>
        </main>
      </div>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
        onStatusChange={handleStatusChange}
        onTicketUpdated={handleTicketUpdated}
        onTicketDeleted={handleTicketDeleted}
      />

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  );
};

export default Tickets;
