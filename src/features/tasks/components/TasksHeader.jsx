import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
} from "lucide-react";

const TasksHeader = () => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Tasks
        </h1>

        <p className="mt-2 text-slate-400">
          Organize, assign and monitor your team's work efficiently.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-72 rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500"
          />
        </div>

        <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:text-white">
          <Filter size={18} />
          Filter
        </button>

        <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:text-white">
          <ArrowUpDown size={18} />
          Sort
        </button>

        <button className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
          <Plus size={18} />
          New Task
        </button>
      </div>
    </section>
  );
};

export default TasksHeader;