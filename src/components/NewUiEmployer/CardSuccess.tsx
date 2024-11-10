import React, { useEffect, useState } from "react";
import classes from "./CardSuccess.module.css";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Biểu tượng thành công
import ErrorIcon from "@mui/icons-material/Error"; // Biểu tượng thất bại
import PaymentIcon from "@mui/icons-material/Payment"; // Biểu tượng thanh toán
import PaymentModal from "./PaymentModal";
import { AnimatePresence } from "framer-motion";

interface props {
  status?:string |null
}

export default function CardSuccess({status}:props) {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const status = queryParams.get("status");
  console.log("status", status);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (status === "success") {
      localStorage.setItem("IsPremium", "True");
    }
  }, [status]); // Thêm mảng phụ thuộc để đảm bảo useEffect chỉ chạy khi `status` thay đổi
  const handleCloseModalPayment = () => {
    setOpenModal(false);
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
      <div style={{ textAlign: "center" }}>
        {status === "success" ? (
          <div className={classes.successMessage}>
            <CheckCircleIcon className={classes.successIcon} />
            <p className={classes.successText}>Payment Successful!</p>
          </div>
        ) : (
          <div className={classes.errorMessage}>
            <ErrorIcon className={classes.errorIcon} />
            <p className={classes.errorText}>Payment Failed</p>
          </div>
        )}
        <p className={classes.p}></p>
        <p className={classes.p1}>
          You need to post a job now to start reaching out to candidates.
        </p>
        {status === "success" ? (
          <div className={classes.main1}>
            <div className={classes.main2}>
              <Link to="/EmployerJob/jobs/create" className={classes.link2}>
                <WorkIcon />
                Post Jobs now
              </Link>
            </div>
          </div>
        ) : (
          <div className={classes.main1}>
            <div className={classes.main2}>
              <div className={classes.link2} onClick={() => setOpenModal(true)}>
                <PaymentIcon />
                Payment Again
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
