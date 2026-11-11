import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";
import FloatingAiAssistant from "./FloatingAiAssistant";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center text-white selection:bg-[#C6F432] selection:text-[#0B0B0C]"
        style={{
          background:
            "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4 p-8 sm:p-10 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-[#C6F432]/25 blur-xl animate-pulse" />
            <Loader2 className="w-9 h-9 text-[#C6F432] animate-spin" />
          </div>
          <p className="text-sm font-semibold text-zinc-300 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
            <span>Verifying Office Aid session...</span>
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <FloatingAiAssistant />
    </>
  );
};

export default ProtectedRoute;
