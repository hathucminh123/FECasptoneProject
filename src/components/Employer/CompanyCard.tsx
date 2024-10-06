import React from "react";
import classes from "./CompanyCard.module.css";
export default function CompanyCard() {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.img}></div>
      </div>
      <div className={classes.main2}>
        <p className={classes.p}>Công Ty 4 thành Viên</p>
        <div className={classes.main3}>
          <span className={classes.span1}>Công ty đỉnh vcl nên vào </span>
          <span className={classes.span2}> | </span>
          <span className={classes.span3}> 10 employees</span>
        </div>
        <p className={classes.p1}>
            <span className={classes.span4}>Reactjs/.Net/React Native</span>
        </p>
      </div>
      <div className={classes.main4}>
        <button type="button" className={classes.button}>Choose</button>
      </div>
    </div>
  );
}
