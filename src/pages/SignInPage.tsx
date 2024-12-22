import classes from "./SignInPage.module.css";
import React from "react";
import AuthForm from "../components/AuthForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { AnimatePresence, motion } from "framer-motion";
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.9,
    },
  },
  hidden: { opacity: 0 },
};

export default function SignInPage() {
  return (
    <div className={classes.container}>
      <AnimatePresence>
        <motion.div
          className={classes.containerleft}
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 },
          }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          initial="hidden"
          animate="visible"
        >
          <AuthForm />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className={classes.containerleft}
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 },
          }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flex: 1,
              flexDirection: "column",
              padding: 4,
              background: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Sign in to get instant access to thousands of reviews and salary
              information
            </Typography>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextFieldForm text="Manage skillSet data" />
              <TextFieldForm text="Manage JobType Data" />
              <TextFieldForm text="Manage Company Info" />
              <TextFieldForm text="Manage business stream " />
              <TextFieldForm text="Manage Benefit data" />
              {/* <TextFieldForm text="Access advanced analytics and reports" />
              <TextFieldForm text="Control platform settings and security configurations" /> */}
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface formText {
  text: string;
}

export const TextFieldForm: React.FC<formText> = ({ text }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        }}
        // exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", alignItems: "start" }}
      >
        <span>
          <DoneIcon style={{ color: "green" }} />
        </span>
        <Typography variant="body1" sx={{ mb: 2, ml: 2 }}>
          {text}
        </Typography>
      </motion.div>
    </AnimatePresence>
  );
};
