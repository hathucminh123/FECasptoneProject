import React from "react";
import classes from "./HeaderNavigationEmployer.module.css";
import { Link } from "react-router-dom";
import Image from "./../../assets/image/logo.jpg.webp";
import Typography from "@mui/material/Typography";
export default function HeaderNavigationEmployer() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.main}>
          <Link to={"/"} className={classes.link}>
            <div className={classes.div}>
              <img
                src={Image}
                alt="logo"
                style={{
                  height: "30px",
                  width: "auto",
                  verticalAlign: "middle",
                  boxSizing: "border-box",
                  aspectRatio: "auto 108/40",
                  cursor: "pointer",
                  overflowClipMargin: "content-box",
                  overflow: "clip",
                }}
              />
            </div>
            <div className={classes.div1}>
              <Typography
                variant="h3"
                sx={{
                  cursor: "pointer",
                  color: "#000000",
                  lineHeight: 1.5,
                  fontSize: "18px",
                  fontWeight: 700,
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                For Employer
              </Typography>
            </div>
          </Link>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Link
                to={"/employers/login"}
                style={{
                  color: "#000000",
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
