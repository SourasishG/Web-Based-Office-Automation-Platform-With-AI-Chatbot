import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Bot,
  User,
  RotateCcw,
  SunMedium,
  Calendar,
  Copy,
  Check,
  Loader2,
  Zap,
  Briefcase,
  Ticket,
  Mail,
  ShieldAlert,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  GlassPanel,
  GlassBadge,
  GlassButton,
  GlassCard,
} from "../../components/ui";
import HerricMarkdown from "../../components/common/HerricMarkdown";
import aiService from "../../services/aiService";
import useAuth from "../../hooks/useAuth";

const SUGGESTED_QUERIES = [
  {
    icon: SunMedium,
    title: "Executive Daily Briefing",
    prompt: "Give me my complete executive morning briefing for today.",
    tag: "Briefing",
  },
  {
    icon: Calendar,
    title: "Today's Schedule & Meetings",
    prompt: "What meetings and syncs do I have scheduled for today?",
    tag: "Schedule",
  },
  {
    icon: Briefcase,
    title: "Pending Tasks & Velocity",
    prompt: "What are my highest priority pending tasks and deliverables?",
    tag: "Kanban",
  },
  {
    icon: Ticket,
    title: "Audit Critical IT Tickets",
    prompt: "Summarize the open critical support tickets in our queue.",
    tag: "Helpdesk",
  },
  {
    icon: Mail,
    title: "Unread Messages Status",
    prompt: "Do I have any urgent or unread emails requiring attention?",
    tag: "Mail",
  },
  {
    icon: ShieldAlert,
    title: "Workspace Health Check",
    prompt: "Provide an operational health summary of our team's active projects.",
    tag: "Operations",
  },
];

/**
 * Chatbot - Full-Page Dedicated "Herric" AI Workplace Operations Copilot Hub
 */
export const Chatbot = () => {
  const { user } = useAuth();
  const userName = user?.firstName || "there";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "initial-welcome",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: `Hello **${userName}**! I am **Herric**, your intelligent Workplace Operations Copilot for Office Aid.

I have real-time contextual awareness of your workspace:
- 📊 **Executive Dashboard KPIs & Metrics**
- 📋 **Agile Kanban Tasks & Sprint Deliverables**
- 📅 **Video Syncs & Daily Timelines**
- 🎫 **IT Helpdesk Tickets & SLA Diagnostics**
- ✉️ **Internal Workplace Communications**

How can I assist your operations today? You can select a quick action below or ask any question.`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [contextMode, setContextMode] = useState("workspace"); // 'workspace', 'general'
  const [copiedId, setCopiedId] = useState(null);
  const [briefingData, setBriefingData] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const loadBriefing = useCallback(async () => {
    try {
      const res = await aiService.getBriefing();
      if (res?.data) {
        setBriefingData(res.data);
      }
    } catch (err) {
      console.warn("Could not load executive briefing summary:", err);
    }
  }, []);

  useEffect(() => {
    loadBriefing();
  }, [loadBriefing]);

  const handleSend = async (messageText = input) => {
    const textToSend = (messageText || "").trim();
    if (!textToSend || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Build conversation history for multi-turn chat
      const history = messages
        .filter((m) => m.id !== "initial-welcome")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          content: m.content,
        }));

      const res = await aiService.chat({
        message: textToSend,
        history,
        contextMode,
      });

      const replyText =
        res?.data?.reply ||
        res?.reply ||
        "I have processed your request. Let me know if you need any further analysis!";

      const assistantMsg = {
        id: `herric-${Date.now()}`,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: replyText,
        provider: res?.data?.provider || "gemini-1.5-flash",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Herric chat request error:", err);
      const errorMsg = {
        id: `error-${Date.now()}`,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content:
          "⚠️ I encountered a temporary connection error reaching the intelligence engine. Please try again or rephrase your request.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: `Conversation refreshed. I'm ready to assist you with any workspace questions or actions, **${userName}**!`,
      },
    ]);
  };

  const handleCopyMessage = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 select-none pb-6">
        {/* Header Hero Panel */}
        <GlassPanel
          variant="floating"
          padding="md"
          className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Identity */}
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="relative">
              <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-sm" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Herric AI Copilot
                </h1>
                <GlassBadge variant="cyan" size="sm" dot glow>
                  Online • Operations Intelligence
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-stack workplace operations assistant powered by Gemini 1.5 & Supabase live data
              </p>
            </div>
          </div>

          {/* Right Controls: Mode Toggle & Refresh */}
          <div className="relative z-10 flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1 text-xs">
              <button
                type="button"
                onClick={() => setContextMode("workspace")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  contextMode === "workspace"
                    ? "bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Workspace Context
              </button>
              <button
                type="button"
                onClick={() => setContextMode("general")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  contextMode === "general"
                    ? "bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-400/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                General Mode
              </button>
            </div>

            <GlassButton
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={handleClearHistory}
              title="Reset Chat Session"
            >
              Reset Session
            </GlassButton>
          </div>
        </GlassPanel>

        {/* Executive Morning Briefing Banner (Collapsible Widget) */}
        {briefingData?.briefingSummary && (
          <GlassCard
            variant="standard"
            glow="cyan"
            className="p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                  <SunMedium className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Today's Executive Morning Briefing
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Compiled by Herric • {briefingData.date || "Today"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {briefingData.stats && (
                  <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                    <span>📅 {briefingData.stats.todayMeetings || 0} Syncs</span>
                    <span>📋 {briefingData.stats.pendingTasks || 0} Tasks</span>
                    <span>🎫 {briefingData.stats.openTickets || 0} Tickets</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-slate-200 mt-3 pt-3 border-t border-white/10 max-h-36 overflow-y-auto pr-1">
              <HerricMarkdown content={briefingData.briefingSummary} />
            </div>
          </GlassCard>
        )}

        {/* Main Chat Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Quick Prompts Sidebar (1 Col) */}
          <div className="lg:col-span-1 space-y-3">
            <GlassPanel
              variant="default"
              padding="sm"
              className="flex flex-col gap-2"
            >
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Quick Inquiries
                </span>
                <span className="text-[10px] text-slate-400 font-mono">1-Click</span>
              </div>

              <div className="space-y-1.5">
                {SUGGESTED_QUERIES.map((q, idx) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(q.prompt)}
                      disabled={isTyping}
                      className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 transition-all text-xs group cursor-pointer flex items-start gap-2.5"
                    >
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:text-cyan-300 shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                          {q.title}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {q.prompt}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </GlassPanel>
          </div>

          {/* Active Conversation Stream (3 Cols) */}
          <div className="lg:col-span-3">
            <GlassPanel
              variant="default"
              padding="none"
              className="flex flex-col h-[650px] relative overflow-hidden"
            >
              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((m) => {
                    const isAssistant = m.role === "assistant";
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-3 sm:gap-3.5 ${
                          isAssistant ? "justify-start" : "justify-end"
                        }`}
                      >
                        {isAssistant && (
                          <div className="p-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 h-9 w-9 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div
                          className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                            isAssistant
                              ? m.isError
                                ? "bg-rose-950/40 border border-rose-500/30 text-rose-200"
                                : "bg-slate-900/70 border border-white/10 text-slate-200 shadow-md backdrop-blur-xl"
                              : "bg-linear-to-r from-blue-600 via-cyan-600 to-cyan-500 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.25)] rounded-tr-none"
                          }`}
                        >
                          {/* Role Header */}
                          <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-white/10 text-[11px] opacity-75">
                            <span className="font-semibold flex items-center gap-1.5">
                              {isAssistant ? (
                                <>
                                  <Sparkles className="w-3 h-3 text-cyan-400" /> Herric Copilot
                                </>
                              ) : (
                                <>
                                  <User className="w-3 h-3" /> You
                                </>
                              )}
                            </span>

                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px]">{m.timestamp}</span>
                              {isAssistant && (
                                <button
                                  type="button"
                                  onClick={() => handleCopyMessage(m.id, m.content)}
                                  className="p-1 hover:text-white transition-colors"
                                  title="Copy response"
                                >
                                  {copiedId === m.id ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Message Content */}
                          {isAssistant ? (
                            <div className="overflow-x-auto text-slate-100">
                              <HerricMarkdown content={m.content} />
                            </div>
                          ) : (
                            <p className="whitespace-pre-line text-white">{m.content}</p>
                          )}
                        </div>

                        {!isAssistant && (
                          <div className="p-2 rounded-2xl bg-white/10 border border-white/15 text-white h-9 w-9 flex items-center justify-center shrink-0 mt-1">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 h-9 w-9 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center gap-2 text-xs text-cyan-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Herric is analyzing workspace records...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-end gap-2.5"
                >
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={`Ask Herric anything about your tasks, meetings, tickets, emails... (Press Enter to send)`}
                    className="flex-1 max-h-32 min-h-[46px] resize-none px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition-all custom-scrollbar"
                  />

                  <GlassButton
                    variant="primary"
                    size="md"
                    type="submit"
                    icon={isTyping ? Loader2 : Send}
                    disabled={!input.trim() || isTyping}
                    className="h-[46px] px-4 rounded-2xl"
                  >
                    Send
                  </GlassButton>
                </form>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
