import apiClient from "./apiClient";

export const aiService = {
  /**
   * Send a chat message to Herric with conversation history
   */
  async chat({ message, history = [], contextMode = "workspace" }) {
    return apiClient.post("/ai/chat", {
      message,
      history,
      contextMode,
    });
  },

  /**
   * Fetch daily executive morning briefing from Herric
   */
  async getBriefing() {
    return apiClient.get("/ai/briefing");
  },

  /**
   * Request email summarization and action items from Herric
   */
  async summarizeEmail({ emailId, subject, content }) {
    return apiClient.post("/ai/summarize-email", {
      emailId,
      subject,
      content,
    });
  },

  /**
   * Request Herric to draft an executive email response
   */
  async draftReply({ emailId, subject, threadContent, instructions, tone = "PROFESSIONAL" }) {
    return apiClient.post("/ai/draft-reply", {
      emailId,
      subject,
      threadContent,
      instructions,
      tone,
    });
  },

  /**
   * Request IT Ticket root-cause diagnostic and troubleshooting from Herric
   */
  async ticketAssist({ ticketId, title, description, category }) {
    return apiClient.post("/ai/ticket-assist", {
      ticketId,
      title,
      description,
      category,
    });
  },
};

export default aiService;
