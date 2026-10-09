import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";
import TicketCard from "./TicketCard";
import { GlassPanel } from "../../../components/ui/GlassPanel";

/**
 * TicketList - Grid layout rendering ticket cards with Framer Motion layout animations
 * 
 * @param {Array} tickets - Array of ticket objects
 * @param {function} onSelectTicket - Click handler to open detail modal
 * @param {function} onResolveTicket - Quick resolve callback
 */
export const TicketList = ({ tickets = [], onSelectTicket, onResolveTicket }) => {
  if (!tickets || tickets.length === 0) {
    return (
      <GlassPanel
        variant="inset"
        padding="xl"
        className="flex flex-col items-center justify-center text-center my-6 py-16"
      >
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-slate-400 mb-4">
          <Ticket className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          No Support Tickets Found
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          No tickets match your active search query, category, or priority filter.
        </p>
      </GlassPanel>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
      <AnimatePresence mode="popLayout">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <TicketCard
              ticket={ticket}
              onClick={onSelectTicket}
              onResolveClick={onResolveTicket}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TicketList;
