import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
import React from "react";

type JobContextType = {
  selectJobId: number | null;
  setSelectJobId: React.Dispatch<React.SetStateAction<number | null>>;
};

const ProtectedRouteCompanyWait = ({ children }: { children: ReactNode }) => {
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  const { selectJobId, setSelectJobId } = useOutletContext<JobContextType>();
  const location = useLocation();

  const { data: CompanyDa } = useQuery({
    queryKey: ["Company-details", companyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });

  const companyDataa = CompanyDa?.Companies ;
  const isPending = companyDataa?.companyStatus;

  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal ,boolean:true}),
    staleTime: 5000,
  });

  const JobPostsdata = JobPosts?.JobPosts || [];
  const jobincompanyData = JobPostsdata.filter(
    (item) => item.companyId === companyDataa?.id
  );

  useEffect(() => {
    if (!selectJobId && jobincompanyData && jobincompanyData.length > 0) {
      setSelectJobId(jobincompanyData[0].id);
    }
  }, [selectJobId, jobincompanyData, setSelectJobId]);

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);

  useEffect(() => {
    if (!companyId || companyId === "null") {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }
  }, [companyId, location]);

  return jobincompanyData.length > 0 && selectJobId && isPending === 2 ? (
    <Navigate to={`/EmployerJob/listjobs/OverView/${selectJobId}`} replace />
  ) : isPending === 2 ? (
    <Navigate to={`/EmployerJob`} replace />
  ) : isPending === 1 ? (
    <Navigate to={`/onboarding/UpdateCompany`} replace />
  ) : (
    children
  );
};

export default ProtectedRouteCompanyWait;
