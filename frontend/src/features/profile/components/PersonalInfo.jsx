import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  UserCheck,
  Hash,
  Shield,
} from "lucide-react";

/**
 * PersonalInfo - Quixotic Organizational Credentials Card
 * Positioned in the upper 60% Midnight Black region.
 *
 * @param {object} info - User profile details
 */
export const PersonalInfo = ({ info }) => {
  const email = info?.email || "sourasish.ghosh@officeaid.com";
  const phone = info?.phone || "+91 98765 43210";
  const employeeId = info?.id
    ? `OA-${info.id.slice(0, 8).toUpperCase()}`
    : info?.empId || "OA-EXEC-001";
  const department = info?.department || "Executive";
  const location = info?.location || "Kolkata, India";
  const joiningDate = info?.createdAt
    ? new Date(info.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : info?.joiningDate || "January 2025";
  const manager = info?.manager
    ? `${info.manager.firstName} ${info.manager.lastName}`
    : "Executive Board / Direct Reporting";

  const rows = [
    {
      icon: Mail,
      label: "Email Address",
      value: email,
      isMono: true,
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: phone,
      isMono: true,
    },
    {
      icon: Hash,
      label: "Employee ID",
      value: employeeId,
      isMono: true,
    },
    {
      icon: Building2,
      label: "Department",
      value: department,
    },
    {
      icon: MapPin,
      label: "Office Location",
      value: location,
    },
    {
      icon: Calendar,
      label: "Joining Date",
      value: joiningDate,
    },
    {
      icon: UserCheck,
      label: "Reporting Manager",
      value: manager,
    },
  ];

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl h-full flex flex-col justify-between text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#C6F432]/10 border border-[#C6F432]/20 flex items-center justify-center text-[#C6F432] shrink-0">
            <Shield className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight text-white">
              Personal Information
            </h3>
            <p className="text-[11px] text-zinc-400">
              Verified employee organizational credentials
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 shrink-0">
          Active Record
        </span>
      </div>

      {/* Credential Rows */}
      <div className="pt-3 space-y-3 divide-y divide-white/10 flex-1 flex flex-col justify-center">
        {rows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <div
              key={idx}
              className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#1A1A1E] border border-white/10 text-[#C6F432] flex items-center justify-center shrink-0 group-hover:border-[#C6F432]/40 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-zinc-400 truncate">
                  {row.label}
                </span>
              </div>

              <span
                className={`text-xs font-bold text-white group-hover:text-[#C6F432] transition-colors truncate ${
                  row.isMono ? "font-mono" : ""
                }`}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfo;
