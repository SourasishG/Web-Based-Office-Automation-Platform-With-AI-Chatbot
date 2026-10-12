import apiClient from "./apiClient";

export const ticketService = {
  /**
   * Get queue summary statistics (open, in-progress, critical, resolved, breached)
   */
  async getTicketStats() {
    return apiClient.get("/tickets/stats");
  },

  /**
   * Get tickets organized into Kanban columns (OPEN, IN_PROGRESS, REVIEW, RESOLVED)
   */
  async getKanbanBoard(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/tickets/kanban${query ? `?${query}` : ""}`);
  },

  /**
   * List tickets with search, category, priority, status filters, and pagination
   */
  async getAllTickets(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/tickets${query ? `?${query}` : ""}`);
  },

  /**
   * Get ticket details by ID with complete conversation timeline
   */
  async getTicketById(id) {
    return apiClient.get(`/tickets/${id}`);
  },

  /**
   * Submit a new IT support ticket
   */
  async createTicket(ticketData) {
    return apiClient.post("/tickets", ticketData);
  },

  /**
   * Update ticket status, priority, assignee, or resolution notes
   */
  async updateTicket(id, updateData) {
    return apiClient.patch(`/tickets/${id}`, updateData);
  },

  /**
   * Post a reply / message to the ticket conversation stream
   */
  async addComment(id, commentData) {
    return apiClient.post(`/tickets/${id}/comments`, commentData);
  },

  /**
   * Delete a support ticket
   */
  async deleteTicket(id) {
    return apiClient.delete(`/tickets/${id}`);
  },
};

export default ticketService;
