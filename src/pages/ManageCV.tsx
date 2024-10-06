import React, { useState } from "react";
import classes from "./ManageCV.module.css";
import { Typography, Button, Box } from "@mui/material";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostCVs } from "../Services/CVService/PostCV";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import { fetchCVs } from "../Services/CVService/GetCV";
import { renderButton } from "../components/RenderButton";

export default function ManageCV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);

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

  const { mutate } = useMutation({
    mutationFn: PostCVs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CVs"] });
      message.success("CV uploaded successfully!");
    },
    onError: () => {
      message.error("Failed to upload CV.");
    },
  });

  const handleUploadClick = () => {
    if (selectedFile) {
      mutate({ data: { url: selectedFile.name } });
      console.log("File to upload:", selectedFile);
    } else {
      console.log("No file selected");
      message.warning("Please select a file to upload.");
    }
  };

  const { data } = useQuery({
    queryKey: ["CVs"],
    queryFn: ({ signal }) => fetchCVs({ signal }),
    staleTime: 5000,
  });

  const dataCVS = data?.CVs || [];

  const handleSaveClick = () => {
    console.log("Cover letter value:", value);
    // Implement cover letter save logic (API call)
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
            color: "#414042",
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
                    >
                      Upload
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>

                    {/* Show selected file before upload */}
                    {selectedFile && (
                      <Typography variant="body1" sx={{ marginTop: "10px" }}>
                        Selected file: {selectedFile.name}
                      </Typography>
                    )}
                    {selectedFile && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUploadClick}
                        sx={{ marginTop: "1rem" }}
                      >
                        Upload CV
                      </Button>
                    )}

                    {/* Uploaded CVs list */}
                    {dataCVS.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 500, fontSize: "1rem" }}
                        >
                          Uploaded CVs:
                        </Typography>
                        {dataCVS.map((cv: { url: string }, index: number) => (
                          <Typography
                            key={index}
                            variant="body1"
                            sx={{ marginTop: ".5rem", fontSize: "14px" }}
                          >
                            <a
                              href={cv.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none", color: "blue" }}
                            >
                              {cv.url}
                            </a>
                          </Typography>
                        ))}
                      </div>
                    )}
                  </Box>
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
                {renderButton(
                  "Save",
                  "#ed1b2f",
                  "contained",
                  {
                    minWidth: "180px",
                  },
                  handleSaveClick
                )}
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
