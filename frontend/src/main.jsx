import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AiAssistantProvider } from "./context/AiAssistantContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AiAssistantProvider>
      <App />
    </AiAssistantProvider>
  </ThemeProvider>
);