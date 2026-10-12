import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-400">Verifying Office Aid session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
