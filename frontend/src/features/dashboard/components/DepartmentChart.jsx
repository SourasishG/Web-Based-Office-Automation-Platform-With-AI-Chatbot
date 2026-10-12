import { useMemo } from "react";
import { PieChart, Users, Layers } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

const COLOR_PALETTE = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

/**
 * DepartmentChart - Apple Liquid Glass Workforce Distribution Analytics
 * Displays department headcounts and proportional percentage breakdown bars.
 * 
 * @param {Array<object>|object} departmentData - Array or object with departments distribution
 */
export const DepartmentChart = ({ departmentData }) => {
  const defaultDepartments = [
    { name: "Engineering", count: 2, percentage: 40, color: "from-cyan-500 to-blue-600" },
    { name: "Executive", count: 1, percentage: 20, color: "from-purple-500 to-pink-600" },
    { name: "Product & Design", count: 1, percentage: 20, color: "from-blue-500 to-indigo-600" },
    { name: "HR & Operations", count: 1, percentage: 20, color: "from-emerald-500 to-teal-600" },
  ];

  const { departments, totalEmployees } = useMemo(() => {
    let rawList = [];
    let total = 0;

    if (departmentData && typeof departmentData === "object") {
      if (Array.isArray(departmentData)) {
        rawList = departmentData;
      } else if (Array.isArray(departmentData.departments)) {
        rawList = departmentData.departments;
        total = departmentData.totalStaff;
      }
    }

    if (rawList.length === 0) {
      return {
        departments: defaultDepartments,
        totalEmployees: 5,
      };
    }

    const formatted = rawList.map((item, idx) => ({
      name: item.name || item.department || "General",
      count: item.count || 1,
      percentage: item.percentage || Math.round((item.count / (total || rawList.length)) * 100),
      color: item.color || COLOR_PALETTE[idx % COLOR_PALETTE.length],
    }));

    if (!total) {
      total = formatted.reduce((acc, curr) => acc + curr.count, 0);
    }

    return {
      departments: formatted,
      totalEmployees: total,
    };
  }, [departmentData]);

  return (
    <GlassPanel
      title="Department Analytics"
      subtitle={`${totalEmployees} total workforce team members`}
      icon={PieChart}
      action={
        <GlassBadge variant="cyan" size="sm" icon={Users}>
          {totalEmployees} Active Staff
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
                <span className="text-slate-400 font-mono text-[11px]">{dept.count} member{dept.count !== 1 ? "s" : ""}</span>
                <span className="font-semibold text-cyan-300 font-mono">{dept.percentage}%</span>
              </div>
            </div>

            {/* Liquid Progress Bar Track */}
            <div className="w-full h-2 rounded-full bg-slate-950/60 overflow-hidden border border-white/5 p-0.5">
              <div
                style={{ width: `${dept.percentage}%` }}
                className={`h-full rounded-full bg-gradient-to-r ${dept.color} shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-500`}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default DepartmentChart;