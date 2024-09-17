import React from "react";
import classes from "./CardJobSearch.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string;
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
interface MyComponentProps {
  Maxwidth?: string;
  className?: string;
  formButton?: boolean;
  data?: Job;
  img?: string;
  company?: Company;
  onclick?: () => void;
  selectedJob?: null | Job;
}

export default function CardJobSearch({
  data,
  onclick,
  img,
  company,
  selectedJob,
}: MyComponentProps) {
  console.log("cố lenasd", company);
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
            {data?.title}
          </Typography>
          <div className={classes.logo}>
            <img
              src={img}
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
                {company?.name}{" "}
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
                1000$
              </span>
            </div>
          </div>
          <div className={classes.line}></div>
          <div style={{ marginTop: "8px" }}></div>
          <div className={classes.location}>
            <LocationOnIcon
              sx={{
                width: "16px",
                height: "16px",
                stroke: "currentcolor",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                verticalAlign: "baseline",
                fill: "none",
                color: "#a6a6a6",
              }}
            />
            <span
              style={{
                paddingLeft: "8px",
                color: "#414042",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
           {data?.location}
            </span>
          </div>
          <div className={classes.skill}>
            {data?.tags.map((item)=>(
              
            <button className={classes.button}>{item}</button>
            ))}
            {/* <button className={classes.button}>asdasd</button>
            <button className={classes.button}>asdasd</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
