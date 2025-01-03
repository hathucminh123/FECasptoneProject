import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from './Education.module.css';
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostEducationDetails } from "../Services/EducationDetails/PostEducationDetails";
import { message } from "antd";
import { queryClient } from "../Services/mainService";

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

// Bản đồ tháng (chuyển từ tên tháng sang số tháng)
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

const years = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index
).map((year) => ({ value: year, label: year }));

const Education: React.FC<Props> = ({ onDone }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // name: "",
    institutionName: "",
    degree: "",
    FieldOfStudy: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    gpa: 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PostEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['EducationDetails'] ,refetchType:'active'});
      queryClient.invalidateQueries({
        queryKey: ["UserProfile"],
        refetchType: "active",
      });
      navigate('#');
      setFormData({
        // name: "",
        institutionName: "",
        degree: "",
        FieldOfStudy: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        gpa: 0,
      });
      onDone?.()
      message.success("Complete update");
    },
    onError: () => {
      message.error("Failed to update education details");
    }
  });

  // const handleSubmit = () => {
  //   if (!formData.startYear || !formData.startMonth || !formData.endYear || !formData.endMonth) {
  //     message.error("Please fill in all date fields");
  //     return;
  //   }
  
   
  //   if (Number(formData.endYear) < Number(formData.startYear)) {
  //     message.error("End year cannot be less than the start year");
  //     return;
  //   }
  
  //   const startMonthNumber = monthMap[formData.startMonth];
  //   const endMonthNumber = monthMap[formData.endMonth];
  
  //   if (!startMonthNumber || !endMonthNumber) {
  //     message.error("Invalid month value");
  //     return;
  //   }
  
  //   const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
  //   const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();
  
  
  //   mutate({
  //     data: {
  //       // name: formData.name,
  //       institutionName: formData.institutionName,
  //       degree: formData.degree,
  //       FieldOfStudy: formData.FieldOfStudy,
  //       startDate,
  //       endDate,
  //       gpa: formData.gpa,
  //     },
  //   });
  // };

  // const handleSubmit = () => {
  //   // Ensure all fields are filled
  //   if (
  //     !formData.institutionName ||
  //     !formData.degree ||
  //     !formData.FieldOfStudy ||
  //     !formData.startMonth ||
  //     !formData.startYear ||
  //     !formData.endMonth ||
  //     !formData.endYear ||
  //     formData.gpa === 0  
  //   ) {
  //     message.error("Please fill in all the required fields.");
  //     return;
  //   }
  //   if (formData.gpa <= 0 || formData.gpa > 10) {
  //     message.error("GPA must be greater than 0 and less than or equal to 10.");
  //     return;
  //   }
  //   // Check if end date is valid
  //   if (Number(formData.endYear) < Number(formData.startYear)) {
  //     message.error("End year cannot be less than the start year");
  //     return;
  //   }
  
  //   const startMonthNumber = monthMap[formData.startMonth];
  //   const endMonthNumber = monthMap[formData.endMonth];
  
  //   if (!startMonthNumber || !endMonthNumber) {
  //     message.error("Invalid month value");
  //     return;
  //   }
  
  //   const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
  //   const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();
  
  //   // Submit data if all fields are valid
  //   mutate({
  //     data: {
  //       institutionName: formData.institutionName,
  //       degree: formData.degree,
  //       FieldOfStudy: formData.FieldOfStudy,
  //       startDate,
  //       endDate,
  //       gpa: formData.gpa,
  //     },
  //   });
  // };
  const handleSubmit = () => {
    // Ensure all fields are filled
    if (
      !formData.institutionName ||
      !formData.degree ||
      !formData.FieldOfStudy ||
      !formData.startMonth ||
      !formData.startYear ||
      !formData.endMonth ||
      !formData.endYear ||
      formData.gpa === 0
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }
    if (formData.gpa <= 0 || formData.gpa > 10) {
      message.error("GPA must be greater than 0 and less than or equal to 10.");
      return;
    }
    // Check if end date is valid
    if (Number(formData.endYear) < Number(formData.startYear)) {
      message.error("End year cannot be less than the start year");
      return;
    }
  
    const startMonthNumber = monthMap[formData.startMonth];
    const endMonthNumber = monthMap[formData.endMonth];
  
    if (!startMonthNumber || !endMonthNumber) {
      message.error("Invalid month value");
      return;
    }
  
    if (
      Number(formData.startYear) === Number(formData.endYear) &&
      startMonthNumber > endMonthNumber
    ) {
      message.error("Start month cannot be greater than end month in the same year.");
      return;
    }
  
    const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
    const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();
  
    // Submit data if all fields are valid
    mutate({
      data: {
        institutionName: formData.institutionName,
        degree: formData.degree,
        FieldOfStudy: formData.FieldOfStudy,
        startDate,
        endDate,
        gpa: formData.gpa,
      },
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'gpa' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <Modal text="Save" title="Education" onClose={onDone} onClickSubmit={handleSubmit} isPending={isPending}>
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
              label="Institution Name"
              name="institutionName"
              required
              value={formData.institutionName}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Degree"
              name="degree"
              required
              value={formData.degree}
              onChange={handleChange}
              variant="outlined"
              className={classes.inputGroup}
            />
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
              inputProps={{ min: 0, step: 1 }} // Giới hạn giá trị GPA
            />
            <div className={classes.form}>
              {/* From Date */}
              <div className={classes.inputGroup1}>
                <TextField
                  select
                  label="From Month"
                  name="startMonth"
                  required
                  value={formData.startMonth}
                  onChange={handleChange}
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
                  required
                  value={formData.startYear}
                  onChange={handleChange}
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
                  name="endMonth"
                  required
                  value={formData.endMonth}
                  onChange={handleChange}
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
                  required
                  value={formData.endYear}
                  onChange={handleChange}
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
}


export default Education