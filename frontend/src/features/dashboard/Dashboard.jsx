import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Plus } from "lucide-react";

import QuixoticTopNavbar from "./components/QuixoticTopNavbar";
import QuixoticDock from "./components/QuixoticDock";
import PaymentGoalHeroCard from "./components/PaymentGoalHeroCard";
import PaymentHistoryCard from "./components/PaymentHistoryCard";
import EngagementRateCard from "./components/EngagementRateCard";
import PerformanceWaveCard from "./components/PerformanceWaveCard";
import CreditMetricCard from "./components/CreditMetricCard";
import TeamPaymentsCard from "./components/TeamPaymentsCard";

import useAuth from "../../hooks/useAuth";

/**
 * Dashboard - Redesigned flagship view modeled after Quixotic skeleton
 * Palette: 60% Midnight Black (#0B0B0C) on top, pure white (#FFFFFF) remaining to bottom, 10% Lime Green (#C6F432) buttons
 * Typography: Plus Jakarta Sans
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [dateRange] = useState("29 Jun, 2025 - 29 August, 2025");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // Extract first name for greeting
  const firstName = useMemo(() => {
    if (!user?.name) return "Sujon";
    const parts = user.name.trim().split(" ");
    return parts[0] || "Sujon";
  }, [user]);

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] pb-12 transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 60%, #FFFFFF 60%, #FFFFFF 100%)",
      }}
    >
      {/* Top Floating Rounded Pill Navbar */}
      <QuixoticTopNavbar />

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Dashboard Canvas */}
        <main className="flex-1 min-w-0">
          {/* Greeting & Header Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            {/* Welcome Greeting */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Welcome Back, {firstName}
              </h1>
            </div>

            {/* Date Range Picker Pill & Lime Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Range Pill */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/20 shadow-md transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>{dateRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Primary Action Button: Lime Green */}
              <button
                type="button"
                onClick={() => setIsActionModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add New Wallet</span>
              </button>
            </div>
          </motion.div>

          {/* 3-Column Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Hero: Payment Goal with Visa Pass */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                <PaymentGoalHeroCard />
              </motion.div>

              {/* Bottom: Payment History Table (sits in white zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <PaymentHistoryCard />
              </motion.div>
            </div>

            {/* Center Column (Span 5) */}
            <div className="lg:col-span-5 h-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="h-full"
              >
                <EngagementRateCard />
              </motion.div>
            </div>

            {/* Right Column (Span 3) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top: Payment Goal with Spline Wave */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                <PerformanceWaveCard />
              </motion.div>

              {/* Middle: Amount of credit (sits in white zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
              >
                <CreditMetricCard />
              </motion.div>

              {/* Bottom: Mandatory Payments Team Cluster (sits in white zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <TeamPaymentsCard />
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Quick Action Modal Backdrop */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141416] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white"
          >
            <h3 className="text-lg font-bold text-white mb-2">Create New Wallet / Goal</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Add a new balance target or operational budget for your team.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Wallet Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Operations Budget 2026"
                  className="w-full bg-[#1E1E22] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#C6F432]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Initial Target / Balance
                </label>
                <input
                  type="text"
                  placeholder="e.g. $50,000"
                  className="w-full bg-[#1E1E22] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#C6F432]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Create Wallet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
