import apiClient from "./apiClient";

export const employeeService = {
  /**
   * Get employee details by ID
   */
  async getEmployeeById(id) {
    return apiClient.get(`/employees/${id}`);
  },

  /**
   * Update employee profile attributes
   */
  async updateEmployee(id, data) {
    return apiClient.patch(`/employees/${id}`, data);
  },

  /**
   * Get organizational hierarchy tree
   */
  async getOrgChart() {
    return apiClient.get("/employees/org-chart");
  },

  /**
   * Get employee aggregate stats
   */
  async getStats() {
    return apiClient.get("/employees/stats");
  },

  /**
   * Get all employees list with query parameters
   */
  async getAllEmployees(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/employees${query ? `?${query}` : ""}`);
  },
};

export default employeeService;
