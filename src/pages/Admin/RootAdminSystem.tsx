import { Outlet, useRouteLoaderData, useSubmit } from "react-router-dom";

import React, { useEffect, useState } from "react";
import classes from "./RootAdminSystem.module.css";
import { getTokenDuration } from "../../utils/Auth";
import HeaderSystemAdmin from "../../components/Admin/HeaderSystemAdmin";
import SideBarAdmin from "../../components/Admin/SideBarAdmin";

const RootAdminSystem: React.FC = () => {
  // const userRole = localStorage.getItem('role')
  // const navigate =useNavigate();
  const [open, setOpen] = useState<boolean>(true);

  const token = useRouteLoaderData("root2");
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
    <>
      <HeaderSystemAdmin open={open} setOpen={setOpen} token={token} />
      <SideBarAdmin open={open} />
      <div className={`${open ? classes.main : classes.main1}`}>
        <div className={classes.div}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default RootAdminSystem