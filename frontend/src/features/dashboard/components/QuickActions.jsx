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

  // Fallback Action Cards with functional routing
  const defaultActions = [
    {
      id: "qa-1",
      title: "Create Task",
      description: "Assign task to project team",
      icon: CheckSquare,
      glow: "cyan",
      onClick: () => navigate("/tasks"),
    },
    {
      id: "qa-2",
      title: "Schedule Sync",
      description: "Calendar & video meeting",
      icon: Calendar,
      glow: "none",
      onClick: () => navigate("/meetings"),
    },
    {
      id: "qa-3",
      title: "Compose Email",
      description: "Internal message dispatch",
      icon: Mail,
      glow: "none",
      onClick: () => navigate("/profile"),
    },
    {
      id: "qa-4",
      title: "Submit Ticket",
      description: "IT & HR desk request",
      icon: Ticket,
      glow: "purple",
      onClick: () => navigate("/projects"),
    },
  ];

  const actionList = actions && actions.length > 0 ? actions : defaultActions;

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