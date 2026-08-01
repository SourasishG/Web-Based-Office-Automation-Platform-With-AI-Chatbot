import { TASK_STATUS_CONFIG } from "../data/TaskStatus";

const TaskStatusBadge = ({ status }) => {
  const statusConfig = TASK_STATUS_CONFIG[status];
  const StatusIcon = statusConfig.icon;

  return (
    <span
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.badge}`}
    >
      <StatusIcon size={14} />
      {statusConfig.label}
    </span>
  );
};

export default TaskStatusBadge;