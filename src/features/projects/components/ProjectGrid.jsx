import { FolderKanban } from "lucide-react";

import { EmptyState } from "../../../components/ui";

import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No Projects Found"
        description="Try changing your search or filter criteria."
      />
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </section>
  );
};

export default ProjectGrid;