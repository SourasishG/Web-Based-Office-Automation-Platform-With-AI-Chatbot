import { Routes, Route } from "react-router-dom";

import Dashboard from "../features/dashboard/Dashboard";
import Projects from "../features/projects/Projects";
import Tasks from "../features/tasks/Tasks";
import Meetings from "../features/meetings/Meetings";
import Profile from "../features/profile/Profile";

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
        path="/profile"
        element={<Profile />}
      />
    </Routes>
  );
};

export default AppRoutes;