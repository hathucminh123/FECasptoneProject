import React, { useEffect, useState } from "react";
import classes from "./RootSystemEmployer.module.css";
import HeaderEmployerSystem from "../../components/NewUiEmployer/HeaderEmployerSystem";
import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "../../utils/Auth";
export interface Notification {
  id: number;
  title: string;
  description: string;
  receiverId: number;
  isRead: boolean;
  jobPostActivityId: number;
  // jobPostActivity: any;
  // userAccount: any;
  createdDate: string;
  // modifiedDate: any;
  // createdBy: any;
  // modifiedBy: any;
  isDeleted: boolean;
}
export default function RootSystemEmployer() {

  const [selectJobId,setSelectJobId]=useState<number|null>()
  const token = useRouteLoaderData("root3");
  console.log("token", token);
  const submit = useSubmit();

  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      <HeaderEmployerSystem token={token} selectJobId={selectJobId} notifications={notifications}   setNotifications={setNotifications} />

      <Outlet 
        context={{ selectJobId, setSelectJobId,setNotifications ,notifications}}
      />
    </div>
  );
}
