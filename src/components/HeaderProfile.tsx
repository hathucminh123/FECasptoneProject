import React from "react";
import classes from "./HeaderProfile.module.css"
import { NavLink } from "react-router-dom";

export default function HeaderProfile() {
  return (

      <div className={classes.header}>
        <div className={classes.icontainer}>
          <ul className={classes.icontainer1}>
            <li className={classes.menuItem}>
              <NavLink
                to="/profile-cv"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Profile
              </NavLink>
            </li>
            <li className={classes.menuItem}>
              <NavLink
                to="manage-cv"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Manage CVs
              </NavLink>
            </li>
            {/* <li className={classes.menuItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Job Preferences
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>

  );
}
