import React from "react";
import classes from "./Complete.module.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";

export default function Complete() {
  return (
    <section className={classes.section}>
      <div className={classes.main}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "30px",
            marginBottom: ".75rem",
            // margin: 0,
            padding: 0,
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "none",
          }}
        >
          Team Members
        </Typography>
        <p className={classes.p}>
          Amzing Job offers two seamless paths: source talent directly or post a
          job for free. Your journey to discovering standout hires starts here.
        </p>
        <div className={classes.main1}>
          <Link to="" className={classes.link1}>
            <GroupIcon />
            Find Talent
          </Link>
          <Link to="" className={classes.link2}>
            <WorkIcon />
            Find Talent
          </Link>
        </div>
      </div>
    </section>
  );
}
