import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteCompany = ({ children }: { children: ReactNode }) => {
  const [companyId, setCompanyId] = useState<string | null>(localStorage.getItem("CompanyId"));
  const location = useLocation();

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);

  useEffect(() => {
    if (!companyId || companyId === "null") {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }
  }, [companyId, location]);

  return companyId && companyId !== "null" ? children : <Navigate to="/employer-verify/jobs/InfoVerification" replace />;
};

export default ProtectedRouteCompany;