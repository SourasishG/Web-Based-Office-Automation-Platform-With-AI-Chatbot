import { Edit, MapPin } from "lucide-react";

import ProfileData from "../data/ProfileData";
import { STATUS_COLORS } from "../data/ProfileConstants";

const ProfileHeader = () => {
  return (
    <section
      className="
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="flex items-center gap-6">
        <div className="relative">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-linear-to-br
              from-cyan-500
              to-blue-600
              text-3xl
              font-bold
              text-white
            "
          >
            {ProfileData.avatar}
          </div>

          <span
            className={`
              absolute
              bottom-1
              right-1
              h-5
              w-5
              rounded-full
              border-2
              border-slate-900
              ${STATUS_COLORS[ProfileData.status]}
            `}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            {ProfileData.fullName}
          </h1>

          <p className="mt-1 text-slate-400">
            {ProfileData.designation}
          </p>

          <p className="text-slate-500">
            {ProfileData.department}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} />
            <span>{ProfileData.location}</span>
          </div>
        </div>
      </div>

      <button
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-linear-to-r
          from-cyan-500
          to-blue-600
          px-5
          py-3
          font-medium
          text-white
          shadow-lg
          shadow-cyan-500/20
          transition-all
          duration-300
          hover:scale-105
        "
      >
        <Edit size={18} />
        Edit Profile
      </button>
    </section>
  );
};

export default ProfileHeader;