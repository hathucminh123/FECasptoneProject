import React, { useState } from "react";
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
import { Edit, Visibility, Comment } from "@mui/icons-material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Rating from "@mui/material/Rating";
import classes from "./Applied.module.css";
import FormSearch from "../../components/Employer/FormSearch";
import FormSelect from "../../components/Employer/FormSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

const steps = ["Select Status", "Input Comment"];
const Data = ["Show All Cv", "Show only unseen CVs"];
const headers = ["fullName", "Email", "Phone Number", "CV file", "Status", "Action"];

const AppliedCV: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("1");
  const [currentJobPostId, setCurrentJobPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [value, setValue] = React.useState<number | null>(2);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const navigate = useNavigate();
  const { JobId } = useParams();

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
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
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
      PutStatus({
        data: {
          jobPostActivityId: currentJobPostId,
          status: Number(selectedStatus),
        },
      });
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
        message.warning("Please provide a comment or rating before completing the step.");
        return;
      }
    }

    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const { mutate: PutStatus } = useMutation({
    mutationFn: PutJobPostActivityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
      message.success("Status updated successfully!");
    },
    onError: () => {
      message.error("Failed to update status.");
    },
  });

  const { data: SeekerApply } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const handleEditClick = (id: number) => {
    setCurrentJobPostId(id);
    setOpenModal(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleViewComments =(id:number) =>{
    navigate(`/employer-verify/jobs/system-Comment/${id}`)
  }

  const dataSeekerApply =
    SeekerApply?.GetSeekers?.map((seeker) => ({
      id: seeker.id,
      fullName: `${seeker.firstName} ${seeker.lastName}`.trim() || seeker.userName,
      Email: seeker.email,
      "Phone Number": seeker.phoneNumber || "Not provided",
      "CV file": `${seeker.cvPath}`,
      Status: seeker.status,
      Action: "View Details",
      jobPostActivityId: seeker.jobPostActivityId,
    })) || [];

  return (
    <div className={classes.main1}>
      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <FormSearch placeholder="Find" />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                data={Data}
                placeholder="Show All CVs"
              />
            </div>
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
                {dataSeekerApply.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.Email}</TableCell>
                    <TableCell>{row["Phone Number"]}</TableCell>
                    <TableCell>
                      <a href={row["CV file"]} download className={classes.cvLink}>
                        Download CV
                      </a>
                    </TableCell>
                    <TableCell>{row.Status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row.jobPostActivityId)}>
                        <Edit />
                      </IconButton>
                      <IconButton component={Link} to={`/userProfileSystem/${row.id}`}>
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() =>
                            handleViewComments(row.jobPostActivityId)
                          }>
                        <Comment />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
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
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
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
                  <Select value={selectedStatus} onChange={handleStatusChange} fullWidth>
                    <MenuItem value="1">Pending</MenuItem>
                    <MenuItem value="2">Rejected</MenuItem>
                    <MenuItem value="3">Passed</MenuItem>
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
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AppliedCV;
