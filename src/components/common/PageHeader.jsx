const PageHeader = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        mb-8
        flex
        flex-col
        gap-6
        md:flex-row
        md:items-center
        md:justify-between
        ${className}
      `}
    >
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-400">
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

export default PageHeader;