import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  Zap,
  Loader2,
  ChevronDown,
} from "lucide-react";

const PROMPTS = [
  "Summarize unread emails",
  "Schedule 30-min team sync",
  "Generate project status report",
  "Check open support tickets",
];

// Simulated AI responses
const getAIResponse = (prompt) => {
  const responses = {
    default:
      "I'm processing your request. In the full integration, I'll connect to your workspace data to give you a personalised response.",
    email:
      "You have 86 unread emails. 12 are marked high priority. 3 require immediate action: Q3 Budget Approval, Security Audit Review, and Client Onboarding from Vikram Das.",
    schedule:
      "I've found 3 open slots this week: Tomorrow 2–2:30 PM, Thursday 11–11:30 AM, and Friday 4–4:30 PM. Should I book one with your team?",
    project:
      "Project status: AI Chatbot v1 is at 65% (on track), Cloud Migration at 40% (behind by ~1 week), Security Audit at 25% (needs attention).",
    ticket:
      "You have 19 open tickets. 5 are critical, 8 are high priority. Top urgent: TK-1089 (Email Sync Issue) and TK-1092 (Login Auth Failure).",
  };

  const lower = prompt.toLowerCase();
  if (lower.includes("email")) return responses.email;
  if (lower.includes("schedule") || lower.includes("sync")) return responses.schedule;
  if (lower.includes("project") || lower.includes("status")) return responses.project;
  if (lower.includes("ticket")) return responses.ticket;
  return responses.default;
};

/**
 * FloatingAiAssistant - Global floating AI chat assistant
 * Renders a glowing circle FAB in the bottom-right corner.
 * Click to expand the glass AI chat card; click outside to collapse.
 */
const FloatingAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Click-outside collapse
  useEffect(() => {
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (promptText) => {
    const text = promptText ?? input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        role: "ai",
        content: getAIResponse(text),
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div ref={cardRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* ——— Floating Pop-up Card ——— */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-[360px] max-h-[540px] flex flex-col rounded-[28px] border border-white/15 bg-slate-900/80 backdrop-blur-3xl shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(168,85,247,0.25)] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,10,30,0.92) 0%, rgba(20,15,45,0.92) 100%)",
            }}
          >
            {/* Ambient glow inside card */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    AI Workplace Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Model Ready
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message feed / welcome state */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {!hasMessages && (
                <div className="mt-2 p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-cyan-900/30 border border-purple-500/25">
                  <p className="text-xs font-semibold text-white">
                    How can Office Aid help you today?
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Ask me to automate scheduling, summarize communications, or
                    draft project documentation.
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 mr-2 mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600/70 to-blue-600/70 text-white border border-purple-400/30 rounded-br-sm"
                        : "bg-white/8 text-slate-200 border border-white/10 rounded-bl-sm"
                    }`}
                    style={msg.role === "ai" ? { background: "rgba(255,255,255,0.06)" } : {}}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-bl-sm border border-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                    <span className="text-[11px] text-slate-400 ml-1">Thinking…</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts (only shown before messages) */}
            {!hasMessages && (
              <div className="relative z-10 px-4 pb-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Suggested Prompts
                </p>
                <div className="flex flex-col gap-1.5">
                  {PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors text-left group"
                    >
                      <Zap className="w-3 h-3 text-cyan-400 shrink-0 group-hover:text-cyan-300" />
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <div className="relative z-10 px-4 pb-5 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask AI anything about your workspace…"
                  className="flex-1 h-10 px-3.5 rounded-xl text-xs bg-slate-950/60 backdrop-blur-xl border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_28px_rgba(168,85,247,0.5)] shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Floating Action Button ——— */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none"
        aria-label="Toggle AI Assistant"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 animate-ping scale-110 pointer-events-none" />
        {/* Soft glow halo */}
        <span className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.5)] pointer-events-none" />
        {/* Main button */}
        <span className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_8px_32px_rgba(168,85,247,0.5),0_0_60px_rgba(6,182,212,0.2)] border border-white/20">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="chevron"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="sparkle"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingAiAssistant;
