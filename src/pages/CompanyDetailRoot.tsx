import React, { useEffect, useState, useCallback } from "react";
import classes from "./CompanyDetailRoot.module.css";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import _ from "lodash";
import CardJob from "../components/CardJob";
import { renderButton } from "../components/RenderButton";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "../hook/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import Image from './../assets/image/download.png'

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
}


export default function CompanyDetailRoot() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { CompanyId } = useParams();
  console.log("id", CompanyId);

  // Lấy chi tiết công ty bằng React Query
  const { data: CompanyDa, isLoading, error } = useQuery({
    queryKey: ["Company-details", CompanyId], // Sửa lại tên key cho chính xác
    queryFn: ({ signal }) => fetchCompaniesById({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;

  useScrollToTop();

  // Chỉ lưu dữ liệu vào localStorage khi có companyDataa
  useEffect(() => {
    if (companyDataa) {
      localStorage.setItem("redirectState", JSON.stringify(companyDataa));
    }
  }, [companyDataa]);

  const handleNavigate = () => {
    navigate("/company/Comment");
    console.log("Navigating to /company/Comment");
  };

  // Hàm điều hướng tới chi tiết công việc
  const handleNavigateJob = (job: JobPost) => {
    navigate(`/jobs/detail/${job.id}`, {
      state: job,
    });
  };

  // Xử lý cuộn để thay đổi trạng thái
  const TRIGGER_HEIGHT = 200;
  const handleScroll = useCallback(
    _.debounce(() => {
      const scrollPosition = window.scrollY;
      if (
        (scrollPosition >= TRIGGER_HEIGHT && !isScrolled) ||
        (scrollPosition < TRIGGER_HEIGHT && isScrolled)
      ) {
        setIsScrolled(scrollPosition >= TRIGGER_HEIGHT);
      }
    }, 100),
    [isScrolled]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  // Lấy danh sách công việc từ API
  const { data: JobPosts } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  // Lọc các công việc thuộc về công ty hiện tại
  const jobincompanyData = JobPostsdata?.filter(
    (item) => item.companyId === companyDataa?.id
  );

  const { data: Company } = useQuery({
    queryKey: ["Companies"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading company data</div>;

  if (!companyDataa) {
    return (
      <div>
        <h2>Company data is not available.</h2>
        <p>Please try again later.</p>
        <button onClick={() => navigate("/company")}>Go back</button>
      </div>
    );
  }

  return (
    <div className={classes.main_container}>
      <div className={isScrolled ? classes.sticky_container : classes.container}>
        <div className={classes.container1}>
          {isScrolled ? (
            <div className={classes.container2}>
              <div className={classes.containerscroll1}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    textAlign: "start",
                    fontWeight: "bold",
                    mt: 3,
                    color: "white",
                  }}
                >
                  {companyDataa.companyName}
                </Typography>
              </div>
              <div className={classes.containerscroll2}>
                {renderButton("Write review", "#ed1b2f", "contained", {}, handleNavigate)}
                {renderButton("Follow", "white", "outlined", { minWidth: "180px" })}
              </div>
            </div>
          ) : (
            <div className={classes.container3}>
              <div style={{ paddingRight: "14px" }}>
                <img
               src={
                companyDataa?.imageUrl === null || companyDataa?.imageUrl === "string"
                  ? Image
                  : companyDataa?.imageUrl
              }
                  style={{ width: "200px" }}
                  alt={`Logo of ${companyDataa.companyName}`}
                />
              </div>
              <div className={classes.container4}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    textAlign: "start",
                    fontWeight: "bold",
                    mt: 3,
                    color: "white",
                  }}
                >
                  {companyDataa.companyName}
                </Typography>
                <div className={classes.locationjob}>
                  <div className={classes.location}>
                    <LocationOnOutlinedIcon sx={{color:'#fff'}} />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", fontWeight: 400, color: "white" }}
                    >
                      {companyDataa.address}, {companyDataa.city}
                    </Typography>
                  </div>
                  <div className={classes.job}>
                    <WorkOutlineOutlinedIcon sx={{color:'#fff'}} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        textDecoration: "underline",
                        color: "white",
                      }}
                    >
                      {jobincompanyData?.length || 0} job openings
                    </Typography>
                  </div>
                </div>
                <div className={classes.button}>
                  {renderButton("Write review", "#ed1b2f", "contained", {}, handleNavigate)}
                  {renderButton("Follow", "white", "outlined", { minWidth: "180px" })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={classes.main}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <div className={classes.containerLeft}>
              <div className={classes.title}>
                <ul className={classes.title1}>
                  <li className={classes.menuItem}>
                    <NavLink
                      to={`/company/detail/${companyDataa.id}`}
                      state={companyDataa}
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                    >
                      Overview
                    </NavLink>
                  </li>
                  <li className={classes.menuItem}>
                    <NavLink
                      to="review"
                      state={companyDataa}
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>

              <Outlet />
            </div>
            <div className={classes.containerRight}>
              <div className={classes.scroll}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    borderBottom: "1px dashed #dedede",
                    paddingBottom: "16px",
                  }}
                >
                  {jobincompanyData?.length || 0} job openings
                </Typography>
                <div className={classes.content}>
                  <div style={{ width: "100%" }}>
                    {jobincompanyData?.map((job) => {
                      const companys = Companiesdata?.find(
                        (item) => item.id === job.companyId
                      );
                      return (
                        <CardJob
                          key={job.id}
                          data={job}
                          company={companys}
                          onclick={() => handleNavigateJob(job)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
