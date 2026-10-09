import { useMemo } from "react";
import { ShieldCheck, ChevronDown, UserCheck } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * OrgChart - Visual Organizational Structure & Reporting Hierarchy Diagram
 * Groups team members into Executive Level -> Department Leads -> Specialists
 * 
 * @param {Array} employees - Array of employee object records
 */
export const OrgChart = ({ employees = [] }) => {
  // Hierarchical grouping
  const hierarchy = useMemo(() => {
    const executive = employees.filter(
      (e) => e.department === "Executive" || e.roleLevel === "Admin"
    );

    const leads = employees.filter(
      (e) => e.roleLevel === "Lead" && e.department !== "Executive"
    );

    const staff = employees.filter(
      (e) => e.roleLevel !== "Admin" && e.roleLevel !== "Lead" && e.department !== "Executive"
    );

    return { executive, leads, staff };
  }, [employees]);

  return (
    <GlassPanel variant="floating" padding="lg" className="my-6 relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-b from-cyan-500/10 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Chart Header */}
      <div className="text-center mb-10 relative z-10">
        <GlassBadge variant="cyan" size="sm" icon={ShieldCheck}>
          Corporate Governance Tree
        </GlassBadge>
        <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
          Organizational Hierarchy & Reporting Structure
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Interactive view of workplace leadership, department leads, and project teams.
        </p>
      </div>

      {/* Level 1: Executive Leadership */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Executive Leadership
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {hierarchy.executive.map((exec) => (
            <div
              key={exec.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-cyan-400/40 shadow-xl shadow-cyan-500/5 text-center min-w-[260px] relative group"
            >
              <GlassAvatar
                src={exec.avatar}
                name={exec.name}
                size="xl"
                status={exec.status}
                glow
                className="mx-auto mb-3"
              />
              <h3 className="text-base font-bold text-white tracking-tight">{exec.name}</h3>
              <p className="text-xs font-medium text-cyan-400">{exec.title}</p>
              <div className="mt-2">
                <GlassBadge variant="purple" size="sm">
                  {exec.department}
                </GlassBadge>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line */}
        <div className="w-0.5 h-8 bg-linear-to-b from-cyan-400/60 to-white/20 my-2" />
        <ChevronDown className="w-4 h-4 text-cyan-400 -mt-2 mb-4" />
      </div>

      {/* Level 2: Department Leads */}
      <div className="relative z-10 flex flex-col items-center mt-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Department Leads & Division Heads
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {hierarchy.leads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-between"
            >
              <GlassAvatar
                src={lead.avatar}
                name={lead.name}
                size="lg"
                status={lead.status}
                className="mb-2"
              />
              <h4 className="text-sm font-bold text-white">{lead.name}</h4>
              <p className="text-[11px] text-slate-300 font-medium">{lead.title}</p>
              <div className="mt-2">
                <GlassBadge variant="cyan" size="sm">
                  {lead.department}
                </GlassBadge>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line */}
        <div className="w-0.5 h-8 bg-linear-to-b from-white/20 to-white/10 my-2" />
        <ChevronDown className="w-4 h-4 text-slate-400 -mt-2 mb-4" />
      </div>

      {/* Level 3: Specialists & Staff */}
      <div className="relative z-10 flex flex-col items-center mt-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Specialists & Team Members
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
          {hierarchy.staff.map((member) => (
            <div
              key={member.id}
              className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
            >
              <GlassAvatar
                src={member.avatar}
                name={member.name}
                size="sm"
                status={member.status}
              />
              <div className="text-left">
                <h5 className="text-xs font-bold text-white">{member.name}</h5>
                <p className="text-[10px] text-slate-400">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
};

export default OrgChart;
