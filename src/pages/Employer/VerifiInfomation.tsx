import React, { useState } from "react";
import classes from "./VerifiInfomation.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
// import { IconButton } from "@mui/material";
export default function VerifiInfomation() {
  const [hovered, setHovered] = useState<null | string>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(event.currentTarget.textContent || null);
  };
  const handleMouseLeave = () => {
    setHovered(null);
  };
  const userId = localStorage.getItem("userId");
  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  const navigate = useNavigate();
  return (
    <main className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <span className={classes.span}>Welcome,</span>
              <span className={classes.span1}>{UserProfileData?.firstName}{UserProfileData?.lastName}</span>
            </div>
            <div className={classes.main5}>
              <span>
                Please verify your company information to start searching for
                CVs or posting job listings and receiving applications for your
                job postings.
              </span>
            </div>
            <div className={classes.main6}>
              <div
                className={classes.main7}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={classes.main8}>
                  <span> Update Company Infomation</span>
                </div>
                <span
                  className={classes.span2}
                  style={
                    hovered
                      ? { background: "#FF6F61", color: "white" }
                      : undefined
                  }
                  onClick={() =>
                    navigate("/employer-verify/jobs/account/Choosecompany")
                  }
                >
                  <ArrowForwardIcon
                    style={hovered ? { color: "white" } : undefined}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
