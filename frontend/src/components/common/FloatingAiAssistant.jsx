import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  Zap,
  Loader2,
  ChevronDown,
  RotateCcw,
  SunMedium,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import useAiAssistant from "../../hooks/useAiAssistant";
import useAuth from "../../hooks/useAuth";
import aiService from "../../services/aiService";
import HerricMarkdown from "./HerricMarkdown";

const QUICK_PROMPTS = [
  {
    label: "🌅 Executive Daily Briefing",
    action: "briefing",
    description: "Personalized morning status, stats & priorities",
  },
  {
    label: "🕒 Today's Syncs & Meetings",
    text: "What meetings and syncs do I have scheduled for today?",
  },
  {
    label: "📋 My Active Tasks & Deliverables",
    text: "Can you list my active tasks and their current priorities?",
  },
  {
    label: "🛠️ Open Support Tickets",
    text: "Do I have any open IT helpdesk tickets pending?",
  },
  {
    label: "✉️ Check Unread Mail Status",
    text: "How many unread emails do I have in my inbox?",
  },
];

/**
 * FloatingAiAssistant - Official "Herric" AI Workplace Operations Copilot
 * Connects directly to backend /api/v1/ai/chat and /api/v1/ai/briefing
 */
const FloatingAiAssistant = () => {
  const { isOpen, setIsOpen } = useAiAssistant();
  const { user } = useAuth();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeProvider, setActiveProvider] = useState("Herric Engine");

  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const msgCounterRef = useRef(1);

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
  }, [isOpen, setIsOpen]);

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setIsOpen]);

  // Auto-scroll on new message
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

  const handleSend = async (promptText) => {
    const text = promptText ?? input.trim();
    if (!text || isTyping) return;

    const userMsgId = `msg-${msgCounterRef.current++}`;
    const aiMsgId = `msg-${msgCounterRef.current++}`;

    const userMessage = { role: "user", content: text, id: userMsgId };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Build conversation history for multi-turn awareness
      const historyPayload = messages.map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        content: m.content,
      }));

      const res = await aiService.chat({
        message: text,
        history: historyPayload,
        contextMode: "workspace",
      });

      const replyContent = res.reply || "I received your message and have analyzed the workspace status.";
      if (res.provider) {
        setActiveProvider(res.provider.includes("gemini") ? "Gemini 1.5 Flash" : "Herric Copilot");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: replyContent,
          id: aiMsgId,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `⚠️ **Herric System Notice:** ${err.message || "Unable to reach workspace intelligence service. Please verify your connection."}`,
          id: aiMsgId,
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTriggerBriefing = async () => {
    if (isTyping) return;

    const userMsgId = `msg-${msgCounterRef.current++}`;
    const aiMsgId = `msg-${msgCounterRef.current++}`;

    const userMessage = {
      role: "user",
      content: "Please provide my executive morning briefing for today.",
      id: userMsgId,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await aiService.getBriefing();
      const briefingText = res.briefingSummary || "Executive briefing retrieved.";
      setActiveProvider(res.provider?.includes("gemini") ? "Gemini 1.5 Flash" : "Herric Copilot");

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: briefingText,
          id: aiMsgId,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `⚠️ **Herric Notice:** Unable to load executive briefing (${err.message}).`,
          id: aiMsgId,
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  const hasMessages = messages.length > 0;
  const firstName = user?.firstName || "there";

  return (
    <div ref={cardRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">
      {/* ——— Floating Pop-up Card ——— */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-[380px] sm:w-[420px] h-[580px] flex flex-col rounded-[30px] border border-white/15 bg-slate-950/85 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_60px_rgba(168,85,247,0.25)] overflow-hidden"
          >
            {/* Ambient glows inside card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple-600/25 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-white/10 bg-slate-900/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.45)]">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#34d399]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">Herric</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Copilot
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-cyan-400/90 font-medium">
                      Live Workspace Synced
                    </span>
                    <span className="text-slate-500 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-400">{activeProvider}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {hasMessages && (
                  <button
                    onClick={handleResetChat}
                    title="Reset Conversation"
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message feed / welcome state */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {!hasMessages && (
                <div className="space-y-3 mt-1">
                  {/* Hero Intro Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-slate-900/60 to-cyan-900/30 border border-purple-500/30 shadow-inner">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <p className="text-xs font-bold text-white">
                        Good to see you, {firstName}!
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      I am <strong className="text-white">Herric</strong>, your AI operations copilot with live visibility into your tasks, scheduled calendar syncs, and helpdesk tickets.
                    </p>
                  </div>

                  {/* Suggested Quick Prompts Grid */}
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      Quick Workplace Actions
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {QUICK_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => (p.action === "briefing" ? handleTriggerBriefing() : handleSend(p.text))}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 bg-white/[0.04] hover:bg-white/[0.09] hover:text-white border border-white/10 transition-all text-left group cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:text-cyan-300 transition-colors" />
                          <span className="font-medium text-[11px]">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Thread */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0 mr-2 mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.35)]">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white border border-purple-400/30 rounded-br-sm shadow-md"
                        : msg.isError
                        ? "bg-rose-950/40 text-rose-200 border border-rose-500/30 rounded-bl-sm"
                        : "bg-white/[0.06] text-slate-200 border border-white/10 rounded-bl-sm backdrop-blur-md"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <HerricMarkdown content={msg.content} />
                    )}
                    {msg.timestamp && (
                      <div className="text-[9px] text-slate-400 text-right mt-1.5 opacity-70">
                        {msg.timestamp}
                      </div>
                    )}
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
                  <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] backdrop-blur-md">
                    <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                    <span className="text-[11px] text-slate-300 font-medium">Herric is analyzing workspace...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="relative z-10 px-4 pb-4 pt-3 border-t border-white/10 bg-slate-900/30 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Herric anything about your tasks, syncs, or mail..."
                  className="flex-1 h-10 px-3.5 rounded-xl text-xs bg-slate-950/70 backdrop-blur-xl border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-600 flex items-center justify-center text-white border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_28px_rgba(6,182,212,0.5)] shrink-0 cursor-pointer"
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
        aria-label="Toggle Herric Assistant"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 animate-ping scale-110 pointer-events-none" />
        {/* Soft glow halo */}
        <span className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.5)] pointer-events-none" />
        {/* Main button */}
        <span className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_8px_32px_rgba(168,85,247,0.5),0_0_60px_rgba(6,182,212,0.25)] border border-white/20">
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
