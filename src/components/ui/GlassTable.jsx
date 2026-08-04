import React from "react";
import { Loader2, Inbox } from "lucide-react";
import { glass } from "../../theme/glass";

/**
 * GlassTable - Apple Liquid Glass Data Table
 * 
 * @param {Array<{ key: string, header: React.ReactNode, render?: (row: any, index: number) => React.ReactNode, align?: 'left' | 'center' | 'right', width?: string }>} columns - Table column definitions
 * @param {Array<object>} data - Data records array
 * @param {boolean} isLoading - Loading state spinner
 * @param {string} emptyMessage - Empty state label
 * @param {function} onRowClick - Row click callback handler (row, index) => void
 * @param {React.ReactNode} pagination - Optional pagination bar component
 * @param {string} className - Additional CSS for root table container
 */
export const GlassTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = "No records found",
  onRowClick,
  pagination,
  className = "",
}) => {
  // Alignment classes mapping
  const alignStyles = {
    left: "text-left justify-start",
    center: "text-center justify-center",
    right: "text-right justify-end",
  };

  return (
    <div
      className={`
        relative w-full overflow-hidden rounded-[28px] select-none
        bg-slate-900/40 backdrop-blur-3xl border border-white/10
        shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-slate-100
        ${glass.specular.subtle}
        ${className}
      `}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  style={{ width: col.width }}
                  className={`
                    px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400
                    ${alignStyles[col.align || "left"]}
                  `}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                    <span className="text-xs font-medium">Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <Inbox className="w-8 h-8 text-slate-500 stroke-[1.5]" />
                    <span className="text-xs font-medium text-slate-400">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                  className={`
                    transition-colors duration-150 group
                    ${onRowClick ? "cursor-pointer hover:bg-white/5" : "hover:bg-white/[0.02]"}
                  `}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={col.key || colIndex}
                      className={`
                        px-6 py-4 text-xs font-medium text-slate-200
                        ${alignStyles[col.align || "left"]}
                      `}
                    >
                      {col.render ? col.render(row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Bar */}
      {pagination && (
        <div className="px-6 py-3.5 border-t border-white/10 bg-slate-950/40 backdrop-blur-xl flex items-center justify-between">
          {pagination}
        </div>
      )}
    </div>
  );
};

export default GlassTable;