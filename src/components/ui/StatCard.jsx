import GlassCard from "./GlassCard";

const StatCard = ({
  title,
  value,
  icon,
  color = "from-cyan-500 to-blue-600",
  subtitle,
  className = "",
}) => {
  const Icon = icon;

  return (
    <GlassCard className={className}>
      <div className="flex items-start justify-between">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            ${color}
          `}
        >
          {Icon && (
            <Icon
              size={22}
              className="text-white"
            />
          )}
        </div>

        <h3 className="text-3xl font-bold text-white">
          {value}
        </h3>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-400">
          {title}
        </p>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;