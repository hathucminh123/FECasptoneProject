import React, { useEffect, useState } from "react";
import classes from "./JobInCompanyInfo.module.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import moment from "moment";
export default function JobInCompanyInfo() {
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

  const city = jobincompanyData?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();
  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumnn = uniqueArrayCity;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <section className={classes.main2}>
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
            Jobs at {CompanyEmployer?.companyName}
          </Typography>
          <div className={classes.main3}>
            <Link to="" className={classes.link1}>
              ManageJob
            </Link>
          </div>
          <div className={classes.main4}>
            <div>
              {" "}
              {CompanyEmployer?.companyDescription && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: CompanyEmployer?.companyDescription,
                  }}
                />
              )}
            </div>
          </div>
          <div className={classes.main5}>
            <div className={classes.main6}>
              {jobincompanyData?.map((item) => (
                <div className={classes.main7}>
                  <Link
                    to={`/EmployerJob/listjobs/OverView/${item.id}`}
                    className={classes.link2}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#9e9e9e",
                          fontSize: "12px",
                          lineHeight: "20px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                        }}
                      >
                        Engineering
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#143fcd",
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 500,
                          marginBottom: "0.75em",
                          display: "block",
                        }}
                      >
                        {item.jobTitle}
                      </Typography>
                    </div>
                    <div className={classes.main8}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#9e9e9e",
                          fontSize: "12px",
                          lineHeight: "20px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Postting date From:{" "}
                        {moment(item?.postingDate.slice(0, 10)).format(
                          "DD-MM-YYYY"
                        )}{" "}
                        - To:{" "}
                        {moment(item?.expiryDate.slice(0, 10)).format(
                          "DD-MM-YYYY"
                        )}
                      </Typography>
                    </div>
                  </Link>
                  <div className={classes.main9}>
                    <p className={classes.p}>
                      Job Description
                      <br />
                      {item?.jobDescription && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.jobDescription,
                          }}
                        />
                      )}
                    </p>
                  </div>
                  <div className={classes.main10}>
                    <div className={classes.main11}>
                      <div className={classes.main12}>
                        <span className={classes.span}>
                          {item.jobType.name} • {cityColumnn.join(",")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
