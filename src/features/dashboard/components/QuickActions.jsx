import {
  CalendarPlus,
  TicketPlus,
  MailPlus,
  Upload,
} from "lucide-react";

import {
  GlassCard,
  SectionHeader,
} from "../../../components/ui";

const actions = [
  {
    title: "Schedule Meeting",
    description: "Create and invite participants.",
    icon: CalendarPlus,
    color: "cyan",
  },

  {
    title: "Create Ticket",
    description: "Raise a support request.",
    icon: TicketPlus,
    color: "orange",
  },

  {
    title: "Send Email",
    description: "Compose and send emails.",
    icon: MailPlus,
    color: "pink",
  },

  {
    title: "Upload File",
    description: "Store documents securely.",
    icon: Upload,
    color: "purple",
  },
];

const colors = {
  cyan: "from-cyan-500 to-blue-600",
  orange: "from-orange-500 to-red-500",
  pink: "from-pink-500 to-rose-500",
  purple: "from-violet-500 to-fuchsia-500",
};

const QuickActions = () => {
  return (
    <section className="space-y-5">
      <SectionHeader
        title="Quick Actions"
        subtitle="Frequently used actions for your workspace."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <GlassCard
              key={action.title}
              className="cursor-pointer"
            >
              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-linear-to-br
                  ${colors[action.color]}
                `}
              >
                <Icon
                  size={22}
                  className="text-white"
                />
              </div>

              <h3
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {action.title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-400
                "
              >
                {action.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;