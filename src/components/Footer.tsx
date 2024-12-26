import React from "react";
import classes from "./Footer.module.css";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import Image from "./../assets/image/logo.jpg.webp";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
interface props {
  onClick?: () => void;
  scroll: boolean;
}

const Footer: React.FC<props> = ({ onClick, scroll }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.leftSection}>
          <div className={classes.left1}>
            <div className={classes.divlogo}>
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
             
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Căn giữa theo chiều dọc
                  }}
                >
                  {/* Phần chữ "it" */}
                  <Box
                  sx={{
                    backgroundColor: "#3cbc8c",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "22px",
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "3px",
                  }}
                >
                  A
                </Box>

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "22px",
                      fontFamily: "Lexend, sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    mazingJob
                  </Typography>
                </Box>
              </Link>
              <p className={classes.slogan}>Ít nhưng mà chất</p>
            </div>
            <div className={classes.socialIcons}>
              <a href="#">
                <InstagramIcon className={classes.socialIconsItem} />
              </a>
              <a href="#">
                <FacebookIcon className={classes.socialIconsItem} />
              </a>
              <a href="#">
                <YouTubeIcon className={classes.socialIconsItem} />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Lexend, sans-serif" }}
            gutterBottom
            className={classes.heading}
          >
            About us
          </Typography>
          <div className={classes.list}>
            <div className={classes.list1}>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Home
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  About Us
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Contact Us
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  All Jobs
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Lexend, sans-serif" }}
            gutterBottom
            className={classes.heading}
          >
            Want to post a job? Contact us at:
          </Typography>
          <div className={classes.list}>
            <div className={classes.list2}>
              {/* <span className={classes.span}>
                <a className={classes.span} href="#">
                  Home
                </a>
              </span> */}
              <div className={classes.div1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={classes.svg}
                >
                  <path d="M22 16.92a13.05 13.05 0 0 1-6.39-2.07 13.05 13.05 0 0 1-4.7-4.7A13.05 13.05 0 0 1 8.08 2H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-3.08z"></path>

                  <path d="M15.05 5a5 5 0 0 1 4 4"></path>

                  <path d="M19 1a10 10 0 0 1 5 5"></path>
                </svg>

                <p className={classes.p}>Ho Chi Minh: {"(+84)"}23143528</p>
              </div>
              <div className={classes.div1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={classes.svg}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M22 6L12 13 2 6"></path>
                </svg>

                <p className={classes.p}>Email: AmazingJob@gmail.com</p>
              </div>
            
            </div>
          </div>
        </div>
      
      </div>
      <hr className={classes.hr} />
      <div className={classes.copy}>
        <p className={classes.p}>Copyright © Job</p>
        <p className={classes.line}></p>
        <p className={classes.p1}>All rights reserved</p>
      </div>

      {scroll ? (
        <button className={classes.button} onClick={onClick}>
          <FileUploadIcon />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Footer;
