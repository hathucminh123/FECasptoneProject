import React, { useState } from "react";
import classes from "./Complete.module.css";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import { AnimatePresence } from "framer-motion";
import PaymentModal from "../../components/NewUiEmployer/PaymentModal";

const Complete:React.FC =()=> {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const IsPremium = localStorage.getItem("IsPremium");
  console.log("duochua", IsPremium);

  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };

  const handlePostJobs = () => {
    // if (IsPremium === "True") {
      navigate("/EmployerJob");
    // } else {
    //   setOpenModal(true);
    // }
  };
  return (
    <section className={classes.section}>
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
      <div className={classes.main}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "30px",
            marginBottom: ".75rem",
            // margin: 0,
            padding: 0,
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "none",
          }}
        >
          Team Members
        </Typography>
        <p className={classes.p}>
          Amzing Job offers two seamless paths: source talent directly or post a
          job for free. Your journey to discovering standout hires starts here.
        </p>
        <div className={classes.main1}>
          {/* <Link to="/EmployerJob/applicants" className={classes.link1}>
            <GroupIcon />
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
    </section>
  );
}
export default Complete