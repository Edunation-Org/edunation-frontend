import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Temporary debug - remove after fixing
  if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('edunationalacademy')) {
    console.log("🔍 ProtectedRoute Debug:", {
      userEmail: user?.email,
      isProfileComplete: user?.isProfileComplete,
      currentPath: location.pathname
    });
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    user &&
    !user.isProfileComplete &&
    location.pathname !== "/complete-profile"
  ) {
    console.log("❌ Redirecting to complete-profile because isProfileComplete:", user.isProfileComplete);
    return <Navigate to="/complete-profile" />;
  }

  return children;
};

export default ProtectedRoute;
