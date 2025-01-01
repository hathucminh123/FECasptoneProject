import React, { useEffect, useState } from "react";
import classes from "./Apply.module.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { renderButton } from "./RenderButton";
import RenderButton from "./RenderButton";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../Services/JobsPost/GetJobPostById";
import { fetchCVs } from "../Services/CVService/GetCV";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { message } from "antd";
import { PostJobPostActivity } from "../Services/JobsPostActivity/PostJobPostActivity";
import { queryClient } from "../Services/mainService";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import { PostCVs } from "../Services/CVService/PostCV";
import { storage } from "../firebase/config.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile.ts";
// import { PostCVsAI } from "../Services/CVService/PostCVAI.ts";

export default function Apply() {
  const [coverLetter, setCoverLetter] = useState<string | undefined>("");
  const userId = localStorage.getItem("userId");
  const { JobId } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const stripHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    staleTime: 1000,
  });

  const UserProfileData = UserProfile?.UserProfiles;

  console.log("userId", UserProfileData);

  useEffect(() => {
    if (UserProfileData?.coverLetter !== null) {
      setCoverLetter(UserProfileData?.coverLetter);
    }
  }, [UserProfileData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const { mutate: postcv } = useMutation({
    mutationFn: PostCVs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CVs"],
        refetchType: "active",
      });

      message.success("CV uploaded successfully!");
      setSelectedFile(null);
    },
    onError: () => {
      message.error("Failed to upload CV.");
    },
  });

  const handleUploadClick = async () => {
    if (selectedFile) {
      const fileRef = ref(storage, `${uuidv4()}-${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const fileUrl = await getDownloadURL(fileRef);
      postcv({ data: { url: fileUrl, name: selectedFile.name } });
      console.log("File to upload:", selectedFile);
    } else {
      console.log("No file selected");
      message.warning("Please select a file to upload.");
    }
  };
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const job = jobData?.JobPosts;
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  const { data: CVdata } = useQuery({
    queryKey: ["CVs"],
    queryFn: ({ signal }) => fetchCVs({ signal }),
    staleTime: 5000,
  });

  const dataCVS = CVdata?.CVs || [];

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/jobs/detail/${Number(JobId)}`);
  };

  const handleCVSelect = (cvId: number) => {
    setSelectedCvId(cvId);
  };

  const selectedCv = dataCVS.find((item) => item.id === selectedCvId);

  // const { mutate: PostCVAi } = useMutation({
  //   mutationFn: PostCVsAI,
  //   onSuccess: () => {
  //     // console.log("ok chua ta ", data);
  //     // queryClient.invalidateQueries({
  //     //   queryKey: ["JobPostActivity"],
  //     //   refetchType: "active", // Ensure an active refetch
  //     // });
  //     // message.success(`CV Apply to ${job?.jobTitle} successfully!`);
  //     // navigate(`/thankyou/${job?.id}`);
  //   },

  //   onError: () => {
  //     message.error("Failed to Apply CV.");
  //   },
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: PostJobPostActivity,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["JobPostActivity"],
    //     refetchType: "active", // Ensure an active refetch
    //   });

    //   message.success(`CV Apply to ${job?.jobTitle} successfully!`);
    //   navigate(`/thankyou/${job?.id}`);
    // },

    onSuccess: async () => {
      try {
        // await PostCVAi({
        //   data: {
        //     jobPostId: job?.id,
        //     url: selectedCv?.url ?? "",
        //     cvId: selectedCv?.id,
        //     userId: UserProfileData?.id,
        //   },
        // });
        message.success(`CV Apply to ${job?.jobTitle} successfully!`);
        navigate(`/thankyou/${job?.id}`);
        queryClient.invalidateQueries({
          queryKey: ["JobPostActivity"],
          refetchType: "active",
        });
      } catch {
        message.error("Failed to apply CV.");
      }
    },

    onError: () => {
      message.error("Failed to Apply CV.");
    },
  });

  // console.log("on khong", selectedCv);
  // const handleSendCvApply =async () => {
  //   if (selectedCvId && selectedCv?.url) {

  //     const response = await fetch(selectedCv?.url);
  //     const blob = await response.blob();

  //     // Convert the Blob into a File object
  //     const file = new File([blob], selectedCv?.name || "uploaded_file", {
  //       type: blob.type,
  //     });
  //     PostCVAi({
  //       data: {
  //         jobPostId: job?.id,
  //         file: file,
  //       },
  //     });

  //     mutate({
  //       data: {
  //         jobPostId: job?.id,
  //         cvId: selectedCvId,
  //       },
  //     });
  //   } else {
  //     message.warning("Please select a CV to apply.");
  //   }
  // };

  const handleSendCvApply = async () => {
    if (selectedCvId && selectedCv?.url) {
      try {
        // Show loading indicator here if needed
        // const response = await fetch(selectedCv?.url);
        // const blob = await response.blob();

        // // Convert Blob to File
        // const file = new File([blob], selectedCv?.name || "uploaded_file", {
        //   type: blob.type,
        // });

        // Send file via PostCVAi
        // await PostCVAi({
        //   data: {
        //     jobPostId: job?.id,
        //     url: selectedCv?.url,
        //   },
        // });

        // Trigger mutation for further updates
        await mutate({
          data: {
            jobPostId: job?.id,
            cvId: selectedCvId,
          },
        });

        // message.success("CV sent successfully!");
      } catch (error) {
        console.error("Error during CV submission:", error);
        message.error("Failed to send CV. Please try again.");
      }
    } else {
      message.warning("Please select a CV to apply.");
    }
  };

  // const handleScoreAi = async () => {
  //   if (selectedCvId && selectedCv?.url) {
  //     try {
  //       // Fetch the file from the Firebase URL
  //       const response = await fetch(selectedCv?.url);
  //       const blob = await response.blob();

  //       // Convert the Blob into a File object
  //       const file = new File([blob], selectedCv?.name || "uploaded_file", {
  //         type: blob.type,
  //       });

  //        PostCVAi({
  //         data: {
  //           jobPostId: job?.id,
  //           file: file,
  //         },
  //       });

  //       message.success("CV uploaded and processed successfully.");
  //     } catch (error) {
  //       // console.error("Error processing the selected CV:", error);
  //       // message.error("Failed to process the selected CV. Please try again.");
  //     }
  //   } else {
  //     message.warning("Please select a CV to apply.");
  //   }
  // };

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
                    sx={{ width: "20px", height: "20px", color: "#000000", }}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      color: "#000000",
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
                {/* <Typography
                  variant="h2"
                  sx={{
                    lineHeight: 1.5,
                    fontSize: "22px",
                    fontWeight: 700,
                    marginTop: 0,
                    marginBottom: 0,
                    boxSizing: "border-box",
                    display: "block",
                    color: "#fff",
                  }}
                >
                  Amazing Job
                </Typography> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Căn giữa theo chiều dọc
                  }}
                >
                  {/* Phần chữ "it" */}
                  <Box
                    sx={{
                      backgroundColor: "#3cbc8c",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "22px",
                      fontFamily: "Lexend, sans-serif",
                      lineHeight: "1",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "3px",
                    }}
                  >
                    A
                  </Box>

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: "22px",
                      fontFamily: "Lexend, sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    mazingJob
                  </Typography>
                </Box>
                {/* <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDXOd1EUVLnkgF9P9P9ZAGyBSv6f_lmq6CA&s"
                  alt="logo"
                  style={{
                    width: "81px",
                    height: "50px",
                    aspectRatio: "auto 81/82",
                    textAlign: "center",
                  }}
                /> */}
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
                    value={`${UserProfileData?.firstName} ${UserProfileData?.lastName}`}
                    label="Your name"
                    required
                    disabled
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
                              <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                              />
                            </Button>

                            {/* Show selected file before upload */}
                            {selectedFile && (
                              <Typography
                                variant="body1"
                                sx={{ marginTop: "10px" }}
                              >
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
                            {/* {dataCVS.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 500, fontSize: "1rem" }}
                        >
                          Uploaded CVs:
                        </Typography>
                        {dataCVS.map(
                          (
                            cv: { url: string; id: number; name: string },
                            index: number
                          ) => (
                            <div className={classes.main1}>
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
                                  style={{
                                    textDecoration: "none",
                                    color: "blue",
                                  }}
                                >
                                  {cv.name}
                                </a>
                              </Typography>
                              {deletingId === cv.id ? (
                                <>Please wait a second...</>
                              ) : (
                                <div
                                  onClick={() => handleDeleteCV(cv.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <DeleteOutlineOutlinedIcon
                                    sx={{ color: "blue" }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )} */}
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            {cv.name}
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
                    value={stripHTML(coverLetter || "")}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    disabled={true}
                    sx={{ width: "100%", height: "100%" }}
                  />
                  {/* <Typography
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
                  </Typography> */}
                </div>
                {isPending ? (
                  <div>
                    <RenderButton
                      text="Wait a seconds"
                      color="#ed1b2f"
                      variant="contained"
                      sxOverrides={{ width: "100%" }}
                      // onClick={handleSendCvApply}
                      // onClick={handleSendCvApply}
                    />
                  </div>
                ) : (
                  <div>
                    <RenderButton
                      text="Send my cv"
                      // color="#ed1b2f"
                      color="#4cd681"
                      variant="contained"
                      sxOverrides={{ width: "100%" }}
                      // onClick={handleSendCvApply}
                      onClick={handleSendCvApply}
                    />
                  </div>
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
