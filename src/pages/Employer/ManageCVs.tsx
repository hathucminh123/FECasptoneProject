import React, { useState } from "react";
import classes from "./ManageCVs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import CommentIcon from "@mui/icons-material/Comment";

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import FormSelectJobPost from "../../components/Employer/FormSelectJobPost";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Rating from "@mui/material/Rating";
import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";

const steps = ["Select Status", "Input Comment"];

const headers = [
  "Full Name",
  "Email",
  "Phone Number",
  "CV File",
  "Status",
  "Action",
];
const stateData = [
  "Available data",
  "Meeting",
  "Accept a Job",
  "Rejected",
  "Pending",
];
const CVOptions = ["Show All CVs", "Show only unseen CVs"];

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

export default function ManageCVs() {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("1");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentJobPostId, setCurrentJobPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [value, setValue] = React.useState<number | null>(2);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setActiveStep(0);
    setCompleted({});
    setCommentText("");
    setValue(null);
  };

  const { mutate: PostComment } = useMutation({
    mutationFn: PostJobActivityComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Comment"],
        refetchType: "active",
      });
      message.success("Comment and rating added successfully!");
    },
    onError: () => {
      message.error("Failed to Update the status set");
    },
  });

  const handleComplete = () => {
    if (!currentJobPostId) return;

    if (activeStep === 0) {
      mutate({
        data: {
          jobPostActivityId: currentJobPostId,
          status: Number(selectedStatus),
        },
      });
      // message.success("Status updated successfully!");
    }

    if (activeStep === 1) {
      if (commentText || value) {
        PostComment({
          data: {
            commentText: commentText,
            commentDate: new Date().toISOString(),
            rating: value,
            jobPostActivityId: currentJobPostId,
          },
        });
      } else {
        message.warning(
          "Please provide a comment or rating before completing the step."
        );
        return;
      }
    }

    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: PutJobPostActivityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
      message.success("Status Details Update Successfully");
    },
    onError: () => {
      message.error("Failed to Update the status set");
    },
  });

  const {
    data: JobPosts,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal }),
    staleTime: 5000,
  });

  const JobPostsdata = JobPosts?.JobPosts;
  const CompanyId = localStorage.getItem("CompanyId");
  const JobinCompany = JobPostsdata?.filter(
    (item) => item.companyId === Number(CompanyId)
  );

  const {
    data: SeekerApply,
    isLoading: isSeekerLoading,
    isError: isSeekerError,
  } = useQuery({
    queryKey: ["SeekerApply", selectedJob?.id],
    queryFn: ({ signal }) =>
      GetSeekerJobPost({ id: Number(selectedJob?.id), signal }),
    enabled: !!selectedJob?.id,
  });

  const dataSeekerApply =
    SeekerApply?.GetSeekers?.map((seeker) => ({
      id: seeker.id,
      fullName:
        `${seeker.firstName} ${seeker.lastName}`.trim() || seeker.userName,
      Email: seeker.email,
      "Phone Number": seeker.phoneNumber || "Not provided",
      "CV file": seeker.cvPath,
      Status: seeker.status,
      Action: "View Details",
      jobPostActivityId: seeker.jobPostActivityId,
    })) || [];

  const filteredData = searchTerm
    ? dataSeekerApply.filter((row) => {
        const phoneNumber = String(row["Phone Number"]);
        return (
          row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phoneNumber.includes(searchTerm)
        );
      })
    : dataSeekerApply;

  const handleViewDetail = (id: number) => {
    navigate(`/userProfileSystem/${id}`);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleEditClick = (id: number) => {
    setCurrentJobPostId(id);
    setOpenModal(true);
  };
  const handleViewComments =(id:number) =>{
    navigate(`/employer-verify/jobs/system-Comment/${id}`)
  }

  if (isJobLoading || isSeekerLoading) {
    return <div>Loading...</div>;
  }

  if (isJobError || isSeekerError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Candidate CV Management" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Input name, email, phone number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={classes.button}>
                  <SearchOutlinedIcon fontSize="small" />
                </button>
              </form>
            </div>
            <div className={classes.main5}>
              <FormSelectJobPost
                selectedValue={selectedJob}
                setSelectedValue={setSelectedJob}
                data={JobinCompany}
                width={200}
                placeholder="Select JobPost Stream"
              />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectedState}
                setSelectedValue={setSelectedState}
                data={stateData}
                width={230}
                placeholder="Select state candidate CV"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main6}>
        <div className={classes.main7}>
          <div className={classes.main8}>
            <div className={classes.main9}>
              <div className={classes.main10}>
                Found{" "}
                <span className={classes.span}>{filteredData.length}</span>{" "}
                Candidate(s)
              </div>
            </div>
            <div className={classes.main11}>
              <FormSelect
                selectedValue={selectedCV}
                setSelectedValue={setSelectedCV}
                data={CVOptions}
                placeholder="Show All CV Candidates"
              />
            </div>
          </div>
          <div className={classes.main12}>
            <TableContainer component={Paper}>
              <MuiTable>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell key={header} align="left">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.Email}</TableCell>
                      <TableCell>{row["Phone Number"]}</TableCell>
                      <TableCell>
                        <a
                          href={row["CV file"]}
                          download
                          className={classes.cvLink}
                        >
                          Download CV
                        </a>
                      </TableCell>
                      <TableCell>{row.Status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewDetail(row.id)}>
                          <Visibility />
                        </IconButton>
                        {row.Status !== "Rejected" &&
                          row.Status !== "Passed" && (
                            <IconButton
                              onClick={() =>
                                handleEditClick(row.jobPostActivityId)
                              }
                            >
                              <Edit />
                            </IconButton>
                          )}
                        <IconButton
                          onClick={() =>
                            handleViewComments(row.jobPostActivityId)
                          }
                        >
                          <CommentIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box className={classes.modalBox}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleModalClose}>Close</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep !== 0 ? (
                <React.Fragment>
                  <TextField
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Comment"
                    placeholder="Input your comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography variant="h6" component="h2">
                    Update Status
                  </Typography>
                  <Select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    fullWidth
                  >
                    {/* <MenuItem value="1">Pending</MenuItem> */}
                    <MenuItem value="2">Rejected</MenuItem>
                    <MenuItem value="3">Passed</MenuItem>
                    <MenuItem value="4">CVScreeningPassed</MenuItem>
                    <MenuItem value="5">InterviewStage</MenuItem>
                  </Select>
                </React.Fragment>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length && !completed[activeStep] && (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </div>
  );
}
