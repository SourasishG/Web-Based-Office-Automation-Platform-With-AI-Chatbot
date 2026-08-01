const InfoRow = ({
  icon: Icon,
  children,
  className = "",
  iconClassName = "",
  textClassName = "",
}) => {
  return (
    <div
      className={`flex items-center gap-3 text-slate-300 ${className}`}
    >
      {Icon && (
        <Icon
          size={18}
          className={iconClassName}
        />
      )}

      <span className={textClassName}>
        {children}
      </span>
    </div>
  );
};

export default InfoRow;