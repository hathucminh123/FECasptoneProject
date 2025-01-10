import React, { useEffect, useState } from "react";
import classes from "./RecommendNew.module.css";
import {
  NavLink,
  Outlet,
  useParams,
  //  useParams
} from "react-router-dom";
// import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { ListSeekers } from "../../Services/ListSeekers/ListSeekers";
import { GetUserSearchService } from "../../Services/UserSearchSevice/GetUserSearchService";
import { message } from "antd";
const RecommendNew: React.FC = () => {
  const { id } = useParams();
  const JobId = Number(id);
  // const {
  //   data: SeekerApply,
  //   // isLoading: isSeekerLoading,
  //   // isError: isSeekerError,
  // } = useQuery({
  //   queryKey: ["SeekerApply", JobId],
  //   queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
  //   enabled: !!JobId,
  // });
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const { mutateAsync } = useMutation({
    mutationFn: GetUserSearchService,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        // setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount);
      } else {
        // setJobSearch([]);
        setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch User data");
    },
  });

  useEffect(() => {
    mutateAsync({
      data: {
        pageIndex: 1,
        pageSize: 1000,
      },
    });
  }, [mutateAsync]);

  const {
    data: ListSeeker,
    // isLoading: isSeekerLoading,
    // isError: isSeekerError,
  } = useQuery({
    queryKey: ["JobSeekerRole", JobId],
    queryFn: ({ signal }) =>
      ListSeekers({
        signal: signal,
        pageIndex: 1,
        pageSize: 1000,
        jobPostId: JobId,
      }),
    enabled: !!JobId,
  });

  const ListSeekrData = ListSeeker?.items;

  console.log("có length ko ", ListSeekrData?.length);

  // const dataSeekerApply = SeekerApply?.GetSeekers;

  // const PassedDataSeekerApply = dataSeekerApply?.filter(
  //   (item) => item.status === "Passed"
  // );
  //   const RejectedDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="Rejected")
  //   const InterViewDataSeekerApply = dataSeekerApply?.filter((item)=> item.status==="InterviewStage")

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>List Job Seeker</p>
            <div className={classes.main3}>
              <span className={classes.span}>Live</span>
            </div>
          </div>
          {/* <div className={classes.main4}>
            <Link to="" className={classes.link1}>
              View Job
            </Link>
          </div> */}
        </div>
        {/* <Typography
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
        </Typography> */}
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
                      Passive
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{ListSeekrData?.length}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
            <NavLink
              to="Search"
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
                      Active
                    </span>
                  </div>
                  <div className={classes.main7}>
                    <div className={classes.main8}>
                      <span>{totalJobs}</span>
                    </div>
                  </div>
                </>
              )}
            </NavLink>
            {/* <NavLink
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
            </NavLink> */}
            {/* <NavLink
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
            </NavLink> */}
          </nav>
        </div>
      </header>
      <Outlet context={{ totalJobs,setTotalJobs }} />
    </div>
  );
};
export default RecommendNew;
