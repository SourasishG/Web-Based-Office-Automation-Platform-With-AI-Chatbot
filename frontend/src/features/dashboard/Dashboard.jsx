import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Greeting from "./components/Greeting";
import WeatherWidget from "./components/WeatherWidget";
import StatsGrid from "./components/StatsGrid";
import ScheduleWidget from "./components/ScheduleWidget";
import UpcomingDeadlines from "./components/UpcomingDeadlines";
import TeamAvailability from "./components/TeamAvailability";
import DepartmentChart from "./components/DepartmentChart";
import RecentActivity from "./components/RecentActivity";
import Announcements from "./components/Announcements";
import QuickActions from "./components/QuickActions";

import { dashboardData } from "./data/dashboardData";
import useAuth from "../../hooks/useAuth";
import dashboardService from "../../services/dashboardService";

/**
 * Dashboard - Flagship Executive Workspace View
 * Live integration with Supabase PostgreSQL, Prisma ORM, and Herric AI
 */
const Dashboard = () => {
  const { user } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [departmentDist, setDepartmentDist] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 22,
      },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1600px] space-y-6 select-none"
      >
        {/* Hero Banner & Live Weather */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <Greeting user={user || dashboardData.user} />
          </div>

          <div>
            <WeatherWidget weatherData={dashboardData.weather} />
          </div>
        </motion.div>

        {/* Live Executive KPI Metric Cards */}
        <motion.div variants={itemVariants}>
          <StatsGrid stats={metrics || dashboardData.stats} />
        </motion.div>

        {/* Schedule & Upcoming Milestones */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={itemVariants}>
            <ScheduleWidget schedule={schedule.length > 0 ? schedule : dashboardData.schedule} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <UpcomingDeadlines deadlines={deadlines.length > 0 ? deadlines : dashboardData.deadlines} />
          </motion.div>
        </div>

        {/* Tri-Column Intelligence & Operational Feeds */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Team Directory Pulse & Quick Actions */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <TeamAvailability team={team.length > 0 ? team : dashboardData.teamAvailability} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <QuickActions actions={dashboardData.quickActions} />
            </motion.div>
          </div>

          {/* Middle Column: Department Distribution & Notice Board */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <DepartmentChart departmentData={departmentDist || dashboardData.departmentStats} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Announcements
                announcements={announcements.length > 0 ? announcements : dashboardData.announcements}
              />
            </motion.div>
          </div>

          {/* Right Column: Verified Audit Timeline */}
          <div>
            <motion.div variants={itemVariants} className="h-full">
              <RecentActivity activities={dashboardData.recentActivities} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;