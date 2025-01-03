import React, { useEffect, useState } from "react";
import classes from "./SignInPageEmployer.module.css";
import Typography from "@mui/material/Typography";
import {  NavLink, useLocation, useNavigate } from "react-router-dom";
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
  Email: string;
}

export default function SignInPageJobSeekers() {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordShowRegister, setIsPasswordShowRegister] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<boolean | null>(null);
  const [isConfirmPasswordShowRegister, setConfirmIsPasswordShowRegister] =
    useState<boolean>(false);
  // const [check, setCheck] = useState<boolean>(false);

  // const [showAlert, setShowAlert] = useState<boolean>(false);
  // const navigate = useNavigate();
  // Error state management for registration form
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorslogin, setErrorslogin] = useState<{ [key: string]: string }>({});
  // const [errorsMessage,setErrorsMessage]=useState<string>("")
  const location = useLocation();
  const navigate = useNavigate();
  // const auth = localStorage.getItem("Auth");
  // useEffect(() => {
  //   if (auth) {
  //     const from = location.state?.from || "/";

  //     navigate(from);
  //   }
  // }, [auth, location.state, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const [formData, setFormData] = useState({
    // userName: "",
    email: "",
    fistName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: 0,
  });
  const [islogin, setIsLogin] = useState({
    userEmail: "",
    password: "",
  });

  const { mutate, error, isError, isPending, isSuccess, reset } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["Jobs"] });
      setFormData({
        // userName: "",
        email: "",
        fistName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        role: 0,
      });
      console.log(data);
      localStorage.setItem("userIdRegister", data.result);
      navigate("/Auth/Veritication");

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
      const userName = userInfo.name;
      const Email = userInfo.Email;
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 24);
      const token = data.result;
      const from = location.state?.from || "/";
      const redirectStateString = localStorage.getItem("redirectState");
      const redirectState = redirectStateString
        ? JSON.parse(redirectStateString)
        : {};

      const redirectStateString1 = localStorage.getItem("redirectStateJob");
      const redirectState1 = redirectStateString1
        ? JSON.parse(redirectStateString1)
        : {};
      const combinedState = { ...redirectState, ...redirectState1 };

      const redirectPath = localStorage.getItem("redirectPath") || "/";
      if (userRole === "jobseeker") {
        localStorage.setItem("Auth", "true");
        localStorage.setItem("name", userName);
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("Email", Email);

        // Combine both redirect states into one object

        localStorage.setItem("expiration", expiration.toISOString());

        navigate(from !== "/" ? from : redirectPath, { state: combinedState });
        // window.location.reload();
      } else {
        setAlertMessage(true);
      }

      setIsLogin({
        userEmail: "",
        password: "",
      });

      setTimeout(() => {
        LoginReset();
      }, 3000);
    },
    onError: () => {
      setIsLogin({
        userEmail: "",
        password: "",
      });
      //  console.log("error",data)
      //   setErrorsMessage(data.message)
      setTimeout(() => {
        LoginReset();
      }, 5000);
    },
  });

  // const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheck(e.target.checked);
  // };

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
    if (!islogin.userEmail) newErrors.userEmail = "Email is required";
    if (!islogin.password) newErrors.password = "Password is required";
    setErrorslogin(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // console.log("Form Submitted", formData);
      mutateLogin({ user: islogin });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for registration form
    const newErrors: { [key: string]: string } = {};

    // if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.fistName) newErrors.fistName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 7)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted", formData);
      mutate({ user: { ...formData, role: 0 } });
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
                    Access denied. This page is for job seekers account only.
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
                    {error?.name || "failed to create an Job Seeker Account"}
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
                    failed to Login Job Seeker Account
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
                    fontFamily: "Lexend, sans-serif",
                    // color: "#fff",
                    color: "#091615",
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
                    // color: "#fff",
                    color: "#091615",
                    fontFamily: "Lexend, sans-serif",
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
                          fontFamily: "Lexend, sans-serif",
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
                          fontFamily: "Lexend, sans-serif",
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
                        fontFamily: "Lexend, sans-serif",
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
                            fontFamily: "Lexend, sans-serif",
                          }}
                        >
                          Email
                        </label>
                        <div className={classes.input1}>
                          <div className={classes.logoinput}>
                            <span className={classes.span}>
                              <PersonIcon sx={{ fontSize: "14px" }} />
                            </span>
                          </div>

                          <TextField
                            id="outlined-username-input-login" // Updated the id for login username input
                            label="Email"
                            name="userEmail"
                            type="text"
                            required
                            autoComplete="name"
                            variant="outlined"
                            value={islogin.userEmail}
                            onChange={handleLoginChange}
                            error={Boolean(errorslogin.userEmail)}
                            helperText={errorslogin.userEmail}
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
                            fontFamily: "Lexend, sans-serif",
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
                            error={Boolean(errorslogin.password)}
                            helperText={errorslogin.password}
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
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Please wait a minute
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className={classes.btn}
                            style={{ fontFamily: "Lexend, sans-serif" }}
                          >
                            Sign in
                          </button>
                        )}
                        {/* <button type="submit" className={classes.btn}>
                          Sign in
                        </button> */}
                      </div>
                      {/* <div className={classes.forgot}>
                        <Link to={"/"} className={classes.link}>
                          Forgot Password
                        </Link>
                      </div> */}
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
                      fontFamily: "Lexend, sans-serif",
                    }}
                  >
                    Register for an Job Seeker Account
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
                        // color: "#dd3f24",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Login Information
                    </p>
                    {/* <div className={classes.form10}>
                      <label htmlFor="userName" className={classes.label}>
                        Username
                      </label>
                      <TextField
                        id="outlined-username-input-register" // Updated the id for register username input
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
                    </div> */}
                    <div className={classes.form10}>
                      <label
                        htmlFor="email"
                        className={classes.label}
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
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
                      <label
                        htmlFor="fistName"
                        className={classes.label}
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
                        First Name
                      </label>
                      <TextField
                        id="outlined-fistName-input"
                        name="fistName"
                        label="First Name"
                        type="text"
                        required
                        value={formData.fistName}
                        onChange={handleInputChange}
                        error={Boolean(errors.fistName)}
                        helperText={errors.fistName}
                        autoComplete="given-name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className={classes.form10}>
                      <label
                        htmlFor="lastName"
                        className={classes.label}
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
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
                      <label
                        htmlFor="password"
                        className={classes.label}
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
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
                        style={{ fontFamily: "Lexend, sans-serif" }}
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

                    {/* <div className={classes.check}>
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
                    </div> */}
                    {isPending ? (
                      <button
                        disabled
                        type="submit"
                        className={classes.button2}
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
                        Please wait a minute
                      </button>
                    ) : (
                      <button
                        // disabled={!check}
                        type="submit"
                        // className={check ? classes.button1 : classes.button2}
                        className={classes.button1}
                        style={{ fontFamily: "Lexend, sans-serif" }}
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
