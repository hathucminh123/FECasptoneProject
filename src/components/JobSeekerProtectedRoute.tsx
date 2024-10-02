import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface EmployerProtectedRouteProps {
  children: ReactNode;
}

const JobSeekerProtectedRoute = ({ children }: EmployerProtectedRouteProps) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return children;
  } else if (userRole && userRole !== "jobseeker") {
    return <Navigate to="/JobSeekers/login" />;
  }

  return children;
};

export default JobSeekerProtectedRoute;
