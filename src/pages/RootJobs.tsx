// import React from 'react'

import { Outlet } from "react-router-dom";
import HeaderJobsApply from "../components/HeaderJobsApply";
import classes from "./RootJobs.module.css";

export default function RootJobs() {
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "calc(100vh-495px)",
        display: "block",
        marginTop: "auto",
      }}
    >
      <HeaderJobsApply />
      <main className={classes.tab}>
        <Outlet />
      </main>
    </div>
  );
}
