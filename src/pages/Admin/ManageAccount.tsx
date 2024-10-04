import React, { useState } from "react";
import classes from "./ManageAccount.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import TableAccount from "../../components/Admin/TableAccount";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import PauseIcon from "@mui/icons-material/Pause";
import { Link } from "react-router-dom";
const accountRoles = ["Admin", "Recruiter", "Job Seeker"];
const accountStatus = ["Active", "Suspended", "Pending"];

const headers = [
  "fullName",
  "Email",
  "Phone Number",
  "Role",
  "Status",
  "Action",
];

// Define the data for the table rows
const data = [
  {
    fullName: "John Doe",
    Email: "johndoe@example.com",
    "Phone Number": "123-456-7890",
    Role: "Admin",
    Status: "Active",
    Action: "View Detail",
  },
  {
    fullName: "Jane Smith",
    Email: "janesmith@example.com",
    "Phone Number": "987-654-3210",
    Role: "Recruiter",
    Status: "Pending",
    Action: "View Detail",
  },
];

export default function ManageAccount() {
  const [selectRole, setSelectRole] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);

  const width = 230;

  const handleViewDetail = (row: { [key: string]: string }) => {
    console.log("View Detail clicked for:", row);
    alert(`Viewing details for ${row.fullName}`);
  };

  // Custom renderers for specific columns
  const customRenderers = {
    fullName: (row: { [key: string]: string }, index: number) => (
      <>
        <span>{row.fullName}</span>
        {hovered === index && (
          <>
            <div className={classes.div6}>
              <Link to="#" className={classes.link2}>
               View Profile
              </Link>
            </div>
          </>
        )}
      </>
    ),
    Status: (row: { [key: string]: string }) => (
      <span
        style={{
          color:
            row.Status === "Active"
              ? "green"
              : row.Status === "Pending"
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        {row.Status}
      </span>
    ),
    Action: (row: { [key: string]: string }, index: number) => {
      return (
        <div className={classes.right1}>
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
          <div
            className={classes.icon2}
            // onMouseEnter={handleClick}
            // onMouseLeave={handleClose}
          >
            <Tooltip title="Delete">
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
        </div>
      );
    },
  };

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Account Management" appear={true} />
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
                />
                <button className={classes.button}>
                  <SearchOutlinedIcon fontSize="small" />
                </button>
              </form>
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectRole}
                setSelectedValue={setSelectRole}
                data={accountRoles}
                width={width}
                placeholder="Select Account Role"
              />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectStatus}
                setSelectedValue={setSelectStatus}
                data={accountStatus}
                width={width}
                placeholder="Select Account Status"
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
                <span className={classes.span}> {data.length} </span>
                Accounts
              </div>
            </div>
          </div>
          <div className={classes.main12}>
            <TableAccount
              headers={headers}
              data={data}
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
