import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const years = Array.from(new Array(60), (_, index) => index + 1970).map(
  (year) => ({ value: year, label: year })
);

const monthMap: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const ExperienceEdit: React.FC<Props> = ({ onDone, data  }) => {
  const [formData, setFormData] = useState({
    companyName: data?.companyName || "",
    position: data?.position || "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    responsibilities: data?.responsibilities || "",
    achievements: data?.achievements || "",
    id: data?.id || 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      setFormData({
        ...formData,
        startMonth: Object.keys(monthMap).find(
          (key) => monthMap[key] === start.getMonth() + 1
        ) || "",
        startYear: start.getFullYear().toString(),
        endMonth: Object.keys(monthMap).find(
          (key) => monthMap[key] === end.getMonth() + 1
        ) || "",
        endYear: end.getFullYear().toString()
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: PutExperienceDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ExperienceDetails'], refetchType: 'active' });
      navigate('#');
      setFormData({
        companyName: "",
        position: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        responsibilities: "",
        achievements: "",
        id: 0,
      });
      onDone?.();
      message.success("Experience Details Updated Successfully");
    },
    onError: () => {
      message.error("Failed to update experience details");
    },
  });

  const handleSubmit = () => {
    if (!formData.startYear || !formData.startMonth || !formData.endYear || !formData.endMonth) {
      message.error("Please fill in all date fields");
      return;
    }

    const startMonthNumber = monthMap[formData.startMonth];
    const endMonthNumber = monthMap[formData.endMonth];

    const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
    const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();

    mutate({
      data: {
        companyName: formData.companyName,
        position: formData.position,
        startDate,
        endDate,
        responsibilities: formData.responsibilities,
        achievements: formData.achievements,
        id: formData.id,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Modal title="Work Experience" text="Save" onClose={onDone} isPending={isPending} onClickSubmit={handleSubmit}>
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
            <div className={classes.inputGroup1}>
              <TextField
                select
                label="From Month"
                name="startMonth"
                value={formData.startMonth}
                onChange={handleChange}
                required
                variant="outlined"
                className={classes.inputGroup2}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="From Year"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                required
                variant="outlined"
                className={classes.inputGroup2}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className={classes.inputGroup1}>
              <TextField
                select
                label="To Month"
                name="endMonth"
                value={formData.endMonth}
                onChange={handleChange}
                required
                variant="outlined"
                className={classes.inputGroup2}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="To Year"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                required
                variant="outlined"
                className={classes.inputGroup2}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <div className={classes.description}>
            <Typography variant="h6">Responsibilities</Typography>
            <ReactQuill
              value={formData.responsibilities}
              onChange={(value) => setFormData({ ...formData, responsibilities: value })}
              placeholder="Describe your responsibilities"
              style={{ height: 200 }}
            />
          </div>
          <div className={classes.description}>
            <Typography variant="h6">Achievements</Typography>
            <ReactQuill
              value={formData.achievements}
              onChange={(value) => setFormData({ ...formData, achievements: value })}
              placeholder="Describe your achievements"
              style={{ height: 200 }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}
export default ExperienceEdit