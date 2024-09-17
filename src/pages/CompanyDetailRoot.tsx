import React, { useEffect, useState, useCallback } from "react";
import classes from "./CompanyDetailRoot.module.css";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import _ from "lodash";
import CardJob from "../components/CardJob";
import { renderButton } from "../components/RenderButton";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
}

interface Company {
  id: number;
  name: string;
  overview: {
    title: string;
    description: string;
  };
  jobs: Job[];
  location: string;
  jobOpeningsCount: number;
  image: string;
}

export default function CompanyDetailRoot() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
 
  const companyData: Company | null = location.state ?? null;

  // Chỉ lưu state nếu companyData tồn tại
  if (companyData) {
    // const state = { bv: companyData };
    console.log( JSON.stringify(companyData))
    localStorage.setItem('redirectState', JSON.stringify(companyData));
  }



  const handleNavigate = () => {
    navigate('/company/Comment');
    console.log('Navigating to /company/Comment');
  };

  const handleNavigateJob = (job: Job, companyData: Company) => {
    // Điều hướng đến trang chi tiết công việc và truyền dữ liệu job và companyData
    navigate(`/jobs/detail/${job.id}`, {
      state: { job, company: companyData }
    });
  };

  const handleScroll = useCallback(
    _.debounce(() => {
      const scrollPosition = window.scrollY;
      const triggerHeight = 250;
      setIsScrolled(scrollPosition >= triggerHeight);
    }, 100), // Debounce với khoảng 100ms
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Hủy bỏ debounce khi unmount
    };
  }, [handleScroll]);

  if (!companyData) {
    return (
      <div>
        <h2>Company data is not available.</h2>
        <p>Please try again later.</p>
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
                  {companyData.name}
                </Typography>
              </div>
              <div className={classes.containerscroll2}>
                {renderButton("Write review", "#ed1b2f", "contained",{},handleNavigate)}
                {renderButton("Follow", "white", "outlined", {
                  minWidth: "180px",
                })}
              </div>
            </div>
          ) : (
            <div className={classes.container3}>
              <div style={{ paddingRight: "14px" }}>
                <img
                  style={{ width: "200px" }}
                  src={companyData.image}
                  alt={`Logo of ${companyData.name}`} 
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
                  {companyData.name}
                </Typography>
                <div className={classes.locationjob}>
                  <div className={classes.location}>
                    <LocationOnOutlinedIcon />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "white",
                      }}
                    >
                      {companyData.location}
                    </Typography>
                  </div>
                  <div className={classes.job}>
                    <WorkOutlineOutlinedIcon />
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
                      {companyData.jobOpeningsCount} job openings
                    </Typography>
                  </div>
                </div>
                <div className={classes.button}>
                  {renderButton("Write review", "#ed1b2f", "contained",{},handleNavigate)}
                  {renderButton("Follow", "white", "outlined", {
                    minWidth: "180px",
                  })}
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
                       to={`/company/detail/${companyData.id}`}
                       state={companyData}
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
                      state={companyData}
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

              <Outlet  />
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
                  {companyData.jobOpeningsCount} job openings
                </Typography>
                <div className={classes.content}>
                  <div style={{ width: "100%" }}>
                    {companyData.jobs.map((job, index) => (
                      <CardJob
                        key={index}
                        Maxwidth="400px"
                        data={job}
                        company={companyData}
                        onclick={() => handleNavigateJob(job, companyData)}
                      />
                    ))}
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
