import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./AuthForm.module.css";
import React from "react";
import {
  useLocation,
  useNavigate,
  // useSearchParams,
} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../Services/mainService";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { login } from "../Services/AuthService/Login";
// import { message } from "antd";
// import { message } from "antd";

interface CustomJwtPayload extends JwtPayload {
  Role: string;
  UserId: string;
  name: string;
  CompanyId: string;
  Email:string
  IsPremium:string
  PremiumExpireDate:string
}

const AuthForm: React.FC = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const [searchParams] = useSearchParams();
  // const isLogin = searchParams.get("mode") === "login";
  const auth = localStorage.getItem("auth");
  // const redirectPath = localStorage.getItem("redirectPath");
  // console.log("mememe", redirectPath);
  // const from = location.state?.from;
  // console.log("adu", from);
  useEffect(() => {
    if (auth) {
      const from = location.state?.from || "/";

      navigate(from);
    }
  }, [auth, location.state, navigate]);
  // const handleSignin = () => {
  //   localStorage.setItem("auth", "isAuth");

  //   const from = location.state?.from || "/";

  //   const redirectPath = localStorage.getItem("redirectPath") || "/";

  //   const redirectStateString = localStorage.getItem("redirectState");
  //   const redirectState = redirectStateString
  //     ? JSON.parse(redirectStateString)
  //     : {};

  //   const redirectStateString1 = localStorage.getItem("redirectStateJob");
  //   const redirectState1 = redirectStateString1
  //     ? JSON.parse(redirectStateString1)
  //     : {};

  //   // Combine both redirect states into one object
  //   const combinedState = { ...redirectState, ...redirectState1 };

  //   navigate(from !== "/" ? from : redirectPath, { state: combinedState });
  // };

  const [islogin, setIsLogin] = useState({
    userEmail: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsLogin({
      ...islogin,
      [name]: value,
    });
  };

  const {
    mutate: mutateLogin,
    // isError: isLoginError,
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
      const CompanyId = userInfo.CompanyId;
      const Email =userInfo.Email
      const IsPremium=userInfo.IsPremium
      const PremiumExpireDate=userInfo.PremiumExpireDate
      expiration.setHours(expiration.getHours() + 24);
      const token = data.result;
      // if (userRole === "Admin") {
        localStorage.setItem("Auth", "true");
        localStorage.setItem("name", userName);
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("CompanyId", CompanyId);
        localStorage.setItem("Email", Email);
        localStorage.setItem('IsPremium',IsPremium)
        localStorage.setItem('PremiumExpireDate',PremiumExpireDate)

        localStorage.setItem("expiration", expiration.toISOString());
        // if(CompanyId && CompanyId !== "null") {
        //   navigate("/EmployerJob");
        // } else{
        //   navigate("/onboarding/recruit");
        // }

        navigate("/Admin");
      // } else {
      // message.error("login Failed")
      // }

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
      // console.log("error",data.name)
      // setErrorsMessage(data.message)
      setTimeout(() => {
        LoginReset();
      }, 5000);
    },
  });

  const [errorslogin, setErrorslogin] = useState<{ [key: string]: string }>({});
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

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: "100%",
        maxWidth: "500px",
        margin: "auto",
        backgroundColor: "#fff",
        // mt: 4,
        mr: 10,
        p: 3,
        // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        justifyContent: "start",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "start", fontWeight: "bold", mb: 3 }}
      >
        Admin Portal Login
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "start", mb: 3 }}>
        By signing in, you agree to the Admin Portal’s Terms & Conditions and
        Privacy Policy regarding data management and user confidentiality.
      </Typography>
      <div className={classes.separator}>
        <span>or</span>
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 2, // Add spacing between fields
        }}
        noValidate
        autoComplete="off"
      >
        {/* {!isLogin && (
          <TextField
            id="outlined-email-input"
            label="Your Name"
            type="text"
            required
            autoComplete="email"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        )} */}

        <TextField
          id="outlined-email-input"
          label="Email"
          type="text"
          name="userEmail"
          required
          value={islogin.userEmail}
          onChange={handleLoginChange}
          error={Boolean(errorslogin.userEmail)}
          helperText={errorslogin.userEmail}
          // autoComplete="email"
          variant="outlined"
          sx={{ width: "100%" }}
        />

        {/* <Typography
          variant="body1"
          sx={{
            textAlign: "end",
            color: "#0000FF",
            fontWeight: 400,
            "&:hover": { color: "#0e2eed" },
          }}
        >
          <Link to="/new" style={{ textDecoration: "none", color: "inherit" }}>
            Reset admin password?
          </Link>
        </Typography> */}

        <div style={{ position: "relative", width: "100%" }}>
          <span
            onClick={() => setIsPasswordShow(!isPasswordShow)}
            style={{
              zIndex: 10,
              position: "absolute",
              top: "15px",
              right: "8px",
              cursor: "pointer",
            }}
          >
            {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
          <TextField
            id="outlined-password-input"
            name="password"
            label="Password"
            onChange={handleLoginChange}
            value={islogin.password}
            type={isPasswordShow ? "text" : "password"}
            autoComplete="current-password"
            required
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </div>
        {/* 
        {!isLogin && (
          <div style={{ position: "relative", width: "100%" }}>
            <span
              onClick={() => setIsPasswordShow(!isPasswordShow)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "15px",
                right: "8px",
                cursor: "pointer",
              }}
            >
              {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type={isPasswordShow ? "text" : "password"}
              autoComplete="current-password"
              required
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>
        )} */}
        {LoginPending ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "100%", mt: 2, padding: 1.5 }}
            // onClick={handleSignin}
          >
            {/* {isLogin ? "ADMIN LOGIN" : "Sign Up with Email"} */}
            Wait a seconds
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "100%", mt: 2, padding: 1.5 }}
            onClick={handleLogin}
          >
            {/* {isLogin ? "ADMIN LOGIN" : "Sign Up with Email"} */}
            Admin Login
          </Button>
        )}

        {/* <div>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 3 }}>
            {isLogin ? " Do not have an account?" : "Already have an account?"}

            <Link
              style={{ color: "#0000FF", textDecoration: "none" }}
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              {" "}
              {isLogin ? "Sign up now!" : "Sign In Now!"}
            </Link>
          </Typography>
        </div> */}
      </Box>
    </Box>
  );
};
export default AuthForm;
