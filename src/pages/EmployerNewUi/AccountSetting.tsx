import React from "react";
import classes from "./AccountSetting.module.css";
import { NavLink, Outlet } from "react-router-dom";
export default function AccountSetting() {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div></div>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <div className={classes.main7}>
                    <div>
                      <ul className={classes.ul}>
                        <li className={classes.li}>Settings</li>
                        <li className={classes.li1}>
                          <NavLink
                            to=""
                            className={({ isActive }) =>
                              isActive ? classes.active : undefined
                            }
                            end
                          >
                            General
                          </NavLink>
                        </li>
                        <li className={classes.li1}>
                          <NavLink
                            to="Password"
                            className={({ isActive }) =>
                              isActive ? classes.active : undefined
                            }
                            end
                          >
                            Password
                          </NavLink>
                        </li>
                        {/* <li className={classes.li1}>
                          <NavLink to="">Notifications</NavLink>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
