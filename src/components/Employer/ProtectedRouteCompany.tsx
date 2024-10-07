import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface EmployerProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRouteCompany = ({ children }: EmployerProtectedRouteProps) => {
//   const userRole = localStorage.getItem("role");
const CompanyId = localStorage.getItem("CompanyId")

  if (CompanyId ==="null") {
    return <Navigate to="/employer-verify/jobs/account/Choosecompany" />; 
  }

  return children;
};

export default ProtectedRouteCompany;
