const SectionHeader = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        mb-5
        flex
        items-center
        justify-between
        ${className}
      `}
    >
      <div>
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;