import { useState } from "react";
import { ArrowUpRight, BarChart3 } from "lucide-react";

const EngagementRateCard = () => {
  const [timeframe, setTimeframe] = useState("annually"); // "monthly" | "annually"

  // Bar heights for months (0 to 100 percentage)
  const barData = [
    { month: "JAN", height: 35, isPeak: false },
    { month: "FEB", height: 55, isPeak: false },
    { month: "MAR", height: 50, isPeak: false },
    { month: "APR", height: 92, isPeak: true, badge: "+17.8%" },
    { month: "MAY", height: 62, isPeak: false },
    { month: "JUN", height: 58, isPeak: false },
  ];

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all hover:border-white/20 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C6F432]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
            Engagement Rate
          </h2>
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
            aria-label="View Full Engagement Report"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="relative pt-8 pb-2">
        {/* SVG Definition for Striped Pattern */}
        <svg className="absolute w-0 h-0">
          <defs>
            <pattern
              id="stripedPill"
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
                stroke="rgba(198, 244, 50, 0.4)"
                strokeWidth="2.5"
              />
            </pattern>
          </defs>
        </svg>

        <div className="flex items-end justify-between h-56 sm:h-64 px-2">
          {/* Y-Axis Metrics */}
          <div className="flex flex-col justify-between h-full text-[11px] font-mono text-zinc-500 pr-3 pb-6 select-none">
            <span>5k</span>
            <span>4k</span>
            <span>3k</span>
            <span>2k</span>
            <span>1k</span>
            <span>0</span>
          </div>

          {/* Vertical Pill Bars */}
          <div className="flex-1 flex items-end justify-around h-full border-b border-white/10 pb-6 relative">
            {/* Horizontal Guide Lines */}
            <div className="absolute inset-x-0 top-0 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-2/4 border-b border-white/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-3/4 border-b border-white/5 pointer-events-none" />

            {barData.map((bar) => (
              <div
                key={bar.month}
                className="flex flex-col items-center justify-end h-full relative group"
                style={{ width: "12%" }}
              >
                {/* Floating Peak Badge */}
                {bar.isPeak && (
                  <div className="absolute -top-7 flex flex-col items-center animate-bounce">
                    <span className="px-2 py-0.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-[10px] font-extrabold shadow-md tracking-tight">
                      {bar.badge}
                    </span>
                    <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full mt-0.5" />
                  </div>
                )}

                {/* Pill Bar */}
                <div
                  className={`w-full rounded-full transition-all duration-500 relative overflow-hidden ${
                    bar.isPeak
                      ? "bg-[#C6F432] shadow-lg shadow-[#C6F432]/25"
                      : "bg-[#1E2620] border border-[#C6F432]/20 hover:border-[#C6F432]/50"
                  }`}
                  style={{
                    height: `${bar.height}%`,
                    backgroundImage: !bar.isPeak ? "url(#stripedPill)" : "none",
                  }}
                >
                  {/* Subtle Shimmer on Hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </div>

                {/* X-Axis Month Label */}
                <span className="absolute -bottom-6 text-[10px] font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementRateCard;
