import React, { useEffect, useState } from "react";
import classes from "./AuthVeritication.module.css";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import HttpsIcon from "@mui/icons-material/Https";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AuthService } from "../../Services/AuthService/AuthService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export default function AuthVerification() {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<boolean | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const userIdRegister = localStorage.getItem("userIdRegister");
  const navigate = useNavigate();

  const { mutate, error, isError, isPending, isSuccess, reset } = useMutation({
    mutationFn: AuthService,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["Jobs"] });
      

      message.success("Account Verification Complete")
      navigate("/JobSeekers/login");
      setAlertMessage(true)
      setTimeout(() => {
        reset();
      }, 3000);
    },
    onError: () => {
      message.error("Account Verification Failed")
      setAlertMessage(false)
      setTimeout(() => {
        reset();
      }, 5000);
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!verificationCode) {
      setErrors({ verificationCode: "Verification code is required" });
      return;
    }

    mutate({
      user: {
        userId: Number(userIdRegister),
        verificationCode: verificationCode,
      },
    });

    console.log("Verification code submitted: ", verificationCode);

    // Simulating successful verification
    // setAlertMessage(true);
    // navigate("/JobSeekers/login");
  };

  return (
    <main className={classes.main}>
        {isError && (
          <Stack
            sx={{
              left: "inherit",
              right: 0,
              top: "120px",
              bottom: "inherit",
              marginRight: "48px",
              width: "400px",
              opacity: isError ? 1 : 0,
              zIndex: 11,
              backgroundColor: "red",
              padding: "16px 16px 16px 24px",
              border: "none",
              borderRadius: "8px",
              maxWidth: "400px",
              position: "fixed",
              boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
              display: isError ? "block" : "none",
              fontSize: "0.875rem",
              pointerEvents: "auto",
              transition: "opacity 0.15s linear",
              boxSizing: "border-box",
            }}
          >
            <Alert severity="error">
              <AlertTitle>Faled</AlertTitle>
              <div style={{ display: "block" }}>
                <div
                  style={{
                    color: "#121212",
                    marginRight: "18px",
                    display: "block",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
                  >
                    {error?.name || "failed to create an Employer Account"}
                  </Typography>
                </div>
              </div>
            </Alert>
          </Stack>
        )}
      {isSuccess && (
        <Stack
          sx={{
            left: "inherit",
            right: 0,
            top: "120px",
            bottom: "inherit",
            marginRight: "48px",
            width: "400px",
            opacity: isSuccess ? 1 : 0,
            zIndex: 11,
            backgroundColor: "#eaf9e9",
            padding: "16px 16px 16px 24px",
            border: "none",
            borderRadius: "8px",
            maxWidth: "400px",
            position: "fixed",
            boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
            display: isSuccess ? "block" : "none",
            fontSize: "0.875rem",
            pointerEvents: "auto",
            transition: "opacity 0.15s linear",
            boxSizing: "border-box",
          }}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <div style={{ display: "block" }}>
              <div
                style={{
                  color: "#121212",
                  marginRight: "18px",
                  display: "block",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" ,fontFamily: "Lexend, sans-serif"}}
              
                >
                  You created JobSeeker Account Successfully
                </Typography>
              </div>
              {/* <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    color: "#0e2eed",
                    marginTop: "12px",
                  }}
                >
                  <Link
                    style={{ color: "#0e2eed", textDecoration: "none" }}
                    to={"/my-jobs"}
                  >
                    View list
                  </Link>
                </div> */}
            </div>
          </Alert>
        </Stack>
      )}
      <div className={classes.div}>
        <div className={classes.div1}>
          <div className={classes.divleft}>
            <div className={classes.form}>
              <div className={classes.title}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "36px",
                    margin: 0,
                    fontWeight: 700,
                  fontFamily: "Lexend, sans-serif",
                    // color: "#fff",
                    color: "#091615",
                    letterSpacing: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Account Verification
                </Typography>
                <p
                  style={{
                    fontSize: "18px",
                    margin: "8px 0 0 0",
                    textAlign: "center",
                    color: "#091615",
                    fontFamily: "Lexend, sans-serif"
                  }}
                >
                  Input your email verification code to continue using our
                  system services.
                </p>
              </div>
              <div className={classes.form1}>
                <ul className={classes.form2}>
                  <li className={classes.li}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      to={"/Auth/Veritication"}
                      end
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          cursor: "pointer",
                          fontSize: "1.125rem",
                          fontFamily: "Lexend, sans-serif"
                        }}
                      >
                        Email Verification
                      </span>
                    </NavLink>
                  </li>
                  <li className={classes.li}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                      to={"/Auth/PutVeritication"}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          cursor: "pointer",
                          fontSize: "1.125rem",

                          fontFamily: "Lexend, sans-serif"
                        }}
                      >
                        Update Email
                      </span>
                    </NavLink>
                  </li>
                </ul>
                <div className={classes.form3}>
                  <div className={classes.form4}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        marginBottom: "1.5rem",
                       fontFamily: "Lexend, sans-serif",
                        color: "#222831",
                        letterSpacing: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Input your email verification code
                    </Typography>

                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <div className={classes.input}>
                        <label
                          htmlFor="verificationCode"
                          style={{
                            fontWeight: 600,
                            fontFamily: "Lexend, sans-serif",
                            display: "inline-block",
                            marginBottom: ".5rem",
                          }}
                        >
                          Verification Code
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <HttpsIcon sx={{ fontSize: "14px" }} />
                            </span>
                          </div>
                          <TextField
                            id="verificationCode-input"
                            name="verificationCode"
                            label="Verification Code"
                            type={isPasswordShow ? "text" : "password"}
                            required
                            value={verificationCode}
                            onChange={handleVerificationChange}
                            error={Boolean(errors.verificationCode)}
                            helperText={errors.verificationCode}
                            variant="outlined"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderLeft: "none" },
                              },
                            }}
                          />
                          <span
                            className={classes.spanicon}
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                          >
                            {isPasswordShow ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </span>
                        </div>
                      </div>

                      {isPending ? (
                        <div className={classes.button}>
                          <button disabled={true} className={classes.btn} style={{fontFamily: "Lexend, sans-serif"}}> 
                            Wait a second
                          </button>
                        </div>
                      ) : (
                        <div className={classes.button}>
                          <button type="submit" className={classes.btn} style={{fontFamily: "Lexend, sans-serif"}}>
                            Submit
                          </button>
                        </div>
                      )}
                      {/* <div className={classes.button}>
                        <button type="submit" className={classes.btn}>
                          Submit
                        </button>
                      </div> */}
                    </Box>

                    {alertMessage && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                          Verification successful!
                        </Alert>
                      </Stack>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
