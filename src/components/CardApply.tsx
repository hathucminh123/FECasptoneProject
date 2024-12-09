import React from "react";
import classes from "./CardApply.module.css";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import moment from "moment";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
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

interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
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
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
  benefitObjects?: Benefits[];
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

interface props {
  company?: Company;
  job?: JobPost;
  activity: UserJobActivity;
}

const CardApply: React.FC<props> = ({ company, job, activity }) => {
  const pendingJobsArray = [];
  pendingJobsArray.push(job);
  const city = pendingJobsArray?.map((city) => city?.jobLocationCities);
  const flattenedArrayCity = city?.flat();

  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          {activity.status === "Pending" ? (
            <div className={classes.Pending}>
              <HourglassEmptyIcon />
              {activity.status}
            </div>
          ) : activity.status === "Rejected" ? (
            <div className={classes.Rejected}>
              <CancelIcon />
              {activity.status}
            </div>
          ) : (
            <div className={classes.status}>
              <CheckCircleOutlineOutlinedIcon />
              {activity.status}
            </div>
          )}

          <div className={classes.main3}>
            <span className={classes.span}>
              Applied Date:{" "}
              {moment(activity.applicationDate).format("DD-MM-YYYY")}
            </span>
          </div>
          <Link
            to={`/jobs/detail/${activity.jobPostId}`}
            className={classes.link}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: "12px",
                lineHeight: 1.5,
                fontSize: "20px",
                fontWeight: 700,
                boxSizing: "border-box",
                fontFamily: "Lexend, sans-serif",
              }}
            >
              {activity.jobTitle}
            </Typography>
          </Link>
          <div className={classes.main4}>
            <Link to="" className={classes.link1}>
              <img src={company?.imageUrl} alt="" className={classes.link1} />
            </Link>
            <span className={classes.span1}>
              <Link
                to={`/company/detail/${company?.id}`}
                className={classes.link1}
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
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
          <div className={classes.location}>
            <BusinessCenterOutlinedIcon />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#414042",
                paddingLeft: "8px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              {job?.jobType?.name}
            </span>
          </div>
          {/* <div className={classes.main8}>
            <LocationOnIcon />
            <span className={classes.span3}>
              {job?.jobLocationCities && job?.jobLocationCities?.length > 0 ? (
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
                
            {company?.address} {" in "} {company?.city}
                </div>
              )}
            </span>
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
              {cityColumn.length && cityColumn.length > 0 ? (
                <span
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {cityColumn.join(", ")}
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // maxWidth: "100%",
                  }}
                >
                  {company?.address} {" in "} {company?.city}
                </span>
              )}
            </Typography>
          </div> */}
          <div className={classes.location}>
            <LocationOnOutlinedIcon />
            <span className={classes.span}>
              {cityColumn.length && cityColumn.length > 0 ? (
                <span
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {cityColumn.join(", ")}
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {company?.address} {" in "} {company?.city}
                </span>
              )}
            </span>
          </div>
          {/* <div className={classes.button}>
            {job?.skillSets.map((tag, index) => (
              <div key={index} className={classes.button1}>
                {tag}
              </div>
            ))}
             

           
          </div> */}
          <div className={classes.job}>
            {job?.skillSets.slice(0, 5).map((tag, index) => (
              <div key={index} className={classes.button}>
                {tag}
              </div>
            ))}
          </div>
          <div className={classes.main7}></div>
          <div className={classes.benefit} style={{ marginTop: 10 }}>
            <ul className={classes.ul}>
              {job?.benefitObjects && job.benefitObjects.length > 0 ? (
                job.benefitObjects.map((benefit) => (
                  <li className={classes.li} key={benefit.id}>
                    {benefit.name}
                  </li>
                ))
              ) : (
                <li className={classes.li}>no Benefits Yet</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardApply;
