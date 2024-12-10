import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface JobSeekerProtectedRouteProps {
  children: ReactNode;
}

const JobSeekerProtectedRoute: React.FC<JobSeekerProtectedRouteProps> = ({
  children,
}) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return children;
  } else if (userRole !== "jobseeker") {
    return <Navigate to="/JobSeekers/login" />;
  }

  return <>{children}</>;
};

export default JobSeekerProtectedRoute;
