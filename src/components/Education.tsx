import React from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from './Education.module.css';
import MenuItem from "@mui/material/MenuItem"; // For dropdowns

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

export default function Education({ onDone }: Props) {
  return (
    <Modal title="Education" onClose={onDone}>
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "block" }}>
          <div className={classes.formInput}>
            <TextField
              label="School"
              required
              variant="outlined"
              className={classes.inputGroup}
            />
            <TextField
              label="Major"
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
