import React from "react";
import classes from "./CardApply.module.css";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import moment from "moment";
// import JobDetails from "../pages/JobDetails";

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}
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
  jobType: JobType; // jobType là đối tượng JobType
  jobLocationCities:string[];
  jobLocationAddressDetail:string[]
  skillSets: string[]; // Array of skill sets, có thể là array rỗng
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
  imageUrl:string
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

interface props {
  company?: Company;
  job?: JobPost;
  activity: UserJobActivity;
}

export default function CardApply({ company, job, activity }: props) {
 

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.status}>
            <CheckCircleOutlineOutlinedIcon />
            {activity.status}
          </div>
          <div className={classes.main3}>
            <span className={classes.span}>
              Applied Date:{" "}
              {moment(activity.applicationDate).format("YYYY-MM-DD")}
            </span>
          </div>
          <Typography
            variant="h3"
            sx={{
              marginTop: "12px",
              lineHeight: 1.5,
              fontSize: "20px",
              fontWeight: 700,
              boxSizing: "border-box",
            }}
          >
            <Link
              to={`/jobs/detail/${activity.jobPostId}`}
              className={classes.link}
            >
              {activity.jobTitle}
            </Link>
          </Typography>
          <div className={classes.main4}>
            <Link to="" className={classes.link1}>
              <img src="" alt="" className={classes.link1} />
            </Link>
            <span className={classes.span1}>
              <Link to={`/company/detail/${company?.id}`} className={classes.link1}>
                {" "}
                {company?.companyName}
              </Link>
            </span>
          </div>
          <div className={classes.main5}>
            <div className={classes.main6}>
              <MonetizationOnOutlinedIcon />
              <span className={classes.span2}>{job?.salary}</span>
            </div>
          </div>
          <div className={classes.main7}></div>
          <div className={classes.main8}>
            <LocationOnIcon />
            <span className={classes.span3}>
            {job?.jobLocationCities &&
                job?.jobLocationCities?.length > 0 ? (
                  job?.jobLocationCities.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      {item}
                      {index < job.jobLocationCities.length - 1 && ", "}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    No Location yet
                  </div>
                )}
            </span>
          </div>
          <div className={classes.button}>
            {job?.skillSets.map((tag, index) => (
              <div key={index} className={classes.button1}>
                {tag}
              </div>
            ))}

            {/* <div className={classes.button1}>asdsa</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
