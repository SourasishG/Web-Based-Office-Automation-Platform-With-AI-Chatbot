import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AiAssistantProvider } from "./context/AiAssistantContext";

// Clean any previous theme attributes
document.documentElement.classList.remove("light");
localStorage.removeItem("office_aid_theme");

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AiAssistantProvider>
      <App />
    </AiAssistantProvider>
  </AuthProvider>
);
