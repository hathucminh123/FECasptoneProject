import React, { useEffect, useState } from "react";
import classes from "./SaveJobs.module.css";

// import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
// import { companyData } from "../assets/data/CompanyData";
// import { add } from "../redux/slices/favoriteJob";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";
import {
  // FormControl,
  //   InputLabel,
  // MenuItem,
  // Select,
  // SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobActivity } from "../Services/UserJobPostActivity/GetUserJobPostActivity";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import CardApply from "../components/CardApply";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { message } from "antd";

// interface BusinessStream {
//   id: number;
//   businessStreamName: string;
//   description: string;
// }
interface JobType {
  id: number;
  name: string;
  description: string;
}

interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
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
  jobType: JobType; // jobType là đối tượng JobType
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
  benefitObjects?: Benefits[];
  minsalary: number;
}
const  AppliedJob:React.FC =()=> {
  //   const data = useAppSelector((state) => state.favorite.item);
  //   const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  //   const [undoData, setUndoData] = useState<Job | null>(null);
  //   const [age, setAge] = useState<string>("");
  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });
  const {
    data: JobPostActivity,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPostActivity"],
    queryFn: ({ signal }) => GetJobActivity({ signal: signal }),
    staleTime: 5000,
  });
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;
  const JobPostsdata = JobPosts?.JobPosts;
  const JobPostActivitydata = JobPostActivity?.UserJobActivitys;

  // const JobPending = JobPostActivitydata?.filter(
  //   (item) => item.status === "Applied"
  // );

  const PendingJobApplied = JobPostsdata?.find((job) =>
    JobPostActivitydata?.some((activity) => job.id === activity.jobPostId)
  );


  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setJobSearch(data.result.items);
        // setTotalJobs(data.result.totalCount); 
      } else {
        setJobSearch([]);
        // setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch job data");
    },
  });




  // Fetch jobs whenever currentPage changes
  useEffect(() => {
    mutateAsync({
      data: {
        // pageIndex: currentPage,
        pageSize: 1000,
      },
    });
  }, [ mutateAsync]);
  console.log("Pending", PendingJobApplied);

  // Tự động tắt thông báo sau 3 giây
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Xử lý khi người dùng nhấn "Undo"
  //   const handleUndo = () => {
  //     if (undoData) {
  //       dispatch(add(undoData));
  //       setUndoData(null);
  //     }
  //   };

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value as string);
  //   };

  return (
    <div className={classes.tab}>
      {/* {showAlert && (
        <Stack
          sx={{
            left: 'inherit',
            right: 0,
            top: '120px',
            bottom: 'inherit',
            marginRight: '48px',
            width: '400px',
            opacity: showAlert ? 1 : 0, 
            zIndex: 11,
            backgroundColor: '#eaf0fa',
            padding: '16px 16px 16px 24px',
            border: 'none',
            borderRadius: '8px',
            maxWidth: '400px',
            position: 'fixed',
            boxShadow: '0px 6px 32px rgba(0, 0, 0, 0.08)',
            display: showAlert ? 'block' : 'none',
            fontSize: '0.875rem',
            pointerEvents: 'auto',
            transition: 'opacity 0.15s linear',
            boxSizing: 'border-box',
          }}
        >
          <Alert variant="outlined" severity="info">
            <AlertTitle>You unsaved a job.</AlertTitle>
            <div style={{ display: 'flex', gap: '20px', color: '#0e2eed', marginTop: '12px' }}>
              <Button color="inherit" size="small" onClick={handleUndo}>
                Undo
              </Button>
            </div>
          </Alert>
        </Stack>
      )} */}

      <div className={classes.icontainer}>
        <div className={classes.container}>
          <div className={classes.container1}>
            <div style={{ display: "block" }}>
              <div className={classes.title}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#121212",
                    lineHeight: 1.5,
                    fontSize: "22px",
                    fontWeight: 700,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Applied Job ({JobPostActivitydata?.length})
                </Typography>
              </div>
            </div>
            <div className={classes.job}>
              <div className={classes.job1}>
                {JobPostActivitydata?.map((activity) => {
                  const PendingJobApplied = jobSearch?.find(
                    (job) => job.id === activity.jobPostId
                  );
                  const companys = Companiesdata?.find(
                    (item) => item.id === PendingJobApplied?.companyId
                  );

                  return (
                    <CardApply
                      company={companys}
                      job={PendingJobApplied}
                      activity={activity}
                      key={activity.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AppliedJob