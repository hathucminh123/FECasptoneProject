import React from "react";
import classes from "./Billing.module.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
export default function Billing() {
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <Link to="" className={classes.link}></Link>
      </div>

      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <Typography
              variant="h1"
              sx={{
                display: "inline-block",
                color: "#050c26",
                margin: 0,
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "30px",
                padding: 0,
              }}
            >
              Billing
            </Typography>
          </div>
        </div>
        <div className={classes.main5}>
          <div className={classes.main6}>
            <div className={classes.main7}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: ".75rem",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                Transactions
              </Typography>
              <div className={classes.main8}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
