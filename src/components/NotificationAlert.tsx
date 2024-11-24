import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

// Update interface name and typings for severity
interface AlertProps {
  showAlert: boolean;
  severity: "error" | "warning" | "info" | "success"; // Specific types for severity
  notification: string;
  location: string;
  link: string;
}


const NotificationAlert: React.FC<AlertProps> = ({
  showAlert,
  severity,
  notification,
  location,
  link,
}) => {
  return (
    <>
      {showAlert && (
        <Stack
          sx={{
            right: 0,
            top: "120px",
            marginRight: "48px",
            width: "400px",
            opacity: showAlert ? 1 : 0,
            zIndex: 11,
            backgroundColor: "#eaf9e9",
            padding: "16px 16px 16px 24px",
            borderRadius: "8px",
            position: "fixed",
            boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
            fontSize: "0.875rem",
            pointerEvents: "auto",
            transition: "opacity 0.15s linear",
          }}
        >
          <Alert severity={severity}>
            <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
            <div style={{ display: "block" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
              >
                {notification} <strong>{location}</strong>
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  color: "#0e2eed",
                  marginTop: "12px",
                }}
              >
                <Link
                  style={{ color: "#0e2eed", textDecoration: "none" }}
                  to={link}
                >
                  View list
                </Link>
              </div>
            </div>
          </Alert>
        </Stack>
      )}
    </>
  );
}
export default NotificationAlert