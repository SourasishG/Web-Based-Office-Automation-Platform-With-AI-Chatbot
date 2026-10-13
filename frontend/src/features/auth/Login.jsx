import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Loader2,
  ShieldAlert,
  Building2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DEMO_ACCOUNTS = [
  {
    role: "Admin / CEO",
    name: "Sourasish Ghosh",
    email: "sourasish.ghosh@officeaid.com",
    badge: "Full Access",
    color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300",
  },
  {
    role: "VP Engineering",
    name: "Aarav Sharma",
    email: "aarav.sharma@officeaid.com",
    badge: "Manager",
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
  },
  {
    role: "Lead Designer",
    name: "Elena Rostova",
    email: "elena.rostova@officeaid.com",
    badge: "Employee",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
  },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("sourasish.ghosh@officeaid.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("Admin@123");
    setErrorMessage("");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-12 overflow-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-bl from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="relative z-10 w-full max-w-[480px] rounded-[32px] border border-white/10 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_50px_rgba(168,85,247,0.15)]"
      >
        {/* Top Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 p-0.5 shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-md">
              <Building2 className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Office Aid</h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-2.5 h-2.5" /> v1.0
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Workplace Automation Platform with <strong className="text-slate-200">Herric AI</strong>
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@officeaid.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Workplace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Switch Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Demo Accounts
            </span>
            <span className="text-[10px] text-slate-500">Pass: Admin@123</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {DEMO_ACCOUNTS.map((demo) => {
              const isSelected = email === demo.email;
              return (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => handleSelectDemo(demo.email)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                      }`}
                    />
                    <div>
                      <div className="font-medium text-slate-200">{demo.name}</div>
                      <div className="text-[10px] text-slate-400">{demo.role}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium border bg-gradient-to-r ${demo.color}`}
                  >
                    {demo.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-slate-500">
            Secure session with JWT token authentication & Supabase PostgreSQL
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
