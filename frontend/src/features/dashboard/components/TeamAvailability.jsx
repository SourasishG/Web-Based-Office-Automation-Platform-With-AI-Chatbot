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
export const TeamAvailability = ({ team }) => {
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