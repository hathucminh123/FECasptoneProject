import React from "react";
import classes from "./DetailsCV.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import { NavLink, Outlet } from "react-router-dom";
const DetailsCV: React.FC = () => {
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title="Fullstack"
          //   icon={<CreateOutlinedIcon />}
          buttonstring="Back"
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <nav className={classes.nav}>
            <div className={classes.header}>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cv Applied
              </NavLink>
              <NavLink
                to="CV/Recommend"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cv Recommend
              </NavLink>
              <NavLink
                to="asd"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Cv Find
              </NavLink>
            </div>
          </nav>
          <div className={classes.div1}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsCV;
