import { Plus } from "lucide-react";

/**
 * CreateProjectButton - Quixotic 10% Lime Green Primary Action Button
 * 
 * @param {function} onClick - Click handler callback
 * @param {string} label - Button text label
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
export const CreateProjectButton = ({
  onClick,
  label = "New Project",
  isDisabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      <Plus className="w-4 h-4 stroke-[2.5]" />
      <span>{label}</span>
    </button>
  );
};

export default CreateProjectButton;