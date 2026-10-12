import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/Login";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Dashboard from "../features/dashboard/Dashboard";
import Projects from "../features/projects/Projects";
import Tasks from "../features/tasks/Tasks";
import Meetings from "../features/meetings/Meetings";
import Profile from "../features/profile/Profile";
import Employees from "../features/employees/Employees";
import Emails from "../features/emails/Emails";
import Tickets from "../features/tickets/Tickets";
import Notifications from "../features/notifications/Notifications";
import Chatbot from "../features/chatbot/Chatbot";
import NotFound from "../features/error/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Workplace Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/herric"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meetings"
        element={
          <ProtectedRoute>
            <Meetings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emails"
        element={
          <ProtectedRoute>
            <Emails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;