import { Outlet } from "react-router-dom";
import HeaderSystemEmployer from "../../components/Employer/HeaderSystemEmployer";
import SideBarEmployer from "../../components/Employer/SideBarEmployer";
import React, { useState } from "react";
import classes from "./RootSystem.module.css";

export default function RootSystem() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <HeaderSystemEmployer open={open} setOpen={setOpen} />
      <SideBarEmployer open={open} />
      <div className={`${open ? classes.main : classes.main1}`}>
        <div className={classes.div}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
