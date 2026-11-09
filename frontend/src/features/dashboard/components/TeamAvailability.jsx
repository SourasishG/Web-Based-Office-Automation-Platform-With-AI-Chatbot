import { useNavigate } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * TeamAvailability - Apple Liquid Glass Live Directory Status Feed
 * Displays real-time presence, department roles, and quick message triggers for key team members.
 * 
 * @param {Array<object>} team - Array of team member availability objects
 */
export const TeamAvailability = ({ team, theme = "default" }) => {
  const navigate = useNavigate();

  const defaultTeam = [
    {
      id: "emp-1",
      name: "Sourasish Ghosh",
      role: "CEO & Administrator",
      department: "Executive",
      status: "online",
    },
    {
      id: "emp-2",
      name: "Aarav Sharma",
      role: "VP of Engineering",
      department: "Engineering",
      status: "online",
    },
    {
      id: "emp-3",
      name: "Elena Rostova",
      role: "Lead UI/UX Designer",
      department: "Design",
      status: "away",
    },
  ];

  const members = Array.isArray(team) && team.length > 0
    ? team.map((emp) => {
        const name = emp.firstName ? `${emp.firstName} ${emp.lastName}` : (emp.name || "Member");
        const role = emp.jobTitle || emp.role || "Team Member";
        const status = (emp.presenceStatus || emp.status || "online").toLowerCase();

        return {
          id: emp.id,
          name,
          role,
          department: emp.department || "General",
          status,
          avatar: emp.avatarUrl,
        };
      })
    : defaultTeam;

  if (theme === "light") {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl text-[#0B0B0C] transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold tracking-tight text-[#0B0B0C]">Team Availability</h2>
            <p className="text-[11px] text-zinc-500">Live directory presence</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/employees")}
            aria-label="View All Team"
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overlapping Avatar Cluster */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-1">
          <div className="flex -space-x-2.5 overflow-hidden p-1">
            {members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                title={`${member.name} (${member.role})`}
                className="inline-block w-8 h-8 rounded-full ring-2 ring-white overflow-hidden shadow-sm hover:scale-110 hover:z-10 transition-transform bg-zinc-200"
              >
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-700 bg-zinc-100">
                    {member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                  </div>
                )}
              </div>
            ))}
            <div
              title={`${members.length} members in team`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-black ring-2 ring-white shadow-sm"
            >
              +{Math.max(1, members.length - 4 > 0 ? members.length - 4 : 2)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-[#C6F432] ring-2 ring-[#C6F432]/40" />
            <span className="font-semibold text-zinc-800">Online</span>
          </div>
        </div>
      </div>
    );
  }

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "online":
        return <GlassBadge variant="success" size="sm" dot>Online</GlassBadge>;
      case "busy":
        return <GlassBadge variant="danger" size="sm" dot>Busy</GlassBadge>;
      case "away":
        return <GlassBadge variant="warning" size="sm" dot>Away</GlassBadge>;
      default:
        return <GlassBadge variant="default" size="sm">Offline</GlassBadge>;
    }
  };

  return (
    <GlassPanel
      title="Team Availability"
      subtitle="Real-time staff directory pulse"
      icon={Users}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight} onClick={() => navigate("/employees")}>
          Org Directory
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      {/* Team Roster Grid */}
      <div className="p-4 sm:p-5 space-y-3 divide-y divide-white/5">
        {members.map((member, idx) => (
          <div
            key={member.id || idx}
            className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
          >
            {/* Left: Avatar + Identity */}
            <div className="flex items-center gap-3 min-w-0">
              <GlassAvatar
                src={member.avatar}
                name={member.name}
                size="sm"
                status={member.status}
                className="shrink-0"
              />

              <div className="min-w-0 space-y-0.5">
                <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {member.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {member.role} • <span className="text-slate-500">{member.department}</span>
                </p>
              </div>
            </div>

            {/* Right: Presence Status Badge */}
            <div className="shrink-0">
              {getStatusBadge(member.status)}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default TeamAvailability;