import React from "react";
import classes from "./HeaderJobStatus.module.css";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobActivity } from "../Services/UserJobPostActivity/GetUserJobPostActivity";

export default function HeaderJobStatus() {
  // const {
  //     data: JobPosts,
  //     // isLoading: isJobLoading,
  //     // isError: isJobError,
  //   } = useQuery({
  //     queryKey: ["JobPosts"],
  //     queryFn: ({ signal }) => GetJobPost({ signal: signal }),
  //     staleTime: 5000,
  //   });
  const {
    data: JobPostActivity,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPostActivity"],
    queryFn: ({ signal }) => GetJobActivity({ signal: signal }),
    staleTime: 5000,
  });

  //   const JobPostsdata = JobPosts?.JobPosts;
  const JobPostActivitydata = JobPostActivity?.UserJobActivitys;

  const JobPending = JobPostActivitydata?.filter(
    (item) => item.status === "Pending"
  );
  const JobRejected = JobPostActivitydata?.filter(
    (item) => item.status === "Rejected"
  );
  const JobPassed = JobPostActivitydata?.filter(
    (item) => item.status === "Passed"
  );
  return (
    <div className={classes.header}>
      <div className={classes.icontainer}>
        <ul className={classes.icontainer1}>
          <li className={classes.menuItem}>
            <NavLink
              to="/Job-invitation"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Pending
              <div className={classes.main}>{JobPending?.length}</div>
            </NavLink>
          </li>
          <li className={classes.menuItem}>
            <NavLink
              to="Rejected-Jobs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Rejected
              <div className={classes.main}>{JobRejected?.length}</div>
            </NavLink>
          </li>
          <li className={classes.menuItem}>
            <NavLink
              to="Passed"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Passed
              <div className={classes.main}>{JobPassed?.length}</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
