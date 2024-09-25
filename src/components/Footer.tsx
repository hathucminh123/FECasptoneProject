import React from "react";
import classes from "./Footer.module.css";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "./../assets/image/logo.jpg.webp";
import FileUploadIcon from "@mui/icons-material/FileUpload";
interface props {
  onClick?: () => void;
  scroll: boolean;
}

export default function Footer({ onClick, scroll }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.leftSection}>
          <div className={classes.left1}>
            <div className={classes.divlogo}>
              <img src={Image} alt="logo" className={classes.logo} />
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
          <Typography variant="h4" gutterBottom className={classes.heading}>
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
                  Services
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Careers
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Contact Us
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
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
                  Services
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Careers
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Contact Us
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
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
                  Services
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Careers
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Contact Us
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
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
                  Services
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Careers
                </a>
              </span>
              <span className={classes.span}>
                <a className={classes.span} href="#">
                  Contact Us
                </a>
              </span>
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
}
