import apiClient from "./apiClient";

export const emailService = {
  /**
   * Get folder message counts (inboxUnread, starred, drafts, trash, sent)
   */
  async getFolderCounts() {
    return apiClient.get("/emails/counts");
  },

  /**
   * List emails with folder filter (INBOX, STARRED, SENT, DRAFTS, TRASH) and search
   */
  async getEmails(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/emails${query ? `?${query}` : ""}`);
  },

  /**
   * Get email details by ID
   */
  async getEmailById(id) {
    return apiClient.get(`/emails/${id}`);
  },

  /**
   * Compose and send a new email
   */
  async sendEmail(emailData) {
    return apiClient.post("/emails", emailData);
  },

  /**
   * Toggle star status for an email
   */
  async toggleStar(id) {
    return apiClient.patch(`/emails/${id}/star`);
  },

  /**
   * Toggle read/unread status for an email
   */
  async toggleRead(id) {
    return apiClient.patch(`/emails/${id}/read`);
  },

  /**
   * Move email to a different folder (e.g. TRASH)
   */
  async moveFolder(id, folder) {
    return apiClient.patch(`/emails/${id}/folder`, { folder });
  },

  /**
   * Permanently delete an email
   */
  async deleteEmail(id) {
    return apiClient.delete(`/emails/${id}`);
  },
};

export default emailService;
