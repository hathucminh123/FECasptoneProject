import React from "react";
import classes from "./CardEmployer.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "./../assets/image/download.png";
// import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
// import { useQuery } from "@tanstack/react-query";
import Badge from "@mui/material/Badge";

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
  jobType: JobType | string | null;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Location {
  id: number;
  stressAddressDetail: string;
  city: string;
  locationId: number;
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
  companyLocations: Location[];
}

interface CardEmployerProps {
  data: Company;
  jobs: JobPost[] | undefined;
}

const CardEmployer: React.FC<CardEmployerProps> = ({ data, jobs }) => {
  const navigate = useNavigate();

  const handleNavigate = (company: Company) => {
    if (!company) return;
    navigate(`/company/detail/${company.id}`);
  };
  const skills = jobs?.map((skill) => skill.skillSets);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];

  const city = jobs?.map((city) => city.jobLocationCities);
  const flattenedArrayCity = city?.flat();

  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;
  console.log("cityColumn", cityColumn);
  return (
    <Link to="" className={classes.main}>
      <div className={classes.card_item} onClick={() => handleNavigate(data)}>
        <div style={{ textAlign: "center", display: "block" }}>
          <div className={classes.index}>
            <img
              src="https://itviec.com/assets/homepage/bg-top-emp-dbf208a6c6d014eb0e2aac10d0a397aac71694c28d5d23cb5709b613bf215fcb.svg"
              alt=""
              style={{
                width: "100%",
                verticalAlign: "middle",
                overflowClipMargin: "content-box",
                overflow: "clip",
                textAlign: "center",
              }}
            />
          </div>
        </div>
        <div className={classes.image}>
          <img
            src={data?.imageUrl ? data.imageUrl : Image}
            alt={`${data.companyName} logo`}
            style={{ textAlign: "center" }}
            onError={(e) => (e.currentTarget.src = Image)}
          />
        </div>

        <div className={classes.content}>
          <div
            style={{ display: "block", textAlign: "center", cursor: "pointer" }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                overflow: "hidden",

                paddingLeft: "16px",
                paddingRight: "16px",
                color:
                  "rgba(var(--i-black-rgb), var(--i-text-opacity)) !important",
                lineHeight: 1.5,
                fontSize: "18px",
                fontWeight: 700,
                mt: 0,
                mb: 0,
              }}
            >
              {data.companyName}
            </Typography>

            <div className={classes.skillsContainer}>
              <div className={classes.skill1}>
                {uniqueArray.slice(0, 10).map((tag, index) => (
                  <Button
                    key={index}
                    sx={{
                      color: "#414042",
                      backgroundColor: "#f7f7f7",
                      fontSize: "10px",
                      padding: "4px 12px",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      textAlign: "center",
                      margin: "4px",
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.location}>
          {/* <div className={classes.divlocation}>
          {cityColumn?.map((city, index) => (
            <div key={index}>
              {city} {"-"}
            </div>
          ))}
        </div> */}

          <div className={classes.divlocation}>
            {data.companyLocations.map((location, index) => (
              <div key={index}>
                {location.city}
                {index !== data.companyLocations.length - 1 && " - "}
              </div>
            ))}
          </div>
          {/* {cityColumn.length && cityColumn.length > 0 ? (
          <div className={classes.divlocation}>
            {cityColumn?.slice(0, 2).map((city, index) => (
              <div key={index}>
                {city} {"-"}
              </div>
            ))}
            {cityColumn?.length > 3 && <div>OTHER </div>}
          </div>
        ) : (
          <div className={classes.divlocation}>
           
            {data.address}{" in "}{data.city}
          </div>
        )} */}

          <div className={classes.divjob}>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              color="success"
              sx={{
                boxSizing: "border-box",
                whiteSpace: "nowrap",
                color: "#121212",
                fontSize: "16px",
                fontWeight: 400,
                textAlign: "center",
                marginRight: "10px",

                alignItems: "center",
              }}
            />
            {data.jobPosts.length} jobs
            <NavigateNextIcon
              sx={{
                width: "20px",
                height: "20px",
                stroke: "currentcolor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                verticalAlign: "baseline",
                fill: "none",
                paddingLeft: "4px",
                whiteSpace: "none-wrap",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardEmployer;
