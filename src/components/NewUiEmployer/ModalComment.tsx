import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostJobActivityComment } from "../../Services/JobActivityComment/PostJobActivityComment";
import { DeleteJobActivityComment } from "../../Services/JobActivityComment/DeleteJobActivityComment"; // Assume this exists
import { queryClient } from "../../Services/mainService";
import { GetCommentByJobActivity } from "../../Services/JobActivityComment/GetCommentByJobActivity";
import moment from "moment";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  selectedIdJobPostActivity?: number | null;
}

export default function CommentModal({
  open,
  onClose,
  selectedIdJobPostActivity,
}: CommentModalProps) {
  const [commentText, setCommentText] = useState<string>("");
  const [ratingValue, setRatingValue] = useState<number | null>(2); // Default rating

  const { data: Comment } = useQuery({
    queryKey: ["Comment", selectedIdJobPostActivity],
    queryFn: ({ signal }) =>
      GetCommentByJobActivity({
        signal,
        id: Number(selectedIdJobPostActivity),
      }),
    enabled: !!selectedIdJobPostActivity,
    staleTime: 5000,
  });

  const CommentsData = Comment?.pagination.items || [];

  const { mutate: PostComment } = useMutation({
    mutationFn: PostJobActivityComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comment"], refetchType: "active" });
      message.success("Comment and rating added successfully!");
    },
    onError: () => {
      message.error("Failed to post the comment.");
    },
  });

  const { mutate: DeleteComment } = useMutation({
    mutationFn: DeleteJobActivityComment, // Assume DeleteJobActivityComment API exists
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comment"], refetchType: "active" });
      message.success("Comment deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete the comment.");
    },
  });

  const handlePostComment = () => {
    if (commentText.trim() || ratingValue !== null) {
      PostComment({
        data: {
          commentText: commentText,
          commentDate: new Date().toISOString(),
          rating: ratingValue,
          jobPostActivityId: selectedIdJobPostActivity,
        },
      });
      setCommentText("");
      setRatingValue(2); // Reset the rating after submitting
    } else {
      message.warning("Please provide a comment or rating before submitting.");
    }
  };

  const handleDeleteComment = (commentId: number) => {
    DeleteComment({ id: commentId });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header with close icon */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Team Notes
        <IconButton onClick={onClose} sx={{ padding: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {CommentsData.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  HM
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* Display user initials or name if available */}
                  <Typography sx={{ color: "#757575", fontSize: "12px" }}>
                    {moment(item.commentDate).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography>
                </Box>
              </Box>

              {/* Delete Icon */}
              <IconButton
                onClick={() => handleDeleteComment(item.id)}
                sx={{ color: "#f44336" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* Display Rating as Stars */}
            <Rating
              value={item.rating}
              readOnly
              precision={0.5}
              size="small"
              sx={{ marginLeft: "50px" }}
            />

            <Typography sx={{ marginLeft: "50px", color: "#424242" }}>
              {item.commentText}
            </Typography>
            <hr />
          </Box>
        ))}

        {/* Rating Section */}
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
          Your Rating
        </Typography>
        <Rating
          name="rating"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
          precision={0.5} // Allows half-star ratings
          size="large"
          sx={{ mb: 2 }}
        />

        {/* Comment Input Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                padding: "0 12px",
              },
            }}
          />
          <Button
            onClick={handlePostComment}
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "8px 16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Post
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
