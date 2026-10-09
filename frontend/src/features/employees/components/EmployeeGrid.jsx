import { motion, AnimatePresence } from "framer-motion";
import { UserX } from "lucide-react";
import EmployeeCard from "./EmployeeCard";
import { GlassPanel } from "../../../components/ui/GlassPanel";

/**
 * EmployeeGrid - Renders employee cards in a responsive grid container with layout animations
 * 
 * @param {Array} employees - Array of employee object records
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 */
export const EmployeeGrid = ({ employees = [], onMessageClick, onEditClick }) => {
  if (!employees || employees.length === 0) {
    return (
      <GlassPanel
        variant="inset"
        padding="xl"
        className="flex flex-col items-center justify-center text-center my-8 py-16"
      >
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-slate-400 mb-4">
          <UserX className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          No Employees Found
        </h3>
        <p className="text-sm text-slate-400 max-w-md mt-1">
          No team members match your active search or filter criteria. Try adjusting your search query or department filter.
        </p>
      </GlassPanel>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {employees.map((employee) => (
          <motion.div
            key={employee.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            <EmployeeCard
              employee={employee}
              onMessageClick={onMessageClick}
              onEditClick={onEditClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeGrid;
