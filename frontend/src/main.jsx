import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AiAssistantProvider } from "./context/AiAssistantContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <AiAssistantProvider>
        <App />
      </AiAssistantProvider>
    </AuthProvider>
  </ThemeProvider>
);