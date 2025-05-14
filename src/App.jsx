import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
//Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
//Contexts
import { useUser } from "./contexts/UserContext";

import "./App.css";

function App() {
  const user = useUser();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-t from-white to-blue-100">
      <Router>
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Home />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
