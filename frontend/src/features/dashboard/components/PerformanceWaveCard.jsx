import { ArrowUpRight, ArrowUp, ArrowDown } from "lucide-react";

const PerformanceWaveCard = () => {
  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all hover:border-white/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">Payment Goal</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Total amount goal</p>
        </div>
        <button
          type="button"
          aria-label="View Goal Overview"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Balance Metric */}
      <div className="text-center my-3">
        <p className="text-xs text-zinc-400 font-medium">Total Balance</p>
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
          $32,678.90
        </p>
      </div>

      {/* Smooth Wave Chart Area */}
      <div className="w-full h-24 my-1 relative overflow-hidden">
        <svg
          viewBox="0 0 320 80"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C6F432" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C6F432" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M 0,55 Q 35,25 70,50 T 140,25 T 210,60 T 280,30 T 320,40 L 320,80 L 0,80 Z"
            fill="url(#waveFill)"
          />

          {/* Top smooth spline curve */}
          <path
            d="M 0,55 Q 35,25 70,50 T 140,25 T 210,60 T 280,30 T 320,40"
            fill="none"
            stroke="#C6F432"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secondary subtle background line */}
          <path
            d="M 0,65 Q 40,40 80,60 T 160,40 T 240,65 T 320,48"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Action Buttons: Send & Receive */}
      <div className="flex items-center justify-center gap-3 mt-3">
        {/* Send Button: Lime Green */}
        <button
          type="button"
          className="px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Send</span>
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Receive Button: White pill */}
        <button
          type="button"
          className="px-5 py-2 rounded-full bg-white text-[#0B0B0C] text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-zinc-100 active:scale-95 transition-all"
        >
          <span>Receive</span>
          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default PerformanceWaveCard;
