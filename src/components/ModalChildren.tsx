import React, { useState } from "react";
import Modal from "./Modal";
import { Box, TextField, Typography } from "@mui/material";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import classes from "./ModalChildren.module.css";
import Image from "./../assets/image/minh.jpg";
import { PutUser } from "../Services/UserJobPostActivity/PutUser";
import { queryClient } from "../Services/mainService";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

interface Props {
  onDone?: () => void;
}

export default function ModalChildren({ onDone }: Props) {
  const [formData, setFormData] = useState({
    id: localStorage.getItem("userId") || "0", // Lấy userId từ localStorage
    // userName: "",
    firstName: "",
    lastName: "",
    email: localStorage.getItem("Email"),
    phoneNumber: "",
  });

  // const theme = useTheme();

  // const [personName, setPersonName] = useState<string[]>([]);

  // useEffect(() => {
  //   // Fetch user data from local storage or API if needed
  //   const userData = {
  //     userName: "exampleUser",
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@example.com",
  //     phoneNumber: "123456789",
  //   };
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     ...userData,
  //   }));
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChangeGender = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  // const handleChangeCity = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(typeof value === "string" ? value.split(",") : value);
  // };

  // const getStyles = (name: string) => {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // };

  const { mutate, isPending } = useMutation({
    mutationFn: PutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Profile"],
        refetchType: "active",
      });
      message.success("User details updated successfully");
      onDone?.();
    },
    onError: () => {
      message.error("Failed to update user details");
    },
  });

  const handleSubmit = () => {
    mutate({
      data: {
        id: Number(formData.id),
        // userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || "",
        phoneNumber: formData.phoneNumber,
      },
    });
  };

  return (
    <Modal
      text="Save"
      title="Personal Details"
      onClose={onDone}
      isPending={isPending}
      onClickSubmit={handleSubmit}
    >
      <Box component="form" noValidate autoComplete="off">
        <div className={classes.image}>
          <img src={Image} alt="profile" className={classes.profileImage} />
          <div className={classes.formButton}>
            <div className={classes.buttonGroup}>
              <CameraAltOutlinedIcon sx={{ color: "#ed1b2f" }} />
              <Typography
                variant="body2"
                sx={{ color: "#ed1b2f", marginLeft: ".25rem" }}
              >
                Edit
              </Typography>
            </div>
            <div
              className={`${classes.buttonGroup}`}
              style={{ paddingLeft: "24px" }}
            >
              <DeleteForeverOutlinedIcon sx={{ color: "#414042" }} />
              <Typography
                variant="body2"
                sx={{ color: "#414042", marginLeft: ".25rem" }}
              >
                Delete
              </Typography>
            </div>
          </div>
        </div>

        <div className={classes.formInput}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            variant="outlined"
            className={classes.inputGroup}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            variant="outlined"
            className={classes.inputGroup}
          />
          <TextField
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            type="email"
            variant="outlined"
            required
            className={classes.inputGroup}
          />
          <TextField
            label="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="tel"
            variant="outlined"
            required
            className={classes.inputGroup}
          />
        </div>
      </Box>
    </Modal>
  );
}
