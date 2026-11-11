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
            className="w-[380px] sm:w-[420px] h-[580px] flex flex-col rounded-[28px] border border-white/10 bg-[#0B0B0C]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_40px_rgba(198,244,50,0.12)] overflow-hidden"
          >
            {/* Ambient glows inside card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#C6F432]/15 via-[#C6F432]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-[#C6F432]/10 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-white/10 bg-[#141416]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-2xl bg-[#C6F432] flex items-center justify-center shadow-[0_0_20px_rgba(198,244,50,0.28)]">
                  <Bot className="w-5 h-5 text-[#0B0B0C]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#141416] shadow-[0_0_8px_#34d399]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">Herric</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#C6F432]/15 text-[#C6F432] border border-[#C6F432]/30">
                      Copilot
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-[#C6F432] font-medium">
                      Live Workspace Synced
                    </span>
                    <span className="text-zinc-500 text-[10px]">•</span>
                    <span className="text-[10px] text-zinc-400">{activeProvider}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {hasMessages && (
                  <button
                    onClick={handleResetChat}
                    title="Reset Conversation"
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
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
                  <div className="p-4 rounded-2xl bg-[#141416] border border-[#C6F432]/25 shadow-inner">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-4 h-4 text-[#C6F432]" />
                      <p className="text-xs font-bold text-white">
                        Good to see you, {firstName}!
                      </p>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      I am <strong className="text-white">Herric</strong>, your AI operations copilot with live visibility into your tasks, scheduled calendar syncs, and helpdesk tickets.
                    </p>
                  </div>

                  {/* Suggested Quick Prompts Grid */}
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-1">
                      Quick Workplace Actions
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {QUICK_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => (p.action === "briefing" ? handleTriggerBriefing() : handleSend(p.text))}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 bg-[#141416] hover:bg-[#1A1A1E] hover:text-white border border-white/10 hover:border-[#C6F432]/30 transition-all text-left group cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#C6F432] shrink-0 transition-colors" />
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
                    <div className="w-6 h-6 rounded-xl bg-[#C6F432] flex items-center justify-center shrink-0 mr-2 mt-0.5 shadow-sm">
                      <Bot className="w-3.5 h-3.5 text-[#0B0B0C]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#C6F432] text-[#0B0B0C] font-medium border border-[#C6F432]/40 rounded-br-sm shadow-md"
                        : msg.isError
                        ? "bg-rose-950/50 text-rose-200 border border-rose-500/30 rounded-bl-sm"
                        : "bg-[#141416] text-zinc-200 border border-white/10 rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <HerricMarkdown content={msg.content} />
                    )}
                    {msg.timestamp && (
                      <div
                        className={`text-[9px] text-right mt-1.5 ${
                          msg.role === "user" ? "text-[#0B0B0C]/70 font-semibold" : "text-zinc-500"
                        }`}
                      >
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
                  <div className="w-6 h-6 rounded-xl bg-[#C6F432] flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#0B0B0C]" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl rounded-bl-sm border border-white/10 bg-[#141416]">
                    <Loader2 className="w-3 h-3 text-[#C6F432] animate-spin" />
                    <span className="text-[11px] text-zinc-300 font-medium">Herric is analyzing workspace...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="relative z-10 px-4 pb-4 pt-3 border-t border-white/10 bg-[#141416]/90 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Herric anything about your tasks, syncs, or mail..."
                  className="flex-1 h-10 px-3.5 rounded-xl text-xs bg-[#0B0B0C] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6F432]/60 focus:ring-1 focus:ring-[#C6F432]/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-[#C6F432] hover:bg-[#d4ff47] flex items-center justify-center text-[#0B0B0C] shadow-[0_0_20px_rgba(198,244,50,0.25)] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none"
        aria-label="Toggle Herric Assistant"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#C6F432]/35 animate-ping scale-110 pointer-events-none" />
        {/* Soft glow halo */}
        <span className="absolute inset-0 rounded-full shadow-[0_8px_30px_rgba(198,244,50,0.45)] pointer-events-none" />
        {/* Main button */}
        <span className="relative z-10 w-14 h-14 rounded-full bg-[#C6F432] hover:bg-[#d4ff47] flex items-center justify-center shadow-[0_10px_28px_rgba(11,11,12,0.32)] border-2 border-[#0B0B0C]/15 transition-colors">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="chevron"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <ChevronDown className="w-6 h-6 text-[#0B0B0C]" />
              </motion.span>
            ) : (
              <motion.span
                key="sparkle"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Sparkles className="w-6 h-6 text-[#0B0B0C]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingAiAssistant;
