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

const ProtectedRouteJob = ({ children }: { children: ReactNode }) => {
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  const { selectJobId, setSelectJobId } = useOutletContext<JobContextType>();

  // const [selectJobId,setSelectJobId]=useState<number|null>()

  const location = useLocation();

  const { data: CompanyDa } = useQuery({
    queryKey: ["Company-details", companyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;

  const isPending = companyDataa?.companyStatus;

  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal ,boolean:true}),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  const jobincompanyData = JobPostsdata?.filter(
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

  return jobincompanyData &&
    jobincompanyData.length > 0 &&
    selectJobId &&
    isPending === 2 ? (
    <Navigate to={`/EmployerJob/listjobs/OverView/${selectJobId}`} replace />
  ) : isPending === 0 ? (
    <Navigate to={`/EmployerJob/Waiting`} replace />
  ) : isPending === 1 ? (
    <Navigate to={`/onboarding/UpdateCompany`} replace />
  ) : (
    children
  );
};

export default ProtectedRouteJob;
