import apiClient from "./apiClient";

export const projectService = {
  /**
   * Get all projects with optional status, department, and search filters
   */
  async getAllProjects(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/projects${query ? `?${query}` : ""}`);
  },

  /**
   * Get aggregate project statistics
   */
  async getProjectStats() {
    return apiClient.get("/projects/stats");
  },

  /**
   * Get project details by ID
   */
  async getProjectById(id) {
    return apiClient.get(`/projects/${id}`);
  },

  /**
   * Create a new project
   */
  async createProject(projectData) {
    return apiClient.post("/projects", projectData);
  },

  /**
   * Update an existing project
   */
  async updateProject(id, updateData) {
    return apiClient.patch(`/projects/${id}`, updateData);
  },

  /**
   * Delete a project
   */
  async deleteProject(id) {
    return apiClient.delete(`/projects/${id}`);
  },
};

export default projectService;
