import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";
import HeaderSystemEmployer from "../../components/Employer/HeaderSystemEmployer";
import SideBarEmployer from "../../components/Employer/SideBarEmployer";
import React, { useEffect, useState } from "react";
import classes from "./RootSystem.module.css";
import { getTokenDuration } from "../../utils/Auth";

export default function RootSystem() {
  const [open, setOpen] = useState<boolean>(true);
  // const userRole = localStorage.getItem('role')
  // const navigate =useNavigate();


  const token = useRouteLoaderData("root1");
  console.log('token',token)
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
  return (
    <>
      <HeaderSystemEmployer open={open} setOpen={setOpen} token={token} />
      <SideBarEmployer open={open} />
      <div className={`${open ? classes.main : classes.main1}`}>
        <div className={classes.div}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
