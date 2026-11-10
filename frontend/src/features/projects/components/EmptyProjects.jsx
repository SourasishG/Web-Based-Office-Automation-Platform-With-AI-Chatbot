import { FolderSearch, RotateCcw } from "lucide-react";

/**
 * EmptyProjects - Clean White Empty State Component
 * Displayed when no project items match the active search or filters.
 * 
 * @param {function} onReset - Callback function to clear active search and filters
 * @param {string} title - Optional title override
 * @param {string} message - Optional description override
 */
export const EmptyProjects = ({
  onReset,
  title = "No Projects Found",
  message = "No project portfolio items match your active search or status filters.",
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center shadow-xl text-[#0B0B0C] flex flex-col items-center justify-center my-6">
      {/* Empty State Icon */}
      <div className="p-4 rounded-3xl bg-slate-100 text-zinc-700 mb-4 shadow-inner">
        <FolderSearch className="w-10 h-10 stroke-[1.5]" />
      </div>

      {/* Message */}
      <h3 className="text-lg font-bold text-[#0B0B0C] tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 mt-1.5 max-w-md leading-relaxed">
        {message}
      </p>

      {/* Reset Action */}
      {onReset && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyProjects;
