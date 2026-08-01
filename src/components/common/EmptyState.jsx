import Button from "../ui/Button";

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/5
        px-8
        py-16
        text-center
        ${className}
      `}
    >
      {Icon && (
        <div
          className="
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-cyan-500/10
            text-cyan-400
          "
        >
          <Icon size={38} />
        </div>
      )}

      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-slate-400">
          {description}
        </p>
      )}

      {buttonText && (
        <Button
          className="mt-8"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;