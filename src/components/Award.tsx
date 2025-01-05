import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PostAwards } from "../Services/AwardsService/PostAwards";

interface Props {
  onDone?: () => void;
}

// Bản đồ tháng (chuyển từ tên tháng sang số tháng)

const Award: React.FC<Props> = ({ onDone }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    awardName: "",
    awardOrganization: "",
    description: "",
    issueDate: "", // ISO format expected
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PostAwards,
    onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["Awards"],
    //     refetchType: "active",
    //   });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      navigate("#");
      setFormData({
        awardName: "",
        awardOrganization: "",
        description: "",
        issueDate: "",
      });
      onDone?.();
      message.success("Award details successfully updated!");
    },
    onError: () => {
      message.error("Failed to update award details");
    },
  });

  const handleSubmit = () => {
    // Ensure all fields are filled
    if (
      !formData.awardName ||
      !formData.awardOrganization ||
      !formData.issueDate
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }

    mutate({ data: formData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isoDate = new Date(value).toISOString(); // Convert date to ISO format
    setFormData((prevData) => ({
      ...prevData,
      issueDate: isoDate,
    }));
  };

  return (
    <Modal
      text="Save"
      title="Awards"
      onClose={onDone}
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            {/* <TextField
              label="School Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            /> */}
            <TextField
              label="Award Name"
              name="awardName"
              required
              value={formData.awardName}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Award Organization"
              name="awardOrganization"
              required
              value={formData.awardOrganization}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.issueDate.split("T")[0] || ""}
              onChange={handleDateChange}
              variant="outlined"
              className={classes.inputGroup}
            />

            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              className={classes.inputGroup}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Award;
