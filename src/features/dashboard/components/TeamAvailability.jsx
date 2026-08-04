import React from "react";
import { Users, Mail, ArrowRight } from "lucide-react";
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
  // Fallback Team Availability Data
  const defaultTeam = [
    {
      id: "emp-1",
      name: "Sourasish Ghosh",
      role: "Administrator",
      department: "Engineering",
      status: "online",
    },
    {
      id: "emp-2",
      name: "Ananya Roy",
      role: "Senior UI Architect",
      department: "Product Design",
      status: "online",
    },
    {
      id: "emp-3",
      name: "Rahul Sharma",
      role: "DevOps Lead",
      department: "Infrastructure",
      status: "busy",
    },
    {
      id: "emp-4",
      name: "Priya Patel",
      role: "AI Engineer",
      department: "R&D",
      status: "away",
    },
    {
      id: "emp-5",
      name: "Vikram Das",
      role: "Product Manager",
      department: "Management",
      status: "offline",
    },
  ];

  const members = team && team.length > 0 ? team : defaultTeam;

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "online":
        return <GlassBadge variant="success" size="sm" dot>Online</GlassBadge>;
      case "busy":
        return <GlassBadge variant="danger" size="sm" dot>In Meeting</GlassBadge>;
      case "away":
        return <GlassBadge variant="warning" size="sm" dot>Away</GlassBadge>;
      default:
        return <GlassBadge variant="default" size="sm">Offline</GlassBadge>;
    }
  };

  return (
    <GlassPanel
      title="Team Availability"
      subtitle="Real-time workplace presence"
      icon={Users}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
          Directory
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-3 divide-y divide-white/5">
        {members.map((member, idx) => (
          <div
            key={member.id || idx}
            className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
          >
            {/* User Avatar & Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <GlassAvatar
                src={member.avatar}
                name={member.name}
                size="sm"
                status={member.status}
              />

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {member.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {member.role} • <span className="text-slate-500">{member.department}</span>
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="shrink-0">{getStatusBadge(member.status)}</div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default TeamAvailability;