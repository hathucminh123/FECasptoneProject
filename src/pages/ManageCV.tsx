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
import RenderButton from "../components/RenderButton.tsx";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DeleteCV } from "../Services/CVService/DeleteCV";
import { storage } from "../firebase/config.ts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function ManageCV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const { mutate, isPending } = useMutation({
    mutationFn: PostCVs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CVs"] });
      message.success("CV uploaded successfully!");
    },
    onError: () => {
      message.error("Failed to upload CV.");
    },
  });
  const { mutate: deleteCV } = useMutation({
    mutationFn: DeleteCV,
    onSuccess: () => {
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      queryClient.invalidateQueries({
        queryKey: ["CVs"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success("CVs Details Deleted Successfully");
      setDeletingId(null);
    },
    onError: () => {
      message.error("Failed to delete the CVs");
      setDeletingId(null);
    },
  });

  const handleUploadClick = async () => {
    if (selectedFile) {
      const fileRef = ref(storage, `${uuidv4()}-${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const fileUrl = await getDownloadURL(fileRef);
      mutate({ data: { url: fileUrl, name: selectedFile.name } });
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

  const handleDeleteCV = (id: number) => {
    setDeletingId(id);
    deleteCV({ id });
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

            fontFamily: "Lexend, sans-serif",
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
         fontFamily: "Lexend, sans-serif",
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
                    fontFamily: "Lexend, sans-serif",
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
                        fontFamily: "Lexend, sans-serif",
                      }}
                    >
                      Upload
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>

                    {/* Show selected file before upload */}
                    {selectedFile && (
                      <Typography variant="body1"  sx={{ marginTop: "10px" , fontFamily: "Lexend, sans-serif",}}>
                        Selected file: {selectedFile.name}
                      </Typography>
                    )}

                    {selectedFile &&
                      (isPending ? (
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={handleUploadClick}
                          sx={{ marginTop: "1rem" , fontFamily: "Lexend, sans-serif",}}
                        >
                          Wait a seconds
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUploadClick}
                          sx={{ marginTop: "1rem", fontFamily: "Lexend, sans-serif", }}
                        >
                          Upload CV
                        </Button>
                      ))}

                    {/* Uploaded CVs list */}
                    {dataCVS.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 500, fontSize: "1rem", fontFamily: "Lexend, sans-serif", }}
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
                                sx={{ marginTop: ".5rem", fontSize: "14px", fontFamily: "Lexend, sans-serif", }}
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
                fontFamily: "Lexend, sans-serif",
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
              <span className={classes.text}
              style={{ fontFamily: "Lexend, sans-serif",}}>
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
                <RenderButton
                  text="Cancel"
                  color="white"
                  variant="outlined"
                  onClick={handleCancelClick}
                />

                <RenderButton
                  text="Save"
                  color="#ed1b2f"
                  variant="contained"
                  sxOverrides={{ minWidth: "180px" }}
                  onClick={handleSaveClick}
                />
              </div>
            </div>
          ) : (
            <div className={classes.content}>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.8, fontFamily: "Lexend, sans-serif", }}
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
