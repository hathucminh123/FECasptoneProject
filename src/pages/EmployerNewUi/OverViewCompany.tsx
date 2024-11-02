import React, { useEffect, useState } from "react";
import classes from "./OverViewCompany.module.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
export default function OverViewCompany() {
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );

  const {
    data: Company,
    refetch: refetchCompanies,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });

  useEffect(() => {
    // Sync companyId from localStorage if it changes
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
    refetchCompanies();
  }, [companyId, refetchCompanies]);

  const Companiesdata = Company?.Companies;
  const CompanyEmployer = Companiesdata?.find(
    (company) => company.id === Number(companyId)
  );

  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  const jobincompanyData = JobPostsdata?.filter(
    (item) => item.companyId === Number(companyId)
  );
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <section className={classes.section}>
          <Typography
            variant="h1"
            sx={{
              color: "rgba(5, 12, 38, 1)",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "30px",
              marginBottom: "16px",
              boxSizing: "border-box",
              borderWidth: 0,
              borderStyle: "solid",
            }}
          >
            {CompanyEmployer?.companyName}
          </Typography>
          <div className={classes.main2}>
            <div className={classes.main3}>
              <div className={classes.main4}>
                <div className={classes.main5}>
                  {/* <div className={classes.main20}> */}
                  <img
                    src={CompanyEmployer?.imageUrl}
                    alt=""
                    className={classes.main20}
                  />
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className={classes.main6}>
              <header className={classes.main7}>
                {CompanyEmployer?.companyDescription && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: CompanyEmployer?.companyDescription,
                    }}
                  />
                )}
              </header>
              <div className={classes.main18}>
                <div></div>
              </div>
            </div>
          </div>
          <div className={classes.main9}>
            <div className={classes.main10}>
              <header className={classes.main11}>Jobs</header>
              <Link to="/EmployerJob/listjobs" className={classes.main12}>
                <span className={classes.main13}>View All Jobs</span>
                <svg height="16" viewBox="0 0 24 24" width="16">
                  <path
                    d="M23.25 12.497H.75M19.5 16.247l3.75-3.75-3.75-3.75"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </Link>
            </div>
            {jobincompanyData?.map((item) => (
              <div className={classes.main14}>
                <div className={classes.main15}>
                  <Link
                    to={`/EmployerJob/listjobs/OverView/${item.id}`}
                    className={classes.link}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        marginBottom: 0,
                        color: "#143fcd",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                    >
                      {item.jobTitle}
                    </Typography>
                  </Link>
                  <div className={classes.main16}>
                    <div className={classes.main17}>
                      <span className={classes.main18}>
                        {item.jobType.name}
                      </span>
                    </div>
                    <span className={classes.span}>
                      <div className={classes.main18}>
                        {item.salary} USD Amazing Job Est
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
