import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const userRole = localStorage.getItem("role");

  // Redirect to login if the user is not a "jobseeker"
  if (!userRole || userRole !== "admin") {
    return <Navigate to="/auth/Admin" />;
  }

 
  return <>{children}</>;
};

export default AdminProtectedRoute;
