import { useNavigate } from "react-router-dom";
import { Zap, CheckSquare, Calendar, Mail, Ticket } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import QuickActionCard from "./QuickActionCard";

/**
 * QuickActions - Apple Liquid Glass Shortcuts Panel
 * Grid deck container for rapid workspace creation actions (+ Task, + Meeting, + Email, + Ticket).
 * 
 * @param {Array<object>} actions - List of action configurations
 */
export const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  // Action Cards with direct, functional routing to create/compose workflows
  const defaultActions = [
    {
      id: "qa-1",
      title: "Create Task",
      description: "Assign task to project team",
      icon: CheckSquare,
      glow: "cyan",
      path: "/tasks?new=true",
    },
    {
      id: "qa-2",
      title: "Schedule Sync",
      description: "Calendar & video meeting",
      icon: Calendar,
      glow: "none",
      path: "/meetings?new=true",
    },
    {
      id: "qa-3",
      title: "Compose Email",
      description: "Internal message dispatch",
      icon: Mail,
      glow: "none",
      path: "/emails?new=true",
    },
    {
      id: "qa-4",
      title: "Submit Ticket",
      description: "IT & HR desk request",
      icon: Ticket,
      glow: "purple",
      path: "/tickets?new=true",
    },
  ];

  // Resolve actions list ensuring each card has a working onClick handler
  const actionList = (actions && actions.length > 0 ? actions : defaultActions).map((action, idx) => {
    const fallback = defaultActions[idx] || defaultActions[0];
    const path = action.path || fallback.path;
    const clickHandler = action.onClick || (() => navigate(path));
    return {
      ...fallback,
      ...action,
      icon: action.icon || fallback.icon,
      onClick: clickHandler,
    };
  });

  return (
    <GlassPanel
      title="Quick Actions"
      subtitle="Immediate operational shortcuts"
      icon={Zap}
      variant="default"
      padding="sm"
      className="h-full flex flex-col justify-start"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actionList.map((action, idx) => (
          <QuickActionCard
            key={action.id || idx}
            title={action.title || action.label}
            description={action.description}
            icon={action.icon}
            glow={action.glow || "none"}
            onClick={action.onClick}
          />
        ))}
      </div>
    </GlassPanel>
  );
};

export default QuickActions;