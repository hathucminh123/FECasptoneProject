import React, { useState } from "react";
import classes from "./General.module.css";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { PutUser } from "../../Services/UserJobPostActivity/PutUser";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";

export default function General() {
  const [formData, setFormData] = useState({
    id: localStorage.getItem("userId") || "0",
    firstName: "",
    lastName: "",
    email: localStorage.getItem("Email"),
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: PutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Profile"],
        refetchType: "active",
      });
      message.success("User details updated successfully");
      setFormData({
        id: formData.id,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      }); // Reset form after successful update
    },
    onError: () => {
      message.error("Failed to update user details");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      mutate({
        data: {
          id: Number(formData.id),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || "",
          phoneNumber: formData.phoneNumber,
        },
      });
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      message.warning("Please fill in all required fields");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      message.warning("Please enter a valid email address");
      return false;
    }
    return true;
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
            Generals
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className={classes.main3}>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <label htmlFor="firstName" className={classes.label}>
                    First Name
                  </label>
                </div>
                <div className={classes.main5}>
                  <input
                    type="text"
                    className={classes.input}
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    required
                  />
                </div>
              </div>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <label htmlFor="lastName" className={classes.label}>
                    Last Name
                  </label>
                </div>
                <div className={classes.main5}>
                  <input
                    type="text"
                    className={classes.input}
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    required
                  />
                </div>
              </div>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <label htmlFor="email" className={classes.label}>
                    Email
                  </label>
                </div>
                <div className={classes.main5}>
                  <input
                    type="email"
                    className={classes.input}
                    name="email"
                    onChange={handleChange}
                    value={formData.email || ""}
                    disabled
                    style={{backgroundColor:"#dde2e7"}}

                    required
                  />
                </div>
              </div>
              <div className={classes.main3}>
                <div className={classes.main4}>
                  <label htmlFor="phoneNumber" className={classes.label}>
                    Phone Number
                  </label>
                </div>
                <div className={classes.main5}>
                  <input
                    type="text"
                    className={classes.input}
                    name="phoneNumber"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                  />
                </div>
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
                    {isPending ? "Saving..." : "Save Changes"}
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
