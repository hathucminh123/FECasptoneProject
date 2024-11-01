import React, { useState } from "react";
import classes from "./RootSystemEmployer.module.css";
import HeaderEmployerSystem from "../../components/NewUiEmployer/HeaderEmployerSystem";
import { Outlet } from "react-router-dom";
export default function RootSystemEmployer() {

  const [selectJobId,setSelectJobId]=useState<number|null>()
  return (
    <div className={classes.main}>
      <HeaderEmployerSystem selectJobId={selectJobId} />

      <Outlet 
        context={{ selectJobId, setSelectJobId }}
      />
    </div>
  );
}
