import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProjectStats from "./components/ProjectStats";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";
import EmptyProjects from "./components/EmptyProjects";

import { projectService } from "../../services/projectService";
import { Loader2 } from "lucide-react";

/**
 * Projects - Apple Liquid Glass Master Projects View
 * Connected to live Express 5 / Supabase backend with live metrics, search, and progress tracking.
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

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
        setProjects(liveList);
      } else {
        setProjects([]);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStatsData(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to load projects workspace data:", err);
      setProjects([]);
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
            return (
              new Date(a.dueDate || 0) -
              new Date(b.dueDate || 0)
            );

          case "name":
          default: {
            const nameA = a.title || a.name || "";
            const nameB = b.title || b.name || "";

            return nameA.localeCompare(nameB);
          }
        }
      });
  }, [projects, searchTerm, statusFilter, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 22,
      },
    },
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("name");
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1600px] space-y-6 select-none"
      >
        {/* Statistics */}
        <motion.div variants={itemVariants}>
          <ProjectStats projects={projects} statsData={statsData} />
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </motion.div>

        {/* Projects */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
              Synchronizing Active Projects...
            </span>
          </div>
        ) : (
          <motion.div variants={itemVariants}>
            {filteredProjects.length > 0 ? (
              <ProjectGrid projects={filteredProjects} />
            ) : (
              <EmptyProjects onReset={handleResetFilters} />
            )}
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Projects;