import React from "react";
import { FolderSearch, RotateCcw } from "lucide-react";
import { GlassPanel, GlassButton } from "../../../components/ui";

/**
 * EmptyProjects - Apple Liquid Glass Empty State Component
 * Renders a floating glass panel when no project records match search or status filters.
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
    <GlassPanel
      variant="default"
      padding="lg"
      className="flex flex-col items-center justify-center text-center py-16 my-4 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Empty State Icon */}
      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-cyan-400 mb-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <FolderSearch className="w-10 h-10 stroke-[1.5]" />
      </div>

      {/* Message */}
      <h3 className="text-lg font-semibold text-white tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
        {message}
      </p>

      {/* Reset Action */}
      {onReset && (
        <div className="mt-6">
          <GlassButton
            variant="cyan"
            size="sm"
            icon={RotateCcw}
            onClick={onReset}
          >
            Reset All Filters
          </GlassButton>
        </div>
      )}
    </GlassPanel>
  );
};

export default EmptyProjects;