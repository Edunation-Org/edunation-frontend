import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    user &&
    !user.isProfileComplete &&
    location.pathname !== "/complete-profile"
  ) {
    return <Navigate to="/complete-profile" />;
  }

  return children;
};

export default ProtectedRoute;
