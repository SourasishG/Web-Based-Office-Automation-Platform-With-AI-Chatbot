import { useMemo } from "react";
import { ShieldCheck, ChevronDown, UserCheck } from "lucide-react";

/**
 * OrgChart - Quixotic Visual Organizational Structure & Reporting Hierarchy
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 * 
 * @param {Array} employees - Array of employee object records
 */
export const OrgChart = ({ employees = [] }) => {
  const hierarchy = useMemo(() => {
    const executive = employees.filter(
      (e) => e.department === "Executive" || e.roleLevel === "Admin"
    );

    const leads = employees.filter(
      (e) => e.roleLevel === "Lead" && e.department !== "Executive"
    );

    const staff = employees.filter(
      (e) =>
        e.roleLevel !== "Admin" &&
        e.roleLevel !== "Lead" &&
        e.department !== "Executive"
    );

    return { executive, leads, staff };
  }, [employees]);

  const getAvatar = (emp) =>
    emp.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      emp.name || "U"
    )}&background=0B0B0C&color=C6F432`;

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Chart Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
          <ShieldCheck className="w-3.5 h-3.5 text-[#386b03]" />
          Corporate Governance Tree
        </span>
        <h2 className="text-2xl font-extrabold text-[#0B0B0C] mt-3 tracking-tight">
          Organizational Hierarchy & Reporting Structure
        </h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-lg mx-auto font-medium">
          Interactive view of workplace leadership, department leads, and project teams.
        </p>
      </div>

      {/* Level 1: Executive Leadership */}
      <div className="flex flex-col items-center">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-[#0B0B0C]" /> Executive Leadership
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {hierarchy.executive.map((exec) => (
            <div
              key={exec.id}
              className="p-5 rounded-3xl bg-[#141416] border-2 border-[#C6F432] shadow-xl text-center min-w-[260px] relative"
            >
              <img
                src={getAvatar(exec)}
                alt={exec.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C6F432] mx-auto mb-3 shadow-md"
              />
              <h3 className="text-base font-bold text-white tracking-tight">
                {exec.name}
              </h3>
              <p className="text-xs font-semibold text-[#C6F432] mt-0.5">
                {exec.title}
              </p>
              <div className="mt-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-zinc-200 border border-white/10">
                  {exec.department}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line */}
        <div className="w-0.5 h-8 bg-zinc-300 my-2" />
        <ChevronDown className="w-4 h-4 text-[#0B0B0C] -mt-2 mb-4" />
      </div>

      {/* Level 2: Department Leads */}
      <div className="flex flex-col items-center mt-2">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
          Department Leads & Division Heads
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {hierarchy.leads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center flex flex-col items-center justify-between hover:border-[#C6F432] transition-colors shadow-xs"
            >
              <img
                src={getAvatar(lead)}
                alt={lead.name}
                className="w-12 h-12 rounded-xl object-cover border border-zinc-200 mb-2"
              />
              <h4 className="text-sm font-bold text-[#0B0B0C]">{lead.name}</h4>
              <p className="text-[11px] text-zinc-600 font-medium mt-0.5">
                {lead.title}
              </p>
              <div className="mt-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
                  {lead.department}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line */}
        <div className="w-0.5 h-8 bg-zinc-200 my-2" />
        <ChevronDown className="w-4 h-4 text-zinc-400 -mt-2 mb-4" />
      </div>

      {/* Level 3: Specialists & Staff */}
      <div className="flex flex-col items-center mt-2">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
          Specialists & Team Members
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
          {hierarchy.staff.map((member) => (
            <div
              key={member.id}
              className="px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center gap-3 hover:border-[#C6F432] transition-colors"
            >
              <img
                src={getAvatar(member)}
                alt={member.name}
                className="w-8 h-8 rounded-lg object-cover border border-zinc-200 shrink-0"
              />
              <div className="text-left">
                <h5 className="text-xs font-bold text-[#0B0B0C]">
                  {member.name}
                </h5>
                <p className="text-[10px] text-zinc-500 font-medium">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
