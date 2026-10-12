import apiClient from "./apiClient";

export const meetingService = {
  /**
   * Get aggregate meeting statistics (total, today, upcoming, completed)
   */
  async getMeetingStats() {
    return apiClient.get("/meetings/stats");
  },

  /**
   * Get hour-by-hour operational timeline for a specific date
   */
  async getTimeline(date) {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return apiClient.get(`/meetings/timeline${query}`);
  },

  /**
   * Get next upcoming meetings list
   */
  async getUpcoming() {
    return apiClient.get("/meetings/upcoming");
  },

  /**
   * List meetings with status filter (all, today, upcoming, completed), platform, and search
   */
  async getAllMeetings(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/meetings${query ? `?${query}` : ""}`);
  },

  /**
   * Get meeting details by ID with host and attendee list
   */
  async getMeetingById(id) {
    return apiClient.get(`/meetings/${id}`);
  },

  /**
   * Schedule a new video sync (Meet / Zoom / Teams)
   */
  async createMeeting(meetingData) {
    return apiClient.post("/meetings", meetingData);
  },

  /**
   * Reschedule or update meeting details
   */
  async updateMeeting(id, updateData) {
    return apiClient.patch(`/meetings/${id}`, updateData);
  },

  /**
   * Cancel / delete a meeting
   */
  async deleteMeeting(id) {
    return apiClient.delete(`/meetings/${id}`);
  },
};

export default meetingService;
