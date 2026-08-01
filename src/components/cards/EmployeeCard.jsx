import { motion } from "framer-motion";

const statusColors = {
  Online: "bg-emerald-500",
  Busy: "bg-red-500",
  Away: "bg-yellow-400",
  Offline: "bg-slate-500",
};

const EmployeeCard = ({
  name,
  role,
  avatar,
  status,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
      }}
      className={`
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        backdrop-blur-xl
        ${className}
      `}
    >
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-white">
            {name}
          </h3>

          <p className="text-sm text-slate-400">
            {role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`
            h-3
            w-3
            rounded-full
            ${statusColors[status]}
          `}
        />

        <span className="text-sm text-slate-300">
          {status}
        </span>
      </div>
    </motion.div>
  );
};

export default EmployeeCard;