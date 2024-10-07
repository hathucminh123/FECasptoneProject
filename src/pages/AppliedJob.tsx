import React from "react";
import classes from "./AppliedJob.module.css";
import {
  FormControl,
  //   InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
// import CardJob from "../components/CardJob";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { useQuery } from "@tanstack/react-query";
import { GetJobActivity } from "../Services/UserJobPostActivity/GetUserJobPostActivity";
import CardApply from "../components/CardApply";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
export default function AppliedJob() {
  const [age, setAge] = React.useState("");
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

  console.log("activity", JobPostActivitydata);
  const appliedJobActivity = JobPostsdata?.find((job) =>
    JobPostActivitydata?.some((activity) => job.id === activity.jobPostId)
  );

  console.log("sd", appliedJobActivity);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className={classes.tab}>
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
                  Applied Jobs (0)
                </Typography>
                <div className={classes.sort}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4e4c4d",
                      whiteSpace: "nowrap",
                      marginRight: "16px",
                    }}
                  >
                    Sort by:
                  </Typography>
                  <FormControl fullWidth sx={{ width: "100%" }}>
                    {/* <InputLabel id="demo-simple-select-label">Location</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      // label="Location"
                      onChange={handleChange}
                      sx={{
                        background: "white",
                        width: "200px",
                      }}
                    >
                      <MenuItem value="Nearest expiration time">
                        Nearest expiration time
                      </MenuItem>
                      <MenuItem value="Newest jobs">Newest jobs</MenuItem>
                      {/* <MenuItem value={30}>Đà Nẵng</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.job}>
              <div className={classes.job1}>
                {JobPostActivitydata?.map((activity) => {
                  const companys = Companiesdata?.find(
                    (item) => item.id === appliedJobActivity?.id
                  );

                  return (
                    <CardApply
                      company={companys}
                      job={appliedJobActivity}
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
