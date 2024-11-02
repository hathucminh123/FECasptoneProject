import React, { useEffect, useState } from "react";
import classes from "./RootSystemEmployer.module.css";
import HeaderEmployerSystem from "../../components/NewUiEmployer/HeaderEmployerSystem";
import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "../../utils/Auth";
export default function RootSystemEmployer() {

  const [selectJobId,setSelectJobId]=useState<number|null>()
  const token = useRouteLoaderData("root3");
  console.log("token", token);
  const submit = useSubmit();

  const tokenDuration = getTokenDuration();
  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, tokenDuration, submit]);
  return (
    <div className={classes.main}>
      <HeaderEmployerSystem selectJobId={selectJobId} />

      <Outlet 
        context={{ selectJobId, setSelectJobId }}
      />
    </div>
  );
}
