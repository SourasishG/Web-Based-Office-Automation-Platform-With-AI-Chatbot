import { motion, AnimatePresence } from "framer-motion";
import { UserX } from "lucide-react";
import EmployeeCard from "./EmployeeCard";

/**
 * EmployeeGrid - Responsive Grid Container for Pure White Employee Cards
 * 
 * @param {Array} employees - Array of employee object records
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 */
export const EmployeeGrid = ({ employees = [], onMessageClick, onEditClick }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center my-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 mb-4">
          <UserX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-[#0B0B0C] tracking-tight">
          No Employees Found
        </h3>
        <p className="text-sm text-zinc-600 max-w-md mt-1.5">
          No team members match your active search or filter criteria. Try adjusting your search query or department filter.
        </p>
      </div>
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
