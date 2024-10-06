import React from "react";
import classes from "./ChooseCompany.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompanyCard from "../../components/Employer/CompanyCard";
export default function ChooseCompany() {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <form action="">
          {" "}
          <div className={classes.main2}>
            <div className={classes.main3}>
              <span className={classes.span}>
                <SearchOutlinedIcon fontSize="small" />
              </span>
              <input
                className={classes.input}
                autoComplete="off"
                placeholder="Company Name"
                type="text"
              />
            </div>
            <span className={classes.span1}>
              <button type="submit" className={classes.button}>
                Find
              </button>
            </span>
          </div>
        </form>
        <p className={classes.p}>New company created</p>
        <div style={{ display: "block", boxSizing: "border-box" }}>
          <div className={classes.main4}>
            <div className={classes.main5}>
                <CompanyCard/>
            </div>
            <div className={classes.main6}>
                <CompanyCard/>
            </div>
          </div>
        </div>
        <div style={{ display: "block", boxSizing: "border-box" }}>
          <div className={classes.main4}>
            <div className={classes.main5}>
                <CompanyCard/>
            </div>
            <div className={classes.main6}>
                <CompanyCard/>
            </div>
          </div>
        </div>
        <div style={{ display: "block", boxSizing: "border-box" }}>
          <div className={classes.main4}>
            <div className={classes.main5}>
                <CompanyCard/>
            </div>
            <div className={classes.main6}>
                <CompanyCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
