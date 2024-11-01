import React from "react";
import classes from "./NotifiModal.module.css";
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';

export default function NotifiModal() {
  return (
    <div className={classes.main}>
      <p className={classes.p}>Post a job for free</p>
      <p className={classes.p1}>
        We have a lot of active job seekers. Let them know you're hiring
      </p>
      <div className={classes.main1}>
        <Link to="" className={classes.link}>
          {/* <svg fill="none" height={16} width={16} viewBox="0 0 16 16">
            <path
              d="M2.56684 4.23096H13.1765C14.3177 4.23096 15.2433 5.15669 15.2433 6.29921V12.2062C15.2433 13.3487 14.3177 14.2744 13.1765 14.2744H2.56684C1.42562 14.2744 0.5 13.3487 0.5 12.2062V6.29921C0.5 5.15669 1.42562 4.23096 2.56684 4.23096Z"
              stroke="currentColor"
            ></path>
          </svg> */}
          <WorkIcon/>
          Post A Jobs
        </Link>
      </div>
    </div>
  );
}
