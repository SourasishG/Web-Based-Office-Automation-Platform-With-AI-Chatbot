import {
  ListTodo,
  Circle,
  Clock3,
  Eye,
  CheckCircle2,
} from "lucide-react";

import TaskData from "../data/TaskData";

const TaskStats = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: TaskData.length,
      icon: ListTodo,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "To Do",
      value: TaskData.filter(
        (task) => task.status === "To Do"
      ).length,
      icon: Circle,
      color: "from-slate-500 to-slate-700",
    },
    {
      title: "In Progress",
      value: TaskData.filter(
        (task) => task.status === "In Progress"
      ).length,
      icon: Clock3,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Review",
      value: TaskData.filter(
        (task) => task.status === "Review"
      ).length,
      icon: Eye,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Completed",
      value: TaskData.filter(
        (task) => task.status === "Completed"
      ).length,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${stat.color}`}
              >
                <Icon size={24} />
              </div>

              <span className="text-4xl font-bold text-white">
                {stat.value}
              </span>
            </div>

            <h3 className="mt-6 text-sm font-medium uppercase tracking-wider text-slate-400">
              {stat.title}
            </h3>
          </div>
        );
      })}
    </section>
  );
};

export default TaskStats;