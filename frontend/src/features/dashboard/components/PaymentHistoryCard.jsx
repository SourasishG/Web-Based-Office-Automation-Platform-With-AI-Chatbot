import { ArrowUpRight } from "lucide-react";

const PaymentHistoryCard = () => {
  const transactions = [
    {
      id: "tx-1",
      name: "Dribbble Design",
      change: "+18.67%",
      date: "16 Jun 2025",
      time: "10:30 PM",
      status: "Successful",
      amount: "89, 345. 23 USD",
      iconBg: "bg-rose-50 text-rose-500",
      letter: "🏀",
    },
    {
      id: "tx-2",
      name: "Google Pay",
      change: "+9.34%",
      date: "15 Jun 2025",
      time: "11:45 PM",
      status: "Successful",
      amount: "12, 345. 89 USD",
      iconBg: "bg-blue-50 text-blue-500",
      letter: "G",
    },
    {
      id: "tx-3",
      name: "Amazon Shopping",
      change: "+12.23%",
      date: "14 Jun 2025",
      time: "10:15 PM",
      status: "Successful",
      amount: "32, 123. 67 USD",
      iconBg: "bg-amber-50 text-amber-600",
      letter: "a",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xl text-[#0B0B0C] transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-midnight">
            Payment History
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">Recent payments history</p>
        </div>
        <button
          type="button"
          aria-label="View Full Payment History"
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-zinc-400 font-medium border-b border-slate-100 pb-2">
              <th className="pb-3 font-normal">Name</th>
              <th className="pb-3 font-normal hidden sm:table-cell">Date</th>
              <th className="pb-3 font-normal hidden md:table-cell">Time</th>
              <th className="pb-3 font-normal">Status</th>
              <th className="pb-3 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 font-medium">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Name & Icon */}
                <td className="py-3 pr-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${tx.iconBg}`}
                    >
                      {tx.letter}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0B0B0C] tracking-tight">{tx.name}</p>
                      <p className="text-[10px] text-zinc-400">{tx.change}</p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 text-zinc-600 hidden sm:table-cell whitespace-nowrap">
                  {tx.date}
                </td>

                {/* Time */}
                <td className="py-3 text-zinc-600 hidden md:table-cell whitespace-nowrap">
                  {tx.time}
                </td>

                {/* Status Dot */}
                <td className="py-3 whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 text-zinc-700">
                    <span className="w-2 h-2 rounded-full bg-[#C6F432] ring-2 ring-[#C6F432]/40" />
                    <span className="text-[11px] font-medium">{tx.status}</span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-3 text-right font-bold text-[#0B0B0C] whitespace-nowrap">
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
