import React, { useState } from "react";
import ReactQuill from "react-quill";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Modal from "./Modal";
import "react-quill/dist/quill.snow.css";
import classes from "./Certificates.module.css";
import TextField from "@mui/material/TextField";
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


interface Props {
  onDone?: () => void;
}
const years = Array.from(new Array(50), (val, index) => index + 1970).map(
  (year) => ({ value: year, label: year })
);
export default function Certificates({ onDone }: Props) {
  const [value, setValue] = useState<string>("");
  // const [valueProject, setValueProject] = useState<string>("");
  const maxLength = 2500;

  // Strip HTML tags to count only text characters
  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(value).length;
  return (
    <Modal title="Personal Project" onClose={onDone}>
      {" "}
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          {/* <div className={classes.tipContainer}>
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
                Share the project that relates to your skills and capabilities
              </b>
            </div>
          </div> */}

          <div className={classes.form}>
            <div className={classes.projectname}>
              <TextField
                label="Certificates Name"
                required
                variant="outlined"
                className={classes.inputGroup}
              />
            </div>
            <div className={classes.projectname1}>
              <TextField
                label="Organization"
                required
                variant="outlined"
                className={classes.inputGroup}
              />
            </div>
            <div className={classes.date}>
              <div className={classes.from}>
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
                Issue date
                </Typography>
                <div className={classes.startdate}>
                  <TextField
                    select
                    label="From Month"
                    required
                    variant="outlined"
                    className={classes.field}
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className={classes.from1}>
                <br></br>
                <div className={classes.startyear}>
                  <TextField
                    select
                    label="From Year"
                    required
                    variant="outlined"
                    className={classes.field}
                  >
                    {years.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              {/* <div className={classes.to}>
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
                  End Date
                </Typography>
                <div className={classes.enddate}>
                  <TextField
                    select
                    label="From Month"
                    required
                    variant="outlined"
                    className={classes.field}
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className={classes.to1}>
              <br></br>
                <div className={classes.endyear}>
            
                  <TextField
                    select
                    label="to Year"
                    required
                    variant="outlined"
                    className={classes.field}
                  >
                    {years.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div> */}
            </div>
            <div className={classes.projectname1}>
              <TextField
                label="Certificate URL"
                required
                variant="outlined"
                className={classes.inputGroup}
              />
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
                {/* <div className={classes.tipContainer}>
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
                </div> */}
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
            {/* <div className={classes.url}>
              <TextField
                label="Project URL"
                required
                variant="outlined"
                className={classes.inputGroup}
              />
            </div> */}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
