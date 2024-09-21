import React from "react";
import classes from "./JobPage.module.css";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import HeaderSystem from "../../components/Employer/HeaderSystem";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
export default function JobPage() {
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Recruitment management"  icon={<CreateOutlinedIcon/>} buttonstring="Post Recruitment"/>
      </div>
      <div className={classes.main1}>
        <div >asdasd</div>
      </div>
    </div>
  );
}
