import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import { EmailEmployees } from "../../Services/AuthService/EmailEmployeesService";
import { message } from "antd";

interface ModalEmailProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalEmail({ open, onClose }: ModalEmailProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: EmailEmployees,
    onSuccess: () => {
      message.success("Mail sent successfully");
      setEmail(""); // Reset the form after success
      setError(""); // Clear any previous errors
    },
    onError: () => {
      message.error("Failed to send the email.");
    },
  });

  // Validate email format
  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(""); 
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({
        email: {
          email: email,
        },
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Invite new team member
        <IconButton onClick={onClose} sx={{ padding: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ padding: "24px" }}>
        <Typography variant="body1" sx={{ marginBottom: "8px" }}>
          Teammate email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Please enter the email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(error)} 
          helperText={error} 
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              padding: "10px",
            },
            marginBottom: "16px",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isPending ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Wait a second
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Invite teammate
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
