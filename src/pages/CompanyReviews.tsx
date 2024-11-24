import React from "react";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
// import Image from "./../assets/image/minh.jpg";
import classes from "./CompanyReviews.module.css";
import { Rate } from "antd";
import { companyData } from "../assets/data/CompanyData";
import { Link } from "react-router-dom";

const CompanyReviews:React.FC =()=> {
  // Dữ liệu review để tránh trùng lặp mã
  // const reviewData = [
  //   {
  //     name: "Công ty 4 thành viên",
  //     location: "Hồ Chí Minh",
  //     jobs: "10 jobs",
  //     reviews: "10 Reviews",
  //     rating: 4.5,
  //   },
  //   {
  //     name: "Công ty 4 thành viên",
  //     location: "Hồ Chí Minh",
  //     jobs: "10 jobs",
  //     reviews: "10 Reviews",
  //     rating: 4.5,
  //   },
  //   {
  //     name: "Công ty 4 thành viên",
  //     location: "Hồ Chí Minh",
  //     jobs: "10 jobs",
  //     reviews: "10 Reviews",
  //     rating: 4.5,
  //   },
  //   {
  //     name: "Công ty 4 thành viên",
  //     location: "Hồ Chí Minh",
  //     jobs: "10 jobs",
  //     reviews: "10 Reviews",
  //     rating: 4.5,
  //   },
  // ];

  // const newestReviews = [
  //   {
  //     name: "Công ty 4 thành viên",
  //     reviewText: "Môi trường làm việc ở đây rất năng động và sáng tạo",
  //     rating: 3,
  //     timeAgo: "21 hours ago",
  //   },
  //   {
  //     name: "Công ty 4 thành viên",
  //     reviewText: "Môi trường làm việc ở đây rất năng động và sáng tạo",
  //     rating: 3,
  //     timeAgo: "21 hours ago",
  //   },
  // ];

  return (
    <main className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.icontainer}>
            <div className={classes.icontainer1}>
              <div className={classes.icontainer2}>
                <Typography
                  variant="h1"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "28px",
                    fontWeight: 700,
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                >
                  Reviews of Top IT Companies
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "28px",
                    fontWeight: 400,
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                >
                  What are people saying about your company? Find out now!
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.icontainer3}>
          <div className={classes.icontainer}>
            <div className={classes.content}>
              <div className={classes.contentLeft}>
                <div style={{ display: "block" }}>
                  <div className={classes.content1}>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "#121212",
                        lineHeight: 1.5,
                        fontSize: "22px",
                        fontWeight: 700,
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      Company Reviews
                    </Typography>
                    <div className={classes.content2}>
                      <div style={{ display: "block" }}>
                        <div className={classes.content3}>
                          <span
                            style={{ marginRight: "5px", color: "#121212" }}
                          >
                            Sort By :{" "}
                          </span>
                          <div style={{ display: "block", marginLeft: "10px" }}>
                            <a
                              href=""
                              style={{
                                color: "#121212",
                                opacity: 0.7,
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              Hồ Chí Minh
                            </a>
                            <span
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            >
                              |
                            </span>
                            <a
                              href=""
                              style={{
                                color: "#121212",
                                opacity: 0.7,
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              Hà Nội
                            </a>
                            <span
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            >
                              |
                            </span>
                            <a
                              href=""
                              style={{
                                color: "#121212",
                                opacity: 0.7,
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              Đà Nẵng
                            </a>
                            <span
                              style={{ marginRight: "5px", marginLeft: "5px" }}
                            >
                              |
                            </span>
                            <a
                              href=""
                              style={{
                                color: "#121212",
                                opacity: 0.7,
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              All
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.card}>
                      {companyData.map((review, index) => (
                        <Link
                          key={index}
                          className={classes.card_item}
                          to={`/company/detail/${review.id}/review`}
                          state={review}
                        >
                          <div className={classes.smallimg}>
                            <img
                              src={review.image}
                              alt=""
                              style={{
                                width: "100%",
                                opacity: 1,
                                transition: "opacity 200ms",
                                verticalAlign: "middle",
                                height: "160px",
                                aspectRatio: "auto 326/160",
                                color: "#414042",
                                fontSize: "14px",
                                fontWeight: 400,
                              }}
                            />
                          </div>
                          <div className={classes.info}>
                            <header className={classes.header}>
                              <div className={classes.logo}>
                                <img
                                  src={review.image}
                                  alt=""
                                  style={{
                                    height: "60px",
                                    width: "64px",
                                    aspectRatio: "auto 64/62",
                                    opacity: 1,
                                    transition: "opacity 200ms",
                                    verticalAlign: "middle",
                                    color: "#414042",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                  }}
                                />
                              </div>
                              <div className={classes.nametitle}>
                                <Typography
                                  variant="h4"
                                  sx={{
                                    maxHeight: "50px",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    color: "#121212",
                                    lineHeight: 1.5,
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                  }}
                                >
                                  {review.name}
                                </Typography>
                                <div className={classes.star}>
                                  <StarIcon
                                    sx={{
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
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 400,
                                      color: "#414042",
                                    }}
                                  >
                                    3
                                  </span>
                                </div>
                              </div>
                            </header>
                            {review.overview.title}
                            <footer className={classes.footer}>
                              <span
                                style={{
                                  color: "#414042",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                }}
                              >
                                {review.location}
                              </span>
                              <span
                                style={{
                                  display: "flex",
                                  color: "#414042",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                }}
                              >
                                {review.jobOpeningsCount} jobs
                              </span>
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  color: "#0e2eed",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                }}
                              >
                                {review.jobOpeningsCount} reviews
                                <span
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    stroke: "currentcolor",
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    verticalAlign: "baseline",
                                    fill: "none",
                                    color: "#0e2eed",
                                    paddingTop: "2px",
                                  }}
                                >
                                  <NavigateNextOutlinedIcon
                                    sx={{
                                      stroke: "currentcolor",
                                      strokeWidth: 2,
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      verticalAlign: "baseline",
                                      fill: "none",
                                      fontSize: "14px",
                                      fontWeight: 400,
                                    }}
                                  />
                                </span>
                              </span>
                            </footer>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.contentRight}>
                <div className={classes.review}>
                  <Typography
                    variant="h2"
                    sx={{
                      marginBottom: "12px",
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    Newest Reviews
                  </Typography>
                  {companyData.map((review, index) => (
                    <div key={index} className={classes.quao}>
                      <Link
                        to={`/company/detail/${review.id}/review`}
                        state={review}
                        style={{ textDecoration: "none" }}
                      >
                        <div className={classes.quao1}>
                          <div className={classes.quao2}>
                            <div>
                              <img
                                src={review.image}
                                alt=""
                                style={{
                                  height: "60px",
                                  width: "64px",
                                  aspectRatio: "auto 64/62",
                                  opacity: 1,
                                  transition: "opacity 200ms",
                                  verticalAlign: "middle",
                                  color: "#414042",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  marginRight: "8px",
                                }}
                              />
                            </div>
                            <Typography
                              variant="h2"
                              sx={{
                                marginBottom: "0px",
                                marginTop: "0px",
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "22px",
                                fontWeight: 600,
                              }}
                            >
                              {review.name}
                            </Typography>
                          </div>
                          <div className={classes.quao3}>
                            <div className={classes.quao4}>
                              <Rate
                                defaultValue={4}
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
                            </div>
                          </div>
                          <div className={classes.quao5}>
                            <p className={classes.p}>{review.overview.title}</p>
                          </div>
                          <p
                            style={{
                              marginTop: "8px",
                              color: "#a6a6a6",
                              fontSize: "14px",
                              fontWeight: 400,
                              marginBottom: "0px",
                            }}
                          >
                            post 2 day ago
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default CompanyReviews