import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Plus, Sparkles, CheckSquare, Mail, Ticket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import QuixoticTopNavbar from "./components/QuixoticTopNavbar";
import QuixoticDock from "./components/QuixoticDock";
import StatsGrid from "./components/StatsGrid";
import WeatherWidget from "./components/WeatherWidget";
import RecentActivity from "./components/RecentActivity";
import DepartmentChart from "./components/DepartmentChart";
import Announcements from "./components/Announcements";
import ScheduleWidget from "./components/ScheduleWidget";
import UpcomingDeadlines from "./components/UpcomingDeadlines";
import TeamAvailability from "./components/TeamAvailability";

import { dashboardData } from "./data/dashboardData";
import useAuth from "../../hooks/useAuth";
import dashboardService from "../../services/dashboardService";

/**
 * Dashboard - Repositioned Office Aid Flagship View
 * Strictly preserves all original dashboard cards while mapping them into the Quixotic skeleton.
 * Color Palette: 60% Midnight Black (#0B0B0C) on top, 30% Pure White (#FFFFFF) till bottom, 10% Lime Green (#C6F432) on buttons.
 * Typography: Plus Jakarta Sans
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState(null);
  const [departmentDist, setDepartmentDist] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [team, setTeam] = useState([]);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Extract first name for greeting
  const firstName = useMemo(() => {
    if (!user?.name && !user?.firstName) return "Sourasish";
    const name = user.firstName || user.name;
    const parts = name.trim().split(" ");
    return parts[0] || "Sourasish";
  }, [user]);

  // Load live data from Supabase/Prisma services
  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        const [
          metricsRes,
          deptRes,
          announcementsRes,
          scheduleRes,
          projectsRes,
          teamRes,
        ] = await Promise.allSettled([
          dashboardService.getMetrics(),
          dashboardService.getDepartmentDistribution(),
          dashboardService.getAnnouncements(),
          dashboardService.getUpcomingMeetings(),
          dashboardService.getActiveProjects(),
          dashboardService.getTeamPresence(),
        ]);

        if (isMounted) {
          if (metricsRes.status === "fulfilled" && metricsRes.value) {
            setMetrics(metricsRes.value);
          }
          if (deptRes.status === "fulfilled" && deptRes.value) {
            setDepartmentDist(deptRes.value);
          }
          if (announcementsRes.status === "fulfilled" && announcementsRes.value) {
            setAnnouncements(announcementsRes.value);
          }
          if (scheduleRes.status === "fulfilled" && scheduleRes.value) {
            setSchedule(scheduleRes.value);
          }
          if (projectsRes.status === "fulfilled" && projectsRes.value) {
            const rawProj = projectsRes.value;
            setDeadlines(rawProj?.projects || (Array.isArray(rawProj) ? rawProj : []));
          }
          if (teamRes.status === "fulfilled" && teamRes.value) {
            const rawTeam = teamRes.value;
            setTeam(rawTeam?.employees || (Array.isArray(rawTeam) ? rawTeam : []));
          }
        }
      } catch (err) {
        console.warn("Failed to load live dashboard feeds, falling back to cache:", err);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const quickActionItems = [
    {
      title: "Schedule Meeting",
      desc: "Calendar & video sync",
      icon: Calendar,
      path: "/meetings?new=true",
    },
    {
      title: "Create Task",
      desc: "Assign to project team",
      icon: CheckSquare,
      path: "/tasks?new=true",
    },
    {
      title: "Compose Email",
      desc: "Internal message dispatch",
      icon: Mail,
      path: "/emails?new=true",
    },
    {
      title: "Submit Ticket",
      desc: "IT & HR service request",
      icon: Ticket,
      path: "/tickets?new=true",
    },
    {
      title: "Ask Herric AI",
      desc: "Instant workspace assistant",
      icon: Sparkles,
      path: "/chatbot",
    },
  ];

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] pb-16 transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
      }}
    >
      {/* Top Floating Rounded Pill Navbar */}
      <QuixoticTopNavbar />

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Dashboard Canvas */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Greeting Headline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Welcome Back,</span>
                <span className="text-[#C6F432]">{firstName}</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>Central Command • All 8 workplace modules operational</span>
              </p>
            </div>

            {/* Date Range Picker Pill & Primary Lime Green Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Range Pill */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-300 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>29 Jun, 2025 - 29 August, 2025</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </div>

              {/* Primary Action Button: Lime Green */}
              <button
                type="button"
                onClick={() => setIsQuickActionOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Quick Action</span>
              </button>
            </div>
          </motion.div>

          {/* Executive KPI Metric Row (StatsGrid) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <StatsGrid stats={metrics || dashboardData.stats} />
          </motion.div>

          {/* 3-Column Asymmetric Bento Grid Repositioning */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Hero: WeatherWidget (in 60% Black zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <WeatherWidget weatherData={dashboardData.weather} />
              </motion.div>

              {/* Bottom: RecentActivity (in 40% White zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <RecentActivity activities={[]} theme="light" />
              </motion.div>
            </div>

            {/* Center Column (Span 5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Top Tall Chart: DepartmentChart (in 60% Black zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                <DepartmentChart departmentData={departmentDist || []} />
              </motion.div>

              {/* Bottom Notice Board: Announcements (in 40% White zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
              >
                <Announcements announcements={announcements} theme="light" />
              </motion.div>
            </div>

            {/* Right Column (Span 3) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top: ScheduleWidget (in 60% Black zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <ScheduleWidget schedule={schedule} />
              </motion.div>

              {/* Middle: UpcomingDeadlines (in 40% White zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
              >
                <UpcomingDeadlines deadlines={deadlines} theme="light" />
              </motion.div>

              {/* Bottom: TeamAvailability (in 40% White zone) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.4 }}
              >
                <TeamAvailability team={team} theme="light" />
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Quick Action Modal Dialog */}
      {isQuickActionOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141416] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Launch workspace creation workflows
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickActionOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {quickActionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      setIsQuickActionOpen(false);
                      navigate(item.path);
                    }}
                    className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 flex items-center justify-between text-left group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-[#C6F432] group-hover:text-[#0B0B0C] text-[#C6F432] flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#C6F432] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-zinc-400">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
