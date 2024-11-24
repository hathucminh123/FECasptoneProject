import React, { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import classes from "./HeaderSystem.module.css";

interface props {
  title: string;
  icon?: ReactNode;
  buttonstring?: string;
  url?: string;
  appear?: boolean;
  onclick?: () => void;
  pending?: boolean;
}

const HeaderSystem: React.FC<props> = ({
  title,
  icon,
  buttonstring,
  url,
  appear = true,
  pending = false,
  onclick,
}) => {
  return (
    <div className={classes.div1}>
      <Typography
        variant="h6"
        sx={{
          margin: 0,
          fontSize: "1.142rem",
          display: "flex",
          fontWeight: 500,
          lineHeight: 1.2,
          boxSizing: "border-box",
        }}
      >
        <span> {title}</span>
      </Typography>
      {appear ? (
        <></>
      ) : (
        <div className={classes.div2}>
          <Link to={url ?? ""} className={classes.link} onClick={onclick}>
            <i className={classes.i}>{icon}</i>
            {pending ? <>Wait a seconds</> : <> {buttonstring}</>}
          </Link>
        </div>
      )}
    </div>
  );
}


export default HeaderSystem