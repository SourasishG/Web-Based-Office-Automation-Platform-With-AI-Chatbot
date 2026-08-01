import {
  Mail,
  Phone,
  BadgeCheck,
  Building2,
  Briefcase,
  CalendarDays,
} from "lucide-react";

import ProfileData from "../data/ProfileData";

const PersonalInfo = () => {
  const info = [
    {
      label: "Email",
      value: ProfileData.email,
      icon: Mail,
    },
    {
      label: "Phone",
      value: ProfileData.phone,
      icon: Phone,
    },
    {
      label: "Employee ID",
      value: ProfileData.id,
      icon: BadgeCheck,
    },
    {
      label: "Department",
      value: ProfileData.department,
      icon: Building2,
    },
    {
      label: "Designation",
      value: ProfileData.designation,
      icon: Briefcase,
    },
    {
      label: "Joining Date",
      value: ProfileData.joiningDate,
      icon: CalendarDays,
    },
  ];

  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      <h2 className="mb-6 text-xl font-semibold text-white">
        Personal Information
      </h2>

      <div className="space-y-5">
        {info.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/5
                bg-white/5
                p-4
                transition-all
                duration-300
                hover:border-cyan-500/30
                hover:bg-white/10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-linear-to-br
                  from-cyan-500
                  to-blue-600
                "
              >
                <Icon size={20} className="text-white" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalInfo;