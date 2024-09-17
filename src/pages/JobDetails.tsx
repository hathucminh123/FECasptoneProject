import React, { useEffect, useRef, useState } from "react";
import classes from "./JobDetails.module.css";
// import { Button, Typography } from "@mui/material";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import Image from "./../assets/image/minh.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardJob from "../components/CardJob";
import { companyData, jobData } from "../assets/data/CompanyData";
// import { compose } from "@reduxjs/toolkit";
import useScrollToTop from "../hook/useScrollToTop";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string; 
}


// interface Company {
//   id: number;
//   name: string;
//   overview: {
//     title: string;
//     description: string;
//   };
//   jobs: Job[];
//   location: string;
//   jobOpeningsCount: number;
//   image: string;
// }
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0d6efd;
  margin-top: 20px;
  &:hover {
    color: #0e2eed;
  }
`;

// interface Job {
//   id: number;
//   title: string;
//   location: string;
//   salary: string;
//   tags: string[];
//   postDate: string;
//   hotTag: boolean;

// }

// interface Company {
//   id: number;
//   name: string;
//   overview: {
//     title: string;
//     description: string;
//   };
//   jobs: Job[];
//   location: string;
//   jobOpeningsCount: number;
//   image: string; // New field for the company image
// }

export default function JobDetails() {
  useScrollToTop(); 
  const [favorite, setFavorite] = useState<boolean>(false);
  const containerLeftRef = useRef<HTMLDivElement | null>(null);
  const applyRef = useRef<HTMLDivElement | null>(null);
const navigate =useNavigate()
  const location = useLocation();
  const { company } = location.state || {};
  const auth=localStorage.getItem('auth')
  

  const job: Job | null = location.state ?? null;

  // const job: Job | null = location.state ?? null;
  // const company: Company | null = location.state ?? null;

  if (job) {
    // const state = { bv: companyData };

    localStorage.setItem('redirectStateJob', JSON.stringify(job));
  }
  const [detailsCompany, setDetailsCompany] = useState(company);

  const handleNavigateApply =()=>{
    if (!auth) {
      navigate("/auth?mode=login", {
        state: { from: window.location.pathname },
      });
    } else {
       navigate('/job/Apply')
    }
  }
  useEffect(() => {
    if (!company && job) {
      const foundCompany = companyData.find((item) => item.id === job.companyId);
      setDetailsCompany(foundCompany);
    }
  }, [company, job]);
  // const foundCompany = companyData.find((item) => item.id === job.companyId);
  // console.log('quao',foundCompany)
  useEffect(() => {
    console.log("jobkl", job);
    console.log("company", detailsCompany);
  }, [job, detailsCompany]);

  console.log('quao ',detailsCompany)
  const handleNavigateJob = (job: Job) => {
    navigate(`/jobs/detail/${job.id}`, {
      state: { job },
    });
  };
  // // Hàm để theo dõi khi người dùng cuộn
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (containerLeftRef.current && applyRef.current) {
  //       // Lấy vị trí cuối cùng của containerLeft
  //       const containerLeftBottom =
  //         containerLeftRef.current.offsetTop +
  //         containerLeftRef.current.offsetHeight;

  //       // Lấy vị trí hiện tại của trang
  //       const scrollPosition = window.scrollY + window.innerHeight;

  //       // Nếu vị trí cuộn chạm đáy containerLeft
  //       if (scrollPosition >= containerLeftBottom) {
  //         // Đặt lại vị trí mặc định cho apply hoặc dừng cuộn
  //         applyRef.current.style.position = "static"; // hoặc 'relative' nếu bạn cần
  //       } else {
  //         // Vẫn giữ apply ở chế độ sticky khi chưa cuộn đến hết
  //         applyRef.current.style.position = "sticky";
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup function để loại bỏ event listener khi component bị unmounted
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);


  if (!job) {
    return <div>No job details available</div>;
  }

  if (!detailsCompany) {
    return <div>Loading company details...</div>;
  }
  return (
    <div className={classes.main}>
      <div className={classes.container}></div>
      <div className={classes.container1}>
        <div className={classes.container2}>
          <div className={classes.containerLeft} ref={containerLeftRef}>
            <div className={classes.apply} ref={applyRef}>
              <div className={classes.content}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    paddingTop: "20px !important",
                    textAlign: "start",
                    fontWeight: "bold",
                    mb: 3,
                    color: "#333",
                  }}
                >
                  {job?.title}
                </Typography>

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontSize: "20px",
                    textAlign: "start",
                    color: "#414042 !important",

                    mb: 3,
                  }}
                >
                  {detailsCompany?.name}
                </Typography>

                <div className={classes.money}>
                  <MonetizationOnOutlinedIcon
                    sx={{ color: "#0ab305 !important" }}
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      alignItems: "start",
                      fontWeight: "bold",
                      mt: "7px",
                      color: "#0ab305 !important",
                    }}
                  >
                    {job?.salary}
                  </Typography>
                </div>
                <div className={classes.button_icon}>
                  <Button
                  onClick={handleNavigateApply}
                    sx={{
                      mt: 3,
                      width: "90%",
                      backgroundColor: "#ed1b2f",
                      borderColor: "#ed1b2f",
                      color: "#fff",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "11px 24px",

                      "&:hover": {
                        backgroundColor: "#C82222",

                        color: "white",
                      },
                    }}
                  >
                    Apply now
                  </Button>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setFavorite((prev) => !prev)}
                  >
                    {favorite ? (
                      <FavoriteIcon
                        fontSize="large"
                        sx={{
                          color: "#ed1b2f !important",
                          marginTop: "20px",
                          mr: 2,
                        }}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        fontSize="large"
                        sx={{
                          color: "#ed1b2f !important",

                          marginTop: "20px",
                          mr: 2,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.detail}>
              <div className={classes.detail1}>
                <div className={classes.detail2}>
                  <div className={classes.location}>
                    <LocationOnOutlinedIcon
                      fontSize="large"
                      sx={{
                        width: "16px",
                        height: "16px",
                        color: "#a6a6a6",
                        mt: "10px",
                      }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        alignItems: "start",
                        fontWeight: 500,
                        mt: "7px",
                        color: " #414042 ",
                        fontSize: "16px",
                      }}
                    >
                      {detailsCompany?.location}
                    </Typography>
                  </div>
                  <div className={classes.time}>
                    <AccessTimeOutlinedIcon
                      fontSize="large"
                      sx={{
                        width: "16px",
                        height: "16px",
                        color: "#a6a6a6",
                        mt: "10px",
                      }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        alignItems: "start",
                        fontWeight: 500,
                        mt: "7px",
                        color: " #414042 ",
                        fontSize: "16px",
                      }}
                    >
                      {job?.postDate}
                    </Typography>
                  </div>
                  <div className={classes.skill}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        alignItems: "start",
                        fontWeight: 500,
                        mt: "7px",
                        color: " #414042 ",
                        fontSize: "16px",
                      }}
                    >
                      Skill :
                    </Typography>
                    {job?.tags?.map((item: string) => (
                      <button key={item} className={classes.button}>
                        {item}
                      </button>
                    ))}

                    {/* <button className={classes.button}>PHP</button>
                    <button className={classes.button}>GoLang</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.description}>
              <div className={classes.des1}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                  }}
                >
                  Top 3 reasons to join us
                </h2>
                <ul style={{ paddingLeft: "18px", marginBottom: "1rem" }}>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Global Company- Develop Your Career & English
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Competitive Salary, and company profit share
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                </ul>
              </div>

              <div style={{ borderBottom: "1px dashed #dedede" }}></div>
              <div className={classes.des2}>
                {" "}
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                  }}
                >
                  Job description
                </h2>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  About The Role Exciting opportunity for an enthusiastic Java
                  Software Developer with at least 5 years of experience to join
                  our CIS-P Team in Ho Chi Minh City. Take a key role in driving
                  success as you collaborate with our team to provide enterprise
                  CRM solutions to the utilities sector with key customers in
                  Australia, Ireland, the USA, and Japan. About You You are an
                  enthusiastic individual with proven experience and strong Java
                  knowledge of J2EE, design patterns, core libraries, and
                  frameworks such as Spring, Hibernate, and Java messaging
                  frameworks. You possess a curious nature and thrive in diverse
                  technical environments, where your skills in SQL, exposure to
                  DevOps, and experience working in Linux environments are
                  highly valued. You have a good command of English and
                  Vietnamese communication with an eagerness to work with
                  complicated business requirements and implementation to
                  technical specifications. Key Responsibilities Design, code,
                  and test software as part of the Agile team Update status and
                  technical documents in Jira Troubleshoot and escalate issues
                  Participate in an R&D program where we are using Docker,
                  Kafka, Kubernetes Benefits and Perks Join us for a rewarding
                  career with competitive compensation, leave entitlements,
                  health coverage, and financial security. Enjoy work-life
                  balance, growth, and recognition for your exceptional
                  performance. Our team will unveil the intricacies of our
                  benefits package during the selection process. Company
                  Overview Hansen Technologies (ASX: HSN) is a global software
                  and services provider, serving energy, water/utilities, and
                  telecommunications industries. With customers in 80+
                  countries, we foster collaboration across 36 international
                  offices. From 5G advancements to renewable energy transitions,
                  we empower customers to overcome challenges, innovate, and
                  drive new business models.
                </Typography>
              </div>
              <div style={{ borderBottom: "1px dashed #dedede" }}></div>
              <div className={classes.des3}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                  }}
                >
                  Your skills and experience
                </h2>
                <ul style={{ paddingLeft: "18px", marginBottom: "1rem" }}>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Global Company- Develop Your Career & English
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Competitive Salary, and company profit share
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                </ul>
              </div>
              <div style={{ borderBottom: "1px dashed #dedede" }}></div>
              <div className={classes.des3}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                  }}
                >
                  Your skills and experience
                </h2>
                <ul style={{ paddingLeft: "18px", marginBottom: "1rem" }}>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Global Company- Develop Your Career & English
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Competitive Salary, and company profit share
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                  <li
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "1.8 !important",
                      color: "#121212",
                    }}
                  >
                    Onsite opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={classes.containerRight}>
            <div className={classes.company}>
              <div className={classes.company1}>
                <img
                  style={{ width: "200px" }}
                  src={detailsCompany.image}
                  alt="company image"
                />
                <div style={{ display: "block", paddingLeft: "12px " }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#121212",
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.5,
                      textAlign: "left",
                    }}
                  >
                  {detailsCompany.name}
                  </Typography>
                  <StyledLink to={`/company/detail/${detailsCompany.id}`} state={detailsCompany}>View Company</StyledLink>
                </div>
              </div>
              <div style={{ marginTop: "20px", display: "block" }}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", color: "#414042" }}
                >
                  {" "}
                  Vietnam's top quality company
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.containercpn}>
        <div className={classes.containercpn1}>
          <div className={classes.containerLeftcpn}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                paddingTop: "20px !important",
                textAlign: "start",
                fontWeight: "bold",
                mb: 3,
                color: "#333",
              }}
            >
              More jobs for you
            </Typography>
            <div className={classes.cardJob}>

            {jobData.map((job) => {
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
              {/* <CardJob />
              <CardJob />
              <CardJob />
              <CardJob />
              <CardJob />
              <CardJob /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
