import React, { useState } from "react";
import classes from "./SignInPageEmployer.module.css";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function SignInPageEmployer() {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordShowRegister, setIsPasswordShowRegister] =
    useState<boolean>(false);
  const [isConfirmPasswordShowRegister, setConfirmIsPasswordShowRegister] =
    useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  const handleRegister = (e: React.FormEvent) => {
   console.log( e.preventDefault())
    // Handle registration logic here (e.g., call an API)
  };
  return (
    <main className={classes.main}>
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
                    fontFamily: "Roboto, Helvetica, Verdana, Arial, sans-serif",
                    color: "#222831",
                    letterSpacing: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Register/Login
                </Typography>
                <p
                  style={{
                    fontSize: "18px",
                    margin: "8px 0 0 0",
                    padding: 0,
                    boxSizing: "border-box",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Link your account to continue using our system services.
                </p>
              </div>
              <div className={classes.form1}>
                <ul className={classes.form2}>
                  <li className={classes.li}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      to={"/employers/login"}
                      end
                    >
                      {" "}
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          textAlign: "center",
                          cursor: "pointer",
                          fontSize: "1.125rem",
                          fontFamily:
                            "Roboto, Helvetica, Verdana, Arial, sans-serif",
                          listStyle: "none",
                        }}
                      >
                        Employer
                      </span>
                    </NavLink>
                  </li>
                  <li className={classes.li}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                      end
                      to={"/afu"}
                    >
                      {" "}
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          textAlign: "center",
                          cursor: "pointer",
                          fontSize: "1.125rem",
                          fontFamily:
                            "Roboto, Helvetica, Verdana, Arial, sans-serif",
                          listStyle: "none",
                        }}
                      >
                        Jobs Seeker
                      </span>
                    </NavLink>
                  </li>
                </ul>
                <div className={classes.form3}>
                  {/* oulet */}
                  <div className={classes.form4}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        marginBottom: "1.5rem",
                        fontFamily:
                          "Roboto, Helvetica, Verdana, Arial, sans-serif",
                        color: "#222831",
                        letterSpacing: 0,
                        lineHeight: 1.5,
                        marginTop: "0px",

                        boxSizing: "border-box",
                      }}
                    >
                      Please Login to continue using our services
                    </Typography>

                    <Box component="form" noValidate autoComplete="off">
                      <div className={classes.input}>
                        <label
                          htmlFor="username"
                          style={{
                            fontWeight: 600,
                            display: "inline-block",
                            marginBottom: ".5rem",

                            boxSizing: "border-box",
                          }}
                        >
                          ID Account
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <PersonIcon
                                sx={{
                                  display: "inline-block",
                                  fontFamily: "FontAwesome",
                                  fontWeight: "normal",
                                  fontStyle: "normal",
                                  fontSize: "14px",
                                  lineHeight: 1,
                                  textRendering: "auto",
                                  WebkitFontSmoothing: "antialiased",
                                  margin: 0,
                                  padding: 0,
                                  boxSizing: "border-box",
                                  "&::before": {
                                    content: '"\\f007"',
                                  },
                                }}
                              />
                            </span>
                          </div>

                          <TextField
                            id="outlined-email-input"
                            label="Email | Username"
                            type="text"
                            required
                            autoComplete="email"
                            variant="outlined"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderLeft: "none",
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className={classes.input}>
                        <label
                          htmlFor="username"
                          style={{
                            fontWeight: 600,
                            display: "inline-block",
                            marginBottom: ".5rem",

                            boxSizing: "border-box",
                          }}
                        >
                          Password
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <HttpsIcon
                                sx={{
                                  display: "inline-block",
                                  fontFamily: "FontAwesome",
                                  fontWeight: "normal",
                                  fontStyle: "normal",
                                  fontSize: "14px",
                                  lineHeight: 1,
                                  textRendering: "auto",
                                  WebkitFontSmoothing: "antialiased",
                                  margin: 0,
                                  padding: 0,
                                  boxSizing: "border-box",
                                  "&::before": {
                                    content: '"\\f007"',
                                  },
                                }}
                              />
                            </span>
                          </div>

                          <TextField
                            id="outlined-email-input"
                            label="Password"
                            type={isPasswordShow ? "text" : "password"}
                            required
                            autoComplete="email"
                            variant="outlined"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderLeft: "none",
                                },
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
                      <p className={classes.p}>
                        By logging in, you agree to our Terms of Use and Privacy
                        Policy
                      </p>

                      <div className={classes.button}>
                        <button type="submit" className={classes.btn}>Sign in</button>
                      </div>
                      <div className={classes.forgot}>
                        <Link to={"/"} className={classes.link}>
                          Forgot Password
                        </Link>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.divright}>
            <div className={classes.main1}>
              <div className={classes.main2}>
                <div className={classes.main3}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "18px",

                      fontWeight: 500,
                      fontFamily:
                        "Roboto, Helvetica, Verdana, Arial, sans-serif",
                      color: "#222831",
                      letterSpacing: 0,
                      lineHeight: 1.5,
                      marginBottom: ".5rem",
                      marginTop: "0px",
                    }}
                  >
                    Register for an Employer Account
                  </Typography>
                  <p
                    style={{
                      marginTop: "0px",
                      marginBottom: "1rem",
                      boxSizing: "border-box",
                    }}
                  >
                    Create an account now to recruit Top Programmers
                  </p>
                  <Box component="form" noValidate autoComplete="off"  onSubmit={handleRegister}>
                    <p
                      style={{
                        color: "#dd3f24",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                        marginTop: "0px",
                      }}
                    >
                      Login Information
                    </p>

                    <div className={classes.form10}>
                      <label htmlFor="email" className={classes.label}>
                        {" "}
                        Email
                      </label>
                      <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        required
                        autoComplete="email"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {},
                          },
                        }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="email" className={classes.label}>
                        {" "}
                        Phone
                      </label>
                      <TextField
                        id="outlined-email-input"
                        label="Phone Number"
                        type="number"
                        required
                        autoComplete="number"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {},
                          },
                        }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="email" className={classes.label}>
                        {" "}
                        Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <TextField
                          id="outlined-email-input"
                          label="Password"
                          type={isPasswordShowRegister ? "text" : "password"}
                          required
                          autoComplete="password"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {},
                            },
                          }}
                        />
                        <span
                          className={classes.spanicon}
                          onClick={() =>
                            setIsPasswordShowRegister(!isPasswordShowRegister)
                          }
                        >
                          {isPasswordShowRegister ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="email" className={classes.label}>
                        {" "}
                        Confirm Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <TextField
                          id="outlined-email-input"
                          label="Confirm Password"
                          type={
                            isConfirmPasswordShowRegister ? "text" : "password"
                          }
                          required
                          autoComplete="password"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {},
                            },
                          }}
                        />
                        <span
                          className={classes.spanicon}
                          onClick={() =>
                            setConfirmIsPasswordShowRegister(
                              !isConfirmPasswordShowRegister
                            )
                          }
                        >
                          {isConfirmPasswordShowRegister ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#dd3f24",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                        marginTop: "0px",
                      }}
                    >
                      Company Information
                    </p>

                    <div className={classes.check}>
                      <input
                        id="checkbox1"
                        type="checkbox"
                        className={classes.check1}
                        onChange={handleCheck}
                      />
                      <span className={classes.label1}>
                        {" "}
                        I have read and accept the Terms of Use and Privacy
                        Policy
                      </span>
                   
                    </div>

                    <button disabled={!check} type="submit" className={` ${check? classes.button1:classes.button2}`}>
                      Register
                    </button>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
