import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import { useMutation } from "@tanstack/react-query";
import { PostExperienceDetails } from "../Services/ExperienceDetailService/PostExperienceDetail";
import { queryClient } from "../Services/mainService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import classes from "./WorkExperience.module.css";

interface Props {
  onDone?: () => void;
}

const WorkExperience: React.FC<Props> = ({ onDone }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    achievements: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: PostExperienceDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ExperienceDetails"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      navigate("#");
      setFormData({
        companyName: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
      });
      onDone?.();
      message.success("Experience Details Updated Successfully");
    },
    onError: () => {
      message.error("Failed to update experience details");
    },
  });

  const handleSubmit = () => {
    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.achievements ||
      !formData.companyName ||
      !formData.position ||
      !formData.responsibilities
    ) {
      message.error("Please fill in all the required fields");
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      message.error("End date cannot be earlier than start date");
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
      },
    });
  };

  return (
    <Modal
      text="Save"
      title="Work Experience"
      onClose={onDone}
      isPending={isPending}
      onClickSubmit={handleSubmit}
    >
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              required
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Position"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
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
              <Typography variant="h6">Achievements Project</Typography>
              <ReactQuill
                value={formData.achievements}
                onChange={(value) =>
                  setFormData({ ...formData, achievements: value })
                }
                placeholder="Describe your achievements Project"
                style={{ height: 200 }}
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default WorkExperience;
