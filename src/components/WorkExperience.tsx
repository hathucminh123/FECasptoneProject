import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import "react-quill/dist/quill.snow.css";
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

const years = Array.from(new Array(60), (val, index) => index + 1970).map(
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

export default function WorkExperience({ onDone }: Props) {
  // const [value, setValue] = useState<string>("");
  // const [valueProject, setValueProject] = useState<string>("");
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    responsibilities: "",
    achievements: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: PostExperienceDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ExperienceDetails'] ,refetchType:"active"});
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
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

    if (Number(formData.endYear) < Number(formData.startYear)) {
      message.error("End year cannot be less than the start year");
      return;
    }

    // Convert month and year into ISO date format
    const startMonthNumber = monthMap[formData.startMonth];
    const endMonthNumber = monthMap[formData.endMonth];

    const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
    const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();

    // Call mutation API with the form data
    mutate({
      data: {
        companyName: formData.companyName,
        position: formData.position,
        startDate,
        endDate,
        responsibilities: formData.responsibilities,
        achievements: formData.achievements,
      },
    });
  };

  return (
    <Modal text="Save" title="Work Experience" onClose={onDone} isPending={isPending} onClickSubmit={handleSubmit}>
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
              variant="outlined"
              className={classes.inputGroup}
            />
            <div className={classes.form}>
              {/* From Date */}
              <div className={classes.inputGroup1}>
                <TextField
                  select
                  label="From Month"
                  value={formData.startMonth}
                  onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })}
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
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
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

              {/* To Date */}
              <div className={classes.inputGroup1}>
                <TextField
                  select
                  label="To Month"
                  value={formData.endMonth}
                  onChange={(e) => setFormData({ ...formData, endMonth: e.target.value })}
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
                  value={formData.endYear}
                  onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
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
                style={{height:200}}
              />
            </div>
            <div className={classes.description}>
              <Typography variant="h6">Achievements Project</Typography>
              <ReactQuill
                value={formData.achievements}
                onChange={(value) => setFormData({ ...formData, achievements: value })}
                placeholder="Describe your achievements Project"
                style={{height:200}}
              />
            </div>
          </div>
          {/* <button type="button" onClick={handleSubmit}>
            Submit
          </button> */}
        </div>
      </Box>
    </Modal>
  );
}
