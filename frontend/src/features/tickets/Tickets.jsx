import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TicketStatsWidget from "./components/TicketStatsWidget";
import TicketsHeader from "./components/TicketsHeader";
import TicketList from "./components/TicketList";
import TicketKanban from "./components/TicketKanban";
import TicketDetailModal from "./components/TicketDetailModal";
import CreateTicketModal from "./components/CreateTicketModal";

import initialTickets from "./data/ticketData";

/**
 * Tickets - Apple Liquid Glass Master IT Helpdesk & Support Feature Page
 * Assembles support metrics, control bar, list/kanban views, detail timeline modal, and create ticket form.
 */
export const Tickets = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeViewMode, setActiveViewMode] = useState("list"); // 'list', 'kanban'

  // Modals & Toast State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Filtered Tickets List
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Category Filter
      if (activeCategory !== "all" && t.category !== activeCategory) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== "all" && t.priority !== priorityFilter) {
        return false;
      }

      // Search Query Filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      return (
        t.id?.toLowerCase().includes(query) ||
        t.title?.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.requester.name?.toLowerCase().includes(query) ||
        t.assignee?.name?.toLowerCase().includes(query)
      );
    });
  }, [tickets, activeCategory, priorityFilter, searchTerm]);

  // Handler: Status Change
  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    showToast(`Updated status for ticket ${ticketId} to "${newStatus}"`);
  };

  // Handler: Quick Resolve
  const handleQuickResolve = (ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticket.id ? { ...t, status: "resolved", slaTime: "Completed" } : t))
    );
    showToast(`Ticket ${ticket.id} marked as Resolved!`);
  };

  // Handler: Create Ticket
  const handleCreateTicket = (ticketPayload) => {
    const fullTicket = {
      ...ticketPayload,
      id: `TCK-${tickets.length + 406}`,
    };
    setTickets((prev) => [fullTicket, ...prev]);
    showToast(`Created support ticket ${fullTicket.id}!`);
  };

  // Handler: Post Comment
  const handleAddComment = (ticketId, commentText) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, commentsCount: (t.commentsCount || 0) + 1 } : t
      )
    );
    showToast(`Added comment to ${ticketId}: "${commentText.slice(0, 20)}..."`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-4">
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
        <TicketStatsWidget tickets={tickets} />

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

        {/* View Switcher: List or Kanban */}
        {activeViewMode === "list" ? (
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
          onAddComment={handleAddComment}
        />

        {/* Create Ticket Modal */}
        <CreateTicketModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateTicket}
        />
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
