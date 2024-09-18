import React, { useEffect, useState, useCallback } from "react";
import classes from "./CompanyDetailRoot.module.css";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import _ from "lodash";
import CardJob from "../components/CardJob";
import { renderButton } from "../components/RenderButton";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { jobData ,} from "../assets/data/CompanyData";
import { companyData } from "../assets/data/CompanyData";

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

  // Get company data from location.state or fallback to localStorage
  const companyDataa: Company | null =
    location.state ??
    JSON.parse(localStorage.getItem("redirectState") || "null");

  // Only save companyData to localStorage if it exists
  useEffect(() => {
    if (companyDataa) {
      localStorage.setItem("redirectState", JSON.stringify(companyDataa));
    }
  }, [companyDataa]);

  const handleNavigate = () => {
    navigate("/company/Comment");
    console.log("Navigating to /company/Comment");
  };

  // const handleNavigateJob = (job: Job, companyData: Company) => {
  //   // Navigate to job details and pass job and company data
  //   navigate(`/jobs/detail/${job.id}`, {
  //     state: { job, company: companyData },
  //   });
  // };

  const handleNavigateJob = (job: Job) => {
    // Navigate to job details and pass job and company data
    navigate(`/jobs/detail/${job.id}`, {
      state: job,
    });
  };
  const TRIGGER_HEIGHT = 200;
  const handleScroll = useCallback(
    _.debounce(() => {
      const scrollPosition = window.scrollY;
      console.log(scrollPosition)
      if ((scrollPosition >= TRIGGER_HEIGHT && !isScrolled) || (scrollPosition < TRIGGER_HEIGHT && isScrolled)) {
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

  const jobincompanyData = jobData.filter(
    (item) => item.companyId === companyDataa?.id
  );

  console.log("qua dinh", jobincompanyData);

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
      <div
        className={isScrolled ? classes.sticky_container : classes.container}
      >
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
                  {companyDataa.name}
                </Typography>
              </div>
              <div className={classes.containerscroll2}>
                {renderButton(
                  "Write review",
                  "#ed1b2f",
                  "contained",
                  {},
                  handleNavigate
                )}
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
                  src={companyDataa.image}
                  alt={`Logo of ${companyDataa.name}`}
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
                  {companyDataa.name}
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
                      {companyDataa.location}
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
                      {companyDataa.jobOpeningsCount} job openings
                    </Typography>
                  </div>
                </div>
                <div className={classes.button}>
                  {renderButton(
                    "Write review",
                    "#ed1b2f",
                    "contained",
                    {},
                    handleNavigate
                  )}
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
                  {companyDataa.jobOpeningsCount} job openings
                </Typography>
                <div className={classes.content}>
                  <div style={{ width: "100%" }}>
                    {jobincompanyData.map((job) => {
                      const companys = companyData.find(
                        (item) => item.id === job.companyId
                      );
                      return (
                        <CardJob
                          key={job.id}
                          data={job}
                          img={job.companyImage}
                          company={companys}
                          onclick={() => handleNavigateJob(job)} // Correct the event handler name
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
