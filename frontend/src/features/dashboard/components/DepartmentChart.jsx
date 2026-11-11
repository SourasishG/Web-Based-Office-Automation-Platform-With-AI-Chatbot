import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BarChart3, Users } from "lucide-react";

const DEFAULT_DEPARTMENTS = [
  { name: "Engineering", count: 24, percentage: 40, height: 90, isPeak: true, badge: "40% Max" },
  { name: "Product & Design", count: 12, percentage: 20, height: 55, isPeak: false },
  { name: "Executive", count: 8, percentage: 15, height: 42, isPeak: false },
  { name: "HR & Operations", count: 10, percentage: 17, height: 48, isPeak: false },
  { name: "Sales & Growth", count: 6, percentage: 8, height: 32, isPeak: false },
];

/**
 * DepartmentChart - Workforce & Operational Velocity Distribution
 * Features vertical pill bars with striped pattern, monthly/annually switcher, and lime peak highlight.
 */
export const DepartmentChart = ({ departmentData }) => {
  const [timeframe, setTimeframe] = useState("monthly");
  const navigate = useNavigate();

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
        departments: DEFAULT_DEPARTMENTS,
        totalEmployees: 60,
      };
    }

    const maxCount = Math.max(...rawList.map((d) => d.count || 1), 1);

    const formatted = rawList.map((item) => {
      const count = item.count || 1;
      const height = Math.max(25, Math.round((count / maxCount) * 88));
      const isPeak = count === maxCount;
      return {
        name: item.name || item.department || "General",
        count,
        percentage: item.percentage || Math.round((count / (total || 60)) * 100),
        height,
        isPeak,
        badge: isPeak ? `${height}% Peak` : null,
      };
    });

    if (!total) {
      total = formatted.reduce((acc, curr) => acc + curr.count, 0);
    }

    return {
      departments: formatted,
      totalEmployees: total,
    };
  }, [departmentData]);

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all hover:border-white/20 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C6F432]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
              Department Velocity
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Workforce distribution ({totalEmployees} active)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Monthly / Annually Pill Switcher */}
          <div className="flex items-center bg-[#1E1E22] border border-white/5 rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={() => setTimeframe("monthly")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                timeframe === "monthly"
                  ? "bg-[#C6F432] text-[#0B0B0C] shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setTimeframe("annually")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                timeframe === "annually"
                  ? "bg-[#C6F432] text-[#0B0B0C] shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Annually
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            aria-label="View Full Department Report"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vertical Pill Bar Chart */}
      <div className="relative pt-6 pb-2">
        <svg className="absolute w-0 h-0">
          <defs>
            <pattern
              id="deptStripedPill"
              width="8"
              height="8"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="rgba(198, 244, 50, 0.35)"
                strokeWidth="2.5"
              />
            </pattern>
          </defs>
        </svg>

        <div className="flex items-end justify-between h-52 sm:h-60 px-2">
          {/* Y-Axis Metrics */}
          <div className="flex flex-col justify-between h-full text-[11px] font-mono text-zinc-500 pr-3 pb-6 select-none">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span>0%</span>
          </div>

          {/* Vertical Pill Bars */}
          <div className="flex-1 flex items-end justify-around h-full border-b border-white/10 pb-6 relative gap-3 px-2">
            <div className="absolute inset-x-0 top-0 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-2/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-3/4 border-b border-white/5 pointer-events-none" />

            {departments.map((dept) => {
              const barHeight =
                timeframe === "annually"
                  ? Math.min(96, Math.max(22, Math.round(dept.height * 0.92)))
                  : dept.height;
              return (
                <div
                  key={dept.name}
                  className="flex flex-col items-center justify-end h-full relative group w-12 sm:w-14 shrink-0"
                >
                  {/* Floating Peak Badge */}
                  {dept.isPeak && (
                    <div className="absolute -top-7 flex flex-col items-center animate-bounce z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-[10px] font-extrabold shadow-md tracking-tight whitespace-nowrap">
                        {dept.badge || "+17.8%"}
                      </span>
                      <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full mt-0.5" />
                    </div>
                  )}

                  {/* Vertical Pill Bar */}
                  <div
                    className={`w-10 sm:w-12 rounded-2xl transition-all duration-500 relative overflow-hidden ${
                      dept.isPeak
                        ? "bg-[#C6F432] shadow-lg shadow-[#C6F432]/25"
                        : "bg-[#1E2620] border border-[#C6F432]/20 hover:border-[#C6F432]/50"
                    }`}
                    style={{
                      height: `${barHeight}%`,
                      backgroundImage: !dept.isPeak
                        ? "url(#deptStripedPill)"
                        : "none",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  </div>

                  {/* X-Axis Department Name */}
                  <span className="absolute -bottom-6 text-[10px] font-semibold text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap text-center">
                    {dept.name.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#C6F432]" />
          <span>{totalEmployees} active headcount across departments</span>
        </span>
        <span className="font-semibold text-white">100% capacity</span>
      </div>
    </div>
  );
};

export default DepartmentChart;
