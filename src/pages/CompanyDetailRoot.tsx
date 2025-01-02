import React, { useEffect, useState, useCallback } from "react";
import classes from "./CompanyDetailRoot.module.css";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import _ from "lodash";
import CardJob from "../components/CardJob";
// import RenderButton from "../components/RenderButton";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "../hook/useScrollToTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
// import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import Image from "./../assets/image/download.png";
import { GetFollowCompany } from "../Services/FollowCompany/GetFollowCompany";
import { PostFollowCompany } from "../Services/FollowCompany/PostFollowCompany";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteFollowCompany } from "../Services/FollowCompany/DeleteFollowCompany";
// import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import Followsucess from "../components/Followsucess";
import { AnimatePresence } from "framer-motion";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
// import { GetReviewApprovedCompany } from "../Services/ReviewCompany/GetReviewApprovedCompany";
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

const CompanyDetailRoot: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { CompanyId } = useParams();
  console.log("id", CompanyId);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const Auth = localStorage.getItem("Auth");
  // Lấy chi tiết công ty bằng React Query
  const {
    data: CompanyDa,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Company-details", CompanyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;
  //   const { data: ReviewApproved } = useQuery({
  //     queryKey: ["Company-details", CompanyId],
  //     queryFn: ({ signal }) =>
  //       GetReviewApprovedCompany({ id: Number(CompanyId), signal }),
  //     enabled: !!CompanyId,
  //   });

  // const ApprovedReview =ReviewApproved?.reviewDetails

  // console.log("okchua",ApprovedReview)

  useScrollToTop();

  // Chỉ lưu dữ liệu vào localStorage khi có companyDataa
  useEffect(() => {
    if (companyDataa) {
      localStorage.setItem("redirectState", JSON.stringify(companyDataa));
    }
  }, [companyDataa]);

  // const handleNavigate = () => {
  //   navigate("/company/Comment");
  //   console.log("Navigating to /company/Comment");
  // };

  // Hàm điều hướng tới chi tiết công việc
  const handleNavigateJob = (job: JobPost) => {
    navigate(`/jobs/detail/${job.id}`, {
      state: job,
    });
  };

  const [hovered, setHovered] = useState<null | string>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHovered(event.currentTarget.textContent || null);
  };

  const handleMouseLeave = () => {
    setHovered(null);
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
  console.log("JobPostsdata", JobPostsdata);

  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setJobSearch(data.result.items);
        // setTotalJobs(data.result.totalCount);
      } else {
        setJobSearch([]);
        // setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch job data");
    },
  });

  // // Fetch jobs whenever currentPage changes
  useEffect(() => {
    mutateAsync({
      data: {
        // pageIndex: currentPage,
        pageSize: 1000,
      },
    });
  }, [mutateAsync]);

  // Lọc các công việc thuộc về công ty hiện tại
  const jobincompanyData = jobSearch?.filter(
    (item) => item.companyId === companyDataa?.id
  );

  // const skills = jobincompanyData?.map((skill) => skill.skillSets);
  // const flattenedArray = skills?.flat();
  // const uniqueArray = [...new Set(flattenedArray)];

  const city = jobincompanyData?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();

  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;

  const { data: Company } = useQuery({
    queryKey: ["Companies"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;

  const { mutate } = useMutation({
    mutationFn: PostFollowCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FollowCompany"],
        refetchType: "active",
      });
      message.success(`Follow ${companyDataa?.companyName} Successfully`);
      setOpenModal(true);
    },
    onError: () => {
      message.error(`Failed to Follow ${companyDataa?.companyName} `);
    },
  });
  const { mutate: Unfollow } = useMutation({
    mutationFn: DeleteFollowCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FollowCompany"],
        refetchType: "active",
      });
      message.success(`Unfollow ${companyDataa?.companyName} Successfully`);
    },
    onError: () => {
      message.error(`Failed to UnFollow ${companyDataa?.companyName} `);
    },
  });
  const handleCloseModal = () => {
    setOpenModal(false);
    // setPendingUpdate(null);
  };

  const handleWriteReview = () => {
    // Kiểm tra xác thực
    if (!Auth || Auth.trim() === "") {
      // Điều hướng tới login với trạng thái từ trang hiện tại
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
      return;
    }
  
    // Nếu đã đăng nhập, điều hướng tới trang viết đánh giá
    navigate(`/company/detail/review/${CompanyId}`);
  };
  

  const handleFollow = () => {
    if (!Auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    }

    mutate({
      data: {
        companyId: Number(CompanyId),
      },
    });
  };

  const handleUnFollow = () => {
    if (!Auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    }
    Unfollow({ id: Number(haveFollow?.id) });
  };

  const { data: FollowCompany } = useQuery({
    queryKey: ["FollowCompany"],
    queryFn: ({ signal }) => GetFollowCompany({ signal }),
    staleTime: 5000,
  });
  const FollowCompanydata = FollowCompany?.Companies;

  const haveFollow = FollowCompanydata?.find(
    (item) => item.id === Number(CompanyId)
  );

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
      <AnimatePresence>
        {openModal && (
          <Followsucess
            onClose={handleCloseModal} // Đóng modal
            // onConfirm={handleConfirmModal}
            companyDataa={companyDataa}
          />
        )}
      </AnimatePresence>
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
                    color: "#091615",
                    fontFamily: "Lexend, sans-serif",
                  }}
                >
                  {companyDataa.companyName}
                </Typography>
              </div>
              <div className={classes.containerscroll2}>
                {/* {renderButton(
                  <></>,
                  "Write review",
                  "#ed1b2f",
                  "contained",
                  {},
                  handleNavigate
                )}
                {renderButton(<></>, "Follow", "white", "outlined", {
                  minWidth: "180px",
                })} */}
              </div>
            </div>
          ) : (
            <div className={classes.container3}>
              <div className={classes.main5}>
                <img
                  src={
                    companyDataa?.imageUrl === null ||
                    companyDataa?.imageUrl === "string"
                      ? Image
                      : companyDataa?.imageUrl
                  }
                  className={classes.img}
                  // style={{ width: "200px" }}
                  alt={`Logo of ${companyDataa.companyName}`}
                />
              </div>
              <div className={classes.container4}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    paddingTop: "0 !important",
                    paddingBottom: "8px !important",
                    marginTop: "0",
                    marginBottom: "0 ",
                    textAlign: "left !important",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    fontSize: "28px",
                    boxSizing: "border-box",

                    mt: 3,
                    color: "#091615",
                    fontFamily: "Lexend, sans-serif",
                  }}
                >
                  {companyDataa.companyName}
                </Typography>
                <div className={classes.locationjob}>
                  <div className={classes.location}>
                    <LocationOnOutlinedIcon sx={{ color: "#091615" }} />
                    {/* <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", fontWeight: 400, color: "white" }}
                    > */}
                    {cityColumn.length && cityColumn.length > 0 ? (
                      <>
                        {cityColumn?.slice(0, 3).map((city, index) => (
                          <Typography
                            variant="body2"
                            key={index}
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#091615",
                              fontFamily: "Lexend, sans-serif",
                            }}
                          >
                            {city}
                            {" - "}
                          </Typography>
                        ))}
                        {cityColumn?.length > 3 && (
                          <Typography
                            variant="body2"
                            // key={index}
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              fontFamily: "Lexend, sans-serif",
                              color: "#091615",
                            }}
                          >
                            OTHER{" "}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          // key={index}
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#091615",
                            fontFamily: "Lexend, sans-serif",
                          }}
                        >
                          {companyDataa.address}
                          {" in "}
                          {companyDataa.city}
                        </Typography>
                      </>
                    )}
                    {/* {jobincompanyData?.map((job) =>
                      job.jobLocationCities.map((item, index) => (
                        <Typography
                          variant="body2"
                          key={index}
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "white",
                          }}
                        >
                          {item}{" - "}
                        </Typography>
                      ))
                    )} */}
                    {/* </Typography> */}
                  </div>
                  <div className={classes.job}>
                    <WorkOutlineOutlinedIcon sx={{ color: "#091615" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        textDecoration: "underline",
                        color: "#091615",
                        fontFamily: "Lexend, sans-serif",
                      }}
                    >
                      {jobincompanyData?.length || 0} job openings
                    </Typography>
                  </div>
                </div>
                <div className={classes.button}>
                  {/* <RenderButton
                    icon={<CheckIcon />}
                    text="Write review"
                    color="#ed1b2f"
                    variant="contained"
                     textHover="Unfollow"
                    // onClick={handleNavigate}
                  /> */}
                  <button
                    type="button"
                    onClick={handleWriteReview}
                    className={classes.link}
                    style={{cursor:'pointer'}}
                  >
                    Write review
                  </button>
                  {haveFollow ? (
                    <button
                      type="button"
                      style={{ cursor: "pointer" }}
                      className={classes.unfollow}
                      onClick={handleUnFollow}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={classes.main3}>
                        <div className={classes.main4}>
                          <svg className={classes.svg}>
                            {hovered === "Following" ? (
                              <CloseIcon />
                            ) : (
                              <CheckIcon />
                            )}
                          </svg>
                          {hovered === "Following" ? "Unfollow" : "Following"}
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ cursor: "pointer" }}
                      className={classes.button2}
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  )}
                  {/* <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    className={classes.button2}
                  >
                    Follow
                  </button> */}

                  {/* {haveFollow ? (
                    <RenderButton
                      icon={<CheckIcon />}
                      iconHovered={<CloseIcon />}
                      text="Following"
                      textHover="Unfollow"
                      color="#fff"
                      variant="outlined"
                      onClick={handleUnFollow}
                    />
                  ) : (
                    <RenderButton
                      text="Follow"
                      color="#fff"
                      variant="outlined"
                      onClick={handleFollow}
                    />
                  )} */}
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
};
export default CompanyDetailRoot;
