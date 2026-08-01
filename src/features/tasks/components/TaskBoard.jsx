import TaskColumn from "./TaskColumn";

import TaskData from "../data/TaskData";
import { TASK_STATUS } from "../data/TaskConstants";

const TaskBoard = () => {
  const groupedTasks = {};

  TASK_STATUS.forEach((status) => {
    groupedTasks[status] = TaskData.filter(
      (task) => task.status === status
    );
  });

  return (
    <section className="overflow-x-auto">
      <div className="flex min-w-max gap-6 pb-2">
        {TASK_STATUS.map((status) => (
          <TaskColumn
            key={status}
            title={status}
            tasks={groupedTasks[status]}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskBoard;