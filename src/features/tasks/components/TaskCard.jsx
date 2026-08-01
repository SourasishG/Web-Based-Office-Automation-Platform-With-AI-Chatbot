import {
  CalendarDays,
  MoreVertical,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";

import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskProgress from "./TaskProgress";

const TaskCard = ({ task }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {task.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description}
          </p>
        </div>

        <button className="rounded-lg p-2 transition hover:bg-white/10">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <TaskStatusBadge status={task.status} />

        <TaskPriorityBadge priority={task.priority} />
      </div>

      <TaskProgress progress={task.progress} />

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Tag size={16} />

          <span>{task.category}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={16} />

          <span>{task.dueDate}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-600 text-sm font-semibold text-white">
            {task.assignee}
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Assignee
            </p>

            <p className="text-sm font-medium text-white">
              {task.assignee}
            </p>
          </div>
        </div>

        <button className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105">
          View
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;