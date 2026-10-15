import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TicketStatsWidget from "./components/TicketStatsWidget";
import TicketsHeader from "./components/TicketsHeader";
import TicketList from "./components/TicketList";
import TicketKanban from "./components/TicketKanban";
import TicketDetailModal from "./components/TicketDetailModal";
import CreateTicketModal from "./components/CreateTicketModal";
import { ticketService } from "../../services/ticketService";
import initialTickets from "./data/ticketData";
import { Loader2 } from "lucide-react";

/**
 * Tickets - Apple Liquid Glass Master IT Helpdesk & Support Feature Page
 * Connected to live Express 5 backend with Herric AI Copilot diagnostics and live conversation streams.
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

  // Auto-trigger create modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsCreateOpen(true);
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
        setTickets(liveTickets);
      } else {
        setTickets([]);
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
    if (upper.includes("ACCESS") || upper.includes("SECURITY")) return "ACCESS_SECURITY";
    if (upper.includes("INFRASTRUCTURE")) return "INFRASTRUCTURE";
    if (upper.includes("SOFTWARE") || upper.includes("TOOL")) return "SOFTWARE_TOOLS";
    if (upper.includes("FACILIT")) return "FACILITIES";
    if (upper.includes("HR")) return "HR_OPS";
    return upper;
  };

  // Filtered Tickets List
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Category Filter
      if (activeCategory !== "all") {
        const tCatNorm = normalizeCategory(t.category);
        const filterCatNorm = normalizeCategory(activeCategory);
        if (tCatNorm !== filterCatNorm) return false;
      }

      // Priority Filter
      if (priorityFilter !== "all") {
        const tPrio = (t.priority || "").toUpperCase();
        const filterPrio = priorityFilter.toUpperCase();
        if (tPrio !== filterPrio) return false;
      }

      // Search Query Filter
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
          ? { ...t, status: "RESOLVED", resolutionNotes: "Quick resolved by agent" }
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
    showToast(`Created support ticket ${newTicket.ticketNumber || newTicket.id}!`);
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
    showToast(`Support ticket removed.`);
    ticketService.getTicketStats().then((res) => {
      if (res?.data) setStatsData(res.data);
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-4 select-none">
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

        {/* Top Summary Metric Cards */}
        <TicketStatsWidget tickets={tickets} statsData={statsData} />

        {/* Header & Control Bar */}
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

        {/* Loading Indicator or Views */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
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
          />
        )}

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
    </DashboardLayout>
  );
};

export default Tickets;
