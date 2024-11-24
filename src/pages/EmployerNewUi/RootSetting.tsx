import React from "react";
import classes from "./RootSetting.module.css";
import { NavLink, Outlet } from "react-router-dom";
const RootSetting:React.FC =()=> {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <header className={classes.header}>Settings</header>
                </div>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <p className={classes.p}>Billings</p>
                  <p className={classes.p1}>Transactions,payment details</p>
                </NavLink>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default RootSetting