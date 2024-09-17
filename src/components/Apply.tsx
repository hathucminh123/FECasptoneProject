import React, { useState } from "react";
import classes from "./Apply.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Button from "@mui/material/Button";
import { renderButton } from "./RenderButton";
import { useNavigate } from "react-router-dom";
export default function Apply() {
  const [coverLetter, setCoverLetter] = useState("");

  const handleCoverLetterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoverLetter(event.target.value);
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, setState] = React.useState({
    form: false,
    jason: false,
    antoine: false,
  });
  // console.log("quao", state);

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
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { form } = state;
  //   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.container}>
          <div className={classes.background}></div>
          <div className={classes.icontainer}>
            <div className={classes.icontainer1}>
              <div className={classes.back}>
                <div className={classes.iconback}>
                  <ArrowBackIosNewOutlinedIcon
                    sx={{ width: "20px", height: "20px", color: "#fff" }}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer", 
                      padding: "10px",
                      borderRadius: "5px",
                      width: "100px",
                      justifyContent: "center", 
                    }}
                    onClick={handleGoBack} 
                  >
                    Back
                  </Typography>
                </div>
              </div>
              <div className={classes.logo}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDXOd1EUVLnkgF9P9P9ZAGyBSv6f_lmq6CA&s"
                  alt="logo"
                  style={{
                    width: "81px",
                    height: "50px",
                    aspectRatio: "auto 81/82",
                    textAlign: "center",
                  }}
                />
              </div>
            </div>
            <div className={classes.form}>
              <Typography
                variant="h2"
                sx={{
                  marginBottom: "24px",
                  lineHeight: 1.5,
                  fontSize: "22px",
                  fontWeight: 700,
                  marginTop: "0px",
                }}
              >
                Fullstack Developer(REACTJS,.NET,NODEJS)
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "block",
                  marginTop: "0em",
                }}
                noValidate
                autoComplete="off"
              >
                <div style={{ marginBottom: "24px", display: "block" }}>
                  <TextField
                    id="name"
                    variant="outlined"
                    label="Your name"
                    required
                    sx={{ width: "100%" }}
                  />
                </div>

                <div style={{ display: "block" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: "12px",
                      color: "#121212",
                      lineHeight: "1.5",
                      fontSize: "18px",
                      fontWeight: 700,
                      marginTop: "0px",
                    }}
                  >
                    Your CV
                    <span
                      style={{
                        color: "#f60d00",
                        fontSize: "18px",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        marginLeft: "10px",
                      }}
                    >
                      *
                    </span>
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className={`${
                      form ? classes.formupload1 : classes.formupload
                    }`}
                  >
                    <div className={classes.check}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form}
                              onChange={handleChange}
                              name="form"
                            />
                          }
                          label="Upload new CV"
                        />
                      </FormGroup>
                    </div>
                    <div className={classes.file}>
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
                              <Typography
                                variant="body1"
                                sx={{ marginTop: "10px" }}
                              >
                                Selected file: {selectedFile.name}
                              </Typography>
                            )}
                          </Box>
                        </div>
                      </div>

                      {!selectedFile && (
                        <Typography
                          variant="body1"
                          sx={{
                            marginTop: "4px",
                            color: "#a6a6a6",
                            fontSize: "14px",
                            fontWeight: 400,
                          }}
                        >
                          We accept .doc .docx, .pdf files, no password
                          protected, up to 3MB
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.input}>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: "12px",
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "18px",
                      fontWeight: 700,
                      marginTop: "0px",
                    }}
                  >
                    Cover Letter
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#a6a6a6",
                        fontSize: "16px",
                        lineHeight: 1.5,
                      }}
                    >
                      {" "}
                      (Optional)
                    </span>
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "12px",
                      color: "#414042",
                      lineHeight: 1.5,
                      fontSize: "18px",
                      display: "inline-block",
                      marginTop: "0px",
                    }}
                  >
                    What skills, work projects or achievements make you a strong
                    candidate?
                  </Typography>
                  <Box component="form">
                    <TextField
                      id="description"
                      variant="outlined"
                      placeholder="Detail and specific examples will make your application stronger"
                      multiline
                      rows={6}
                      value={coverLetter}
                      onChange={handleCoverLetterChange}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "12px",
                      textAlign: "left",
                      color: "#a6a6a6",
                      lineHeight: 1.5,
                      fontSize: "18px",
                      display: "inline-block",
                      marginTop: "0px",
                    }}
                  >
                    {500 - coverLetter.length} of 500 characters remaining
                  </Typography>
                </div>
                <div>
                  {renderButton("Send my cv", "#ed1b2f", "contained", {
                    width: "100%",
                  })}
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
