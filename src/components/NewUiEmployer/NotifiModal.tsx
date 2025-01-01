import React, { useState } from "react";
import classes from "./NotifiModal.module.css";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import { AnimatePresence } from "framer-motion";
import PaymentModal from "./PaymentModal";
import { GetUserProfile } from "../../Services/UserProfileService/UserProfile";
import { useQuery } from "@tanstack/react-query";

const NotifiModal: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const IsPremium = localStorage.getItem("IsPremium");
  // const isPremiumExpired = () => {
  //   const expireDate = localStorage.getItem("PremiumExpireDate");

  //   if (!expireDate) {
  //     return true;
  //   }

  //   const expirationDate = new Date(expireDate);
  //   const currentDate = new Date();

  //   return expirationDate < currentDate;
  // };

  const userId = localStorage.getItem("userId");
  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };

  // const handlePostJobs = () => {
  //   if (IsPremium === "True") {
  //     navigate("/EmployerJob/jobs/create");

  //   } else {
  //     setOpenModal(true);
  //   }
  // };
  // const handleNavigate = () => {
  //   // if (isPremiumExpired()) {
  //   //   setOpenModal(true);
  //   //   return;
  //   // } else {
  //     navigate("/EmployerJob/jobs/create");
  //   // }
  // };
  const handleNavigate = () => {
    if (
      UserProfileData?.userAccountServices &&
      UserProfileData?.userAccountServices.length === 0
    ) {
      setOpenModal(true);
      return;
    } else {
      navigate("/EmployerJob/jobs/create");
    }
  };
  return (
    <div className={classes.main}>
      <AnimatePresence>
        {openModal && (
          <PaymentModal
            onClose={handleCloseModalPayment}
            // profile={profileScore}
            // id={idApplicants}
            // idJob={id}
          />
        )}
      </AnimatePresence>
      <p className={classes.p}>Post a job </p>
      <p className={classes.p1}>
        We have a lot of active job seekers. Let them know you are hiring
      </p>
      <div className={classes.main1}>
        {/* <Link to="/EmployerJob/jobs/create" className={classes.link}>
          <svg fill="none" height={16} width={16} viewBox="0 0 16 16">
            <path
              d="M2.56684 4.23096H13.1765C14.3177 4.23096 15.2433 5.15669 15.2433 6.29921V12.2062C15.2433 13.3487 14.3177 14.2744 13.1765 14.2744H2.56684C1.42562 14.2744 0.5 13.3487 0.5 12.2062V6.29921C0.5 5.15669 1.42562 4.23096 2.56684 4.23096Z"
              stroke="currentColor"
            ></path>
          </svg>
          <WorkIcon/>
          Post A Jobs
        </Link> */}
        <div className={classes.link} onClick={handleNavigate}>
          {/* <svg fill="none" height={16} width={16} viewBox="0 0 16 16">
            <path
              d="M2.56684 4.23096H13.1765C14.3177 4.23096 15.2433 5.15669 15.2433 6.29921V12.2062C15.2433 13.3487 14.3177 14.2744 13.1765 14.2744H2.56684C1.42562 14.2744 0.5 13.3487 0.5 12.2062V6.29921C0.5 5.15669 1.42562 4.23096 2.56684 4.23096Z"
              stroke="currentColor"
            ></path>
          </svg> */}
          <WorkIcon />
          Post A Jobs
        </div>
      </div>
    </div>
  );
};
export default NotifiModal;
