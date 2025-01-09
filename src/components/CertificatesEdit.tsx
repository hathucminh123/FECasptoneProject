import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PutCertificates } from "../Services/CertificatesService/PutCertificates";

interface Certificate {
  id: number;
  certificateName: string;
  certificateOrganization: string;
  description: string;
  certificateURL: string;
  issueDate: string;
}

interface Props {
  onDone?: () => void;
  data: Certificate | null;
}

const CertificatesEdit: React.FC<Props> = ({ onDone, data }) => {
  const [formData, setFormData] = useState({
    id: data?.id || 0,
    certificateName: data?.certificateName || "",
    certificateOrganization: data?.certificateOrganization || "",
    description: data?.description || "",
    certificateURL: data?.certificateURL || "",
    issueDate: data?.issueDate.split("T")[0] || "", // ISO date to YYYY-MM-DD
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        certificateName: data.certificateName,
        certificateOrganization: data.certificateOrganization,
        description: data.description,
        certificateURL: data.certificateURL,
        issueDate: data.issueDate.split("T")[0], // Extract date part
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: PutCertificates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Certificates"], refetchType: "active" });
      queryClient.invalidateQueries({ queryKey: ["UserProfile"], refetchType: "active" });
      message.success("Certificate details updated successfully");
      onDone?.();
    },
    onError: () => {
      message.error("Failed to update certificate details");
    },
  });

  const handleSubmit = () => {
    if (
      !formData.certificateName ||
      !formData.certificateOrganization ||
      !formData.certificateURL ||
      !formData.issueDate
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }

    const isValidURL = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!isValidURL(formData.certificateURL)) {
      message.error("Please provide a valid URL for the certificate.");
      return;
    }

    const issueDate = new Date(formData.issueDate);
    const now = new Date();
    if (issueDate > now) {
      message.error("Issue Date cannot be in the future.");
      return;
    }

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
      title="Edit Certificate"
      onClose={onDone}
      text="Save"
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
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
          <TextField
            label="Issue Date"
            name="issueDate"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: new Date().toISOString().split("T")[0] }}
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

export default CertificatesEdit;
