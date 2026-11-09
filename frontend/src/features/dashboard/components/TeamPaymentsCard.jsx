import { ArrowUpRight } from "lucide-react";

const TeamPaymentsCard = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      color: "bg-amber-400",
    },
    {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      color: "bg-blue-400",
    },
    {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      color: "bg-emerald-400",
    },
    {
      name: "Devon Clark",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      color: "bg-purple-400",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xl text-[#0B0B0C] transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-[#0B0B0C]">Mandatory Payments</h2>
          <p className="text-[11px] text-zinc-500">Recent payments</p>
        </div>
        <button
          type="button"
          aria-label="View Mandatory Payments"
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Overlapping Avatar Pile */}
      <div className="flex items-center gap-1 mt-2 pt-1">
        <div className="flex -space-x-2.5 overflow-hidden p-1">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              title={member.name}
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white overflow-hidden shadow-sm hover:scale-110 hover:z-10 transition-transform"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
          {/* Plus 2 Badge in Lime Green */}
          <div
            title="2 more members"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-black ring-2 ring-white shadow-sm"
          >
            +2
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPaymentsCard;
