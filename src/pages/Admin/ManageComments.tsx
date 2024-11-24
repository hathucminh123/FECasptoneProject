import React, { useState } from "react";
import classes from "./ManageComments.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Rating from "@mui/material/Rating";
import TableComment from "../../components/Admin/TableComment";

const commentStatusOptions = ["Pending", "Approved", "Deleted"];

const headers = [
  "username",
  "commentContent",
  "date",
  "status",
  "Rate",
  "Review Company", // Thêm cột Review Company
  "Action",
];

// Sample comment data
const commentData = [
  {
    username: "user123",
    commentContent: "Bài viết rất hữu ích!",
    date: "2024-09-20",
    status: "Pending",
    Rate: 5,
    reviewCompany: "ABC Corp", // Thêm tên công ty vào dữ liệu
  },
  {
    username: "user456",
    commentContent: "Tôi không đồng ý với quan điểm này...",
    date: "2024-09-15",
    status: "Approved",
    Rate: 4,
    reviewCompany: "XYZ Solutions", // Thêm tên công ty vào dữ liệu
  },
];

const ManageComments: React.FC = () => {
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);

  const width = 230;

  const handleViewDetail = (comment: { [key: string]: string | number | boolean | null | undefined }) => {
    console.log("View Detail clicked for:", comment);
    alert(`Viewing details for comment by ${comment.username}`);
  };

  // Custom renderers for specific columns
  const customRenderers = {
    username: (comment: { [key: string]: string | number | boolean | null | undefined }) => (
      <span>{comment.username}</span>
    ),
    commentContent: (comment: { [key: string]: string | number | boolean | null | undefined }, index: number) => (
      <>
        <span>{comment.commentContent}</span>
        {hovered === index && (
          <div className={classes.div6}>
            <a href="#" className={classes.link2}>
              View Full Comment
            </a>
          </div>
        )}
      </>
    ),
    status: (comment: { [key: string]: string | number | boolean | null | undefined }) => (
      <span
        style={{
          color:
            comment.status === "Approved"
              ? "green"
              : comment.status === "Pending"
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        {comment.status}
      </span>
    ),
    Rate: (comment: { [key: string]: string | number | boolean | null | undefined }) => (
      <Rating name="read-only" value={comment.Rate as number} readOnly />
    ),
    "Review Company": (comment: { [key: string]: string | number | boolean | null | undefined }) => (
      <span>{comment.reviewCompany}</span> // Hiển thị tên công ty trong cột Review Company
    ),
    Action: (comment: { [key: string]: string | number | boolean | null | undefined }, index: number) => (
      <div className={classes.actions}>
        {comment.status === "Pending" && (
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
        <HeaderSystem title="Comment Management" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Search by username or content"
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
                data={commentStatusOptions}
                width={width}
                placeholder="Filter by Comment Status"
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
                <span className={classes.span}> {commentData.length} </span>
                Comments
              </div>
            </div>
          </div>
          <div className={classes.main12}>
            <TableComment
              headers={headers}
              data={commentData}
              onViewDetail={handleViewDetail}
              customRenderers={customRenderers}
              hovered={hovered}
              setHovered={setHovered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default ManageComments