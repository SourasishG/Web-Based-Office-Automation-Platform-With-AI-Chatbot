const AvatarGroup = ({
  users = [],
  avatars,
  max = 4,
  size = "md",
}) => {
  const items = avatars || users;

  const visibleItems = items.slice(0, max);
  const remaining = items.length - max;

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div className="flex items-center">
      {visibleItems.map((item, index) => {
        // Object with avatar image
        if (typeof item === "object") {
          return (
            <img
              key={item.id || index}
              src={item.avatar}
              alt={item.name}
              title={item.name}
              className={`
                ${sizes[size]}
                -ml-2
                rounded-full
                border-2
                border-slate-900
                object-cover
                first:ml-0
              `}
            />
          );
        }

        // String initials (AJ, SK, etc.)
        return (
          <div
            key={index}
            className={`
              ${sizes[size]}
              -ml-2
              flex
              items-center
              justify-center
              rounded-full
              border-2
              border-slate-900
              bg-linear-to-br
              from-cyan-500
              to-blue-600
              font-semibold
              text-white
              first:ml-0
            `}
          >
            {item}
          </div>
        );
      })}

      {remaining > 0 && (
        <div
          className={`
            ${sizes[size]}
            -ml-2
            flex
            items-center
            justify-center
            rounded-full
            border-2
            border-slate-900
            bg-cyan-500
            font-medium
            text-white
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;