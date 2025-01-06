import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostEducationDetails } from "../Services/EducationDetails/PostEducationDetails";
import { message } from "antd";
import { queryClient } from "../Services/mainService";

interface Props {
  onDone?: () => void;
}

const Education: React.FC<Props> = ({ onDone }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    institutionName: "",
    degree: "",
    FieldOfStudy: "",
    startDate: "",
    endDate: "",
    gpa: 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PostEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["EducationDetails"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      navigate("#");
      setFormData({
        institutionName: "",
        degree: "",
        FieldOfStudy: "",
        startDate: "",
        endDate: "",
        gpa: 0,
      });
      onDone?.();
      message.success("Education details updated successfully!");
    },
    onError: () => {
      message.error("Failed to update education details.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gpa" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.institutionName ||
      !formData.degree ||
      !formData.FieldOfStudy ||
      !formData.startDate ||
      !formData.endDate ||
      formData.gpa === 0
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }
    if (formData.gpa <= 0 || formData.gpa > 10) {
      message.error("GPA must be greater than 0 and less than or equal to 10.");
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      message.error("End date must be after start date.");
      return;
    }

    mutate({
      data: {
        institutionName: formData.institutionName,
        degree: formData.degree,
        FieldOfStudy: formData.FieldOfStudy,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        gpa: formData.gpa,
      },
    });
  };

  return (
    <Modal
      text="Save"
      title="Education"
      onClose={onDone}
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="Institution Name"
              name="institutionName"
              required
              value={formData.institutionName}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              select
              label="Degree"
              name="degree"
              required
              value={formData.degree}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            >
              <MenuItem value="Junior High School Diploma">
                Junior High School Diploma
              </MenuItem>
              <MenuItem value="High School Diploma">
                High School Diploma
              </MenuItem>
              <MenuItem value="Intermediate Diploma">
                Intermediate Diploma
              </MenuItem>
              <MenuItem value="College Diploma">College Diploma</MenuItem>
              <MenuItem value="Bachelor Degree">Bachelor Degree</MenuItem>
              <MenuItem value="Master Degree">Master Degree</MenuItem>
              <MenuItem value="Doctorate Degree">Doctorate Degree</MenuItem>
              <MenuItem value="Equivalent Level Diplomas">
                Equivalent Level Diplomas
              </MenuItem>
            </TextField>
            <TextField
              label="Field Of Study"
              name="FieldOfStudy"
              required
              value={formData.FieldOfStudy}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="GPA"
              name="gpa"
              type="number"
              required
              value={formData.gpa}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
              inputProps={{ min: 0, step: 1 }}
            />
            <div className={classes.form}>
              <TextField
                label="From Date"
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={(e) => handleChangeDate(e, "startDate")}
                variant="outlined"
                className={classes.inputGroup2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="To Date"
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={(e) => handleChangeDate(e, "endDate")}
                variant="outlined"
                className={classes.inputGroup2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <TextField
              label="Additional Details"
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

export default Education;
