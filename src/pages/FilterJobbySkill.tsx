import React, { useEffect, useState } from "react";
import classes from "./FilterJobbySkill.module.css";
import FormSearch from "../components/FormSearch";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useNavigate } from "react-router-dom";
import { TodoListSelector } from "../redux/selectorLogic/logicseacrh";
import { useAppSelector } from "../redux/hooks/hooks";
import { companyData } from "../assets/data/CompanyData";
import CardJobSearch from "../components/CardJobSearch";

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

export default function FilterJobbySkill() {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

  const filteredJobs = useAppSelector(TodoListSelector);
  const [detailsCompany, setDetailsCompany] = useState<Company | undefined>();
  const [selectedJob, setSelectedJob] = useState<null | Job>(null);

  useEffect(() => {
    // Set the first job as the selectedJob by default
    if (filteredJobs.length > 0 && selectedJob === null) {
      const firstJob = filteredJobs[0];
      setJobDetails(firstJob);
      setSelectedJob(firstJob);
      const foundCompany = companyData.find(
        (item) => item.id === firstJob.companyId
      );
      setDetailsCompany(foundCompany);
    }
  }, [filteredJobs]);

  const handleApplyClick = () => {
    if (!auth) {
      navigate("/auth?mode=login", {
        state: { from: window.location.pathname },
      });
    } else {
       navigate('/job/Apply')
    }
  };

  const handleOnclickDetails = (job: Job) => {
    setJobDetails(job);
    setSelectedJob(selectedJob === job ? null : job);


    const foundCompany = companyData.find((item) => item.id === job.companyId);
    setDetailsCompany(foundCompany);
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.container}>
          <div className={classes.container1}>
            <FormSearch />
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.content1}>
            <div className={classes.content2}>
              <div className={classes.content3}>
                <div className={classes.title1}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "28px",
                      fontWeight: 700,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    165 java jobs in Vietnam{" "}
                  </Typography>
                  <div className={classes.filter}>
                    <div className={classes.btn}>
                      <Button
                        variant="outlined"
                        startIcon={<FilterAltOutlinedIcon />}
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          padding: "7px 20px",
                          minWidth: "140px",
                          borderRadius: "4px",
                          color: "#ed1b2f",
                          backgroundColor: "#fff",
                          borderColor: "#ed1b2f",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          lineHeight: 1.5,
                          border: "1px solid #ed1b2f",
                          gap: "8px",
                          "&:hover": {
                            backgroundColor: "#f60d00",
                            color: "white",
                            borderColor: "#f60d00",
                          },
                        }}
                      >
                        <span style={{ fontWeight: 5000 }}>Filter</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={classes.detail}>
                  <div className={classes.detailleft}>
                    {filteredJobs.map((job) => {
                      const companys = companyData.find(
                        (item) => item.id === job.companyId
                      );
                      return (
                        <CardJobSearch
                          selectedJob={selectedJob}
                          key={job.id}
                          data={job}
                          img={job.companyImage}
                          company={companys}
                          onclick={() => handleOnclickDetails(job)}
                        />
                      );
                    })}
                  </div>
                  <div className={classes.detailRight}>
                    <div className={classes.apply}>
                      <div className={classes.apply1}>
                        <div className={classes.apply2}>
                          <img
                            src={detailsCompany?.image}
                            alt="Job"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <div className={classes.apply3}>
                            <Typography
                              variant="h2"
                              sx={{
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "22px",
                                fontWeight: 700,
                                mt: 0,
                                mb: 0,
                              }}
                            >
                              {jobDetails?.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "16px",
                                fontWeight: 400,
                                mt: 0,
                                mb: 0,
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
                                $4000
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className={classes.button_icon}>
                          <Button
                            onClick={handleApplyClick}
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
                      <hr
                        style={{
                          height: "1px",
                          marginLeft: "24px",
                          marginRight: "24px",
                          marginTop: "0px",
                          marginBottom: "0px",
                          color: "#dedede",
                          backgroundColor: "currentcolor",
                          border: 0,
                          opacity: 1,
                        }}
                      />
                      <div className={classes.morecontent}>
                        <div className={classes.morecontent1}>
                          <div className={classes.morecontent2}>
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
                             {jobDetails?.postDate}
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
                              {jobDetails?.tags.map((item,index) =>(
                                     <button key={index} className={classes.button}>{item}</button>
                              ))}
                              {/* <button className={classes.button}>Java</button>
                              <button className={classes.button}>PHP</button>
                              <button className={classes.button}>GoLang</button> */}
                            </div>
                          </div>
                        </div>
                        <div className={classes.line}></div>

                        <Content
                          title="Top 3 reasons to join us"
                          arraylist={[
                            "Mức lương cạnh tranh, hấp dẫn",
                            "Môi trường làm việc chuyên nghiệp, thân thiện",
                            "Được làm việc với các hệ thống hiện đại, tiên tiến",
                            "Lập trình, phát triển các ứng dụng của Ngân hàng",
                          ]}
                        />
                        <div className={classes.line}></div>
                        <Content
                          title="Job description"
                          arraylist={[
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Lập trình, phát triển các ứng dụng của Ngân hàng",
                          ]}
                        />
                        <div className={classes.line}></div>
                        <Content
                          title="Your skills and experience"
                          arraylist={[
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Lập trình, phát triển các ứng dụng của Ngân hàng",
                          ]}
                        />
                        <div className={classes.line}></div>
                        <Content
                          title="Why you'll love working here"
                          arraylist={[
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Thiết kế cấu trúc ứng dụng",
                            "Lập trình, phát triển các ứng dụng của Ngân hàng",
                          ]}
                        />
                        <hr
                          style={{
                            height: "1px",
                            marginLeft: "24px",
                            marginRight: "24px",
                            marginTop: "0px",
                            marginBottom: "0px",
                            color: "#dedede",
                            backgroundColor: "currentcolor",
                            border: 0,
                            opacity: 1,
                          }}
                        />
                      </div>
                    </div>
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

interface ContentProps {
  title: string;
  arraylist: string[];
}

const Content = ({ title, arraylist }: ContentProps) => {
  return (
    <div className={classes.morecontent1}>
      <Typography
        variant="h2"
        sx={{
          color: "#121212",
          lineHeight: 1.5,
          fontSize: "22px",
          fontWeight: 700,
          mt: 0,
          mb: 0,
        }}
      >
        {title}
      </Typography>
      <ul
        style={{
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1.8,
          marginTop: ".5rem",
          marginBottom: ".5rem",
          paddingLeft: "18px",
        }}
      >
        {arraylist.map((value, index) => (
          <li
            key={index}
            style={{
              paddingTop: "4px",
              padding: "4px",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.8,
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
