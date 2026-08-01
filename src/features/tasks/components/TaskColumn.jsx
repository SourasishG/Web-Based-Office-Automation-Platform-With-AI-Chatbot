import { motion } from "framer-motion";

import TaskCard from "./TaskCard";

const TaskColumn = ({
  title,
  tasks,
}) => {
  return (
    <div className="min-w-85 flex-1 rounded-3xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-400">
          {tasks.length}
        </span>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="space-y-5"
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        ) : (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-sm text-slate-500">
            No Tasks
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TaskColumn;