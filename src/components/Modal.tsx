import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./Modal.module.css";
import Typography from "@mui/material/Typography";
import React from "react";
import RenderButton from "./RenderButton";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onClickSubmit?: () => void;
  onClickReset?: () => void;
  isPending?: unknown;
  disappear?: boolean;
  text?: string;
  Appear?: boolean;
  height?:boolean;
}

export default function Modal({
  title,
  children,
  onClose,
  onClickSubmit,
  isPending,
  disappear,
  text,
  Appear,
  height,
  onClickReset
}: ModalProps) {
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div className={classes.backdrop}  onClick={onClose ? onClose : undefined}>
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
        <div className={classes.modal} style={height ?{ height:'500px' }: undefined} >
          <div className={classes.modal1}>
            <Typography
              variant="h2"
              sx={{ color: "#121212", fontSize: "22px", fontWeight: 700 }}
            >
              {title}
            </Typography>
          </div>
          <div className={classes.modal2}>{children}</div>
          <div className={classes.modal3}>
            <RenderButton
              text="Cancel"
              color="white"
              variant="outlined"
              onClick={onClose}
            />
            {Appear &&  (
              <RenderButton
                text="Reset Filter"
                color="white"
                variant="outlined"
                onClick={onClickReset}
              />
            ) }

            {disappear ? (
              <></>
            ) : isPending ? (
              <RenderButton
                text="Wait a minute"
                color="white"
                variant="outlined"
                disabled={true}
              />
            ) : (
              <RenderButton
                text={text}
                color="#4cd681"
                variant="contained"
                sxOverrides={{ minWidth: "180px" }}
                onClick={onClickSubmit}
              />
            )}
          </div>
        </div>
      </motion.dialog>
    </div>,
    modalRoot
  );
}
