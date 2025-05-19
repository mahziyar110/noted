import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import App from "./App.jsx";
import { NotesProvider } from "./contexts/NotesContext.jsx";
import { TasksProvider } from "./contexts/TasksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <NotesProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </NotesProvider>
    </UserProvider>
  </StrictMode>
);
