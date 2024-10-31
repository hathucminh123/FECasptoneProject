import React, { useState } from "react";
import classes from "./Invite.module.css";
import Typography from "@mui/material/Typography";
import { EmailEmployees } from "../../Services/AuthService/EmailEmployeesService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
export default function Invite() {
  const [email, setEmail] = useState<string>("");

  const validateForm = () => {
    if (!email) {
      message.error("Email field cannot be empty.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: EmailEmployees,
    onSuccess: () => {
      message.success("Mail sent successfully");
      navigate("/onboarding/recruit/Complete");
    },
    onError: () => {
      message.error("Failed to update company details.");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({
        email: {
          email: email,
        },
      });

      // setUpdate(false);
    }
  };
  return (
    <section className={classes.section}>
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
        <form action="" onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.main}>
            <p className={classes.p}>
              Enter your team member's email, we will send them an invite to
              join Amazing Job.
            </p>
            <div className={classes.main1}>
              <input
                type="email"
                placeholder="e.g. person@gmail.com"
                className={classes.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.main2}></div>
          <div className={classes.button}>
            <Link
              to={"/onboarding/recruit/Complete"}
              className={classes.btn2}

              // onClick={() => setOpenRegister(false)}
            >
              Skip for Now
            </Link>
            {isPending ? (
              <button
                className={classes.btn1}
                style={{ marginLeft: 10 }}
                // type="submit"
              >
                Wait a seconds
              </button>
            ) : (
              <button
                className={classes.btn1}
                style={{ marginLeft: 10 }}
                type="submit"
              >
                Next up: Start recruiting
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
