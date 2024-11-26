import React, { useEffect, useState } from "react";
import ModalStep from "../../components/Employer/ModalStep";
import { AnimatePresence } from "framer-motion";
import { Typography } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, NavLink, Outlet } from "react-router-dom";

import classes from "./StepComppanyVerification.module.css";

const StepComppanyVerification: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );

  const location = useLocation();

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
  }, []);

  useEffect(() => {
    if (!companyId || companyId === "null") {
      setNextStep(false);
    } else {
      setNextStep(true);
    }
  }, [companyId]);

  const handleDone4 = () => {
    setOpen(false);
  };

  const isCompletePage = location.pathname.includes("Complete");
  // const isInvitePage = location.pathname.includes("inviteYourTeam");

  return (
    <body className={classes.body}>
      <AnimatePresence>
        {open && <ModalStep onClose={handleDone4} />}
      </AnimatePresence>
      <div
        style={{ boxSizing: "border-box", borderWidth: 0, borderStyle: "none" }}
      >
        <div
          style={{
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "none",
          }}
        >
          <div className={classes.main}>
            <div className={classes.main1}>
              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1.5,
                  fontSize: "22px",
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: 0,
                  boxSizing: "border-box",
                  display: "block",
                  color: "#fff",
                }}
              >
                Amazing Job
              </Typography>

              <div className={classes.main2}>
                <NavLink
                  to={
                    !nextStep && !isCompletePage ? "/onboarding/recruit" : "#"
                  }
                  className={({ isActive }) =>
                    isActive && location.pathname === "/onboarding/recruit"
                      ? classes.active
                      : undefined
                  }
                  end
                >
                  <StepIcon isActive={nextStep} />
                  <span className={classes.span}>Set up your Account</span>
                </NavLink>

                {/* <NavLink
                  to={nextStep && isInvitePage ? "inviteYourTeam" : "#"}
                  className={({ isActive }) =>
                    isActive &&
                    location.pathname === "/onboarding/recruit/inviteYourTeam"
                      ? classes.active
                      : undefined
                  }
                  end
                >
                  <StepIcon isActive={isCompletePage} />
                  <span className={classes.span}>Invite Your Team</span>
                </NavLink> */}

                <NavLink
                  to={nextStep && isCompletePage ? "Complete" : "#"}
                  className={({ isActive }) =>
                    isActive && location.pathname === "/onboarding/Complete"
                      ? classes.active
                      : undefined
                  }
                >
                  <StepIcon isActive={isCompletePage} />
                  <span className={classes.span}>Start recruiting</span>
                </NavLink>
              </div>
            </div>
            <Outlet context={{ nextStep, setNextStep }} />
          </div>
        </div>
      </div>
    </body>
  );
};

const StepIcon = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <CheckCircleOutlineIcon fontSize="small" className={classes.svg} />
  ) : (
    <RadioButtonUncheckedIcon fontSize="small" className={classes.svg} />
  );
export default StepComppanyVerification;
