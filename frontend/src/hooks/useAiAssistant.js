import { useContext } from "react";
import AiAssistantContext from "../context/AiAssistantContext";

export const useAiAssistant = () => {
  const ctx = useContext(AiAssistantContext);
  if (!ctx) {
    throw new Error("useAiAssistant must be used within AiAssistantProvider");
  }
  return ctx;
};

export default useAiAssistant;
