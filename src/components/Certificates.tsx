import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PostCertificates } from "../Services/CertificatesService/PostCertificates";

interface Props {
  onDone?: () => void;
}

const Certificates: React.FC<Props> = ({ onDone }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    certificateName: "",
    certificateOrganization: "",
    description: "",
    certificateURL: "",
    issueDate: "", // ISO format expected
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PostCertificates,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Certificates"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      navigate("#");
      setFormData({
        certificateName: "",
        certificateOrganization: "",
        description: "",
        certificateURL: "",
        issueDate: "",
      });
      onDone?.();
      message.success("Certificate details successfully added!");
    },
    onError: () => {
      message.error("Failed to add certificate details");
    },
  });

  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  };
  // const handleSubmit = () => {
  //   // Ensure all fields are filled
  //   if (
  //     !formData.certificateName ||
  //     !formData.certificateOrganization ||
  //     !formData.certificateURL ||
  //     !formData.issueDate
  //   ) {
  //     message.error("Please fill in all the required fields.");
  //     return;
  //   }

  //   // Validate URL
  //   if (!isValidURL(formData.certificateURL)) {
  //     message.error("Please enter a valid URL for the certificate.");
  //     return;
  //   }

  //   mutate({ data: formData });
  // };
  const handleSubmit = () => {
    // Ensure all fields are filled
    if (
      !formData.certificateName ||
      !formData.certificateOrganization ||
      !formData.certificateURL ||
      !formData.issueDate
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }

    // Validate URL
    if (!isValidURL(formData.certificateURL)) {
      message.error("Please enter a valid URL for the certificate.");
      return;
    }

    // Validate issueDate to ensure it is not in the future
    const issueDate = new Date(formData.issueDate);
    const now = new Date();
    if (issueDate > now) {
      message.error("Issue Date cannot be in the future.");
      return;
    }

    // If all validations pass, call the mutation
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
    const selectedDate = new Date(value);
    const now = new Date();

    if (selectedDate > now) {
      message.error("Issue Date cannot be in the future.");
      return;
    }

    const isoDate = selectedDate.toISOString();
    setFormData((prevData) => ({
      ...prevData,
      issueDate: isoDate,
    }));
  };

  return (
    <Modal
      text="Save"
      title="Certificates"
      onClose={onDone}
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="Certificate Name"
              name="certificateName"
              required
              value={formData.certificateName}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Certificate Organization"
              name="certificateOrganization"
              required
              value={formData.certificateOrganization}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Certificate URL"
              name="certificateURL"
              required
              value={formData.certificateURL}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            {/* <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.issueDate.split("T")[0] || ""}
              onChange={handleDateChange}
              variant="outlined"
              className={classes.inputGroup}
            /> */}
            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }} // Max date is today
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
              value={formData.description}
              onChange={handleChange}
              className={classes.inputGroup}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Certificates;
