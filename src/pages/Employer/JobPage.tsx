import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./JobPage.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import PauseIcon from "@mui/icons-material/Pause";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { PostJobLcation } from "../../Services/JobPostLocation/PostJobLcation";
import { queryClient } from "../../Services/mainService";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { message } from "antd";

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

export default function JobPage() {
  const statusOptions = ["All", "Approved", "Pending", "Failed"];
  const [state, setState] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Added state for search term
  const companyId = localStorage.getItem("CompanyId");
  const [jobCVCounts, setJobCVCounts] = useState<Record<number, number>>({});
  const [isFetchingCVs, setIsFetchingCVs] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectJobId, setselectJobId] = useState<number>();
  const [stressAddressDetail, setStressAddressDetail] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("1");
  const navigate = useNavigate();

  console.log('haha',jobCVCounts)
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
  const JobinCompany = useMemo(() => {
    return JobPostsdata?.filter((item) => item.companyId === Number(companyId));
  }, [JobPostsdata, companyId]);

  // Filter jobs based on search term
  const filteredJobs = useMemo(() => {
    if (!searchTerm) return JobinCompany;
    return JobinCompany?.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [JobinCompany, searchTerm]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const fetchCVsForJobs = useCallback(async () => {
    if (JobinCompany) {
      setIsFetchingCVs(true);
      const cvCounts: Record<number, number> = {};
      await Promise.all(
        JobinCompany.map(async (job) => {
          const seekerData = await GetSeekerJobPost({ id: job.id });
          const data = seekerData?.GetSeekers?.length || 0;
          cvCounts[job.id] = data;
        })
      );
      setJobCVCounts(cvCounts);
      setIsFetchingCVs(false);
    }
  }, [JobinCompany]);

  const { mutate } = useMutation({
    mutationFn: PostJobLcation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobPosts"],
        refetchType: "active",
      });
      message.success("Add Job location Successfully");
      setOpenModal(false);
    },
    onError: () => {
      message.error("Failed to Add job location set");
    },
  });

  useEffect(() => {
    fetchCVsForJobs();
  }, [fetchCVsForJobs]);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleNavigateDetail = (job: JobPost) => {
    navigate(`/employer-verify/jobs/jobDetail/${job.id}`, {
      state: { job, id: job.id },
    });
  };

  const handleEditClick = (id: number) => {
    setselectJobId(id);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (selectJobId) {
      mutate({
        data: {
          locationId: Number(selectedStatus),
          jobPostId: selectJobId,
          stressAddressDetail: stressAddressDetail,
        },
      });
    }
  };

  if (isJobLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isJobError) {
    return <div>Error loading jobs. Please try again later.</div>;
  }

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title="Recruitment management"
          icon={<CreateOutlinedIcon />}
          buttonstring="Post Recruitment"
          url="create-jobs"
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <div className={classes.main5}>
                <div className={classes.mainleft}>
                  <div className={classes.main6}>
                    <div className={classes.divicon}>
                      <SearchOutlinedIcon />
                    </div>
                    <input
                      type="text"
                      className={classes.inputsearch}
                      autoComplete="on"
                      placeholder="Search for job postings by title or job code"
                      value={searchTerm} // Bind input to search term state
                      onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                    />
                  </div>
                </div>
                <div className={classes.mainmiddle}>
                  <div className={classes.main6}>
                    <div className={classes.divtext}>Display status :</div>
                    <FormSelect
                      selectedValue={state}
                      setSelectedValue={setState}
                      placeholder=""
                      data={statusOptions}
                      padding={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.divtable}>
            <div className={classes.divtable1}>
              <div className={classes.divtable2}>
                <div className={classes.left}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    Jobs title
                  </Typography>
                </div>
                <div className={classes.left1}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    Status
                  </Typography>
                </div>
                <div className={classes.right}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    System-generated CVs
                  </Typography>
                </div>
                <div className={classes.right}>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#303235" }}
                  >
                    Filter CVs
                  </Typography>
                </div>
                <div className={classes.right1}>
                  <div className={classes.icon1}>
                    <SettingsOutlinedIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isFetchingCVs ? (
            <div>Loading CV data...</div>
          ) : (
            filteredJobs?.map((job, index) => (
              <div
                className={classes.divtable}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => setHovered(null)}
                key={job.id}
                style={{
                  backgroundColor:
                    hovered === index ? "#FFD4C3" : "transparent",
                }}
              >
                <div className={classes.divtable1}>
                  <div className={classes.divtable2}>
                    <div className={classes.left}>
                      <div className={classes.div1}>
                        <div className={classes.div2}>
                          <div className={classes.div3}>
                            <span className={classes.span1}>{job.id}</span>
                          </div>
                          <Link to="#" className={classes.link}>
                            {job.jobTitle}
                          </Link>
                          <div className={classes.div4}>
                            {jobCVCounts[job.id]
                              ? `Have ${jobCVCounts[job.id]} CV Applied`
                              : "No CV yet"}
                          </div>
                          {hovered === index && (
                            <>
                              <div className={classes.div5}>
                                <Link
                                  to={`Detail/CV/AppliedCV/${job.id}`}
                                  className={classes.link1}
                                >
                                  View Candidate's CV
                                </Link>
                              </div>
                              <div
                                className={classes.div5}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEditClick(job.id)}
                              >
                                <Link to="#" className={classes.link1}>
                                  Add JobLocation
                                </Link>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={classes.left1}>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 400,
                          paddingRight: ".6em",
                          paddingLeft: ".6em",
                          borderRadius: "10rem",
                          display: "inline-block",
                          padding: ".25em .4em",
                          lineHeight: 1,
                          textAlign: "center",
                          background: "#00B14F",
                          color: "white",
                        }}
                      >
                        Approved
                      </Typography>
                    </div>

                    <div className={classes.right}>
                      <div className={classes.div7}>
                        <div className={classes.div9}>
                          <Link
                            to={`Detail/CV/AppliedCV/${job.id}/CV/Recommend`}
                            className={classes.link4}
                          >
                            <RemoveRedEyeIcon
                              fontSize="small"
                              sx={{ color: "#a8afb6" }}
                            />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={classes.right}>
                      <div className={classes.div7}>
                        <div className={classes.div9}>
                          <Link
                            to="Detail/CV/AppliedCV/CV/Recommend"
                            className={classes.link3}
                          >
                            Find CVs
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className={classes.right1}>
                      <div
                        className={classes.icon2}
                        onClick={() => handleNavigateDetail(job)}
                      >
                        <Tooltip title="Edit">
                          <ModeEditIcon
                            fontSize="small"
                            sx={{
                              backgroundColor:
                                hovered === index ? "#FF6F61" : "#e8edf2",
                              borderRadius: "50%",
                              padding: "10px",
                              color: hovered === index ? "#fff" : undefined,
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div className={classes.icon2}>
                        <Tooltip title="Delete">
                          <PauseIcon
                            fontSize="small"
                            sx={{
                              backgroundColor:
                                hovered === index ? "#FF6F61" : "#e8edf2",
                              borderRadius: "50%",
                              padding: "10px",
                              color: hovered === index ? "#fff" : undefined,
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
              <MenuItem value="1">Hồ Chí Minh</MenuItem>
              <MenuItem value="2">Hà Nội</MenuItem>
              <MenuItem value="3">Đà Nẵng</MenuItem>
              <MenuItem value="4">Hải Phòng</MenuItem>
              <MenuItem value="5">Cần Thơ</MenuItem>
              <MenuItem value="6">Nha Trang</MenuItem>
            </Select>
            <TextField
              fullWidth
              sx={{ marginTop: 2 }}
              label="stressAddressDetail"
              placeholder="Input your address"
              value={stressAddressDetail}
              onChange={(e) => setStressAddressDetail(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSave}
              style={{ marginTop: 16 }}
            >
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
    </div>
  );
}
