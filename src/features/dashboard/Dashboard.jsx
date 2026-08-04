import React from "react";
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

/**
 * Dashboard - Flagship Executive Workspace View
 * Apple Liquid Glass Executive Workspace
 */

const Dashboard = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
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
        {/* Hero */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <Greeting user={dashboardData.user} />
          </div>

          <div>
            <WeatherWidget weatherData={dashboardData.weather} />
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants}>
          <StatsGrid stats={dashboardData.stats} />
        </motion.div>

        {/* Schedule / Deadlines — 2 balanced columns now that AI is a floating widget */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={itemVariants}>
            <ScheduleWidget schedule={dashboardData.schedule} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <UpcomingDeadlines
              deadlines={dashboardData.deadlines}
            />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <TeamAvailability
                team={dashboardData.teamAvailability}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <QuickActions
                actions={dashboardData.quickActions}
              />
            </motion.div>
          </div>

          {/* Middle */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <DepartmentChart
                departmentData={dashboardData.departmentStats}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Announcements
                announcements={dashboardData.announcements}
              />
            </motion.div>
          </div>

          {/* Right */}
          <div>
            <motion.div
              variants={itemVariants}
              className="h-full"
            >
              <RecentActivity
                activities={dashboardData.recentActivities}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;