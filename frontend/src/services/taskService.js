import apiClient from "./apiClient";

export const taskService = {
  /**
   * Get tasks organized into Kanban columns (TODO, IN_PROGRESS, REVIEW, COMPLETED)
   */
  async getKanbanBoard(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/tasks/kanban${query ? `?${query}` : ""}`);
  },

  /**
   * Get aggregate task metrics and breakdown
   */
  async getTaskStats() {
    return apiClient.get("/tasks/stats");
  },

  /**
   * List all tasks with optional search, status, and priority query filters
   */
  async getAllTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/tasks${query ? `?${query}` : ""}`);
  },

  /**
   * Get single task by ID
   */
  async getTaskById(id) {
    return apiClient.get(`/tasks/${id}`);
  },

  /**
   * Create a new Kanban task
   */
  async createTask(taskData) {
    return apiClient.post("/tasks", taskData);
  },

  /**
   * Update task details or subtasks
   */
  async updateTask(id, updateData) {
    return apiClient.patch(`/tasks/${id}`, updateData);
  },

  /**
   * Move or reorder a task across/within columns
   */
  async reorderTask(id, status, orderIndex = 0) {
    return apiClient.patch(`/tasks/${id}/reorder`, {
      status,
      orderIndex,
    });
  },

  /**
   * Delete a task
   */
  async deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  },
};

export default taskService;
