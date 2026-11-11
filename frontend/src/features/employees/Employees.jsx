import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import EmployeeStatsWidget from "./components/EmployeeStatsWidget";
import EmployeesHeader from "./components/EmployeesHeader";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeTable from "./components/EmployeeTable";
import OrgChart from "./components/OrgChart";
import AddEmployeeModal from "./components/AddEmployeeModal";

import { employeeService } from "../../services/employeeService";
import apiClient from "../../services/apiClient";
import initialEmployees from "./data/employeeData";

/**
 * Employees - Executive Quixotic Employee Directory Workspace
 * Strictly aligned with Dashboard, Projects, Tasks, and Meetings theme:
 * - 60% Midnight Black (#0B0B0C) at top, 30% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Layout State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeViewMode, setActiveViewMode] = useState("grid"); // 'grid', 'table', 'orgChart'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Quick Toast Notification State
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const fetchEmployeesData = useCallback(async () => {
    try {
      setLoading(true);

      const [empRes, statsRes] = await Promise.allSettled([
        employeeService.getAllEmployees({ limit: 100 }),
        employeeService.getStats(),
      ]);

      if (empRes.status === "fulfilled" && empRes.value) {
        const resData = empRes.value.data ?? empRes.value;
        const liveList =
          resData.employees ||
          (Array.isArray(resData) ? resData : []);

        const normalized = liveList.map((emp) => ({
          ...emp,
          id: emp.id,
          name:
            `${emp.firstName || ""} ${emp.lastName || ""}`.trim() ||
            emp.name ||
            emp.email,
          title: emp.jobTitle || emp.title || "Specialist",
          department: emp.department || "Engineering",
          roleLevel:
            emp.role === "ADMIN"
              ? "Admin"
              : emp.role === "MANAGER"
              ? "Lead"
              : emp.roleLevel || "Specialist",
          email: emp.email,
          phone: emp.phone || "+1 (555) 234-5678",
          location: emp.location || "San Francisco, CA",
          status: (emp.presenceStatus || emp.status || "ONLINE").toLowerCase(),
          avatar: emp.avatarUrl || emp.avatar,
          skills: Array.isArray(emp.skills) ? emp.skills : [],
          projectsAssigned: emp.projectsAssigned || emp.ownedProjects?.length || 2,
          tasksCompleted: emp.tasksCompleted || 8,
          performanceScore: emp.performanceScore || 4.9,
        }));

        setEmployees(normalized.length > 0 ? normalized : initialEmployees);
      } else {
        setEmployees(initialEmployees);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStatsData(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to load employee directory data:", err);
      setEmployees(initialEmployees);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployeesData();
  }, [fetchEmployeesData]);

  // Filter Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (activeDepartment !== "all" && emp.department !== activeDepartment) {
        return false;
      }

      if (statusFilter !== "all" && emp.status !== statusFilter.toLowerCase()) {
        return false;
      }

      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const skillsStr = Array.isArray(emp.skills)
        ? emp.skills.join(" ").toLowerCase()
        : "";

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
  const handleFormSubmit = async (employeeData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === employeeData.id ? { ...e, ...employeeData } : e))
      );
      showToast(`Updated profile for ${employeeData.name}`);

      try {
        await employeeService.updateEmployee(employeeData.id, {
          firstName: employeeData.name.split(" ")[0] || employeeData.firstName,
          lastName: employeeData.name.split(" ").slice(1).join(" ") || employeeData.lastName,
          jobTitle: employeeData.title,
          department: employeeData.department,
          phone: employeeData.phone,
          location: employeeData.location,
          skills: employeeData.skills,
        });
      } catch (err) {
        console.error("Failed to save employee update to backend:", err);
      }
    } else {
      setEmployees((prev) => [employeeData, ...prev]);
      showToast(`Added ${employeeData.name} to directory!`);
    }
  };

  // Handler: Delete
  const handleDeleteEmployee = async (id) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast(`Removed ${target?.name || "employee"} from directory.`);

    try {
      await apiClient.delete(`/employees/${id}`);
    } catch (err) {
      console.warn("Notice: Delete employee endpoint requires ADMIN role:", err.message);
    }
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

        {/* Center Employees Canvas */}
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
                <span>Employee</span>
                <span className="text-[#C6F432]">Directory</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>Verified Roster • Roles, presence status & reporting hierarchy</span>
              </p>
            </div>

            {/* Current Date & Time Pill + Lime Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              {/* Primary Action Button: Lime Green */}
              <button
                type="button"
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Employee</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <EmployeeStatsWidget employees={employees} statsData={statsData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
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
          </motion.div>

          {/* Lower 40% Pure White Zone: View Switcher Output */}
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
                  Loading Employee Roster & Hierarchy...
                </span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </motion.div>
        </main>
      </div>

      {/* Add / Edit Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
      />
    </div>
  );
};

export default Employees;
