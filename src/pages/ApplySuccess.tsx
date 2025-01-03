import React, { useEffect, useState } from "react";
import classes from "./ApplySuccess.module.css";
import Typography from "@mui/material/Typography";
import logo from "./../assets/image/logo.jpg";
import { Link, useParams } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../Services/JobsPost/GetJobPostById";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { message } from "antd";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
  minsalary?: number;
}

const ApplySuccess: React.FC = () => {
  const { JobId } = useParams();
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const [currentPage, setCurrentPage] = useState(1);
  // const [direction, setDirection] = useState(1);
  const itemsPerPage = 4;
  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);

  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount);
      } else {
        setJobSearch([]);
        setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch job data");
    },
  });

  useEffect(() => {
    mutateAsync({
      data: {
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      },
    });
  }, [currentPage, mutateAsync]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    // setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    // scrollToTop();
  };

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
  console.log("data", JobPostsdata);
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px", // Căn giữa theo chiều dọc
                    }}
                  >
                    {/* Phần chữ "it" */}
                    <Box
                      sx={{
                        backgroundColor: "#3cbc8c",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "22px",
                        fontFamily: "Lexend, sans-serif",
                        lineHeight: "1",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "3px",
                      }}
                    >
                      A
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 700,
                        fontSize: "22px",
                        fontFamily: "Lexend, sans-serif",
                        lineHeight: "1.5",
                      }}
                    >
                      mazingJob
                    </Typography>
                  </Box>
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
                  {jobSearch?.map((job) => (
                    <div key={job.id} className={classes.main13}>
                      <div className={classes.main14}>
                        <div className={classes.logojob}>
                          <img
                            src={job.imageURL}
                            alt=""
                            className={classes.logojob}
                          />
                        </div>
                        <div className={classes.main15}>
                          <Link
                            to={`/jobs/detail/${job.id}`}
                            className={classes.link}
                          >
                            {" "}
                            {job.jobTitle}
                          </Link>
                          <div className={classes.main16}>
                            <div className={classes.main17}>
                              <MonetizationOnOutlinedIcon />
                              <span className={classes.span1}>
                                {/* {`${job?.minsalary} - ${job?.salary} VNĐ`} */}
                                {job?.minsalary && job?.salary
                                  ? `${
                                      job.minsalary >= 1000000
                                        ? job.minsalary / 1000000
                                        : job.minsalary
                                    } ${
                                      job.minsalary >= 1000000 ? "triệu" : "VNĐ"
                                    } - ${
                                      job.salary >= 1000000
                                        ? job.salary / 1000000
                                        : job.salary
                                    } ${
                                      job.salary >= 1000000 ? "triệu" : "VNĐ"
                                    }`
                                  : "Salary not specified"}
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
                <div className={classes.pagination}>
                  <Pagination
                    count={Math.ceil(totalJobs / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  />
                </div>
              </div>
              <div className={classes.main18}>
                <button className={classes.button}>
                  <Link to={`/`} className={classes.link1}>
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
};

export default ApplySuccess;
