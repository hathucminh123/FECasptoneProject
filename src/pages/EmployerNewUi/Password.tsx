import React, { useState } from "react";
import classes from "./Password.module.css";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { ChangePasswordUser } from "../../Services/AuthService/ChangePassword";

export default function Password() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate: ChangePassword, isPending: isPending } = useMutation({
    mutationFn: ChangePasswordUser,
    onSuccess: () => {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      message.success("Password updated successfully!");
    },
    onError: () => {
      message.error("Failed to update password.");
    },
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    ChangePassword({
      user: {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      },
    });
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: "600",
              borderTop: "none",
              marginTop: "-14px",
              margin: "14px -14px",
              padding: "14px",
              borderBottom: "1px solid #e7e9eb",
            }}
          >
            <span style={{ color: "#999" }}>Settings {" / "}</span>
            Update Password
          </Typography>
          <form onSubmit={handleUpdate}>
            <div className={classes.main3}>
              <div className={classes.main4}>
                <label htmlFor="currentPassword" className={classes.label}>
                  Current Password
                </label>
              </div>
              <div className={classes.main5}>
                <input
                  type="password"
                  name="currentPassword"
                  className={classes.input}
                  onChange={handleChange}
                  value={formData.currentPassword}
                  required
                />
              </div>
            </div>
            <div className={classes.main3}>
              <div className={classes.main4}>
                <label htmlFor="newPassword" className={classes.label}>
                  New Password
                </label>
              </div>
              <div className={classes.main5}>
                <input
                  type="password"
                  name="newPassword"
                  className={classes.input}
                  onChange={handleChange}
                  value={formData.newPassword}
                  required
                />
              </div>
            </div>
            <div className={classes.main3}>
              <div className={classes.main4}>
                <label htmlFor="confirmPassword" className={classes.label}>
                  Confirm Password
                </label>
              </div>
              <div className={classes.main5}>
                <input
                  type="password"
                  name="confirmPassword"
                  className={classes.input}
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>
            </div>
            <div className={classes.main6}>
              <div className={classes.main7}>
                <span className={classes.main8}>
                  <button
                    type="submit"
                    disabled={isPending}
                    className={classes.inputbutton}
                  >
                    {isPending ? "Saving..." : "Update Password"}
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
