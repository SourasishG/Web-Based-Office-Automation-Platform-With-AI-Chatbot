import React from "react";

/**
 * Lightweight and robust markdown formatter tailored for Herric executive AI responses
 */
export const HerricMarkdown = ({ content = "" }) => {
  if (!content) return null;

  // Split content by lines to process block elements
  const lines = content.split("\n");
  const renderedElements = [];

  let inList = false;
  let currentList = [];

  const flushList = (key) => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="space-y-1.5 my-2 pl-1">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="flex-1 leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
      inList = false;
    }
  };

  const renderInline = (text) => {
    // Process bold, inline code, and links
    const parts = [];
    let remaining = text;
    let keyIdx = 0;

    // Regex for bold **text**, inline code `code`, link [label](url)
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/;

    while (remaining.length > 0) {
      const match = remaining.match(regex);
      if (!match) {
        parts.push(<React.Fragment key={keyIdx++}>{remaining}</React.Fragment>);
        break;
      }

      const matchIndex = match.index;
      if (matchIndex > 0) {
        parts.push(
          <React.Fragment key={keyIdx++}>
            {remaining.substring(0, matchIndex)}
          </React.Fragment>
        );
      }

      const matchedString = match[0];
      if (matchedString.startsWith("**") && matchedString.endsWith("**")) {
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-white">
            {matchedString.slice(2, -2)}
          </strong>
        );
      } else if (matchedString.startsWith("`") && matchedString.endsWith("`")) {
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 font-mono text-[10px] border border-white/5"
          >
            {matchedString.slice(1, -1)}
          </code>
        );
      } else if (matchedString.startsWith("[") && matchedString.includes("](")) {
        const linkMatch = matchedString.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          parts.push(
            <a
              key={keyIdx++}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-400/40 hover:decoration-cyan-300 transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }

      remaining = remaining.substring(matchIndex + matchedString.length);
    }

    return parts;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList(index);
      return;
    }

    // Header 3 or 4
    if (trimmed.startsWith("### ")) {
      flushList(index);
      renderedElements.push(
        <h4
          key={`h3-${index}`}
          className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 mt-3 mb-1.5 flex items-center gap-1.5"
        >
          {renderInline(trimmed.substring(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("#### ")) {
      flushList(index);
      renderedElements.push(
        <h5
          key={`h4-${index}`}
          className="text-[11px] font-semibold text-slate-200 mt-2.5 mb-1"
        >
          {renderInline(trimmed.substring(5))}
        </h5>
      );
      return;
    }

    // Bullet points (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      currentList.push(trimmed.substring(2));
      return;
    }

    // Numbered list (e.g. "1. ")
    if (/^\d+\.\s/.test(trimmed)) {
      flushList(index);
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      if (match) {
        renderedElements.push(
          <div key={`num-${index}`} className="flex items-start gap-2 my-1 text-slate-200">
            <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {match[1]}
            </span>
            <span className="flex-1 leading-relaxed">{renderInline(match[2])}</span>
          </div>
        );
      }
      return;
    }

    // Blockquote (> text)
    if (trimmed.startsWith("> ")) {
      flushList(index);
      renderedElements.push(
        <blockquote
          key={`quote-${index}`}
          className="p-2.5 my-2 rounded-xl bg-white/[0.04] border-l-2 border-cyan-400 text-[11px] italic text-slate-300"
        >
          {renderInline(trimmed.substring(2))}
        </blockquote>
      );
      return;
    }

    // Standard paragraph
    flushList(index);
    renderedElements.push(
      <p key={`p-${index}`} className="my-1 text-slate-300 leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList("end");

  return <div className="space-y-1 text-xs">{renderedElements}</div>;
};

export default HerricMarkdown;
