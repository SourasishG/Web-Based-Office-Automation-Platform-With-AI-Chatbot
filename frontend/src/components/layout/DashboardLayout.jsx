import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FloatingAiAssistant from "../common/FloatingAiAssistant";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-500">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          min-w-0
          transition-all
          duration-500
          ease-in-out
          ${
            collapsed
              ? "lg:ml-20"
              : "lg:ml-64"
          }
        `}
      >
        <Navbar setMobileOpen={setMobileOpen} />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Global Floating AI Assistant — visible on all pages */}
      <FloatingAiAssistant />
    </div>
  );
};

export default DashboardLayout;