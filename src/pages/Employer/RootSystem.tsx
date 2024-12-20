import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import HeaderSystemEmployer from "../../components/Employer/HeaderSystemEmployer";
import SideBarEmployer from "../../components/Employer/SideBarEmployer";
import React, { useEffect, useState } from "react";
import classes from "./RootSystem.module.css";
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

const RootSystem:React.FC=()=> {
  const [open, setOpen] = useState<boolean>(true);
  // const userRole = localStorage.getItem('role')
  // const navigate =useNavigate();

  const token = useRouteLoaderData("root1");
  console.log("token", token);
  const submit = useSubmit();

  const tokenDuration = getTokenDuration();

  //   useEffect(()=>{
  //     if(userRole ==="jobseeker"){
  //       navigate('/')
  //     }else if(userRole ==="employer"){
  //       navigate('/employer-verify/jobs')
  //     }
  //  },[userRole,navigate])

  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, tokenDuration, submit]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  return (
    <>
      <HeaderSystemEmployer
        open={open}
        setOpen={setOpen}
        token={token}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <SideBarEmployer
        open={open}
        token={token}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <div className={`${open ? classes.main : classes.main1}`}>
        <div className={classes.div}>
          <Outlet
          context={{ notifications, setNotifications }}
          />
        </div>
      </div>
    </>
  );
}
export default RootSystem