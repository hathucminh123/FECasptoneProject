import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./AuthForm.module.css";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function AuthForm() {

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const auth = localStorage.getItem("auth");
  const redirectPath = localStorage.getItem("redirectPath");
  console.log("mememe", redirectPath);
  const from = location.state?.from;
  console.log("adu", from);
  useEffect(() => {
    if (auth) {
      const from = location.state?.from || "/";

      navigate(from);
    }
  }, [auth, location.state, navigate]);
  const handleSignin = () => {

    localStorage.setItem("auth", "isAuth");
  
    const from = location.state?.from || "/";

    const redirectPath = localStorage.getItem("redirectPath") || "/";
  
    const redirectStateString = localStorage.getItem("redirectState");
    const redirectState = redirectStateString ? JSON.parse(redirectStateString) : {};
  

    const redirectStateString1 = localStorage.getItem("redirectStateJob");
    const redirectState1 = redirectStateString1 ? JSON.parse(redirectStateString1) : {};
  
    // Combine both redirect states into one object
    const combinedState = { ...redirectState, ...redirectState1 };
  

    navigate(from !== "/" ? from : redirectPath, { state: combinedState });
  };
  
  return (
    <Box
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
        Welcome Back
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "start", mb: 3 }}>
        By signing in, you agree to ITviec’s Terms & Conditions and Privacy
        Policy in relation to your privacy information.
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
        {!isLogin && (
          <TextField
            id="outlined-email-input"
            label="Your Name"
            type="text"
            required
            autoComplete="email"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        )}

        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          required
          autoComplete="email"
          variant="outlined"
          sx={{ width: "100%" }}
        />

        {isLogin && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "end",
              color: "#0000FF",
              fontWeight: 400,
              "&:hover": { color: "#0e2eed" },
            }}
          >
            <Link
              to="/new"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Forgot password?
            </Link>
          </Typography>
        )}

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
            label="Password"
            type={isPasswordShow ? "text" : "password"}
            autoComplete="current-password"
            required
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </div>

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
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "100%", mt: 2, padding: 1.5 }}
          onClick={handleSignin}
        >
          {isLogin ? "Sign In with Email" : "Sign Up with Email"}
        </Button>
        <div>
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
        </div>
      </Box>
    </Box>
  );
}
