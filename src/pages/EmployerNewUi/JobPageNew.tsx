import React from "react";
import classes from "./JobPageNew.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotifiModal from "../../components/NewUiEmployer/NotifiModal";
// import NoJob from "../../components/NewUiEmployer/NoJob";

export default function JobPageNew() {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <header className={classes.header}>Jobs</header>
                  <Link to="" className={classes.link}>
                    {" "}
                    + Post Jobs
                  </Link>
                </div>
                <div className={classes.main7}>
                  <input
                    type="search"
                    name="search"
                    className={classes.input}
                  />
                  <div className={classes.icon}>
                    <SearchIcon />
                  </div>
                </div>
                <nav className={classes.main8}>
                  <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active(0)</span>
                    </div>{" "}
                  </NavLink>
                  {/* <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active(0)</span>
                    </div>{" "}
                  </NavLink> */}
                </nav>
                <div className={classes.main10}>
                  <NotifiModal />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.main11}>
            {/* <div className={classes.main12}>
              <NoJob />
            </div> */}
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}
