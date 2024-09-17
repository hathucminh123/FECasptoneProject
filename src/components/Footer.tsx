import React from "react";
import classes from "./Footer.module.css";

import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.leftSection}>
          <img
            src="logo-url" // thay đổi với link ảnh của logo
            alt="logo"
            className={classes.logo}
          />
          <p className={classes.slogan}>Ít nhưng mà chất</p>
          <div className={classes.socialIcons}>
            <a href="#">
              <InstagramIcon className={classes.socialIconsItem} />
            </a>
            <a href="#">
              {<FacebookIcon className={classes.socialIconsItem} />}
            </a>
            <a href="#">
              {<YouTubeIcon className={classes.socialIconsItem} />}
            </a>
          </div>
        </div>
        <div className={classes.midSection}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            About us
          </Typography>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>AI Match Service</li>
            <li>Contact Us</li>
            <li>All Jobs</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className={classes.rightSection}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Campaign
          </Typography>
          <ul>
            <li>IT Story</li>
            <li>Writing Contest</li>
            <li>Featured IT Jobs</li>
          </ul>
        </div>
        <div className={classes.contactSection}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Terms & Conditions
          </Typography>
          <ul>
            <li>Privacy Policy</li>
            <li>Operating Regulation</li>
            <li>Complaint Handling</li>
            <li>Terms & Conditions</li>
            <li>Press</li>
          </ul>
        </div>
        <div className={classes.contactSection}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Want to post a job? Contact us at:
          </Typography>
          <ul>
            <li>Ho Chi Minh: (+84) 977 460 519</li>
            <li>Ha Noi: (+84) 983 131 351</li>
            <li>Email: love@itviec.com</li>
          </ul>
        </div>
      </div>
      <div className={classes.separator}>
        <span>or</span>
      </div>

      <div className={classes.copyright}>
        <p>Copyright © IT VIEC JSC | Tax code: 0312192258</p>
      </div>
    </div>
  );
}
