import React, { Dispatch, SetStateAction } from "react";
import Typography from "@mui/material/Typography";
import classes from "./CardJob.module.css";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useNavigate } from "react-router-dom";
import Image from "./../assets/image/download.png";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetFavoriteJobs } from "../Services/FavoriteJobs/GetFavoriteJobs";
import { DeleteFavoriteJobs } from "../Services/FavoriteJobs/DeleteFavoriteJobs";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import Button from "@mui/material/Button";

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

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
}

interface MyComponentProps {
  Maxwidth?: string;
  className?: string;
  formButton?: boolean;
  // img?: string;
  data?: JobPost;
  company?: Company;
  onclick?: () => void;
  setShowAlert?: Dispatch<SetStateAction<boolean>>;
  setShowAlertt?: Dispatch<SetStateAction<boolean>>;
  setUndoData?: Dispatch<SetStateAction<JobPost | null>>;
}

export default function CardJob({
  Maxwidth,
  className,
  formButton,
  data,
  company,
  onclick,
}: MyComponentProps) {
  const auth = localStorage.getItem("Auth");
  const { data: FavoriteJob } = useQuery({
    queryKey: ["FavoriteJob"],
    queryFn: ({ signal }) => GetFavoriteJobs({ signal }),
    staleTime: 5000,
  });

  const FavoriteJobs = FavoriteJob?.JobPost;
  const haveFavorite = FavoriteJobs?.find(
    (item) => item.id === Number(data?.id)
  );

  const { mutate: Unfollow } = useMutation({
    mutationFn: DeleteFavoriteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavoriteJob"],
        refetchType: "active",
      });
      message.success(`Unfollow ${data?.jobTitle} Successfully`);
    },
    onError: () => {
      message.error(`Failed to UnFollow ${data?.jobTitle}`);
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    Unfollow({ id: Number(haveFavorite?.id) });
  };
  console.log('haha',company)
  const navigate=useNavigate()
  const handleNavigateApply = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    } else {
      navigate(`/job/Apply/${data?.id}`);
    }
  };

  return (
    // <Link to={`jobs/detail/${data?.id}`} className={classes.link2}>
      <div
        className={classes.card_main}
        onClick={onclick}
        style={{ cursor: "pointer" }}
      >
        <div
          className={`${className ? className : classes.card_item}`}
          style={Maxwidth ? { maxWidth: Maxwidth } : {}}
        >
          <div className={formButton ? classes.card_itemm1 : classes.card_itemm}>
            <div style={{ display: "block" }}>
              {/* Posting Date */}
              <div className={classes.time}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#a6a6a6 !important",
                  }}
                >
                  From: {data?.postingDate.slice(0, 10)} - To:{" "}
                  {data?.expiryDate.slice(0, 10)}
                </Typography>
              </div>

              {/* Job Title */}
              <Link to={`jobs/detail/${data?.id}`} className={classes.link}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    lineHeight: "1.5",
                    fontWeight: "bold",
                    color: "#121212",
                    marginTop: "12px !important",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {data?.jobTitle}
                </Typography>
              </Link>

              {/* Company Logo and Name */}
              <div className={classes.logo}>
                <img
                  className={classes.image}
                  src={
                    company?.imageUrl === null ||  company?.imageUrl === "string"
                      ? Image
                      :  company?.imageUrl
                  }
                  // src={company?.imageUrl}
                  alt="image-job"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#414042 !important",
                  }}
                >
                  {company?.companyName}
                </Typography>
              </div>

              {/* Salary */}
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
                  {data?.salary} USD
                </Typography>
              </div>

              <div className={classes.separator}></div>

              {/* Job Location */}
              <div className={classes.location}>
                <LocationOnOutlinedIcon />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    alignItems: "start",
                    fontWeight: 400,
                    mt: "7px",
                    color: "#414042 !important",
                    fontSize: "14px",
                    display: "flex",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    flexShrink: 1,
                  }}
                >
                  {data?.jobLocationCities?.length ? (
                    <span
                      style={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {data.jobLocationCities.join(", ")}
                    </span>
                  ) : (
                    <span>No Location yet</span>
                  )}
                </Typography>
              </div>

              {/* Job Type */}
              <div className={classes.location}>
                <BusinessCenterOutlinedIcon />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    alignItems: "start",
                    fontWeight: 400,
                    mt: "7px",
                    color: " #414042 !important",
                    fontSize: "14px",
                  }}
                >
                  {data?.jobType?.name}
                </Typography>
              </div>

              {/* Skills */}
              <div className={classes.job}>
                {data?.skillSets.map((tag, index) => (
                  <button key={index} className={classes.button}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button (Apply Now and Favorite) */}
            {formButton && (
              <div className={classes.formbutton}>
                <div className={classes.button_icon}>
                  <Button
                     onClick={handleNavigateApply}
                    sx={{
                      minWidth: "140px",
                      backgroundColor: "#ed1b2f",
                      borderColor: "#ed1b2f",
                      color: "#fff",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "7px 20px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      lineHeight: 1.5,
                      gap: "8px",
                      border: "1px solid transparent",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#C82222",
                        color: "white",
                      },
                    }}
                  >
                    Apply now
                  </Button>
                  {haveFavorite ? (
                    <div style={{ cursor: "pointer" }} onClick={handleFavoriteClick}>
                      <FavoriteIcon
                        fontSize="large"
                        sx={{
                          color: "#ed1b2f !important",
                          mr: 2,
                        }}
                      />
                    </div>
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      fontSize="large"
                      sx={{
                        color: "#ed1b2f !important",
                        mr: 2,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    // </Link>
  );
}
