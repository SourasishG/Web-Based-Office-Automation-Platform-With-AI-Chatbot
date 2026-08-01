import { Inbox } from "lucide-react";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "Nothing here",
  description = "There's nothing to display right now.",
  action,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        min-h-55
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/5
        p-8
        text-center
        backdrop-blur-xl
        ${className}
      `}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
        <Icon
          size={30}
          className="text-cyan-400"
        />
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;