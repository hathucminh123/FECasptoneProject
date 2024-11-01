import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import classes from "./OverViewJob.module.css";
export default function OverViewJob() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>dasdasd</p>
            <div className={classes.main3}>
              <span className={classes.span}>Live</span>
            </div>
          </div>
        </div>
        <nav className={classes.nav}>
          <NavLink
            to={`/EmployerJob/listjobs/OverView/${id}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.main4}>
              <span>OverView</span>
            </div>
          </NavLink>
          <NavLink
            to="das"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.main4}>
              <span>Edit</span>
            </div>
          </NavLink>
          <NavLink
            to="asdas"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.main4}>
              <span>Applicants</span>
            </div>
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
