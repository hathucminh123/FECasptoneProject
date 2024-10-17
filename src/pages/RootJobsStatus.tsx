// import React from 'react'

import { Outlet } from "react-router-dom";

import classes from "./RootJobs.module.css";
import HeaderJobStatus from "../components/HeaderJobStatus";

export default function RootJobsStatus() {
    
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "calc(100vh-495px)",
        display: "block",
        marginTop: "auto",
      }}
    >
      <HeaderJobStatus/>
      <main className={classes.tab}>
        <Outlet />
      </main>
    </div>
  );
}