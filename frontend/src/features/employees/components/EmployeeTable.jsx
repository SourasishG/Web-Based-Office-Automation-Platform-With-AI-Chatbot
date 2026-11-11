import { Mail, Star, MessageSquare, Edit, Trash2 } from "lucide-react";

/**
 * EmployeeTable - Quixotic Pure White Table Layout for Employees
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 * 
 * @param {Array} employees - Array of employee object records
 * @param {function} onMessageClick - Message button handler callback
 * @param {function} onEditClick - Edit employee button handler callback
 * @param {function} onDeleteClick - Delete employee button handler callback
 */
export const EmployeeTable = ({
  employees = [],
  onMessageClick,
  onEditClick,
  onDeleteClick,
}) => {
  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "online") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#386b03]" />
          Online
        </span>
      );
    }
    if (s === "meeting" || s === "busy") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          In Call
        </span>
      );
    }
    if (s === "away") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-500/10 text-yellow-700 border border-yellow-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          Away
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
        Offline
      </span>
    );
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] uppercase tracking-wider font-bold text-zinc-500">
              <th className="py-4 px-5">Employee</th>
              <th className="py-4 px-4">Role & Title</th>
              <th className="py-4 px-4">Department</th>
              <th className="py-4 px-4">Presence</th>
              <th className="py-4 px-4">Projects / Tasks</th>
              <th className="py-4 px-4">Rating</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {employees.length > 0 ? (
              employees.map((emp) => {
                const avatarSrc =
                  emp.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    emp.name || "U"
                  )}&background=0B0B0C&color=C6F432`;

                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-zinc-50/80 transition-colors"
                  >
                    {/* Employee Identity */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img
                          src={avatarSrc}
                          alt={emp.name}
                          className="w-9 h-9 rounded-xl object-cover border border-zinc-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-[#0B0B0C] text-sm">
                            {emp.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium">
                            <Mail className="w-3 h-3" /> {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role & Title */}
                    <td className="py-3.5 px-4 min-w-[150px]">
                      <p className="text-xs font-bold text-[#0B0B0C]">
                        {emp.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        {emp.roleLevel || "Staff"}
                      </p>
                    </td>

                    {/* Department Badge */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-[#0B0B0C] border border-zinc-200">
                        {emp.department}
                      </span>
                    </td>

                    {/* Presence Badge */}
                    <td className="py-3.5 px-4">{getStatusBadge(emp.status)}</td>

                    {/* Projects / Tasks Count */}
                    <td className="py-3.5 px-4 text-xs text-zinc-600">
                      <span className="font-bold text-[#0B0B0C]">
                        {emp.projectsAssigned}
                      </span>{" "}
                      projects •{" "}
                      <span className="font-bold text-[#0B0B0C]">
                        {emp.tasksCompleted}
                      </span>{" "}
                      tasks
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-bold text-sm text-[#0B0B0C]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{emp.performanceScore}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => onMessageClick && onMessageClick(emp)}
                          title="Send Message"
                          className="p-2 rounded-full bg-[#C6F432] text-[#0B0B0C] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditClick && onEditClick(emp)}
                          title="Edit Profile"
                          className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#0B0B0C] transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteClick && onDeleteClick(emp.id)}
                          title="Remove Employee"
                          className="p-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-zinc-500 text-sm font-medium">
                  No employees match your active filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
