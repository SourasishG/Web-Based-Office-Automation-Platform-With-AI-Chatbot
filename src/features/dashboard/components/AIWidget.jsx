import React, { useState } from "react";
import { Sparkles, ArrowRight, Bot, Zap, MessageSquare } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * AIWidget - Apple Liquid Glass Intelligent Workplace Assistant Panel
 * Features quick prompt shortcuts, model status indicators, and prompt launchers.
 * 
 * @param {object} aiData - Assistant status & suggestion props
 */
export const AIWidget = ({ aiData }) => {
  const [promptInput, setPromptInput] = useState("");

  const defaultPrompts = [
    "Summarize unread emails",
    "Schedule 30-min team sync",
    "Generate project status report",
    "Check open support tickets",
  ];

  const prompts = aiData?.suggestions || defaultPrompts;

  return (
    <GlassPanel
      title="AI Workplace Assistant"
      subtitle="Context-aware productivity intelligence"
      icon={Sparkles}
      action={
        <GlassBadge variant="purple" size="sm" dot glow>
          Model Ready
        </GlassBadge>
      }
      variant="floating"
      padding="md"
      className="h-full flex flex-col justify-between relative overflow-hidden"
    >
      {/* Background Soft AI Glow */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-gradient-to-br from-purple-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Assistant Pitch Banner */}
      <div className="relative z-10 mb-4 p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-cyan-900/30 border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">How can Office Aid help you today?</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Ask me to automate scheduling, summarize communications, or draft project documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="relative z-10 space-y-2 mb-4">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
          Suggested Prompts
        </span>
        <div className="flex flex-wrap gap-1.5">
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPromptInput(prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate max-w-[180px]">{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Prompt Action Trigger */}
      <div className="relative z-10 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask AI anything about your workspace..."
              className="w-full h-10 px-3.5 rounded-xl text-xs bg-slate-950/60 backdrop-blur-xl border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50"
            />
          </div>
          <GlassButton variant="purple" size="sm" icon={Sparkles}>
            Ask
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
};

export default AIWidget;