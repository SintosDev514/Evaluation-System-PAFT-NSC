import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
