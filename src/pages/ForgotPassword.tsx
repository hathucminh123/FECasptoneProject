// import { Box, Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import classes from "./ForgotPassword.module.css";
import { TextFieldForm } from "./SignInPage";
import { Link } from "react-router-dom";
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
export default function ForgotPassword() {
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
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              margin: "auto",
              backgroundColor: "#fff",
              mr: 10,
              p: 3,
              borderRadius: 2,
              justifyContent: "start",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "start", fontWeight: "bold", mb: 3 }}
            >
              Forgot password?
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { mb: 2 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                required
                autoComplete="email"
                variant="outlined"
                sx={{ width: "100%" }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "100%", mt: 2, padding: 1.5 }}
              >
                Reset Password
              </Button>
              <div className={classes.separator}>
                <span>or</span>
              </div>
              <Link to="/auth?mode=login">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ width: "100%", mt: 2, padding: 1.5 }}
                >
                  Sign in
                </Button>
              </Link>
            </Box>
          </Box>
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
              <TextFieldForm text="View salary to help you negotiate your offer or pay rise" />
              <TextFieldForm text="Find out about benefits, interview, company culture via reviews" />
              <TextFieldForm text="Easy apply with only 1 click" />
              <TextFieldForm text="Manage your own profile & privacy" />
            </motion.div>
          </Box>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
