import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Calendar, ShieldCheck } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * Greeting - Apple Liquid Glass Hero Greeting Banner
 * Features dynamic time-of-day salutation, real-time clock, status pills, and AI assistant launcher.
 */
export const Greeting = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Time-of-Day Greeting Logic
  const getGreetingText = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const userName = user?.name || "Sourasish";
  const userRole = user?.role || "Administrator";

  return (
    <GlassPanel
      variant="floating"
      padding="lg"
      className="h-full flex flex-col justify-between relative overflow-hidden"
    >
      {/* Ambient Background Radial Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-linear-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Time & Workspace Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <GlassBadge variant="cyan" glow icon={Sparkles}>
            OFFICE AID WORKSPACE
          </GlassBadge>
          <GlassBadge variant="ghost" icon={ShieldCheck}>
            {userRole}
          </GlassBadge>
        </div>

        {/* Live Date/Time Badge */}
        <div className="flex items-center gap-3 text-xs text-slate-300 font-medium bg-slate-950/40 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/10">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{formattedTime}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Hero Headline & Personal Salutation */}
      <div className="relative z-10 my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          {getGreetingText()},{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {userName}
          </span>{" "}
          <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
          Welcome back to your central command. Here is what's happening across your workplace operations today.
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <span>All 8 workplace modules operational</span>
        </div>

        <GlassButton variant="primary" size="sm" icon={Sparkles}>
          Ask AI Assistant
        </GlassButton>
      </div>
    </GlassPanel>
  );
};

export default Greeting;