import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
