const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/**
 * Universal API Client with automatic JWT Bearer injection and standard response unwrapping
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getHeaders(customHeaders = {}) {
    const token = localStorage.getItem("office_aid_token");
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(options.headers);

    const config = {
      ...options,
      headers,
      credentials: options.credentials || "include",
    };

    const response = await fetch(url, config);

    // Handle 401 Unauthorized globally
    if (response.status === 401) {
      // If we are not already on the login page, clear token and notify
      if (!window.location.pathname.includes("/login")) {
        localStorage.removeItem("office_aid_token");
        localStorage.removeItem("office_aid_user");
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || `HTTP Error ${response.status}`);
      error.status = response.status;
      error.errors = data?.errors || [];
      throw error;
    }

    return data?.data !== undefined ? data.data : data;
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient(BASE_URL);
export default apiClient;
