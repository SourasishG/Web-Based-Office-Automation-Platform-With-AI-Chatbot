import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  CalendarPlus,
  Search,
  BarChart3,
  Send,
} from "lucide-react";

import {
  GlassCard,
  SectionHeader,
  Button,
  Badge,
} from "../../../components/ui";

const suggestions = [
  "Summarize today's emails",
  "Generate weekly report",
  "Schedule a client meeting",
  "Find HR policy document",
];

const actions = [
  {
    title: "Summarize Emails",
    icon: FileText,
  },
  {
    title: "Create Meeting",
    icon: CalendarPlus,
  },
  {
    title: "Generate Report",
    icon: BarChart3,
  },
  {
    title: "Find Document",
    icon: Search,
  },
];

const AIWidget = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="AI Assistant"
        subtitle="Ask Office Aid anything"
      >
        <Badge variant="info">
          Beta
        </Badge>
      </SectionHeader>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Ask AI to help..."
          className="
            flex-1
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-cyan-500
          "
        />

        <Button icon={Send} />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
                transition
                hover:border-cyan-500/50
              "
            >
              <Icon
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-white">
                {action.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-slate-400">
          Suggested Prompts
        </h3>

        <div className="flex flex-wrap gap-3">
          {suggestions.map((prompt) => (
            <Button
              key={prompt}
              variant="secondary"
              size="sm"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default AIWidget;