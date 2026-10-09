import React from "react";
import { Mail, Phone, Building2, MapPin, Calendar, UserCheck, Hash, Shield } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

export const PersonalInfo = ({ info }) => {
  const email = info?.email || "sourasishghosh062@gmail.com";
  const phone = info?.phone || "+91 99031 29873";
  const employeeId = info?.employeeId || info?.empId || "EMP-1001";
  const department = info?.department || "Engineering";
  const location = info?.location || "Kolkata, India";
  const joiningDate = info?.joiningDate || info?.joined || "15 January 2025";
  const manager = info?.manager || "Direct Board Reporting";

  const rows = [
    {
      icon: Mail,
      label: "Email Address",
      value: email,
      isMono: true,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: phone,
      isMono: true,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: Hash,
      label: "Employee ID",
      value: employeeId,
      isMono: true,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Building2,
      label: "Department",
      value: department,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: MapPin,
      label: "Office Location",
      value: location,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Calendar,
      label: "Joining Date",
      value: joiningDate,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: UserCheck,
      label: "Reporting Manager",
      value: manager,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <GlassPanel
      title="Personal Information"
      subtitle="Verified employee organizational credentials"
      icon={Shield}
      action={
        <GlassBadge variant="cyan" size="sm" glow>
          Active Record
        </GlassBadge>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between bg-slate-950/70 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
    >
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/10">
        {rows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <div
              key={idx}
              className="pt-3.5 first:pt-0 flex items-center justify-between gap-3 group"
            >
              {/* Left: Icon & High-Contrast Label */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-xl border ${row.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-300 truncate">
                  {row.label}
                </span>
              </div>

              {/* Right: High-Contrast Value */}
              <span
                className={`text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate ${
                  row.isMono ? "font-mono" : ""
                }`}
              >
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};

export default PersonalInfo;