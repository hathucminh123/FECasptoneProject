import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import classes from "./OverViewJob.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPostById } from "../../Services/JobsPost/GetJobPostById";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import { DeleteJobPost } from "../../Services/JobsPost/DeleteJobPost";
import { PutJobActive } from "../../Services/JobsPost/PutJobActive";

const OverViewJob: React.FC = () => {
  const { id } = useParams();

  // const [searchParams] = useSearchParams();
  // const isEdit = searchParams.get("mode") === "Edit";
  console.log(id);
  const JobId = Number(id);
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });
  const job = jobData?.JobPosts;

  const { mutate, isPending: isPendingJob } = useMutation({
    mutationFn: DeleteJobPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobPosts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Job-details"],
        refetchType: "active",
      });
      message.success("Award Details Deleted Successfully");
    },
    onError: () => {
      message.error("Failed to delete the Award");
    },
  });
  const handleDelete = () => {
    mutate({ id: JobId });
  };

  const { mutate: PutActive, isPending } = useMutation({
    mutationFn: PutJobActive,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobPosts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Job-details"],
        refetchType: "active",
      });
      message.success("Award Details Deleted Successfully");
    },
    onError: () => {
      message.error("Failed to delete the Award");
    },
  });

  const handleUpdateJobPost = () => {
    PutActive({ id: JobId });
  };

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.main1}>
          <div className={classes.main2}>
            <p className={classes.p}>{job?.jobTitle}</p>
            <div className={classes.main3}>
              {job?.isDeleted === true ? (
                <span className={classes.span}>Is Deleted</span>
              ) : (
                <span className={classes.span}>Live</span>
              )}
            </div>
          </div>

          {job?.isDeleted === true ? (
            isPending ? (
              <div className={classes.main4}>
                <button
                  type="button"
                  // onClick={handleUpdateJobPost}
                  className={classes.link1}
                  disabled={true}
                >
                  Wait a seconds
                </button>
              </div>
            ) : (
              <div className={classes.main4}>
                <button
                  type="button"
                  onClick={handleUpdateJobPost}
                  className={classes.link1}
                >
                  Activate
                </button>
              </div>
            )
          ) : isPendingJob ? (
            <div className={classes.main4}>
              <button type="button" disabled={true} className={classes.link1}>
                wait a seconds
              </button>
            </div>
          ) : (
            <div className={classes.main4}>
              <button
                type="button"
                onClick={handleDelete}
                className={classes.link1}
              >
                Delete
              </button>
            </div>
          )}

          {/* {isEdit && <div className={classes.main5}>
            <div className={classes.main6}>
              <button type="button" className={classes.button}>
                Save Changes
              </button>
            </div>
            </div>} */}
        </div>
        <nav className={classes.nav}>
          <NavLink
            to={`/EmployerJob/listjobs/OverView/${id}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            {({ isActive }) => (
              <div className={classes.main4}>
                <span style={isActive ? { color: "#050c26" } : undefined}>
                  Preview
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            to="Edit?mode=Edit"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            {({ isActive }) => (
              <div className={classes.main4}>
                <span style={isActive ? { color: "#050c26" } : undefined}>
                  Edit
                </span>
              </div>
            )}
          </NavLink>
          {/* <NavLink
            to="asdas"
            style={{ marginLeft: "24px" }}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <div className={classes.main4}>
              <span>Applicants</span>
            </div>
          </NavLink> */}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
export default OverViewJob;
