import { Routes, Route } from "react-router-dom";

import Dashboard from "../features/dashboard/Dashboard";
import Projects from "../features/projects/Projects";
import Tasks from "../features/tasks/Tasks";
import Meetings from "../features/meetings/Meetings";
import Profile from "../features/profile/Profile";
import Employees from "../features/employees/Employees";
import Emails from "../features/emails/Emails";
import Tickets from "../features/tickets/Tickets";
import NotFound from "../features/error/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
        path="/meetings"
        element={<Meetings />}
      />

      <Route
        path="/employees"
        element={<Employees />}
      />

      <Route
        path="/emails"
        element={<Emails />}
      />

      <Route
        path="/tickets"
        element={<Tickets />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Render 404 Error Page for any unhandled/invalid endpoints */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;