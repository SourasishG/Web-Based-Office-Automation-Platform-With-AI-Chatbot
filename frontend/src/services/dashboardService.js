import apiClient from "./apiClient";

export const dashboardService = {
  /**
   * Get 5-card StatsGrid KPIs (projects, tasks, syncs, staff, tickets)
   */
  async getMetrics() {
    return apiClient.get("/dashboard/metrics");
  },

  /**
   * Get department headcount breakdown and percentage distribution
   */
  async getDepartmentDistribution() {
    return apiClient.get("/dashboard/departments");
  },

  /**
   * Get company announcements board with pinned items prioritized
   */
  async getAnnouncements() {
    return apiClient.get("/dashboard/announcements");
  },

  /**
   * Post a new company announcement (Admin & Manager)
   */
  async createAnnouncement(data) {
    return apiClient.post("/dashboard/announcements", data);
  },

  /**
   * Remove a company announcement (Admin)
   */
  async deleteAnnouncement(id) {
    return apiClient.delete(`/dashboard/announcements/${id}`);
  },

  /**
   * Get upcoming meetings for today's schedule widget
   */
  async getUpcomingMeetings() {
    return apiClient.get("/meetings/upcoming").catch(() => []);
  },

  /**
   * Get active projects for milestone deadline tracker
   */
  async getActiveProjects() {
    return apiClient.get("/projects?status=ACTIVE&limit=4").catch(() => ({ projects: [] }));
  },

  /**
   * Get team availability list
   */
  async getTeamPresence() {
    return apiClient.get("/employees?limit=5").catch(() => ({ employees: [] }));
  },
};

export default dashboardService;
