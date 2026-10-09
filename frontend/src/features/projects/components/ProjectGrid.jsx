import React from "react";
import ProjectCard from "./ProjectCard";

/**
 * ProjectGrid - Responsive Grid Container for Project Cards
 * Maps project items across a 3-column desktop / 2-column tablet responsive deck.
 * 
 * @param {Array<object>} projects - List of project objects
 * @param {function} onProjectClick - Project selection callback
 */
export const ProjectGrid = ({ projects = [], onProjectClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id || idx}
          project={project}
          onClick={() => onProjectClick && onProjectClick(project)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;