import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProjectStats from "./components/ProjectStats";
import FilterBar from "./components/FilterBar";
import ProjectGrid from "./components/ProjectGrid";

import ProjectData from "./data/ProjectData";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredProjects = useMemo(() => {
    let projects = [...ProjectData];

    if (search) {
      projects = projects.filter(
        (project) =>
          project.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      projects = projects.filter(
        (project) => project.status === status
      );
    }

    switch (sortBy) {
      case "progress":
        projects.sort((a, b) => b.progress - a.progress);
        break;

      case "dueDate":
        projects.sort(
          (a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );
        break;

      case "priority": {
        const order = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        projects.sort(
          (a, b) =>
            order[a.priority] - order[b.priority]
        );
        break;
      }

      default:
        projects.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    return projects;
  }, [search, status, sortBy]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProjectStats />

        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProjectGrid
          projects={filteredProjects}
        />
      </div>
    </DashboardLayout>
  );
};

export default Projects;