import {
  Circle,
  Clock3,
  Eye,
  CheckCircle2,
} from "lucide-react";

export const TASK_STATUS_CONFIG = {
  "To Do": {
    label: "To Do",
    icon: Circle,
    color: "text-slate-300",
    badge: "bg-slate-500/15 text-slate-300",
  },

  "In Progress": {
    label: "In Progress",
    icon: Clock3,
    color: "text-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-400",
  },

  Review: {
    label: "Review",
    icon: Eye,
    color: "text-yellow-400",
    badge: "bg-yellow-500/15 text-yellow-400",
  },

  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-400",
    badge: "bg-green-500/15 text-green-400",
  },
};