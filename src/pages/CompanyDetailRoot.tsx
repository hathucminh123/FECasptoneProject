import React, { useEffect, useState, useCallback } from "react";
import classes from "./CompanyDetailRoot.module.css";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import _ from "lodash";
import CardJob from "../components/CardJob";
import RenderButton from "../components/RenderButton";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "../hook/useScrollToTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import Image from "./../assets/image/download.png";
import { GetFollowCompany } from "../Services/FollowCompany/GetFollowCompany";
import { PostFollowCompany } from "../Services/FollowCompany/PostFollowCompany";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteFollowCompany } from "../Services/FollowCompany/DeleteFollowCompany";
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
  const Auth = localStorage.getItem("Auth");
  // Lấy chi tiết công ty bằng React Query
  const {
    data: CompanyDa,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Company-details", CompanyId], // Sửa lại tên key cho chính xác
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(CompanyId), signal }),
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
  // const skills = jobincompanyData?.map((skill) => skill.skillSets);
  // const flattenedArray = skills?.flat();
  // const uniqueArray = [...new Set(flattenedArray)];

  const city = jobincompanyData?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();
  console.log("aduphong1", city);
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
              <div style={{ paddingRight: "14px" }}>
                <img
                  src={
                    companyDataa?.imageUrl === null ||
                    companyDataa?.imageUrl === "string"
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
                    <LocationOnOutlinedIcon sx={{ color: "#fff" }} />
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
                              color: "white",
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
                              color: "white",
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
                            color: "white",
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
                    <WorkOutlineOutlinedIcon sx={{ color: "#fff" }} />
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
                  {/* <RenderButton
                    icon={<CheckIcon />}
                    text="Write review"
                    color="#ed1b2f"
                    variant="contained"
                    onClick={handleNavigate}
                  /> */}
                  {haveFollow ? (
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
                  )}
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
                  {/* <li className={classes.menuItem}>
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
                  </li> */}
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
