import React, { useState } from "react";
import classes from "./ChangePassword.module.css";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordUser } from "../../Services/AuthService/ChangePassword";
import { message } from "antd";

export default function ChangePassword() {
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

  const { mutate: ChangePassword } = useMutation({
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

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <div className={classes.container}>
      <form className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <div className={classes.formTitle}>Change Password</div>
          <div className={classes.formBody}>
            <div className={classes.formGroup}>
              <label htmlFor="currentPassword" className={classes.formLabel}>
                Current Password
              </label>
              <div className={classes.inputWrapper}>
                <div className={classes.inputContainer}>
                  <div className={classes.inputField}>
                    <input
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      value={formData.currentPassword}
                      placeholder="Input Your Current Password"
                      className={classes.inputElement}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="newPassword" className={classes.formLabel}>
                New Password
              </label>
              <div className={classes.inputWrapper}>
                <div className={classes.inputContainer}>
                  <div className={classes.inputField}>
                    <input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      autoComplete="new-password"
                      placeholder="Input Your New Password"
                      className={classes.inputElement}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="confirmPassword" className={classes.formLabel}>
                Confirm New Password
              </label>
              <div className={classes.inputWrapper}>
                <div className={classes.inputContainer}>
                  <div className={classes.inputField}>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      autoComplete="new-password"
                      placeholder="Confirm Your New Password"
                      className={classes.inputElement}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.buttonAction}>
              <div className={classes.btn1}>
                <Link to="/employer-verify/jobs" className={classes.link1}>
                  Cancel
                </Link>
                <button
                  className={classes.btn2}
                  onClick={handleUpdate}
                  type="submit" 
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
