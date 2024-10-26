import React from "react";
import classes from "./CardJobSearch.module.css";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import moment from "moment";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import CancelIcon from "@mui/icons-material/Cancel";

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
interface UserJobActivity {
  id: number;
  applicationDate: string;
  status: string;
  imageURL: string;
  jobTitle: string;
  userId: number;
  jobPostId: number;
}
interface MyComponentProps {
  Maxwidth?: string;
  className?: string;
  formButton?: boolean;
  data?: JobPost;
  img?: string;
  company?: Company;
  onclick?: () => void;
  selectedJob?: null | JobPost;
  applied?: UserJobActivity;
}

export default function CardJobSearch({
  data,
  onclick,
  // img,
  company,
  selectedJob,
  applied,
}: MyComponentProps) {
  console.log("cố lenasd", company);
  // const getJobLocation = (
  //   jobLocation: JobLocation | string | null | undefined
  // ): string => {
  //   if (typeof jobLocation === "string") {
  //     return jobLocation;
  //   } else if (jobLocation === null) {
  //     return "Location not specified";
  //   } else {
  //     return `${jobLocation?.district}, ${jobLocation?.city}, ${jobLocation?.state}, ${jobLocation?.country}`;
  //   }
  // };

  return (
    <div
      className={`  ${
        selectedJob?.id === data?.id ? classes.card_item1 : classes.card_item
      }`}
      onClick={onclick}
    >
      <div className={classes.main}>
        <div className={classes.tag}>Hot</div>
        <div className={classes.content}>
          <div className={classes.content1}>
            <span
              style={{ color: "#a6a6a6", fontSize: "14px", fontWeight: 400 }}
            >
              Post 11 min ago
            </span>
          </div>
          <Typography
            variant="h3"
            sx={{
              marginTop: "12px",
              lineHeight: 1.5,
              fontSize: "18px",
              fontWeight: 700,
              color: "#121212",
            }}
          >
            {data?.jobTitle}
          </Typography>
          <div className={classes.logo}>
            <img
              src={company?.imageUrl}
              alt="companylogo"
              style={{
                height: "48px",
                width: "48px",
                backgroundColor: "white",
                color: "#0d6efd",
              }}
            />
            <span
              style={{ marginLeft: "8px", fontSize: "14px", fontWeight: 400 }}
            >
              {" "}
              <Link
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#414042",
                }}
                to={"/"}
              >
                {company?.companyName}{" "}
              </Link>
            </span>
          </div>
          <div className={classes.money}>
            <div className={classes.money1}>
              <MonetizationOnOutlinedIcon
                sx={{
                  color: "#0ab305 ",
                  verticalAlign: "middle",
                  fill: "none",
                  height: "20px",
                  stroke: "currentcolor",
                  width: "20px",
                }}
              />
              <span
                style={{
                  paddingLeft: "8px",
                  color: "#0ab305 ",
                  fontWeight: 500,
                }}
              >
                {" "}
                {data?.salary}
              </span>
            </div>
          </div>
          <div className={classes.line}></div>
          <div style={{ marginTop: "8px" }}></div>
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
          <div className={classes.skill}>
            {data?.skillSets.map((item) => (
              <button className={classes.button}>{item}</button>
            ))}
            {/* <button className={classes.button}>asdasd</button>
            <button className={classes.button}>asdasd</button> */}
          </div>
        </div>
      </div>
      {applied ? (
        <div
          className={
            applied?.status === "Pending"
              ? classes.Pending
              : applied?.status === "Rejected"
              ? classes.Rejected
              : classes.main1
          }
        >
          {applied?.status === "Pending" ? (
            <HourglassEmptyIcon />
          ) : applied?.status === "Rejected" ? (
            <CancelIcon />
          ) : (
            <CheckCircleOutlineOutlinedIcon />
          )}
          {applied?.status}
          <div style={{ marginLeft: "auto" }}>
            Applied Date: {""}
            {moment(applied.applicationDate).format("YYYY-MM-DD")}
          </div>
        </div>
      ) : undefined}
    </div>
  );
}
