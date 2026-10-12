import apiClient from "./apiClient";

export const notificationService = {
  /**
   * Get notification statistics and unread counter
   */
  async getNotificationStats() {
    return apiClient.get("/notifications/stats");
  },

  /**
   * List notifications with category and read status filters
   */
  async getAllNotifications(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/notifications${query ? `?${query}` : ""}`);
  },

  /**
   * Mark all notifications for user as read
   */
  async markAllRead() {
    return apiClient.patch("/notifications/read-all");
  },

  /**
   * Clear / delete all notifications for user
   */
  async clearAll() {
    return apiClient.delete("/notifications/clear-all");
  },

  /**
   * Toggle single notification read status
   */
  async markRead(id) {
    return apiClient.patch(`/notifications/${id}/read`);
  },

  /**
   * Delete single notification
   */
  async deleteNotification(id) {
    return apiClient.delete(`/notifications/${id}`);
  },
};

export default notificationService;
