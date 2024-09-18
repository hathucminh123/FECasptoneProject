import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classes from "./Modal.module.css";
import Typography  from "@mui/material/Typography";
import { renderButton } from "./RenderButton";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    return null;
  }
  return createPortal(
 
   <div className={classes.backdrop} onClick={onClose ? onClose : undefined}> 
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
              <Typography
                variant="h2"
                sx={{ color: "#121212", fontSize: "22px", fontWeight: 700 }}
              >
                {title}
              </Typography>
            </div>
            <div className={classes.modal2}>{children}</div>
            <div className={classes.modal3}>
              {renderButton("Cancel", "white", "outlined")}
              {renderButton("Save", "#ed1b2f", "contained", {
                minWidth: "180px",
              })}
            </div>
          </div>
        </motion.dialog>
        </div>
    ,
    modalRoot
  );
}
