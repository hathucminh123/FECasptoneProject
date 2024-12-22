import React, { useState } from "react";
import classes from "./WaitingCompany.module.css";
import { NavLink, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
// import NotifiModal from "../../components/NewUiEmployer/NotifiModal";
import NoJob from "../../components/NewUiEmployer/NoJob";
import { AnimatePresence } from "framer-motion";
import PaymentModal from "../../components/NewUiEmployer/PaymentModal";

const  WaitingCompany:React.FC =()=> {
//   const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
//   const IsPremium = localStorage.getItem("IsPremium");


  const handleCloseModalPayment = () => {
    setOpenModal(false);
  };

//   const handlePostJobs = () => {
//     if (IsPremium ==="True") {
//       navigate("/EmployerJob/jobs/create");
//     } else {
//       setOpenModal(true);
//     }
//   };
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
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.main6}>
                  <header className={classes.header}>Jobs</header>
                  {/* <Link to="/EmployerJob/jobs/create" className={classes.link}>
                    {" "}
                    + Post Jobs
                  </Link> */}
                  {/* <div className={classes.link} onClick={handlePostJobs}>
                    {" "}
                    + Post Jobs
                  </div> */}
                </div>
                <div className={classes.main7}>
                  <input
                    type="search"
                    name="search"
                    className={classes.input}
                  />
                  <div className={classes.icon}>
                    <SearchIcon />
                  </div>
                </div>
                <nav className={classes.main8}>
                  <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active(0)</span>
                    </div>{" "}
                  </NavLink>
                  {/* <NavLink to="" className={classes.link1}>
                    <div className={classes.main9}>
                      <span>Active(0)</span>
                    </div>{" "}
                  </NavLink> */}
                </nav>
                {/* <div className={classes.main10}>
                  <NotifiModal/>
                </div> */}
              </div>
            </div>
          </div>
          <div className={classes.main11}>
            <div className={classes.main12}>
              <NoJob  text="Waiting for Company Approval" des="Your company profile is under review. Once approved, you can start posting jobs and reaching out to candidates."  />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}


export default WaitingCompany