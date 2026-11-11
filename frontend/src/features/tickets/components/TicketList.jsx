import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";
import TicketCard from "./TicketCard";

/**
 * TicketList - Quixotic Responsive Grid rendering Pure White ticket cards
 * Positioned in the lower 40% Pure White region.
 *
 * @param {Array} tickets - Array of ticket objects
 * @param {function} onSelectTicket - Click handler to open detail modal
 * @param {function} onResolveTicket - Quick resolve callback
 */
export const TicketList = ({
  tickets = [],
  onSelectTicket,
  onResolveTicket,
}) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm p-12 flex flex-col items-center justify-center text-center my-6">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center mb-4">
          <Ticket className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-[#0B0B0C] tracking-tight">
          No Support Tickets Found
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          No tickets match your active search query, category, or priority filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
      <AnimatePresence mode="popLayout">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
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
