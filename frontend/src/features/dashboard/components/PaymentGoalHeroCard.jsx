import { ArrowUpRight, Wifi } from "lucide-react";

const PaymentGoalHeroCard = () => {
  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all hover:border-white/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">Payment Goal</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Total amount goal</p>
        </div>
        <button
          type="button"
          aria-label="View Goal Details"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Digital Pass / Card Element */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#0c3121] via-[#092218] to-[#121b16] border border-[#C6F432]/20 shadow-lg my-2">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#C6F432]/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-black tracking-widest text-white/90">VISA</span>
          <Wifi className="w-4 h-4 text-zinc-400 rotate-90" />
        </div>

        <div className="mb-4">
          <p className="text-[11px] font-medium text-emerald-200/70">Credit Card</p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            $ 78,989.09
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-zinc-300/80 font-mono">
          <span>•••• 909090</span>
          <span>EXP 09/26</span>
        </div>
      </div>

      {/* Weekly Revenue / Velocity Indicator */}
      <div className="mt-4 pt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400 font-medium">Weekly Revenue</p>
          <p className="text-lg sm:text-xl font-bold text-white mt-0.5">+3,945 USD</p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-sm flex items-center gap-1">
          <span>+12.8%</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGoalHeroCard;
