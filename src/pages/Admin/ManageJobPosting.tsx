import React, { useState } from "react";
import classes from "./ManageJobPosting.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
// import TableJobs from "../../components/Admin/TableJobs";
import TableAccount from "../../components/Admin/TableAccount";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const jobStatusOptions = ["Pending", "Approved", "Suspended"];
const jobTypeOptions = ["Full-time", "Part-time", "Contract"];

const headers = [
  "jobTitle",
  "companyName",
  "postedDate",
  "jobType",
  "status",
  "Action",
];
// Sample job data
const jobData = [
  {
    jobTitle: "Frontend Developer",
    companyName: "ABC Tech",
    postedDate: "2024-09-20",
    status: "Pending",
    jobType: "Full-time",
  },
  {
    jobTitle: "Backend Engineer",
    companyName: "XYZ Solutions",
    postedDate: "2024-09-15",
    status: "Approved",
    jobType: "Contract",
  },
];

const  ManageJobPosting:React.FC =()=> {
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [selectJobType, setSelectJobType] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);

  const width = 230;

  const handleViewDetail = (job: { [key: string]: string }) => {
    console.log("View Detail clicked for:", job);
    alert(`Viewing details for ${job.jobTitle}`);
  };

  // Custom renderers for specific columns
  const customRenderers = {
    jobTitle: (job: { [key: string]: string }, index: number) => (
      <>
        <span>{job.jobTitle}</span>
        {hovered === index && (
          <div className={classes.div6}>
            <Link to="#" className={classes.link2}>
              View Job Details
            </Link>
          </div>
        )}
      </>
    ),
    status: (job: { [key: string]: string }) => (
      <span
        style={{
          color:
            job.status === "Approved"
              ? "green"
              : job.status === "Pending"
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        {job.status}
      </span>
    ),
    Action: (job: { [key: string]: string }, index: number) => (
      <div className={classes.actions}>
        {job.status === "Pending" && (
          <div className={classes.icon2}>
            <Tooltip title="Approve">
              <CheckCircleIcon
                fontSize="small"
                sx={{
                  backgroundColor: hovered === index ? "#4CAF50" : "#e8edf2",
                  borderRadius: "50%",
                  padding: "10px",
                  color: hovered === index ? "#fff" : undefined,
                }}
              />
            </Tooltip>
          </div>
        )}
        <div className={classes.icon2}>
          <Tooltip title="Edit">
            <ModeEditIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
        <div className={classes.icon2}>
          <Tooltip title="Suspend">
            <PauseIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
        <div className={classes.icon2}>
          <Tooltip title="Delete">
            <DeleteIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
      </div>
    ),
  };

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Job Postings Management" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Search by job title or company"
                />
                <button className={classes.button}>
                  <SearchOutlinedIcon fontSize="small" />
                </button>
              </form>
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectStatus}
                setSelectedValue={setSelectStatus}
                data={jobStatusOptions}
                width={width}
                placeholder="Filter by Job Status"
              />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectJobType}
                setSelectedValue={setSelectJobType}
                data={jobTypeOptions}
                width={width}
                placeholder="Filter by Job Type"
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
                Found
                <span className={classes.span}> {jobData.length} </span>
                Jobs
              </div>
            </div>
          </div>
          <div className={classes.main12}>
            <TableAccount
              headers={headers}
              data={jobData}
              onViewDetail={handleViewDetail}
              customRenderers={customRenderers}
              hovered={hovered}
              setHovered={setHovered} // Correct prop name
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default ManageJobPosting