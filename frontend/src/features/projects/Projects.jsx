import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  Sparkles,
  X,
  FolderKanban,
  Users,
  Loader2,
  Clock,
} from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import ProjectStats from "./components/ProjectStats";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";
import EmptyProjects from "./components/EmptyProjects";
import ProgressBar from "./components/ProgressBar";

import { projectService } from "../../services/projectService";
import ProjectData from "./data/ProjectData";

/**
 * Projects - Executive Quixotic Projects View
 * Strictly aligned with Dashboard styling and theme:
 * - 60% Midnight Black (#0B0B0C) at top, 30% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    category: "Web Development",
    priority: "High",
    dueDate: "",
  });

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

  // Fetch project data with ProjectData fallback
  const fetchProjectData = useCallback(async () => {
    try {
      setLoading(true);

      const [projectsRes, statsRes] = await Promise.allSettled([
        projectService.getAllProjects({ limit: 100 }),
        projectService.getProjectStats(),
      ]);

      if (projectsRes.status === "fulfilled" && projectsRes.value) {
        const resData = projectsRes.value.data ?? projectsRes.value;
        const liveList =
          resData.projects ||
          (Array.isArray(resData) ? resData : []);
        setProjects(liveList.length > 0 ? liveList : ProjectData);
      } else {
        setProjects(ProjectData);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStatsData(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to load projects workspace data:", err);
      setProjects(ProjectData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return [...projects]
      .filter((project) => {
        if (statusFilter !== "all") {
          const projectStatus = (project.status || "")
            .toLowerCase()
            .replace(/[\s_]+/g, "-");

          const filterStatus = statusFilter
            .toLowerCase()
            .replace(/[\s_]+/g, "-");

          if (projectStatus !== filterStatus) return false;
        }

        if (!searchTerm) return true;

        const query = searchTerm.toLowerCase();
        return (
          project.title?.toLowerCase().includes(query) ||
          project.name?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.department?.toLowerCase().includes(query) ||
          project.category?.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "progress":
            return (b.progress || 0) - (a.progress || 0);

          case "dueDate":
            return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);

          case "name":
          default: {
            const nameA = a.title || a.name || "";
            const nameB = b.title || b.name || "";
            return nameA.localeCompare(nameB);
          }
        }
      });
  }, [projects, searchTerm, statusFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("name");
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    try {
      setSubmitting(true);
      const newProj = {
        name: createForm.name.trim(),
        title: createForm.name.trim(),
        description:
          createForm.description.trim() ||
          "Sprint project managed through Office Aid.",
        category: createForm.category,
        priority: createForm.priority,
        status: "Active",
        progress: 0,
        dueDate: createForm.dueDate || "30 Nov 2026",
        members: [
          {
            id: 1,
            name: "Sourasish Ghosh",
            avatar: "https://i.pravatar.cc/150?img=11",
          },
        ],
      };

      try {
        const res = await projectService.createProject(newProj);
        const created = res.data ?? res;
        setProjects((prev) => [created.project || created || newProj, ...prev]);
      } catch {
        // Fallback to local state if backend API route is simulated
        setProjects((prev) => [
          { ...newProj, id: `proj-${Date.now()}` },
          ...prev,
        ]);
      }

      setIsCreateModalOpen(false);
      setCreateForm({
        name: "",
        description: "",
        category: "Web Development",
        priority: "High",
        dueDate: "",
      });
    } finally {
      setSubmitting(false);
    }
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

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Projects Canvas */}
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
                <span>Projects</span>
                <span className="text-[#C6F432]">Portfolio</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>Active Workspaces • End-to-end delivery & sprint tracking</span>
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
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Project</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <ProjectStats projects={projects} statsData={statsData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onCreateClick={() => setIsCreateModalOpen(true)}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: Project Cards Grid */}
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
                  Synchronizing Active Projects...
                </span>
              </div>
            ) : filteredProjects.length > 0 ? (
              <ProjectGrid
                projects={filteredProjects}
                onProjectClick={(p) => setSelectedProject(p)}
              />
            ) : (
              <EmptyProjects onReset={handleResetFilters} />
            )}
          </motion.div>
        </main>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C6F432]/10 border border-[#C6F432]/20 flex items-center justify-center text-[#C6F432]">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Create New Project
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Add a new initiative to the workplace portfolio
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Project Name <span className="text-[#C6F432]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g. NextGen Mobile Banking Platform"
                    className="w-full bg-[#1A1A1E] border border-white/10 focus:border-[#C6F432] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Category / Department
                    </label>
                    <select
                      value={createForm.category}
                      onChange={(e) =>
                        setCreateForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1A1A1E] border border-white/10 focus:border-[#C6F432] rounded-xl px-3 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Web Development" className="bg-[#141416]">
                        Web Development
                      </option>
                      <option value="AI & ML" className="bg-[#141416]">
                        AI & ML
                      </option>
                      <option value="Cloud & DevOps" className="bg-[#141416]">
                        Cloud & DevOps
                      </option>
                      <option value="Design System" className="bg-[#141416]">
                        Design System
                      </option>
                      <option value="Cybersecurity" className="bg-[#141416]">
                        Cybersecurity
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Priority Level
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) =>
                        setCreateForm((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      className="w-full bg-[#1A1A1E] border border-white/10 focus:border-[#C6F432] rounded-xl px-3 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="High" className="bg-[#141416]">
                        High
                      </option>
                      <option value="Medium" className="bg-[#141416]">
                        Medium
                      </option>
                      <option value="Low" className="bg-[#141416]">
                        Low
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Target Delivery Date
                  </label>
                  <input
                    type="date"
                    value={createForm.dueDate}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                    className="w-full bg-[#1A1A1E] border border-white/10 focus:border-[#C6F432] rounded-xl px-4 py-2 text-xs text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Description & Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={createForm.description}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Summary of deliverables, scope, and key deliverables..."
                    className="w-full bg-[#1A1A1E] border border-white/10 focus:border-[#C6F432] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                    <span>Create Project</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#141416] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-white z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#C6F432] text-[#0B0B0C] flex items-center justify-center shadow-md">
                    <FolderKanban className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {selectedProject.name || selectedProject.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {selectedProject.category || selectedProject.department || "General"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                    About Project
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedProject.description || "No description provided."}
                  </p>
                </div>

                <div className="bg-[#1A1A1E] rounded-2xl p-4 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Status</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {selectedProject.status || "Active"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Priority</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white">
                      {selectedProject.priority || "Medium"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Due Date</span>
                    <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C6F432]" />
                      {selectedProject.dueDate || "Ongoing"}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-zinc-300">
                      Sprint Completion
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C6F432]">
                      {selectedProject.progress || 0}%
                    </span>
                  </div>
                  <ProgressBar
                    progress={selectedProject.progress || 0}
                    showLabel={false}
                  />
                </div>

                {selectedProject.members && selectedProject.members.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C6F432]" />
                      Assigned Team ({selectedProject.members.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.members.map((m, idx) => (
                        <div
                          key={m.id || idx}
                          className="flex items-center gap-2 bg-[#1A1A1E] border border-white/10 rounded-full py-1 px-3"
                        >
                          <img
                            src={
                              m.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                m.name || "User"
                              )}&background=0B0B0C&color=C6F432`
                            }
                            alt={m.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs text-zinc-200 font-medium">
                            {m.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
