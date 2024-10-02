import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface EmployerProtectedRouteProps {
  children: ReactNode; 
}

const EmployerProtectedRoute = ({ children }: EmployerProtectedRouteProps) => {
  const userRole = localStorage.getItem("role");


  if (userRole !== "employer") {
    return <Navigate to="/employers/login" />; 
  }

  return children;
};

export default EmployerProtectedRoute;
