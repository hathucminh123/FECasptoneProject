import React from "react";
import classes from "./HeaderJobsApply.module.css"
import { NavLink } from "react-router-dom";

export default function HeaderJobsApply() {
  
  return (

      <div className={classes.header}>
        <div className={classes.icontainer}>
          <ul className={classes.icontainer1}>
            <li className={classes.menuItem}>
              <NavLink
                to="/my-jobs"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Save Jobs
              </NavLink>
            </li>
       
            <li className={classes.menuItem}>
              <NavLink
                to="applied"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Applied Job
              </NavLink>
            </li>
            <li className={classes.menuItem}>
              <NavLink
                to="recent-viewed"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
              Interview
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

  );
}
