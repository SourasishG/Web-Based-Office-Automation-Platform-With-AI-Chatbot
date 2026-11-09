import { ArrowUpRight, ReceiptText } from "lucide-react";

const CreditMetricCard = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl text-[#0B0B0C] transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-zinc-700">
            <ReceiptText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-[#0B0B0C]">Amount of credit</h2>
            <p className="text-[11px] text-zinc-500">Total refund amount with fee</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="View Credit Breakdown"
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Metric & Lime Badge */}
      <div className="flex items-center justify-between mt-3 pt-1">
        <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0C]">
          $8,945.89
        </p>
        <span className="px-2.5 py-1 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-sm">
          +12.8%
        </span>
      </div>
    </div>
  );
};

export default CreditMetricCard;
