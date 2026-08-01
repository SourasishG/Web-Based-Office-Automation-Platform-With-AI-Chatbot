import {
  CalendarDays,
  FolderKanban,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  AvatarGroup,
  Button,
  GlassCard,
  InfoRow,
  ProgressBar,
  StatusBadge,
} from "../../../components/ui";

import { PROJECT_STATUS_CONFIG } from "../data/ProjectStatus";
import { PRIORITY_COLORS } from "../data/ProjectConstants";

const ProjectCard = ({ project }) => {
  const status = PROJECT_STATUS_CONFIG[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <GlassCard>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {project.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {project.description}
            </p>
          </div>

          <button className="rounded-xl p-2 transition hover:bg-white/10">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-400">
            {project.category}
          </span>

          <StatusBadge
            status={status.label}
            className={status.badge}
          />

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_COLORS[project.priority]}`}
          >
            {project.priority} Priority
          </span>
        </div>

        <ProgressBar
          progress={project.progress}
        />

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
              Team
            </p>

            <AvatarGroup
              users={project.members}
              max={4}
            />
          </div>

          <div className="text-right">
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
              Due Date
            </p>

            <InfoRow
              icon={CalendarDays}
              className="justify-end"
            >
              {project.dueDate}
            </InfoRow>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <InfoRow icon={FolderKanban}>
            Project Workspace
          </InfoRow>

          <Button size="sm">
            Open
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectCard;