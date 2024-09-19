import React from "react";
import classes from "./Recommend.module.css";
import Typography from "@mui/material/Typography";
// import Image from "./../assets/image/minh.jpg";
import { Rate } from "antd";
import CircularProgress from "./../components/CircularProgress ";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { companyData } from "../assets/data/CompanyData";
import { Link } from "react-router-dom";

// Define a type for the company data
// interface Company {
//   id: number;
//   name: string;
//   rank: string;
//   rating: number;
//   recommendationText: string;
// }

export default function Recommend() {
  // Company data with type annotation
  // const companyData: Company[] = [
  //   {
  //     id: 1,
  //     name: "Công ty 4 thành viên",
  //     rank: "#1",
  //     rating: 4,
  //     recommendationText: "Recommend working here !",
  //   },
  //   {
  //     id: 2,
  //     name: "Công ty 4 thành viên",
  //     rank: "#1",
  //     rating: 4,
  //     recommendationText: "Recommend working here !",
  //   },
  //   {
  //     id: 2,
  //     name: "Công ty 4 thành viên",
  //     rank: "#1",
  //     rating: 4,
  //     recommendationText: "Recommend working here !",
  //   },
  // ];

  // Reusable function to render a company block

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
  const renderCompany = (company: Company, index: number) =>{
    console.log('quao',company)
 return(
 
    <div
      key={company.id}
      className={classes.content}
      style={{
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f0f0",
      }}
    >


      <div className={classes.company}>
        <Typography
          variant="h2"
          sx={{
            padding: "0 30px",
            marginBottom: 0,
            lineHeight: 1.5,
            fontSize: "22px",
            fontWeight: 700,
            marginTop: 0,
            display: "block",
          }}
        >
          <span
            style={{
              color: "#ed1b2f",
              lineHeight: 1.5,
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {company.id}
          </span>
          <span className={classes.companyName}>{company.name}</span>
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div className={classes.left}>
          <div className={classes.image}>
            <div className={classes.img}>
              <a href="" style={{ textDecoration: "none" }}>
                <img
                  src={company.image}
                  alt={company.image}
                  className={classes.styleimg}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.star}>
            <div className={classes.starLeft}>
              <div className={classes.star1}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Rate
                    defaultValue={2}
                    disabled
                    style={{
                      width: "16px",
                      height: "16px",
                      position: "relative",
                      top: "2px",
                      stroke: "currentcolor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      verticalAlign: "baseline",
                      color: "#ff9119",
                      display: "flex",
                    }}
                  />
                  <p
                    style={{
                      marginLeft: "8px",
                      marginTop: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    4
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.starRight}>
              <div className={classes.star2}>
                <CircularProgress />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    paddingLeft: "12px",
                  }}
                >
                  Recommend working here !
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ display: "block" }}>
            <div className={classes.comment}>
              <div className={classes.comment1}>
                <div className={classes.comment2}>
                  <CommentOutlinedIcon
                    sx={{
                      fill: "currentcolor",
                      width: "14px",
                      height: "14px",
                      color: "#7a7a7a",
                      flexShrink: 0,
                      verticalAlign: "middle",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      marginLeft: "10px",
                      color: "#414042",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    Thật sự mình đã làm tại nhiều cty nhưng để lại ấn tượng nhất
                    vẫn là NFQ, cty hiện tại của mình. Đầu tiên, mức lương và
                    phúc lợi tại đây thực sự rất tốt so với mặt bằng chung trên
                    thị trường. Thay vì 1 năm có 12 ngày nghỉ phép như các
                    cty...
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.view}>
            <div className={classes.view1}>
              <p className={classes.p1}>
                <span
                  style={{
                    color: "#0e2eed",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  <Link
                    to={`/company/detail/${company.id}/review`}
                    state={company}
                    style={{
                      color: "#0e2eed",
                      fontSize: "16px",
                      fontWeight: 400,
                      textAlign: "right",
                      textDecoration: "none",
                      marginRight: "5px",
                    }}
                  >
                    See reviews
                  </Link>
                  |
                </span>
                <span
                  style={{
                    color: "#0e2eed",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  <Link
                    to={`/company/detail/${company.id}`}
                    state={company}
                    style={{
                      color: "#0e2eed",
                      fontSize: "16px",
                      fontWeight: 400,
                      textAlign: "right",
                      textDecoration: "none",
                      marginLeft: "5px",
                    }}
                  >
                    See jobs
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
)};

  return (
    <main className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.icontainer}>
            <div className={classes.container}>
              <div className={classes.containerLeft}>
                <Typography
                  variant="h1"
                  sx={{
                    lineHeight: "normal",
                    marginTop: "0px",
                    marginBottom: "16px",
                    color: "#121212",
                    fontSize: "28px",
                    fontWeight: 700,
                  }}
                >
                  Vietnam Best IT Companies
                </Typography>
                <p className={classes.p}>
                  These top 30 Vietnam IT companies (15 Large, 15 Small &
                  Medium) are recognized to provide the best culture, benefits,
                  working environment, management care and training, according
                  to 21,500+ reviews from IT employees.
                </p>
              </div>
            </div>

            {companyData.map((company, index) => renderCompany(company, index))}
          </div>
        </div>
      </div>
    </main>
  );
}
