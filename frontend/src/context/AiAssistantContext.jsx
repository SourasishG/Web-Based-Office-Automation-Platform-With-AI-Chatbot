import { useState } from "react";
import AiAssistantContext from "./AiAssistantContext";

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

export default AiAssistantProvider;
