import React, { useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./WorkExperience.module.css";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

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

const years = Array.from(new Array(50), (val, index) => index + 1970).map(
  (year) => ({ value: year, label: year })
);

export default function WorkExperience({ onDone }: Props) {
  const [value, setValue] = useState<string>("");
  const [valueProject, setValueProject] = useState<string>("");
  const maxLength = 2500;

  // Strip HTML tags to count only text characters
  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(value).length;
  const remainingCharsProject = maxLength - stripHTML(valueProject).length;
  return (
    <Modal title="Work Experience" onClose={onDone}>
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="Job title"
              required
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Company"
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
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Description
                </Typography>
                <div className={classes.tipContainer}>
                  <div className={classes.iconContainer}>
                    <CreateOutlinedIcon
                      sx={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className={classes.tipText}>
                    <b>
                      <span className={classes.tipHighlight}>Tips: </span>
                      Brief the company's industry, then detail your
                      responsibilities and achievements. For projects, write on
                      the "Project" field below.
                    </b>
                  </div>
                </div>
                <ReactQuill
                  value={value}
                  onChange={setValue}
                  placeholder="Enter your summary"
                  style={{ height: "300px", marginBottom: "16px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    color: remainingChars < 0 ? "red" : "#a6a6a6",
                    fontSize: "14px",
                  }}
                >
                  {remainingChars} of 2500 characters remaining
                </Typography>
              </div>
            </div>

            <div className={classes.description}>
              <div style={{ display: "block" }}>
                <Typography
                  variant="h4"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: 0,
                    mb: 0,
                  }}
                >
               Project
                </Typography>
                <div className={classes.tipContainer}>
                  <div className={classes.iconContainer}>
                    <CreateOutlinedIcon
                      sx={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className={classes.tipText}>
                    <b>
                      <span className={classes.tipHighlight}>Tips: </span>
                      Include project details, your role, technologies and team size.
                    </b>
                  </div>
                </div>
                <ReactQuill
                  value={valueProject}
                  onChange={setValueProject}
                  placeholder="Enter your summary"
                  style={{ height: "300px", marginBottom: "16px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    color: remainingCharsProject < 0 ? "red" : "#a6a6a6",
                    fontSize: "14px",
                  }}
                >
                  {remainingCharsProject} of 2500 characters remaining
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
