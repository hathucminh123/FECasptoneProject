import React, { useState } from "react";
import classes from "./Apply.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { renderButton } from "./RenderButton";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../Services/JobsPost/GetJobPostById";
import { fetchCVs } from "../Services/CVService/GetCV";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { message } from "antd";
import { PostJobPostActivity } from "../Services/JobsPostActivity/PostJobPostActivity";
import { queryClient } from "../Services/mainService";

export default function Apply() {
  const [coverLetter, setCoverLetter] = useState("");
  const { JobId } = useParams();

  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const job = jobData?.JobPosts;
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null); // State để lưu ID CV được chọn

  const { data: CVdata } = useQuery({
    queryKey: ["CVs"],
    queryFn: ({ signal }) => fetchCVs({ signal }),
    staleTime: 5000,
  });

  const dataCVS = CVdata?.CVs || [];

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleCVSelect = (cvId: number) => {
    setSelectedCvId(cvId); // Lưu ID của CV được chọn
  };



  const { mutate } = useMutation({
    mutationFn: PostJobPostActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobPostActivity"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success(`CV Apply to ${job?.jobTitle} successfully!`);
      navigate(`/thankyou/${job?.id}`)
    },
    onError: () => {
      message.error("Failed to Apply CV.");
    },
  });

  const handleSendCvApply = () => {
    if (selectedCvId) {
      mutate({
        data: {
          jobPostId: job?.id,
          cvId: selectedCvId,
        },
      });
    } else {
      message.warning("Please select a CV to apply.");
    }
  };

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
                {job?.jobTitle}
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

                {dataCVS.map((cv) => (
                  <div
                    key={cv.id}
                    className={`${
                      selectedCvId === cv.id
                        ? classes.formupload1
                        : classes.formupload
                    }`}
                  >
                    <div className={classes.check}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCvId === cv.id}
                              onChange={() => handleCVSelect(cv.id)}
                              name="form"
                            />
                          }
                          label="Use This CV"
                        />
                      </FormGroup>
                    </div>
                    <div className={classes.file}>
                      <div className={classes.upload5}>
                        <div className={classes.filename}>
                          <a
                            href={cv.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "blue" }}
                            className={classes.a}
                          >
                            {cv.url}
                          </a>
                          <a
                            href={cv.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "blue" }}
                            className={classes.a}
                          >
                            <VisibilityIcon style={{ color: "blue" }} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

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
                  <TextField
                    id="description"
                    variant="outlined"
                    placeholder="Detail and specific examples will make your application stronger"
                    multiline
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    sx={{ width: "100%", height: "100%" }}
                  />
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
                  {renderButton(
                    "Send my cv",
                    "#ed1b2f",
                    "contained",
                    { width: "100%" },
                    handleSendCvApply // Gắn sự kiện onClick cho nút gửi CV
                  )}
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
