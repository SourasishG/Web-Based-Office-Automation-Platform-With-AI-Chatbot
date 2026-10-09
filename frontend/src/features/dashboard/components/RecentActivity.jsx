import React from "react";
import { Activity, Clock, CheckCircle2, GitCommit, FileText, ArrowRight } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * RecentActivity - Apple Liquid Glass Real-Time Operational Audit Feed
 * Displays live employee actions, task completions, and system events.
 * 
 * @param {Array<object>} activities - Array of activity log items
 */
export const RecentActivity = ({ activities }) => {
  // Fallback Activity Log Feed
  const defaultActivities = [
    {
      id: "act-1",
      user: { name: "Ananya Roy", avatar: null },
      action: "completed task",
      target: "Design Dashboard UI",
      time: "12m ago",
      type: "task",
    },
    {
      id: "act-2",
      user: { name: "Rahul Sharma", avatar: null },
      action: "merged pull request in",
      target: "Cloud Migration Pipeline",
      time: "45m ago",
      type: "code",
    },
    {
      id: "act-3",
      user: { name: "Priya Patel", avatar: null },
      action: "resolved support ticket",
      target: "#TK-1089 Email Sync Issue",
      time: "2h ago",
      type: "ticket",
    },
    {
      id: "act-4",
      user: { name: "Sourasish Ghosh", avatar: null },
      action: "scheduled meeting",
      target: "AI Roadmap Sync",
      time: "3h ago",
      type: "meeting",
    },
    {
      id: "act-5",
      user: { name: "Vikram Das", avatar: null },
      action: "uploaded document to",
      target: "Security Guidelines 2026",
      time: "5h ago",
      type: "file",
    },
  ];

  const logs = activities && activities.length > 0 ? activities : defaultActivities;

  // Type Tag Helper
  const getTypeBadge = (type) => {
    switch (type) {
      case "task":
        return <GlassBadge variant="success" size="sm">Task</GlassBadge>;
      case "code":
        return <GlassBadge variant="purple" size="sm">Dev</GlassBadge>;
      case "ticket":
        return <GlassBadge variant="cyan" size="sm">Ticket</GlassBadge>;
      case "meeting":
        return <GlassBadge variant="primary" size="sm">Event</GlassBadge>;
      default:
        return <GlassBadge variant="default" size="sm">System</GlassBadge>;
    }
  };

  return (
    <GlassPanel
      title="Recent Activity"
      subtitle="Real-time workplace operation log"
      icon={Activity}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
          Audit Log
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-start"
    >
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
        {logs.map((log, idx) => (
          <div
            key={log.id || idx}
            className="pt-3.5 first:pt-0 flex items-start gap-3 group"
          >
            {/* User Avatar */}
            <GlassAvatar
              src={log.user?.avatar}
              name={log.user?.name || "User"}
              size="sm"
              className="mt-0.5 shrink-0"
            />

            {/* Log Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white truncate">
                  {log.user?.name}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {log.time}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-0.5 truncate leading-relaxed">
                <span className="text-slate-400">{log.action}</span>{" "}
                <span className="font-medium text-cyan-300">{log.target}</span>
              </p>
            </div>

            {/* Type Badge */}
            <div className="shrink-0">{getTypeBadge(log.type)}</div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default RecentActivity;