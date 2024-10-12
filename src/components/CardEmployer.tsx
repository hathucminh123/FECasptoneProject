import React from "react";
import classes from "./CardEmployer.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Image from './../assets/image/download.png'
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { useQuery } from "@tanstack/react-query";

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
  jobLocationCities:string[] ;
  jobLocationAddressDetail:string[]
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
  imageUrl:string
}

interface CardEmployerProps {
  data: Company;
}

const CardEmployer: React.FC<CardEmployerProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = (data: Company) => {
    console.log("Navigating with data:", data);
    navigate(`/company/detail/${data.id}`);
  };

  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  console.log('haha',data.imageUrl)
  return (
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
         src={data?.imageUrl === null || data?.imageUrl === "string" ? Image : data?.imageUrl}
          alt={`${data.companyName} logo`}
          style={{ textAlign: "center" }}
          // className={classes.image}
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
            {data.companyName} {/* Hiển thị tên công ty từ dữ liệu */}
          </Typography>

          <div className={classes.skillsContainer}>
            <div className={classes.skill1}>
              {data.jobPosts.map((job) =>{ 
                const jobs = JobPostsdata?.find((item)=> item.id === job.id)
                console.log('thiet khong',jobs)
                return(
                <React.Fragment key={job.id}>
                  
                  {jobs?.skillSets.map((tag, index) => (
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
                </React.Fragment>
              )})}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.location}>
        <div className={classes.divlocation}>{data.address}, in {data.city} city</div>
        <div className={classes.divjob}>
          <span></span>
          {data.jobPosts.length} jobs
          <ArrowRightIcon
            sx={{
              width: "20px",
              height: "20px",
              stroke: "currentcolor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              verticalAlign: "baseline",
              fill: "none",
              paddingLeft:'4px',
              whiteSpace:'none-wrap'
            }}
          />
        </div>
       
      </div>
    </div>
  );
};

export default CardEmployer;
