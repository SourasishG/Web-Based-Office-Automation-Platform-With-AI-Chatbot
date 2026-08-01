import {
  FolderKanban,
  PlayCircle,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";

import { StatCard } from "../../../components/ui";
import ProjectData from "../data/ProjectData";

const ProjectStats = () => {
  const stats = [
    {
      title: "Total Projects",
      value: ProjectData.length,
      icon: FolderKanban,
      color: "cyan",
    },
    {
      title: "Active",
      value: ProjectData.filter(
        (project) => project.status === "Active"
      ).length,
      icon: PlayCircle,
      color: "emerald",
    },
    {
      title: "Completed",
      value: ProjectData.filter(
        (project) => project.status === "Completed"
      ).length,
      icon: CheckCircle2,
      color: "purple",
    },
    {
      title: "On Hold",
      value: ProjectData.filter(
        (project) => project.status === "On Hold"
      ).length,
      icon: PauseCircle,
      color: "orange",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </section>
  );
};

export default ProjectStats;