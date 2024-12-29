// import React from 'react'

import { Outlet } from "react-router-dom";
import HeaderProfile from "../components/HeaderProfile";
import classes from "./RootProfile.module.css";
import React from "react";
const RootProfile:React.FC =()=> {
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "calc(100vh-495px)",
        display: "block",
        marginTop: "auto",
      }}
    >
      <HeaderProfile />
      <main className={classes.tab}>
      
          <Outlet />
       
      </main>
    </div>
  );
}
export default RootProfile
