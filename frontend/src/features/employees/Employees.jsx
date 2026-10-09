import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmployeeStatsWidget from "./components/EmployeeStatsWidget";
import EmployeesHeader from "./components/EmployeesHeader";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeTable from "./components/EmployeeTable";
import OrgChart from "./components/OrgChart";
import AddEmployeeModal from "./components/AddEmployeeModal";

import initialEmployees from "./data/employeeData";

/**
 * Employees - Apple Liquid Glass Master Employee Directory Feature Page
 * Assembles executive stats, search/filter control bar, grid/table/orgChart views, and add/edit employee modals.
 */
export const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeViewMode, setActiveViewMode] = useState("grid"); // 'grid', 'table', 'orgChart'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Quick Toast Notification State
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Filter Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Department Filter
      if (activeDepartment !== "all" && emp.department !== activeDepartment) {
        return false;
      }

      // Status Filter
      if (statusFilter !== "all" && emp.status !== statusFilter) {
        return false;
      }

      // Search Query Filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const skillsStr = Array.isArray(emp.skills) ? emp.skills.join(" ").toLowerCase() : "";

      return (
        emp.name?.toLowerCase().includes(query) ||
        emp.title?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query) ||
        skillsStr.includes(query)
      );
    });
  }, [employees, activeDepartment, statusFilter, searchTerm]);

  // Handler: Add or Edit Submit
  const handleFormSubmit = (employeeData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === employeeData.id ? employeeData : e))
      );
      showToast(`Updated profile for ${employeeData.name}`);
    } else {
      setEmployees((prev) => [employeeData, ...prev]);
      showToast(`Added ${employeeData.name} to employee directory!`);
    }
  };

  // Handler: Delete
  const handleDeleteEmployee = (id) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast(`Removed ${target?.name || "employee"} from directory.`);
  };

  // Handler: Open Edit Modal
  const handleOpenEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Handler: Open Add Modal
  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  // Handler: Quick Message
  const handleMessage = (employee) => {
    showToast(`Opening chat conversation with ${employee.name}...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
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
        <EmployeeStatsWidget employees={employees} />

        {/* Header & Control Bar */}
        <EmployeesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeDepartment={activeDepartment}
          onDepartmentChange={setActiveDepartment}
          activeViewMode={activeViewMode}
          onViewModeChange={setActiveViewMode}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddClick={handleOpenAdd}
        />

        {/* View Switcher Output */}
        {activeViewMode === "grid" && (
          <EmployeeGrid
            employees={filteredEmployees}
            onMessageClick={handleMessage}
            onEditClick={handleOpenEdit}
          />
        )}

        {activeViewMode === "table" && (
          <EmployeeTable
            employees={filteredEmployees}
            onMessageClick={handleMessage}
            onEditClick={handleOpenEdit}
            onDeleteClick={handleDeleteEmployee}
          />
        )}

        {activeViewMode === "orgChart" && (
          <OrgChart employees={employees} />
        )}

        {/* Add / Edit Employee Modal */}
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingEmployee}
        />
      </div>
    </DashboardLayout>
  );
};

export default Employees;
