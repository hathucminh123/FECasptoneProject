import React, { useState } from "react";
import classes from "./ManageCVs.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
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

const headers = ["Full Name", "Email", "Phone Number", "CV File","Status", "Action"];
const stateData = ["Available data", "Meeting", "Accept a Job", "Rejected", "Pending"];
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
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [currentJobPostId, setCurrentJobPostId] = useState<number | null>(null);
  const CompanyId = localStorage.getItem("CompanyId");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: PutJobPostActivityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobPostActivity"],
        refetchType: "active",
      });
      message.success("Status Details Update Successfully");
    },
    onError: () => {
      message.error("Failed to Update the status set");
    },
  });

  const handleSave = () => {
    if (currentJobPostId) {
      mutate({
        data: {
          jobPostActivityId: currentJobPostId,
          status: Number(selectedStatus),
        },
      });
    }
    setOpenModal(false);
  };

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
      fullName: `${seeker.firstName} ${seeker.lastName}`.trim() || seeker.userName,
      Email: seeker.email,
      "Phone Number": seeker.phoneNumber || "Not provided",
      "CV file": `${seeker.cvPath}`,
      Status:  seeker.status,
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
                  value={searchTerm} // Bind search input to state
                  onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
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
                Found <span className={classes.span}>{filteredData.length}</span> Candidate(s)
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
                        <a href={row["CV file"]} download className={classes.cvLink}>
                          Download CV
                        </a>
                      </TableCell>
                      <TableCell>{row.Status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewDetail(row.id)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleEditClick(row.jobPostActivityId)}>
                          <Edit />
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className={classes.modalBox}>
          <Typography variant="h6" component="h2">
            Update Status
          </Typography>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            fullWidth
          >
            <MenuItem value="1">Pending</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
            <MenuItem value="3">Passed</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleSave} style={{ marginTop: 16 }}>
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            style={{ marginTop: 16 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
