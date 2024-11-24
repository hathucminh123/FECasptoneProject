import React, { useState } from "react";
import { useSearchParams, Link, NavLink, useParams } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./Comment.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetCommentByJobActivity } from "../../Services/JobActivityComment/GetCommentByJobActivity";
import { PutJobActivityComment } from "../../Services/JobActivityComment/PutJobActivityComment";
import { DeleteJobActivityComment } from "../../Services/JobActivityComment/DeleteJobActivityComment";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
interface Comment {
  id: number;
  commentText: string;
  commentDate: string;
  rating: number;
}
const Comment:React.FC=()=> {
  const [searchParams] = useSearchParams();
  const { commentId } = useParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // State to track editing comment
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>("");
  const [editedRating, setEditedRating] = useState<number | null>(null);

  const { mutate: PutComment } = useMutation({
    mutationFn: PutJobActivityComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Comment"],
        refetchType: "active",
      });
      message.success("Comment and rating updated successfully!");
      setEditingCommentId(null); // Reset editing state
    },
    onError: () => {
      message.error("Failed to update the comment.");
    },
  });

  const { mutate: DeleteComment } = useMutation({
    mutationFn: DeleteJobActivityComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SeekerApply"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Comment"],
        refetchType: "active",
      });
      message.success("Comment deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete the comment.");
    },
  });

  const {
    data: Comment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Comment", commentId],
    queryFn: ({ signal }) =>
      GetCommentByJobActivity({ signal, id: Number(commentId) }),
    enabled: !!commentId,
    staleTime: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !Comment) {
    return <div>Error loading comments. Please try again later.</div>;
  }

  const CommentsData = Comment?.pagination.items || [];
  const Navigate = Comment?.pagination.pageSize;

  const notificationsPerPage = Navigate;
  console.log('nav',notificationsPerPage)
  const totalPages = Math.ceil(CommentsData.length / notificationsPerPage);
  const currentNotifications = CommentsData.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  // Handle editing logic
  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.commentText);
    setEditedRating(comment.rating);
  };

  const handleSave = (commentId: number) => {
    PutComment({
      data: {
        commentText: editedCommentText,
        rating: editedRating,
        id: commentId,
        commentDate: new Date().toISOString(),
      },
    });
  };

  const handleDelete = (commentId: number) => {
    DeleteComment({ id: commentId });
  };

  const renderNotifications = () => {
    return currentNotifications.map((notification, index) => (
      <div key={index} className={classes.main3}>
        <div className={classes.main4}>
          <div className={classes.main5}>
            <span className={classes.span}>Comment</span>
          </div>
          <div className={classes.main6}>
            {new Date(notification.commentDate).toLocaleDateString()}
          </div>
          <div className={classes.commentTextWrapper}>
            {editingCommentId === notification.id ? (
              <>
                <TextField
                  fullWidth
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
                <Rating
                  name="edit-rating"
                  value={editedRating}
                  onChange={(_, newValue) => setEditedRating(newValue)}
                />
                <IconButton onClick={() => handleSave(notification.id)}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Link to="" className={classes.link}>
                  {notification.commentText}
                </Link>
                <div className={classes.ratingWrapper}>
                  <Rating
                    name="read-only"
                    value={notification.rating || 0}
                    readOnly
                  />
                </div>
              </>
            )}
          </div>

          {/* Edit and Delete Icons */}
          <IconButton onClick={() => handleEdit(notification)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(notification.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <hr className={classes.hr} />
      </div>
    ));
  };

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Comment" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>{renderNotifications()}</div>

        {/* Pagination Navigation */}
        <nav className={classes.nav}>
          <ul className={classes.ul}>
            {[...Array(totalPages).keys()].map((_, index) => (
              <li key={index} className={classes.li}>
                <NavLink
                  to={`?page=${index + 1}`}
                  className={({ isActive }) =>
                    currentPage === index + 1 && isActive
                      ? classes.active
                      : undefined
                  }
                >
                  {index + 1}
                </NavLink>
              </li>
            ))}

            {currentPage < totalPages && (
              <li className={classes.li}>
                <NavLink
                  to={`?page=${currentPage + 1}`}
                  className={classes.link}
                >
                  <NavigateNextOutlinedIcon
                    fontSize="small"
                    sx={{
                      fontSize: "10px",
                      display: "inline-block",
                      height: "12px",
                    }}
                  />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Comment