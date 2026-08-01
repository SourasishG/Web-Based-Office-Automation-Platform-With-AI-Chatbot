import { PRIORITY_COLORS } from "../data/TaskConstants";

const TaskPriorityBadge = ({ priority }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_COLORS[priority]}`}
    >
      {priority}
    </span>
  );
};

export default TaskPriorityBadge;