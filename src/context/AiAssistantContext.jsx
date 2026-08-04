import React, { createContext, useContext, useState } from "react";

/**
 * AiAssistantContext - Global state for the Floating AI Assistant open/close toggle.
 * Wrap the app (inside BrowserRouter) with <AiAssistantProvider> to make
 * the openAssistant() trigger available in any component without prop-drilling.
 */
const AiAssistantContext = createContext(null);

export const AiAssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAssistant = () => setIsOpen(true);
  const closeAssistant = () => setIsOpen(false);
  const toggleAssistant = () => setIsOpen((v) => !v);

  return (
    <AiAssistantContext.Provider
      value={{ isOpen, setIsOpen, openAssistant, closeAssistant, toggleAssistant }}
    >
      {children}
    </AiAssistantContext.Provider>
  );
};

export const useAiAssistant = () => {
  const ctx = useContext(AiAssistantContext);
  if (!ctx) {
    throw new Error("useAiAssistant must be used within AiAssistantProvider");
  }
  return ctx;
};

export default AiAssistantContext;
