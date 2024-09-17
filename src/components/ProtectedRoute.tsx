import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Define the type for the props of ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = localStorage.getItem('auth');
  const location = useLocation(); 

  // Check if the user is not authenticated (e.g., no token in localStorage)
  if (!auth || auth === 'null' || auth === 'undefined') {
  
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;
