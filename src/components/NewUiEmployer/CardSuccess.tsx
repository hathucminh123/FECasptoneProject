import React, { useEffect, useState } from "react";
import classes from "./CardSuccess.module.css";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Biểu tượng thành công
import ErrorIcon from "@mui/icons-material/Error"; // Biểu tượng thất bại
import PaymentIcon from "@mui/icons-material/Payment"; // Biểu tượng thanh toán
import PaymentModal from "./PaymentModal";
import { AnimatePresence } from "framer-motion";
import { GetPaymentSubsciption } from "../../Services/PaymentSubscription/PaymentSubscription";
import { useQuery } from "@tanstack/react-query";

interface props {
  status?: string | null;
}

export default function CardSuccess({ status }: props) {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const status = queryParams.get("status");
  const userId = localStorage.getItem("userId");
  console.log("status", status);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: GetSubscriptions } = useQuery({
    queryKey: ["Payment", userId],
    queryFn: ({ signal }) =>
      GetPaymentSubsciption({ id: Number(userId), signal: signal }),
    enabled: !!userId,
    staleTime: 1000,
  });

  const PaymentSubscription = GetSubscriptions?.Subscriptions;

  const maxExpiredDate = PaymentSubscription?.filter((item) => item.expiredDate)
    .map((item) => new Date(item.expiredDate))
    .reduce((max, current) => (current > max ? current : max), new Date(0));

  console.log("kkkha", maxExpiredDate);
  useEffect(() => {
    if (status === "success" || maxExpiredDate) {
      // Định dạng thành "MM/DD/YYYY HH:mm:ss"
      const formattedDate = maxExpiredDate?.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      localStorage.setItem("IsPremium", "True");
      localStorage.setItem("PremiumExpireDate", formattedDate || "");
    }
  }, [status, maxExpiredDate]);

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
