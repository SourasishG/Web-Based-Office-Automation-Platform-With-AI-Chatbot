import React from "react";
import { Edit3, MessageSquare, ShieldCheck, MapPin, Sparkles, Mail } from "lucide-react";
import {
  GlassCard,
  GlassAvatar,
  GlassBadge,
  GlassButton,
} from "../../../components/ui";

/**
 * ProfileHeader - Apple Liquid Glass Hero Executive Profile Banner
 * Displays user identity, status indicator, department role, and primary communication triggers.
 * 
 * @param {object} user - User profile data object
 * @param {function} onEditClick - Edit profile button handler
 * @param {function} onMessageClick - Message button handler
 */
export const ProfileHeader = ({ user, onEditClick, onMessageClick }) => {
  const name = user?.name || "Sourasish Ghosh";
  const role = user?.role || "Administrator";
  const department = user?.department || "Engineering";
  const location = user?.location || "Kolkata, India";
  const email = user?.email || "sourasishghosh062@gmail.com";
  const status = user?.status || "online";
  const avatar = user?.avatar;

  return (
    <GlassCard
      variant="floating"
      glow="cyan"
      className="p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start justify-between gap-6"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-linear-to-tr from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Left: Large Avatar & Profile Identity */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
        <GlassAvatar
          src={avatar}
          name={name}
          size="2xl"
          status={status}
          glow
          className="shrink-0"
        />

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {name}
            </h1>
            <GlassBadge variant="cyan" size="sm" icon={ShieldCheck}>
              Verified Admin
            </GlassBadge>
          </div>

          <p className="text-sm font-medium text-slate-300">
            {role} • <span className="text-cyan-400">{department}</span>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="font-mono">{email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="relative z-10 flex items-center gap-3 shrink-0">
        <GlassButton
          variant="outline"
          size="md"
          icon={MessageSquare}
          onClick={onMessageClick}
        >
          Message
        </GlassButton>

        <GlassButton
          variant="primary"
          size="md"
          icon={Edit3}
          onClick={onEditClick}
        >
          Edit Profile
        </GlassButton>
      </div>
    </GlassCard>
  );
};

export default ProfileHeader;