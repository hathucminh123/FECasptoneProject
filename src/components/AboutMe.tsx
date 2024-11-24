import React, { useState } from "react";
import Modal from "./Modal";
import classes from "./AboutMe.module.css";
import ReactQuill from "react-quill";
import Box from "@mui/material/Box";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Typography from "@mui/material/Typography";
import "react-quill/dist/quill.snow.css";

interface Props {
  onDone?: () => void;
}

const AboutMe: React.FC<Props> = ({ onDone }) => {
  const [value, setValue] = useState<string>("");
  const maxLength = 2500;

  // Strip HTML tags to count only text characters
  const stripHTML = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const remainingChars = maxLength - stripHTML(value).length;

  return (
    <Modal title="About me" text="Save" onClose={onDone}>
      <Box component="form" noValidate autoComplete="off">
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
              Summarize your professional experience, highlight your skills, and
              your strengths.
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
      </Box>
    </Modal>
  );
}

export default AboutMe;