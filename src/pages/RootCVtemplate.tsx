import React from "react";
import classes from "./RootCVtemplate.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";


export default function RootCVtemplate() {

  return (
    <main className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.header}>
            <div className={classes.header1}>
              <div className={classes.header2}>
                <Link to="/profile-cv" className={classes.link}>
                  <ArrowBackIcon />
                  <span>Back to update your Profile</span>
                </Link>
                <div className={classes.header3}>
                  <Typography
                    variant="h2"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "22px",
                      fontWeight: 700,
                      marginTop: 0,
                      marginBottom: 0,
                      boxSizing: "border-box",
                      display: "block",
                    }}
                  >
                    CV Template
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <div className={classes.main7}>
                    <NavLink to="/cv-templates" className={classes.link2}>
                      {({ isActive }) => (
                        <>
                          <img
                            src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd014UGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--12916489f357a1afda8ea1665487be89a3bd9c97/elegant.png"
                            alt="CV template"
                            className={`${classes.img} ${
                              isActive ? classes.active : ""
                            }`}
                          />
                          <div className={classes.main8}>
                            <div className={classes.main9}>
                              Recommended by recruiters
                            </div>
                          </div>
                          {isActive && (
                            <div className={classes.main10}>
                              <div className={classes.main11}>
                                <CheckIcon
                                  sx={{
                                    width: "32px",
                                    height: "32px",
                                    stroke: "currentcolor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    verticalAlign: "baseline",
                                    fill: "none",
                                    color: "#fff",
                                    transform:
                                      " translate(-50%, -50%) !important",
                                    left: "50%",
                                    top: "50%",
                                    position: "absolute",
                                    boxSizing: "border-box",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                    <Typography
                      variant="h4"
                      sx={{
                        marginTop: "8px",
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: 1.5,
                        fontSize: "16px",
                        fontWeight: 600,
                        boxSizing: "border-box",
                      }}
                    >
                      Elegant
                    </Typography>
                  </div>
                  <div className={classes.main7}>
                    <NavLink
                      to="/dasd"
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                    >
                      {({ isActive }) => (
                        <>
                          <img
                            src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd0l4UGc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c6372bbe203cf53eb2882072f1218222566c7c36/minimal.png"
                            alt="CV template"
                            className={`${classes.img} ${
                              isActive ? classes.active : ""
                            }`}
                          />

                          {isActive && (
                            <div className={classes.main10}>
                              <div className={classes.main11}>
                                <CheckIcon
                                  sx={{
                                    width: "32px",
                                    height: "32px",
                                    stroke: "currentcolor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    verticalAlign: "baseline",
                                    fill: "none",
                                    color: "#fff",
                                    transform:
                                      " translate(-50%, -50%) !important",
                                    left: "50%",
                                    top: "50%",
                                    position: "absolute",
                                    boxSizing: "border-box",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                    <Typography
                      variant="h4"
                      sx={{
                        marginTop: "8px",
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: 1.5,
                        fontSize: "16px",
                        fontWeight: 600,
                        boxSizing: "border-box",
                      }}
                    >
                      Minimal
                    </Typography>
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
