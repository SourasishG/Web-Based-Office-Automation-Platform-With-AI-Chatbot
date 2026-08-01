import DashboardLayout from "../../components/layout/DashboardLayout";

import TasksHeader from "./components/TasksHeader";
import TaskStats from "./components/TaskStats";
import TaskBoard from "./components/TaskBoard";

const Tasks = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <TasksHeader />

        <TaskStats />

        <TaskBoard />
      </div>
    </DashboardLayout>
  );
};

export default Tasks;