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
import { Link, useNavigate, useParams } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";

// import CardJob from "../components/CardJob";

// import { compose } from "@reduxjs/toolkit";
import useScrollToTop from "../hook/useScrollToTop";

import Image1 from "./../assets/image/abbank-0621-min.webp";
import Image2 from "./../assets/image/rsz-2jun-0497copy.webp";
import { Image, message } from "antd";
import CardJobDetails from "../components/CardJobDetails";
// import { add, remove } from "../redux/slices/favoriteJob";
import { useAppDispatch } from "../redux/hooks/hooks";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { view } from "../redux/slices/viewJob";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../Services/JobsPost/GetJobPostById";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import WorkIcon from "@mui/icons-material/Work";
import { GetJobActivity } from "../Services/UserJobPostActivity/GetUserJobPostActivity";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import moment from "moment";
import { PostFavoriteJobs } from "../Services/FavoriteJobs/PostFavoriteJobs";
import { queryClient } from "../Services/mainService";
import { GetFavoriteJobs } from "../Services/FavoriteJobs/GetFavoriteJobs";
import { DeleteFavoriteJobs } from "../Services/FavoriteJobs/DeleteFavoriteJobs";
import { Comment } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { GetSeekerJobPost } from "../Services/JobsPost/GetSeekerJobPost";
import { AnimatePresence } from "framer-motion";
import FeedbackModal from "../components/FeedbackModal";
// import HourglassFullIcon from '@mui/icons-material/HourglassFull';
// import VerifiedIcon from '@mui/icons-material/Verified';
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0d6efd;
  margin-top: 20px;
  &:hover {
    color: #0e2eed;
  }
`;

interface JobType {
  id: number;
  name: string;
  description: string;
}

// interface JobLocation {
//   id: number;
//   district: string;
//   city: string;
//   postCode: string;
//   state: string;
//   country: string;
//   stressAddress: string;
// }

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
  jobType: JobType; // jobType là đối tượng JobType
  // jobLocation: JobLocation;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[]; // jobLocation là đối tượng JobLocation
  skillSets: string[]; // Array of skill sets, có thể là array rỗng
}
export default function JobDetails() {
  useScrollToTop();
  // const [favorite, setFavorite] = useState<boolean>(false);
  const containerLeftRef = useRef<HTMLDivElement | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const applyRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }
  // const location = useLocation();

  // const { company } = location.state || {};
  const auth = localStorage.getItem("Auth");
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const { JobId } = useParams();
  console.log("id", JobId);
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });
  const job = jobData?.JobPosts;

  const { mutate } = useMutation({
    mutationFn: PostFavoriteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavoriteJob"],
        refetchType: "active",
      });
      // setFavorite(true)
      setShowAlert(true);
      message.success(`Save ${job?.jobTitle} Successfully`);
    },
    onError: () => {
      message.error(`Failed to Follow ${job?.jobTitle} `);
    },
  });
  const { mutate: Unfollow } = useMutation({
    mutationFn: DeleteFavoriteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavoriteJob"],
        refetchType: "active",
      });
      // setFavorite(false)
      message.success(`Unfollow ${job?.jobTitle} Successfully`);
    },
    onError: () => {
      message.error(`Failed to UnFollow ${job?.jobTitle} `);
    },
  });

  const { data: FavoriteJob } = useQuery({
    queryKey: ["FavoriteJob"],
    queryFn: ({ signal }) => GetFavoriteJobs({ signal }),
    staleTime: 5000,
  });
  const FavoriteJobs = FavoriteJob?.JobPost;
  console.log("hehe", FavoriteJobs);

  const haveFavorite = FavoriteJobs?.find(
    (item) => item.id === Number(job?.id)
  );

  // useEffect(() => {
  //   if (haveFavorite) {
  //     setFavorite(true);
  //   } else {
  //     setFavorite(false);
  //   }
  // }, [haveFavorite]);
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
  const {
    data: JobPostActivity,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPostActivity"],
    queryFn: ({ signal }) => GetJobActivity({ signal: signal }),
    staleTime: 5000,
  });

  const JobPostActivitydata = JobPostActivity?.UserJobActivitys;
  const Companiesdata = Company?.Companies;

  const JobPostsdata = JobPosts?.JobPosts;
  // const job: Job | null = location.state ?? null;

  // const job: Job | null = location.state ?? null;
  // const company: Company | null = location.state ?? null;

  // const hasAppliedJobActivity = job?.some((job) =>
  //   JobPostActivitydata?.some((activity) => job.id === activity.jobPostId)
  // );

  const hasAppliedJobActivity = JobPostActivitydata?.find(
    (activity) => activity.jobPostId === job?.id
  );

  console.log("true", hasAppliedJobActivity);

  if (job) {
    // const state = { bv: companyData };

    localStorage.setItem("redirectStateJob", JSON.stringify(job));
  }

  useEffect(() => {
    if (job) {
      dispatch(view(job));
    }
  }, [dispatch, job]);

  // useEffect(() => {
  //   if (favorite && job) {
  //     dispatch(add(job));
  //     setShowAlert(true);
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   } else if (!favorite && job) {
  //     dispatch(remove(job.id));
  //   }
  // }, [favorite, job, dispatch]);

  const handleNavigateApply = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    } else {
      navigate(`/job/Apply/${job?.id}`);
    }
  };

  const handleSaveJob = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    } else {
      mutate({
        data: {
          jobPostId: Number(job?.id),
        },
      });
    }
  };
  const { data: SeekerApply } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const dataSeeker = SeekerApply?.GetSeekers;

  const feedBackUserJob = dataSeeker?.find(
    (item) => item.id === Number(userId)
  );

  const handleUnFollow = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    }
    Unfollow({ id: Number(haveFavorite?.id) });
  };

  // const postingDate = job?.postingDate ? new Date(job?.postingDate) : null;
  const expiryDate = job?.expiryDate ? new Date(job?.expiryDate) : null;
  const today = new Date();

  const isExpired = expiryDate ? expiryDate < today : undefined;

  const detailsCompany = Companiesdata?.find(
    (item) => item.id === job?.companyId
  );
  const handleNavigateJob = (job: JobPost) => {
    navigate(`/jobs/detail/${job.id}`, {
      state: job,
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
      <AnimatePresence>
        {isCreatingNewChallenge && (
          <FeedbackModal
            onDone={handleDone}
            data={feedBackUserJob?.jobPostActivityComments}
          />
        )}
      </AnimatePresence>
      <div className={classes.alert}></div>
      <div className={classes.container}></div>
      {showAlert && (
        <Stack
          sx={{
            left: "inherit",
            right: 0,
            top: "120px",
            bottom: "inherit",
            marginRight: "48px",
            width: "400px",
            opacity: showAlert ? 1 : 0,
            zIndex: 11,
            backgroundColor: "#eaf9e9",
            padding: "16px 16px 16px 24px",
            border: "none",
            borderRadius: "8px",
            maxWidth: "400px",
            position: "fixed",
            boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
            display: showAlert ? "block" : "none",
            fontSize: "0.875rem",
            pointerEvents: "auto",
            transition: "opacity 0.15s linear",
            boxSizing: "border-box",
          }}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <div style={{ display: "block" }}>
              <div
                style={{
                  color: "#121212",
                  marginRight: "18px",
                  display: "block",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
                >
                  This job has been added to your <strong> Saved jobs</strong>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  color: "#0e2eed",
                  marginTop: "12px",
                }}
              >
                <Link
                  style={{ color: "#0e2eed", textDecoration: "none" }}
                  to={"/my-jobs"}
                >
                  View list
                </Link>
              </div>
            </div>
          </Alert>
        </Stack>
      )}
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
                  {job?.jobTitle}
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
                  {detailsCompany?.companyName}
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
                {hasAppliedJobActivity ? (
                  <div
                    className={
                      hasAppliedJobActivity?.status === "Pending"
                        ? classes.Pending
                        : hasAppliedJobActivity?.status === "Rejected"
                        ? classes.Rejected
                        : classes.main4
                    }
                  >
                    <span className={classes.span}>
                      {hasAppliedJobActivity?.status === "Pending" ? (
                        <HourglassEmptyIcon />
                      ) : hasAppliedJobActivity?.status === "Rejected" ? (
                        <CancelIcon />
                      ) : (
                        <CheckCircleOutlineOutlinedIcon />
                      )}
                      <span className={classes.span1}>
                        {hasAppliedJobActivity.status}{" "}
                      </span>
                    </span>
                    <div className={classes.main5}>
                      <span className={classes.span1}>
                        Applied Date:{" "}
                        {moment(hasAppliedJobActivity.applicationDate).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </span>
                      {/* <span className={classes.span1}>
                        <IconButton onClick={handleStartAddNewChallenge}>
                          <Comment />
                        </IconButton>
                      </span> */}
                      {feedBackUserJob?.status === "Rejected" ||
                      feedBackUserJob?.status === "Passed" ||
                      feedBackUserJob?.status === "InterviewStage" ||
                      feedBackUserJob?.status === "CVScreeningPassed" ? (
                        <span className={classes.span1}>
                          <IconButton
                            onClick={() =>
                              window.open(feedBackUserJob?.cvPath, "_blank")
                            }
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton onClick={handleStartAddNewChallenge}>
                            <Comment />
                          </IconButton>
                        </span>
                      ) : undefined}
                    </div>
                  </div>
                ) : isExpired ? (
                  <div className={classes.button_icon}>
                    <Button
                      // onClick={handleNavigateApply}
                      disabled={true}
                      sx={{
                        mt: 3,
                        width: "90%",
                        backgroundColor: "#b0b0b0",
                        borderColor: "#b0b0b0",
                        color: "#fff",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "11px 24px",

                        "&:hover": {
                          // backgroundColor: "#C82222",
                          backgroundColor: "#b0b0b0",

                          color: "white",
                        },
                      }}
                    >
                      application deadline
                    </Button>
                  </div>
                ) : (
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
                    {haveFavorite ? (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={handleUnFollow}
                      >
                        <FavoriteIcon
                          fontSize="large"
                          sx={{
                            color: "#ed1b2f !important",
                            marginTop: "20px",
                            mr: 2,
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={handleSaveJob}
                      >
                        <FavoriteBorderOutlinedIcon
                          fontSize="large"
                          sx={{
                            color: "#ed1b2f !important",

                            marginTop: "20px",
                            mr: 2,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={classes.detail}>
              <section className={classes.section}>
                <div className={classes.section1}>
                  <div className={classes.section2}>
                    <div className={classes.section3}>
                      <Image
                        src={Image1}
                        preview={true}
                        style={{ cursor: "pointer", color: "#414042" }}
                      />
                    </div>
                    <div className={classes.section3}>
                      <Image
                        src={Image2}
                        preview={true}
                        style={{ cursor: "pointer", color: "#414042" }}
                      />
                    </div>
                    <div className={classes.section3}>
                      <Image
                        src={Image2}
                        preview={true}
                        style={{ cursor: "pointer", color: "#414042" }}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <div className={classes.detail1}>
                <div className={classes.detail2}>
                  {job.jobLocationAddressDetail.length > 0 ? (
                    job.jobLocationAddressDetail.map((item, index) => (
                      <div key={index} className={classes.location}>
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
                            color: "#414042",
                            fontSize: "16px",
                          }}
                        >
                          {item}
                        </Typography>
                      </div>
                    ))
                  ) : (
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
                          color: "#414042",
                          fontSize: "16px",
                        }}
                      >
                        {detailsCompany?.address} {" in "}{" "}
                        {detailsCompany?.city}
                      </Typography>
                    </div>
                  )}

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
                      From: {job?.postingDate.slice(0, 10)} - To:{" "}
                      {job?.expiryDate.slice(0, 10)}
                    </Typography>
                  </div>
                  <div className={classes.location}>
                    <WorkIcon
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
                      {job?.experienceRequired} years
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
                    {job?.skillSets?.map((item: string) => (
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job?.jobDescription,
                    }}
                  />
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job?.qualificationRequired,
                      }}
                    />
                  </li>
                  {/* <li
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
                  </li> */}
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
                  Benefits for joining us
                </h2>
                <ul style={{ paddingLeft: "18px", marginBottom: "1rem" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: 1.8,
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job?.benefits,
                      }}
                    />
                  </Typography>
                  {/* <li
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
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className={classes.containerRight}>
            <div className={classes.company}>
              <div className={classes.company1}>
                <img
                  style={{ width: "200px" }}
                  src={detailsCompany?.imageUrl}
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
                    {detailsCompany.companyName}
                  </Typography>
                  <StyledLink
                    to={`/company/detail/${detailsCompany.id}`}
                    // state={detailsCompany}
                  >
                    View Company
                  </StyledLink>
                </div>
              </div>
              <div style={{ marginTop: "20px", display: "block" }}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", color: "#414042" }}
                >
                  {" "}
                  {detailsCompany?.companyDescription && (
                    <div
                      className={classes.main7}
                      dangerouslySetInnerHTML={{
                        __html: detailsCompany.companyDescription,
                      }}
                    />
                  )}
                  {/* {detailsCompany?.companyDescription} */}
                </Typography>
              </div>
              <div className={classes.main}>
                <div className={classes.main1}>
                  <div className={classes.main2}>Company EstablishedYear</div>
                  <div className={classes.main3}>
                    {detailsCompany?.establishedYear}
                  </div>
                </div>
              </div>
              <div className={classes.main}>
                <div className={classes.main1}>
                  <div className={classes.main2}>Company WebSite</div>
                  <div className={classes.main3}>
                    {detailsCompany?.websiteURL}
                  </div>
                </div>
              </div>
              <div className={classes.main}>
                <div className={classes.main1}>
                  <div className={classes.main2}>Company Country</div>
                  <div className={classes.main3}>{detailsCompany?.country}</div>
                </div>
              </div>
              <div className={classes.main}>
                <div className={classes.main1}>
                  <div className={classes.main2}>Company Size</div>
                  <div className={classes.main3}>
                    {detailsCompany?.numberOfEmployees} employees
                  </div>
                </div>
              </div>
              <div className={classes.main}>
                <div className={classes.main1}>
                  <div className={classes.main2}>Company job Opening</div>
                  <div className={classes.main3}>
                    {detailsCompany?.jobPosts.length} Jobs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.containercpn}>
        <div className={classes.containercpn1}>
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
            {JobPostsdata?.map((job) => {
              const companys = Companiesdata?.find(
                (item) => item.id === job.companyId
              );
              return (
                <CardJobDetails
                  key={job.id}
                  data={job}
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
  );
}
