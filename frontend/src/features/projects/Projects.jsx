import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProjectStats from "./components/ProjectStats";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";
import EmptyProjects from "./components/EmptyProjects";

import ProjectData from "./data/ProjectData";

/**
 * Projects - Apple Liquid Glass Master Projects View
 * Assembles project metrics, search/filter control bar,
 * project card grid, and empty states.
 */

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Extract raw projects list
  const rawProjects = useMemo(() => {
    if (Array.isArray(ProjectData)) return ProjectData;

    if (
      ProjectData?.projects &&
      Array.isArray(ProjectData.projects)
    ) {
      return ProjectData.projects;
    }

    return [];
  }, []);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return [...rawProjects]
      .filter((project) => {
        if (statusFilter !== "all") {
          const projectStatus = (project.status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");

          const filterStatus = statusFilter
            .toLowerCase()
            .replace(/\s+/g, "-");

          if (projectStatus !== filterStatus) return false;
        }

        if (!searchTerm) return true;

        const query = searchTerm.toLowerCase();

        return (
          project.title?.toLowerCase().includes(query) ||
          project.name?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
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
  }, [rawProjects, searchTerm, statusFilter, sortBy]);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
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
          <ProjectStats projects={rawProjects} />
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
        <motion.div variants={itemVariants}>
          {filteredProjects.length > 0 ? (
            <ProjectGrid projects={filteredProjects} />
          ) : (
            <EmptyProjects onReset={handleResetFilters} />
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Projects;