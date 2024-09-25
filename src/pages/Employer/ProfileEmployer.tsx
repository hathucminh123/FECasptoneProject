import React from "react";
import classes from "./ProfileEmployer.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from '@mui/icons-material/Lock';

export default function ProfileEmployer() {
  const disappear: boolean = true;
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Account Setting" appear={disappear} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                {" "}
                <PersonIcon fontSize="small" sx={{ marginRight: "0.57rem" }} />
                Personal Information
              </NavLink>
                    <NavLink
                to="ChangePassord"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                {" "}
                <LockIcon fontSize="small" sx={{ marginRight: "0.57rem" }} />
                Change Password
              </NavLink>
            </div>
          </div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
