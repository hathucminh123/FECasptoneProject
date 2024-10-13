import React, { useState, useEffect } from "react";
import classes from "./ProfileEmployer.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function ProfileEmployer() {
  const [companyId, setCompanyId] = useState<string | null>(localStorage.getItem("CompanyId"));

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active : undefined;

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Account Setting" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <NavLink to="" className={getNavLinkClass} end>
                <PersonIcon fontSize="small" sx={{ marginRight: "0.57rem" }} />
                Personal Information
              </NavLink>
              <NavLink to="ChangePassword" className={getNavLinkClass} end>
                <LockIcon fontSize="small" sx={{ marginRight: "0.57rem" }} />
                Change Password
              </NavLink>
              <NavLink
                to={companyId === "null" || !companyId ? "Choosecompany" : "company"}
                className={getNavLinkClass}
                end
              >
                <ApartmentIcon fontSize="small" sx={{ marginRight: "0.57rem" }} />
                Company Information
              </NavLink>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
