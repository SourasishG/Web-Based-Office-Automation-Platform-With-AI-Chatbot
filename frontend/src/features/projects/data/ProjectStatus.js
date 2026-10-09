import {
  CheckCircle2,
  Clock3,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

export const PROJECT_STATUS_CONFIG = {
  Active: {
    label: "Active",
    icon: PlayCircle,
    color: "text-green-400",
    badge: "bg-green-500/15 text-green-400",
  },

  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400",
  },

  "On Hold": {
    label: "On Hold",
    icon: PauseCircle,
    color: "text-yellow-400",
    badge: "bg-yellow-500/15 text-yellow-400",
  },

  Pending: {
    label: "Pending",
    icon: Clock3,
    color: "text-red-400",
    badge: "bg-red-500/15 text-red-400",
  },
};