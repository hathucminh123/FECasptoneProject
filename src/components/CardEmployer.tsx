import React from "react";
import classes from "./CardEmployer.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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
      navigate(`/company/detail/${data.id}`,{state:data}); 
    };

  return (
    <div className={classes.card_item} onClick={()=>handleNavigate(data)}>
      <div className={classes.image}>
        <img
          src={data.image}
          alt={`${data.name} logo`}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className={classes.content}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#121212",
          }}
        >
          {data.name} {/* Hiển thị tên công ty từ dữ liệu */}
        </Typography>

        <div className={classes.skillsContainer}>
          {data.jobs.map((job) => (
            <div key={job.id}>
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
            </div>
          ))}
        </div>
      </div>
      <div className={classes.location}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#121212",
          }}
        >
          {data.location}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#121212",
          }}
        >
          {data.jobOpeningsCount} jobs
        </Typography>
      </div>
    </div>
  );
};

export default CardEmployer;
