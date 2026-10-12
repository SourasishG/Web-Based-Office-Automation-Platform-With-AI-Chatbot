import apiClient from "./apiClient";

export const authService = {
  /**
   * Log in user with credentials
   */
  async login(email, password) {
    const data = await apiClient.post("/auth/login", { email, password });
    if (data?.token) {
      localStorage.setItem("office_aid_token", data.token);
      localStorage.setItem("office_aid_user", JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Register a new user account
   */
  async register(userData) {
    const data = await apiClient.post("/auth/register", userData);
    if (data?.token) {
      localStorage.setItem("office_aid_token", data.token);
      localStorage.setItem("office_aid_user", JSON.stringify(data.user));
    }
    return data;
  },

  /**
   * Fetch current authenticated user profile
   */
  async getCurrentUser() {
    return apiClient.get("/auth/me");
  },

  /**
   * Log out session
   */
  async logout() {
    try {
      await apiClient.post("/auth/logout", {});
    } catch {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem("office_aid_token");
      localStorage.removeItem("office_aid_user");
    }
  },

  /**
   * Helper to retrieve cached token
   */
  getToken() {
    return localStorage.getItem("office_aid_token");
  },

  /**
   * Helper to retrieve cached user
   */
  getUser() {
    const raw = localStorage.getItem("office_aid_user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
