import React from "react";
import classes from "./ApplicantView.module.css";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
export default function ApplicantView() {
  const { id } = useParams();
  const JobId = Number(id);
  const {
    data: SeekerApply,
    // isLoading: isSeekerLoading,
    // isError: isSeekerError,
  } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const dataSeekerApply = SeekerApply?.GetSeekers;
  const PendingDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="Pending")
  const PassedDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="Passed")
  const RejectedDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="Rejected")
  const InterViewDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="InterviewStage")

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>Reactjs</p>
            <div className={classes.main3}>
              <span className={classes.span}>Live</span>
            </div>
          </div>
          <div className={classes.main4}>
            <Link to={`/EmployerJob/listjobs/OverView/${id}`} className={classes.link1}>
              View Job
            </Link>
          </div>
        </div>
        <Typography
          variant="h3"
          sx={{
            fontSize: "16px",
            lineHeight: "24px",
            marginBottom: "16px",
            fontWeight: 400,
          }}
          className={classes.main5}
        >
          Hồ Chí Minh
        </Typography>
        <div className={classes.main6}>
          <nav className={classes.nav}>
            <NavLink
              // to={`/EmployerJob/listjobs/OverView/${id}`}
              to={""}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <>
                  <div className={classes.main4}>
                    <span style={isActive ? { color: "#050c26" } : undefined}>
                      Pending
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{PendingDataSeekerApply?.length}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
            <NavLink
              to="Passed"
              style={{ marginLeft: "24px" }}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <>
                  <div className={classes.main4}>
                    <span style={isActive ? { color: "#050c26" } : undefined}>
                      Passed
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{PassedDataSeekerApply?.length}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
            <NavLink
              to="Rejected"
              style={{ marginLeft: "24px" }}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <>
                  <div className={classes.main4}>
                    <span style={isActive ? { color: "#050c26" } : undefined}>
                      Rejected
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{RejectedDataSeekerApply?.length}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
            <NavLink
              to="InterView"
              style={{ marginLeft: "24px" }}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              {({ isActive }) => (
                <>
                  <div className={classes.main4}>
                    <span style={isActive ? { color: "#050c26" } : undefined}>
                      InterView
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{InterViewDataSeekerApply?.length}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet/>
    </div>
  );
}
