import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./Education.module.css";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PutEducationDetails } from "../Services/EducationDetails/PutEducationDetails";
import MenuItem from "@mui/material/MenuItem";
interface EducationDetail {
  id: number;
  name: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
}

interface Props {
  onDone?: () => void;
  data: EducationDetail | null;
}

const EducationEdit: React.FC<Props> = ({ onDone, data }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    institutionName: data?.institutionName || "",
    degree: data?.degree || "",
    fieldOfStudy: data?.fieldOfStudy || "",
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    gpa: data?.gpa || 0,
    id: data?.id || 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        institutionName: data.institutionName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.startDate.split("T")[0], // Format to "YYYY-MM-DD"
        endDate: data.endDate.split("T")[0], // Format to "YYYY-MM-DD"
        gpa: data.gpa,
        id: data.id,
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: PutEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["EducationDetails"],
        refetchType: "active",
      });
      message.success("Education details updated successfully.");
      onDone?.();
    },
    onError: () => {
      message.error("Failed to update education details.");
    },
  });

  const handleSubmit = () => {
    if (
      !formData.institutionName ||
      !formData.degree ||
      !formData.fieldOfStudy ||
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
        name: formData.name,
        institutionName: formData.institutionName,
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        gpa: formData.gpa,
        id: formData.id,
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gpa" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <Modal
      title="Edit Education"
      onClose={onDone}
      text="Save"
      onClickSubmit={handleSubmit}
      isPending={isPending}
    >
      <Box component="form" noValidate autoComplete="off">
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
            <MenuItem value="High School Diploma">High School Diploma</MenuItem>
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
            name="fieldOfStudy"
            required
            value={formData.fieldOfStudy}
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
            inputProps={{ min: 0, step: 0.01 }}
          />
          <div className={classes.form}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
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
              required
              value={formData.endDate}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EducationEdit;
