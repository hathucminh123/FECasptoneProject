import React from "react";
import classes from "./CardEmployer.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Khai báo kiểu dữ liệu cho Job và Company
interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
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

interface CardEmployerProps {
  data: Company;
}

const CardEmployer: React.FC<CardEmployerProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = (data: Company) => {
    console.log("Navigating with data:", data);
    navigate(`/company/detail/${data.id}`, { state: data });
  };

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
          src={data.image}
          alt={`${data.name} logo`}
          style={{ textAlign: "center" }}
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
            {data.name} {/* Hiển thị tên công ty từ dữ liệu */}
          </Typography>

          <div className={classes.skillsContainer}>
            <div className={classes.skill1}>
              {data.jobs.map((job) => (
                <React.Fragment key={job.id}>
                  {job.tags.map((tag, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.location}>
        <div className={classes.divlocation}>{data.location}</div>
        <div className={classes.divjob}>
          <span></span>
          {data.jobOpeningsCount} jobs
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
