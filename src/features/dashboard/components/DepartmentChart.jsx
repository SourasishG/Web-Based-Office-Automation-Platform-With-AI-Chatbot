import React from "react";
import { PieChart, Users, Layers } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * DepartmentChart - Apple Liquid Glass Workforce Distribution Analytics
 * Displays department headcounts and proportional percentage breakdown bars.
 * 
 * @param {Array<object>} departmentData - Array of department metric objects
 */
export const DepartmentChart = ({ departmentData }) => {
  // Fallback Department Distribution Data
  const defaultDepartments = [
    { name: "Engineering", count: 112, percentage: 45, color: "from-cyan-500 to-blue-600" },
    { name: "Product & Design", count: 48, percentage: 19, color: "from-blue-500 to-indigo-600" },
    { name: "Operations & HR", count: 38, percentage: 15, color: "from-purple-500 to-pink-600" },
    { name: "Sales & Marketing", count: 32, percentage: 13, color: "from-emerald-500 to-teal-600" },
    { name: "R&D & Security", count: 18, percentage: 8, color: "from-amber-500 to-orange-600" },
  ];

  const departments = departmentData && departmentData.length > 0 ? departmentData : defaultDepartments;
  const totalEmployees = departments.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <GlassPanel
      title="Department Analytics"
      subtitle={`${totalEmployees} total workforce members`}
      icon={PieChart}
      action={
        <GlassBadge variant="cyan" size="sm" icon={Users}>
          248 Active
        </GlassBadge>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-4">
        {departments.map((dept, idx) => (
          <div key={idx} className="space-y-1.5">
            {/* Header: Dept Name & Headcount */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white tracking-tight flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {dept.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">{dept.count} members</span>
                <span className="font-semibold text-cyan-300 font-mono">{dept.percentage}%</span>
              </div>
            </div>

            {/* Liquid Progress Bar Track */}
            <div className="w-full h-2 rounded-full bg-slate-950/60 overflow-hidden border border-white/5 p-0.5">
              <div
                style={{ width: `${dept.percentage}%` }}
                className={`h-full rounded-full bg-gradient-to-r ${dept.color || "from-cyan-500 to-blue-600"} shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-500`}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default DepartmentChart;