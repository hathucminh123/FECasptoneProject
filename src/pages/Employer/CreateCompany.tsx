import React from "react";
import classes from "./CreateCompany.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, Outlet } from "react-router-dom";

export default function CreateCompany() {
  return (
    <div className={classes.main}>
      <div>
        <div className={classes.main1}></div>
        <div className={classes.main2}>
          <ul className={classes.ul}>
            <NavLink
              to="#"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <div
                  className={`${classes.main3} ${
                    isActive ? classes.active : ""
                  }`}
                >
                  <div className={classes.main4}>
                    <div className={classes.main5}>
                      <SearchOutlinedIcon
                        fontSize="large"
                        className={`${classes.icon} ${
                          isActive ? classes.active : ""
                        }`}
                      />
                    </div>
                    <div className={classes.main6}>
                      <p className={classes.p}>
                        <b style={{ fontWeight: 500 }}>
                          Find Company Information
                        </b>
                      </p>
                      <span className={classes.span}>
                        For businesses already on our system.
                      </span>
                    </div>
                    {isActive && (
                      <div className={classes.main7}>
                        <CheckCircleIcon
                          sx={{
                            background: "#FFD4C3",
                            color: "#FF6F61",
                            width: "34px",
                            height: "34px",
                            textAlign: "center",
                            padding: "10px",
                            borderRadius: "50%",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <div
                  className={`${classes.main3} ${
                    isActive ? classes.active : ""
                  }`}
                >
                  <div className={classes.main4}>
                    <div className={classes.main5}>
                      <AddCircleIcon
                        fontSize="large"
                        className={`${classes.icon} ${
                          isActive ? classes.active : ""
                        }`}
                      />
                    </div>
                    <div className={classes.main6}>
                      <p className={classes.p}>
                        <b style={{ fontWeight: 500 }}>
                          Find Company Information
                        </b>
                      </p>
                      <span className={classes.span}>
                        For businesses already on our system.
                      </span>
                    </div>
                    {isActive && (
                      <div className={classes.main7}>
                        <CheckCircleIcon
                          sx={{
                            background: "#FFD4C3",
                            color: "#FF6F61",
                            width: "34px",
                            height: "34px",
                            textAlign: "center",
                            padding: "10px",
                            borderRadius: "50%",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </NavLink>
          </ul>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
