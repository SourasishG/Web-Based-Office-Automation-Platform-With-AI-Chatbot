import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContextObject";
import authService from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => authService.getToken());
  const [user, setUser] = useState(() => authService.getUser());
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const storedToken = authService.getToken();
      if (!storedToken) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const freshUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(freshUser);
          localStorage.setItem("office_aid_user", JSON.stringify(freshUser));
        }
      } catch {
        // Token is invalid/expired
        if (isMounted) {
          setToken(null);
          setUser(null);
          localStorage.removeItem("office_aid_token");
          localStorage.removeItem("office_aid_user");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    verifySession();

    // Listen for unauthorized 401 events dispatched from apiClient
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      isMounted = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const data = await authService.register(userData);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
