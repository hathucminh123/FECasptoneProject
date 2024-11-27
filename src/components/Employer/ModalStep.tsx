import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./ModalStep.module.css";
import Typography from "@mui/material/Typography";
import React from "react";
// import RenderButton from "./RenderButton";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onClickSubmit?: () => void;
  isPending?: unknown;
  disappear?: boolean;
}

export default function ModalStep({
  //   title,
  //   children,
  onClose,
}: //   onClickSubmit,
//   isPending,
//   disappear,
ModalProps) {
  const modalRoot = document.getElementById("modall");

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <body className={classes.body}>
      <div
        style={{ boxSizing: "inherit", borderWidth: 0, borderStyle: "solid" }}
      >
        <div
          className={classes.backdrop}
          onClick={onClose ? onClose : undefined}
        >
          <motion.dialog
            onClick={(e) => e.stopPropagation()}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            initial="hidden"
            animate="visible"
            // exit="hidden"
            // whileHover="hidden"
            open
            className={classes.modall}
          >
            <div className={classes.modal}>
              <div className={classes.modal1}>
                <div className={classes.modal2}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#121212",
                      fontSize: "24px",
                      fontWeight: 500,
                      marginBottom: ".75rem",
                      //   lineHeight: 30,
                      lineHeight: 1.5,
                      padding: 0,
                      boxSizing: "border-box",
                      borderWidth: 0,
                      borderStyle: "none",
                    }}
                  >
                    Candidates are waiting
                  </Typography>
                  <p className={classes.p1}>
                    We make it easy for you to connect with high-quality startup
                    talent who are ready for a new challenge. Start sourcing
                    today:
                  </p>
                  <ol className={classes.ol}>
                    <li className={classes.li}>Set up your account</li>
                    {/* <li className={classes.li}>Invite your team</li> */}
                    <li className={classes.li}>Start recruiting</li>
                  </ol>
                  <div className={classes.button} >
                    <button className={classes.btn1} onClick={onClose}>Let get Started</button>
                    <span className={classes.span1}>
                      It takes less than five minutes!
                    </span>
                  </div>
                </div>
                <div className={classes.right}>
                  <img
                    className={classes.img}
                    src="https://wellfound.com/images/talent/recruiter_onboarding/illustration_welcome.png"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </motion.dialog>
        </div>
      </div>
    </body>,
    modalRoot
  );
}
