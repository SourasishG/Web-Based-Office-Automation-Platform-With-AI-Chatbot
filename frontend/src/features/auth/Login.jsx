import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Building2,
  Sparkles,
  Loader2,
  ShieldAlert,
  Check,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DEPARTMENTS = [
  "Engineering",
  "Design & Product",
  "Marketing",
  "Sales",
  "Operations",
  "Human Resources",
  "Executive",
];

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: "signin" | "signup"
  const [mode, setMode] = useState("signin");

  // Common credentials
  const [email, setEmail] = useState("sourasish.ghosh@officeaid.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sign up credentials
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [jobTitle, setJobTitle] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage("");
    if (newMode === "signup") {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setEmail("sourasish.ghosh@officeaid.com");
      setPassword("Admin@123");
    }
  };

  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both username/email and password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(
        err.errors?.[0]?.message ||
          err.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e?.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter your first and last name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your work email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please retype password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        department: department.trim() || undefined,
        jobTitle: jobTitle.trim() || undefined,
      };

      await register(payload);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(
        err.errors?.[0]?.message ||
          err.message ||
          "Failed to create account. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Demo Login triggered by "Sign in with other" button
  const handleQuickDemoLogin = async () => {
    setEmail("sourasish.ghosh@officeaid.com");
    setPassword("Admin@123");
    setErrorMessage("");
    setIsLoading(true);

    try {
      await login("sourasish.ghosh@officeaid.com", "Admin@123");
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(
        err.errors?.[0]?.message ||
          err.message ||
          "Demo authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
      }}
    >
      {/* Floating 2-Column Auth Card Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[1040px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.55),0_0_40px_rgba(0,0,0,0.15)] border border-white/10 flex flex-col md:flex-row bg-[#0B0B0C]"
      >
        {/* ======================================================== */}
        {/* LEFT PANEL: Geometric Welcome & 3D Spheres Graphic Area */}
        {/* ======================================================== */}
        <div className="relative md:w-5/12 lg:w-5/12 bg-gradient-to-b from-[#0B0B0C] via-[#121215] to-[#16161a] p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden text-white min-h-[380px] md:min-h-[620px]">
          {/* Subtle Ambient Lime Rim Light */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C6F432]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* SVG 3D Floating Geometric Spheres (Modeled after reference image) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-Right Large Curved Cutout - Lime Green 3D Sphere */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#E4FF8A] via-[#C6F432] to-[#557500] opacity-95 shadow-[0_20px_60px_rgba(198,244,50,0.35),inset_0_4px_16px_rgba(255,255,255,0.4),inset_0_-10px_24px_rgba(0,0,0,0.35)] border border-[#C6F432]/60" />

            {/* Center-Bottom Prominent 3D Sphere - Lime Green */}
            <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#E8FFA3] via-[#C6F432] to-[#4D6B00] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_10px_40px_rgba(198,244,50,0.4),inset_0_6px_20px_rgba(255,255,255,0.5),inset_0_-12px_28px_rgba(0,0,0,0.5)] border border-[#C6F432]/70 flex items-center justify-center relative overflow-hidden">
              {/* Specular Light Highlight */}
              <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-white/40 blur-sm pointer-events-none" />
            </div>

            {/* Bottom-Left Overlapping Sphere */}
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-[#1f1f26] to-[#0b0b0d] shadow-xl border border-white/5 opacity-90" />

            {/* Small Floating Accent Orb */}
            <div className="absolute top-1/3 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#2a2a32] to-[#111114] shadow-lg border border-white/10 opacity-75 animate-pulse" />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#C6F432] text-[#0B0B0C] flex items-center justify-center font-black text-lg shadow-md shadow-[#C6F432]/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C14.336 22 16.486 21.198 18.188 19.852L20.293 21.957C20.684 22.348 21.316 22.348 21.707 21.957C22.098 21.566 22.098 20.934 21.707 20.543L19.676 18.512C21.127 16.758 22 14.484 22 12C22 6.477 17.523 2 12 2ZM12 6C15.314 6 18 8.686 18 12C18 13.567 17.397 14.993 16.41 16.059L13.882 13.531C13.959 13.047 14 12.531 14 12C14 10.895 13.105 10 12 10C11.469 10 10.953 10.041 10.469 10.118L7.941 7.59C9.007 6.603 10.433 6 12 6Z" fill="#0B0B0C" />
              </svg>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Office<span className="text-[#C6F432]">Aid</span>
            </span>
          </div>

          {/* Welcome Typography Content */}
          <div className="relative z-10 my-auto py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-none">
              WELCOME
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-300 uppercase mt-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
              <span>Office Aid Workspace</span>
            </p>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed max-w-xs">
              Unified workplace operations platform. Streamline meetings, projects, tasks, and automated intelligence with Herric AI.
            </p>
          </div>

          {/* Bottom Security Assurance Tag */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Enterprise Security • 256-Bit</span>
            <span className="flex items-center gap-1 text-[#C6F432] font-semibold">
              <Sparkles className="w-3 h-3" /> v1.0 Live
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Pure White Form Area (Exact Image Skeleton) */}
        {/* ======================================================== */}
        <div className="md:w-7/12 lg:w-7/12 bg-white p-7 sm:p-10 lg:p-12 flex flex-col justify-center text-[#0B0B0C]">
          <div className="max-w-md w-full mx-auto">
            {/* Header Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B0B0C]">
                {mode === "signin" ? "Sign in" : "Create Account"}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                {mode === "signin"
                  ? "Welcome back! Please enter your workspace credentials."
                  : "Join your company workplace and collaborate with your team."}
              </p>
            </div>

            {/* Error Banner */}
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-sm"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="flex-1 font-medium">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ======================================= */}
            {/* SIGN IN FORM (Matches Reference Image) */}
            {/* ======================================= */}
            {mode === "signin" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Field 1: User Name / Email Address */}
                <div className="space-y-1">
                  <div className="flex items-center bg-zinc-100/80 hover:bg-zinc-100 rounded-2xl px-4 py-3 border border-zinc-200/80 focus-within:border-[#0B0B0C] focus-within:ring-2 focus-within:ring-[#C6F432]/60 transition-all">
                    <User className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="User Name / Email"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>
                </div>

                {/* Field 2: Password with SHOW/HIDE Button */}
                <div className="space-y-1">
                  <div className="flex items-center bg-zinc-100/80 hover:bg-zinc-100 rounded-2xl px-4 py-3 border border-zinc-200/80 focus-within:border-[#0B0B0C] focus-within:ring-2 focus-within:ring-[#C6F432]/60 transition-all">
                    <Lock className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-extrabold text-zinc-700 hover:text-black tracking-wider transition-colors ml-2 uppercase px-1 py-0.5 rounded cursor-pointer"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-1 pb-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-600 hover:text-zinc-900">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={rememberMe}
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        rememberMe
                          ? "bg-[#0B0B0C] border-[#0B0B0C] text-[#C6F432]"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setErrorMessage(
                        "Please contact your workspace administrator to reset your credentials."
                      )
                    }
                    className="font-medium text-zinc-500 hover:text-[#0B0B0C] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Primary Action Button: Sign In (Styled in Lime Green) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-[#C6F432] text-[#0B0B0C] font-extrabold text-sm tracking-tight shadow-md shadow-[#C6F432]/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>

                {/* Divider Line with "Or" */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="w-full border-t border-zinc-200" />
                  <span className="absolute bg-white px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Or
                  </span>
                </div>

                {/* Secondary Button: Sign in with other (Exact reference button) */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-800 hover:text-black font-semibold text-xs tracking-tight shadow-sm hover:bg-zinc-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0B0B0C]" />
                  <span>Sign in with other (Demo Admin)</span>
                </button>
              </form>
            ) : (
              /* ======================================= */
              /* SIGN UP FORM (Clean Multi-Field Form)  */
              /* ======================================= */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                    <User className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>

                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                  <Mail className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email Address"
                    disabled={isLoading}
                    required
                    className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                  />
                </div>

                {/* Department & Job Title */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3 py-2.5 border border-zinc-200/80">
                    <Building2 className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] font-medium"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="text-black">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Job Title (e.g. Lead Designer)"
                      disabled={isLoading}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                    <Lock className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>

                  <div className="flex items-center bg-zinc-100/80 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 focus-within:border-[#0B0B0C]">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      disabled={isLoading}
                      required
                      className="w-full bg-transparent border-none outline-none text-xs text-[#0B0B0C] placeholder-zinc-400 font-medium"
                    />
                  </div>
                </div>

                {/* Primary Button: Create Account */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 mt-2 rounded-2xl bg-[#C6F432] text-[#0B0B0C] font-extrabold text-sm tracking-tight shadow-md shadow-[#C6F432]/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Footer Switch Link */}
            <div className="text-center mt-6 pt-4 border-t border-zinc-100">
              {mode === "signin" ? (
                <p className="text-xs text-zinc-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("signup")}
                    className="font-bold text-[#0B0B0C] hover:text-black underline underline-offset-4 cursor-pointer ml-1 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-xs text-zinc-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleSwitchMode("signin")}
                    className="font-bold text-[#0B0B0C] hover:text-black underline underline-offset-4 cursor-pointer ml-1 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
