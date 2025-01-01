import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from './Education.module.css';
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { queryClient } from "../Services/mainService";
import { PutEducationDetails } from "../Services/EducationDetails/PutEducationDetails";

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


// const years = Array.from(new Array(60), (_, index) => index + 1970).map(
//   (year) => ({ value: year, label: year })
// );

const years = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index
).map((year) => ({ value: year, label: year }));

const EducationEdit: React.FC<Props> = ({ onDone, data  }) => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: data?.name || "",
    institutionName: data?.institutionName || "",
    degree: data?.degree || "",
    fieldOfStudy: data?.fieldOfStudy || "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    gpa: data?.gpa || 0,
    id: data?.id || 0
  });

  useEffect(() => {
    if (data) {
      // Extract start and end date to month and year
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
    mutationFn: PutEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EducationDetails"] ,refetchType:"active"});
      message.success("Education details updated successfully");
      onDone?.();
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

  //   const startMonthNumber = monthMap[formData.startMonth];
  //   const endMonthNumber = monthMap[formData.endMonth];

  //   if (!startMonthNumber || !endMonthNumber) {
  //     message.error("Invalid month value");
  //     return;
  //   }

  //   const startDate = new Date(Number(formData.startYear), startMonthNumber - 1, 1).toISOString();
  //   const endDate = new Date(Number(formData.endYear), endMonthNumber - 1, 1).toISOString();

  //   // Gọi API mutation để gửi dữ liệu
  //   mutate({
  //     data: {
  //       name: formData.name,
  //       institutionName: formData.institutionName,
  //       degree: formData.degree,
  //       fieldOfStudy: formData.fieldOfStudy,
  //       startDate,
  //       endDate,
  //       gpa: formData.gpa,
  //       id: formData.id
  //     }
  //   });
  // };


  const handleSubmit = () => {
    // Validate các trường bắt buộc
    if (
      // !formData.name ||
      !formData.institutionName ||
      !formData.degree ||
      !formData.fieldOfStudy ||
      !formData.startMonth ||
      !formData.startYear ||
      !formData.endMonth ||
      !formData.endYear ||
      formData.gpa === 0
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }
  
    // Validate GPA
    if (formData.gpa <= 0 || formData.gpa > 10) {
      message.error("GPA must be greater than 0 and less than or equal to 10.");
      return;
    }
  
    // Validate năm bắt đầu và kết thúc
    if (Number(formData.endYear) < Number(formData.startYear)) {
      message.error("End year cannot be less than start year.");
      return;
    }
  
    const startMonthNumber = monthMap[formData.startMonth];
    const endMonthNumber = monthMap[formData.endMonth];
  
    if (!startMonthNumber || !endMonthNumber) {
      message.error("Invalid month value.");
      return;
    }
  
    // Validate tháng bắt đầu và kết thúc
    if (
      Number(formData.startYear) === Number(formData.endYear) &&
      startMonthNumber > endMonthNumber
    ) {
      message.error("Start month cannot be greater than end month in the same year.");
      return;
    }
  
    const startDate = new Date(
      Number(formData.startYear),
      startMonthNumber - 1,
      1
    ).toISOString();
    const endDate = new Date(
      Number(formData.endYear),
      endMonthNumber - 1,
      1
    ).toISOString();
  
    // Gọi API mutation để gửi dữ liệu
    mutate({
      data: {
        name: formData.name,
        institutionName: formData.institutionName,
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        startDate,
        endDate,
        gpa: formData.gpa,
        id: formData.id,
      },
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gpa" ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <Modal title="Education" onClose={onDone} text="Save" onClickSubmit={handleSubmit} isPending={isPending}>
      <Box component="form" noValidate autoComplete="off">
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
            inputProps={{ min: 0, step: 0.01 }} // Giá trị GPA với hai chữ số thập phân
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
        </div>
      </Box>
    </Modal>
  );
}

export default EducationEdit
