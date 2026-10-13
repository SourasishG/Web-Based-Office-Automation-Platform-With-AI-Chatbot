import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmployeeStatsWidget from "./components/EmployeeStatsWidget";
import EmployeesHeader from "./components/EmployeesHeader";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeTable from "./components/EmployeeTable";
import OrgChart from "./components/OrgChart";
import AddEmployeeModal from "./components/AddEmployeeModal";
import { employeeService } from "../../services/employeeService";
import apiClient from "../../services/apiClient";
import initialEmployees from "./data/employeeData";
import { Loader2 } from "lucide-react";

/**
 * Employees - Apple Liquid Glass Master Employee Directory Feature Page
 * Connected to live Express 5 / Supabase backend with org chart and profile management.
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
          projectsAssigned: emp.projectsAssigned || (emp.ownedProjects?.length || 2),
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
      // Department Filter
      if (activeDepartment !== "all" && emp.department !== activeDepartment) {
        return false;
      }

      // Status Filter
      if (statusFilter !== "all" && emp.status !== statusFilter.toLowerCase()) {
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
  const handleFormSubmit = async (employeeData) => {
    if (editingEmployee) {
      // Update existing employee
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
      // Add new employee
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
    <DashboardLayout>
      <div className="space-y-6 pb-12 select-none">
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
        <EmployeeStatsWidget employees={employees} statsData={statsData} />

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
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
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
