import React, { useState } from "react"; // Thêm import useState
import classes from "./ManageCV.module.css";
import { Typography, Button, Box } from "@mui/material";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ReactQuill from "react-quill";
// import { AnimatePresence } from "framer-motion";
import { renderButton } from "../components/RenderButton";
import "react-quill/dist/quill.snow.css";

export default function ManageCV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);
  console.log("why", isCreatingNewChallenge);

  const handleStartAddNewChallenge = () => {
    setIsCreatingNewChallenge(true);
  };

  const handleCancelClick = () => {
    setIsCreatingNewChallenge(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      // Thực hiện logic upload file, ví dụ gửi file lên server qua API
      console.log("File to upload:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  const handleSaveClick = () => {
    // Logic to save the cover letter, e.g., send to an API
    console.log("Cover letter value:", value);
  };

  return (
    <div className={classes.icontainer}>
      <div className={classes.container}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "34px",
            color: "#121212",
            marginBottom: ".5rem",
          }}
        >
          Manage CVs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#414042 ",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginBottom: ".5rem",
          }}
        >
          Upload your CV below to use it throughout your application process
        </Typography>

        <div className={classes.upload}>
          <div className={classes.upload1}>
            <div className={classes.upload2}>
              <ContactPageOutlinedIcon
                sx={{
                  marginTop: ".25rem",
                  verticalAlign: "middle",
                  height: "40px",
                  width: "40px",
                }}
              />
              <div className={classes.upload3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    color: "#121212",
                    marginTop: 0,
                    fontSize: "1rem",
                    marginBottom: ".25rem",
                    lineHeight: "1.5",
                  }}
                  gutterBottom
                >
                  Your own CV
                </Typography>
                <div className={classes.upload4}>
                  <div className={classes.upload5}>
                    <Box sx={{ textAlign: "start" }}>
                      <Button
                        variant="text"
                        component="label"
                        startIcon={<CloudUploadOutlinedIcon />}
                        sx={{
                          color: "blue",
                          textTransform: "none",
                          fontSize: "16px",
                        }}
                        onClick={handleUploadClick}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>

                      {selectedFile && (
                        <Typography variant="body1" sx={{ marginTop: "10px" }}>
                          Selected file: {selectedFile.name}
                        </Typography>
                      )}
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.container2}>
        <div className={classes.formquill}>
          <div className={classes.formquill1}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "34px",
                color: "#121212",
                marginBottom: ".5rem",
              }}
            >
              Cover Letter
            </Typography>
            <div
              style={{ cursor: "pointer" }}
              onClick={handleStartAddNewChallenge}
            >
              <EditNoteOutlinedIcon />
            </div>
          </div>
          {/* <div className={classes.content}></div> */}
          {isCreatingNewChallenge ? (
            <div style={{ display: "block" }}>
              <span className={classes.text}>
                Tips: Start by describing what you bring to the table and why
                this job excites you
              </span>
              <ReactQuill
                value={value}
                onChange={setValue}
                placeholder="Enter the requirements of the job"
                style={{ height: "166px" }}
              />
              <div className={classes.modal3}>
                {renderButton(
                  "Cancel",
                  "white",
                  "outlined",
                  {},
                  handleCancelClick
                )}
                {renderButton("Save", "#ed1b2f", "contained", {
                  minWidth: "180px",
                }, handleSaveClick)}
              </div>
            </div>
          ) : (
            <div className={classes.content}>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.8 }}
            >
              Introduce yourself and why you'd make a great hire
            </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
