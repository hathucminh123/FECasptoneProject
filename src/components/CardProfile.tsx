import Typography from "@mui/material/Typography";
import classes from "./CardProfile.module.css";

import React from "react";

interface form {
  title?: string;
  text?: string;
  icon?: JSX.Element;
  img?: string;
}

export default function CardProfile({ title, text, icon, img }: form) {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <Typography
            variant="h2"
            sx={{ lineHeight: 1.5, fontSize: "22px", fontWeight: 700 }}
          >
            {title}
          </Typography>

          <div className={classes.mainab}>{icon}</div>
        </div>
        <div className={classes.separator}></div>
        <Typography variant="h3" sx={{ lineHeight: 1.5, fontSize: "22px" }}>
          {text}
        </Typography>
        <span className={classes.img}>
          <img
            style={{ width: "80px", height: "80px", verticalAlign: "middle" }}
            src={img}
            alt="custom image"
          />{" "}
        </span>
      </div>
    </div>
  );
}
