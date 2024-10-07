import React from "react";
import classes from "./ApplySuccess.module.css";
import Typography from "@mui/material/Typography";
import logo from "./../assets/image/logo.jpg";
import { Link, useParams } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../Services/JobsPost/GetJobPostById";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
export default function ApplySuccess() {
  const { JobId } = useParams();
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });
  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });

  const Companiesdata = Company?.Companies;
  const job = jobData?.JobPosts;
  const JobPostsdata = JobPosts?.JobPosts;
  const detailsCompany = Companiesdata?.find(
    (item) => item.id === job?.companyId
  );
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}></div>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <div className={classes.main6}>
                <div className={classes.logo}>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 25, lineHeight: 1.5, fontWeight: 700 }}
                  >
                    Amazing
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.main7}>
              <div className={classes.main8}>
                <img src={logo} alt="success" className={classes.img} />
              </div>
              <div className={classes.main9}>
                <Typography
                  variant="h1"
                  sx={{
                    marginBottom: "16px",
                    textAlign: "center",
                    lineHeight: 1.5,
                    fontSize: "28px",
                    fontWeight: 700,
                    marginTop: 0,
                    boxSizing: "border-box",
                  }}
                >
                  Amazing! We have received your CV
                </Typography>
                <p className={classes.p}>We have received your CV to:</p>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    Position:
                    <span className={classes.span}>{job?.jobTitle}</span>
                  </li>
                  <li className={classes.li}>
                    Company:
                    <span className={classes.span}>
                      {detailsCompany?.companyName}
                    </span>
                  </li>
                </ul>
                <div className={classes.main10}>
                  Your CV will be sent to the employer after it is approved by
                  our review team. Please check system to get updates on your CV
                  status.
                </div>
              </div>
              <div className={classes.main11}>
                <Typography
                  variant="h2"
                  sx={{
                    marginBottom: "16px",
                    textAlign: "center",
                    lineHeight: 1.5,
                    fontSize: "28px",
                    fontWeight: 700,
                    marginTop: 0,
                    boxSizing: "border-box",
                  }}
                >
                  Have you seen these other jobs
                </Typography>
                <div className={classes.main12}>
                  {JobPostsdata?.map((job) => (
                    <div className={classes.main13}>
                      <div className={classes.main14}>
                        <div className={classes.logojob}>
                          <img
                            src={job.imageURL}
                            alt=""
                            className={classes.logojob}
                          />
                        </div>
                        <div className={classes.main15}>
                          <Link to="" className={classes.link}>
                            {" "}
                            {job.jobTitle}
                          </Link>
                          <div className={classes.main16}>
                            <div className={classes.main17}>
                              <MonetizationOnOutlinedIcon />
                              <span className={classes.span1}>
                                {job.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <div className={classes.main13}>
                    <div className={classes.main14}>
                      <div className={classes.logojob}>
                        <img src={logo} alt="" className={classes.logojob} />
                      </div>
                      <div className={classes.main15}>
                        <Link to="" className={classes.link}>
                          {" "}
                          Middle DevOps Engineer (AWS, SQL, System Admin){" "}
                        </Link>
                        <div className={classes.main16}>
                          <div className={classes.main17}>
                            <MonetizationOnOutlinedIcon />
                            <span className={classes.span1}>1.500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.main13}>
                    <div className={classes.main14}>
                      <div className={classes.logojob}>
                        <img src={logo} alt="" className={classes.logojob} />
                      </div>
                      <div className={classes.main15}>
                        <Link to="" className={classes.link}>
                          {" "}
                          Middle DevOps Engineer (AWS, SQL, System Admin){" "}
                        </Link>
                        <div className={classes.main16}>
                          <div className={classes.main17}>
                            <MonetizationOnOutlinedIcon />
                            <span className={classes.span1}>1.500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className={classes.main18}>
                <button className={classes.button}>
                  <Link to={`jobs/detail/${job?.id}`} className={classes.link1}>
                    Back to Home
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
