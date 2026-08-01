import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
} from "lucide-react";

import { Button } from "../../../components/ui";

const FilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
  sortBy,
  setSortBy,
}) => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="
              w-72
              rounded-2xl
              border
              border-white/10
              bg-white/5
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              placeholder:text-slate-500
              focus:border-cyan-500
            "
          />
        </div>


        {/* Status Filter */}
        <div className="relative">

          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              appearance-none
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              py-3
              pl-10
              pr-8
              text-white
              outline-none
              cursor-pointer
              focus:border-cyan-500
            "
          >
            <option className="bg-[#111111] text-white" value="All">
              All Status
            </option>

            <option className="bg-[#111111] text-white" value="Active">
              Active
            </option>

            <option className="bg-[#111111] text-white" value="Completed">
              Completed
            </option>

            <option className="bg-[#111111] text-white" value="Pending">
              Pending
            </option>

            <option className="bg-[#111111] text-white" value="On Hold">
              On Hold
            </option>

          </select>

        </div>


        {/* Sort */}
        <div className="relative">

          <ArrowUpDown
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              appearance-none
              rounded-2xl
              border
              border-white/10
              bg-[#111111]
              py-3
              pl-10
              pr-8
              text-white
              outline-none
              cursor-pointer
              focus:border-cyan-500
            "
          >

            <option className="bg-[#111111] text-white" value="name">
              Name
            </option>

            <option className="bg-[#111111] text-white" value="progress">
              Progress
            </option>

            <option className="bg-[#111111] text-white" value="priority">
              Priority
            </option>

            <option className="bg-[#111111] text-white" value="dueDate">
              Due Date
            </option>

          </select>

        </div>

      </div>


      <Button icon={Plus}>
        New Project
      </Button>

    </section>
  );
};

export default FilterBar;