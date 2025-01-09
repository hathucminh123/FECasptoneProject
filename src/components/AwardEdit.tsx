import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { queryClient } from "../Services/mainService";

import { PutAwards } from "../Services/AwardsService/PutAwards";

interface Award {
  id: number;
  awardName: string;
  awardOrganization: string;
  description: string;
  issueDate: string;
}

interface Props {
  onDone?: () => void;
  data: Award | null;
}

const AwardEdit: React.FC<Props> = ({ onDone, data }) => {
  const [formData, setFormData] = useState({
    id: data?.id || 0,
    awardName: data?.awardName || "",
    awardOrganization: data?.awardOrganization || "",
    description: data?.description || "",
    issueDate: data?.issueDate.split("T")[0] || "", // ISO date to YYYY-MM-DD
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        awardName: data.awardName,
        awardOrganization: data.awardOrganization,
        description: data.description,
        issueDate: data.issueDate.split("T")[0], // Extract date part
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: PutAwards,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      message.success("Award details updated successfully");
      onDone?.();
    },
    onError: () => {
      message.error("Failed to update award details");
    },
  });

  const handleSubmit = () => {
    // Validate required fields
    if (
      !formData.awardName ||
      !formData.awardOrganization ||
      !formData.issueDate
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }

    // Validate issueDate to ensure it's not in the future
    const issueDate = new Date(formData.issueDate);
    const now = new Date();
    if (issueDate > now) {
      message.error("Issue Date cannot be in the future.");
      return;
    }

    // Submit data
    mutate({ data: formData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "issueDate") {
      const selectedDate = new Date(value);
      const now = new Date();

      if (selectedDate > now) {
        message.error("Issue Date cannot be in the future.");
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      title="Edit Award"
      onClose={onDone}
      text="Save"
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
        <div className={classes.formInput}>
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
            inputProps={{ max: new Date().toISOString().split("T")[0] }} // Max date is today
            value={formData.issueDate}
            onChange={handleChange}
            variant="outlined"
            className={classes.inputGroup}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            className={classes.inputGroup}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default AwardEdit;
