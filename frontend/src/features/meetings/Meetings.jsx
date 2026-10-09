import React, { useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import MeetingsHeader from "./components/MeetingsHeader";
import MeetingStats from "./components/MeetingStats";
import UpcomingMeetings from "./components/UpcomingMeetings";
import DailyTimeline from "./components/DailyTimeline";

import MeetingData from "./data/MeetingData";

/**
 * Meetings - Apple Liquid Glass Master Meetings View
 * Assembles header controls, KPI stats, daily schedule timeline, and upcoming meeting lists.
 */

const Meetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
        {/* Header */}
        <motion.div variants={itemVariants}>
          <MeetingsHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants}>
          <MeetingStats stats={MeetingData?.stats} />
        </motion.div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <DailyTimeline
              schedule={MeetingData?.dailyTimeline}
              searchTerm={searchTerm}
              activeTab={activeTab}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <UpcomingMeetings
              meetings={MeetingData?.upcoming}
              searchTerm={searchTerm}
            />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Meetings;