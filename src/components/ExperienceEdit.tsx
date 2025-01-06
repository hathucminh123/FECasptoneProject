import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../Services/mainService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { PutExperienceDetail } from "../Services/ExperienceDetailService/PutExperienceDetail";
import classes from "./WorkExperience.module.css";

interface ExperienceDetail {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}

interface Props {
  onDone?: () => void;
  data: ExperienceDetail | null;
}

const ExperienceEdit: React.FC<Props> = ({ onDone, data }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    achievements: "",
    id: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData({
        companyName: data.companyName,
        position: data.position,
        startDate: data.startDate.split("T")[0], // Extract YYYY-MM-DD
        endDate: data.endDate.split("T")[0], // Extract YYYY-MM-DD
        responsibilities: data.responsibilities,
        achievements: data.achievements,
        id: data.id,
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: PutExperienceDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ExperienceDetails"],
        refetchType: "active",
      });
      navigate("#");
      onDone?.();
      message.success("Experience Details Updated Successfully");
    },
    onError: () => {
      message.error("Failed to update experience details");
    },
  });

  const handleSubmit = () => {
    if (!formData.startDate || !formData.endDate) {
      message.error("Please fill in all date fields.");
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      message.error("End date cannot be earlier than start date.");
      return;
    }

    mutate({
      data: {
        companyName: formData.companyName,
        position: formData.position,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        responsibilities: formData.responsibilities,
        achievements: formData.achievements,
        id: formData.id,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      title="Edit Work Experience"
      text="Save"
      onClose={onDone}
      isPending={isPending}
      onClickSubmit={handleSubmit}
    >
      <Box component="form" noValidate autoComplete="off">
        <div className={classes.formInput}>
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            variant="outlined"
            className={classes.inputGroup}
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            variant="outlined"
            className={classes.inputGroup}
          />
          <div className={classes.form}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.inputGroup}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.inputGroup}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className={classes.description}>
            <Typography variant="h6">Responsibilities</Typography>
            <ReactQuill
              value={formData.responsibilities}
              onChange={(value) =>
                setFormData({ ...formData, responsibilities: value })
              }
              placeholder="Describe your responsibilities"
              style={{ height: 200 }}
            />
          </div>
          <div className={classes.description}>
            <Typography variant="h6">Achievements</Typography>
            <ReactQuill
              value={formData.achievements}
              onChange={(value) =>
                setFormData({ ...formData, achievements: value })
              }
              placeholder="Describe your achievements"
              style={{ height: 200 }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ExperienceEdit;
