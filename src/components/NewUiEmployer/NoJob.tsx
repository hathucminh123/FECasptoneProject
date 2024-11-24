import React, { useState } from "react";
import classes from "./NoJob.module.css";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import { AnimatePresence } from "framer-motion";
import PaymentModal from "./PaymentModal";
const NoJob: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const IsPremium = localStorage.getItem("IsPremium");

  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };

  const handlePostJobs = () => {
    if (IsPremium === "True") {
      navigate("/EmployerJob/jobs/create");
    } else {
      setOpenModal(true);
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
      <p className={classes.p}>No Jobs</p>
      <p className={classes.p1}>
        You do not need to post a job to start reaching out to candidates.
      </p>
      <div className={classes.main1}>
        <div className={classes.main2}>
          {/* <Link to="/EmployerJob/applicants" className={classes.link1}>
            <svg fill="none" height={20} width={20} viewBox="0 0 24 24">
              <path
                d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H11.5M20.2 20.2002L22 22.0002M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7ZM15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            Find Talent
          </Link> */}
          {/* <Link to="/EmployerJob/jobs/create" className={classes.link2}>
            <WorkIcon />
            Post Jobs
          </Link> */}

          <div className={classes.link2} onClick={handlePostJobs}>
            <WorkIcon />
            Post Jobs
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoJob;
