import React, { useEffect, useState } from "react";
import classes from "./SignInPageEmployer.module.css";
import Typography from "@mui/material/Typography";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import HttpsIcon from "@mui/icons-material/Https";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { register } from "../../Services/AuthService/Register";
import { queryClient } from "../../Services/mainService";
import { useMutation } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { login } from "../../Services/AuthService/Login";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  Role: string;
  UserId: string;
  name: string;
  CompanyId:string
}

export default function SignInPageEmployer() {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordShowRegister, setIsPasswordShowRegister] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<boolean | null>(null);
  const [isConfirmPasswordShowRegister, setConfirmIsPasswordShowRegister] =
    useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  // const navigate = useNavigate();
  // Error state management for registration form
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: 1,
  });
  const [islogin, setIsLogin] = useState({
    userName: "",
    password: "",
  });

  const { mutate, error, isError, isPending, isSuccess, reset } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["Jobs"] });
      setFormData({
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        role: 0,
      });
      setTimeout(() => {
        reset();
      }, 3000);
    },
    onError: () => {
      setTimeout(() => {
        reset();
      }, 5000);
    },
  });

  const navigate = useNavigate();
  const {
    mutate: mutateLogin,
    isError: isLoginError,
    reset: LoginReset,
    isPending: LoginPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Jobs"] });

      const userInfo = jwtDecode<CustomJwtPayload>(data.result);
      console.log(userInfo);
      const userRole = userInfo.Role.toLowerCase();
      const userId = userInfo.UserId.toLowerCase();
      const expiration = new Date();
      const userName = userInfo.name;
      const CompanyId=userInfo.CompanyId
      expiration.setHours(expiration.getHours() + 1);
      const token = data.result;
      if (userRole === "employer") {
        localStorage.setItem("Auth", "true");
        localStorage.setItem("name", userName);
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("CompanyId",CompanyId)

        localStorage.setItem("expiration", expiration.toISOString());
        navigate("/employer-verify/jobs");
      } else {
        setAlertMessage(true);
      }

      setIsLogin({
        userName: "",
        password: "",
      });

      setTimeout(() => {
        LoginReset();
      }, 3000);
    },
    onError: () => {
      setIsLogin({
        userName: "",
        password: "",
      });
      setTimeout(() => {
        LoginReset();
      }, 5000);
    },
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsLogin({
      ...islogin,
      [name]: value,
    });
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!islogin.userName) newErrors.userName = "Username is required";
    if (!islogin.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // console.log("Form Submitted", formData);
      mutateLogin({ user: islogin });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for registration form
    const newErrors: { [key: string]: string } = {};

    if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted", formData);
      mutate({ user: { ...formData, role: 1 } });
    }
  };

  return (
    <main className={classes.main}>
      <div className={classes.div}>
        {alertMessage && (
          <Stack
            sx={{
              left: "inherit",
              right: 0,
              top: "120px",
              bottom: "inherit",
              marginRight: "48px",
              width: "400px",
              opacity: alertMessage ? 1 : 0,
              zIndex: 11,
              backgroundColor: "red",
              padding: "16px 16px 16px 24px",
              border: "none",
              borderRadius: "8px",
              maxWidth: "400px",
              position: "fixed",
              boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
              display: alertMessage ? "block" : "none",
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
                    "Access denied. This page is for Employer account only."
                  </Typography>
                </div>
              </div>
            </Alert>
          </Stack>
        )}
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
        {isLoginError && (
          <Stack
            sx={{
              left: "inherit",
              right: 0,
              top: "120px",
              bottom: "inherit",
              marginRight: "48px",
              width: "400px",
              opacity: isLoginError ? 1 : 0,
              zIndex: 11,
              backgroundColor: "red",
              padding: "16px 16px 16px 24px",
              border: "none",
              borderRadius: "8px",
              maxWidth: "400px",
              position: "fixed",
              boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
              display: isLoginError ? "block" : "none",
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
                    failed to Login Employer Account
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
                    sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
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
                    color: "#fff",
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
                    textAlign: "center",
                    color:'#fff'
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
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          cursor: "pointer",
                          fontSize: "1.125rem",
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
                      to={"/JobSeekers/login"}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#424242",
                          cursor: "pointer",
                          fontSize: "1.125rem",
                        }}
                      >
                        Job Seeker
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
                        fontFamily:
                          "Roboto, Helvetica, Verdana, Arial, sans-serif",
                        color: "#222831",
                        letterSpacing: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Please Login to continue using our services
                    </Typography>

                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                      onSubmit={handleLogin}
                    >
                      <div className={classes.input}>
                        <label
                          htmlFor="userName"
                          style={{
                            fontWeight: 600,
                            display: "inline-block",
                            marginBottom: ".5rem",
                          }}
                        >
                          Username
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <PersonIcon sx={{ fontSize: "14px" }} />
                            </span>
                          </div>

                          <TextField
                            id="outlined-username-input"
                            label="Email | Username"
                            name="userName"
                            type="text"
                            required
                            autoComplete="name"
                            variant="outlined"
                            value={islogin.userName}
                            onChange={handleLoginChange}
                            error={Boolean(errors.userName)}
                            helperText={errors.userName}
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderLeft: "none" },
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className={classes.input}>
                        <label
                          htmlFor="password"
                          style={{
                            fontWeight: 600,
                            display: "inline-block",
                            marginBottom: ".5rem",
                          }}
                        >
                          Password
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <HttpsIcon sx={{ fontSize: "14px" }} />
                            </span>
                          </div>
                          <TextField
                            id="outlined-password-input"
                            name="password"
                            label="Password"
                            type={isPasswordShow ? "text" : "password"}
                            required
                            value={islogin.password}
                            onChange={handleLoginChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            autoComplete="new-password"
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
                      <p className={classes.p}>
                        By logging in, you agree to our Terms of Use and Privacy
                        Policy
                      </p>

                      <div className={classes.button}>
                        {LoginPending ? (
                          <button
                            disabled
                            type="submit"
                            className={classes.button2}
                          >
                            Please wait a minute
                          </button>
                        ) : (
                          <button type="submit" className={classes.btn}>
                            Sign in
                          </button>
                        )}
                        {/* <button type="submit" className={classes.btn}>
                          Sign in
                        </button> */}
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
                      marginBottom: ".5rem",
                    }}
                  >
                    Register for an Employer Account
                  </Typography>
                  <p style={{ marginTop: "0px", marginBottom: "1rem" }}>
                    Create an account now to recruit Top Programmers
                  </p>
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleRegister}
                  >
                    <p
                      style={{
                        color: "#dd3f24",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Login Information
                    </p>
                    <div className={classes.form10}>
                      <label htmlFor="userName" className={classes.label}>
                        Username
                      </label>
                      <TextField
                        id="outlined-username-input"
                        name="userName"
                        label="Username"
                        type="text"
                        required
                        autoComplete="userName"
                        variant="outlined"
                        value={formData.userName}
                        onChange={handleInputChange}
                        error={Boolean(errors.userName)}
                        helperText={errors.userName}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="email" className={classes.label}>
                        Email
                      </label>
                      <TextField
                        id="outlined-email-input"
                        name="email"
                        label="Email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="firstName" className={classes.label}>
                        First Name
                      </label>
                      <TextField
                        id="outlined-firstname-input"
                        name="firstName"
                        label="First Name"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName}
                        autoComplete="given-name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="lastName" className={classes.label}>
                        Last Name
                      </label>
                      <TextField
                        id="outlined-lastname-input"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName}
                        autoComplete="family-name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label htmlFor="password" className={classes.label}>
                        Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <TextField
                          id="outlined-password-input"
                          name="password"
                          label="Password"
                          type={isPasswordShowRegister ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          error={Boolean(errors.password)}
                          helperText={errors.password}
                          autoComplete="new-password"
                          variant="outlined"
                          sx={{ width: "100%" }}
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
                      <label
                        htmlFor="confirmPassword"
                        className={classes.label}
                      >
                        Confirm Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <TextField
                          id="outlined-confirm-password-input"
                          name="confirmPassword"
                          label="Confirm Password"
                          type={
                            isConfirmPasswordShowRegister ? "text" : "password"
                          }
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          error={Boolean(errors.confirmPassword)}
                          helperText={errors.confirmPassword}
                          autoComplete="new-password"
                          variant="outlined"
                          sx={{ width: "100%" }}
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
                    {/* <p
                      style={{
                        color: "#dd3f24",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Company Information
                    </p> */}

                    <div className={classes.check}>
                      <input
                        id="checkbox1"
                        type="checkbox"
                        className={classes.check1}
                        onChange={handleCheck}
                      />
                      <span className={classes.label1}>
                        I have read and accept the Terms of Use and Privacy
                        Policy
                      </span>
                    </div>
                    {isPending ? (
                      <button
                        disabled
                        type="submit"
                        className={classes.button2}
                      >
                        Please wait a minute
                      </button>
                    ) : (
                      <button
                        disabled={!check}
                        type="submit"
                        className={check ? classes.button1 : classes.button2}
                      >
                        Register
                      </button>
                    )}
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
