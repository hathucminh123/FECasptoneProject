import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import classes from './FeedbackModal.module.css';
import Modal from "./Modal"; 
import moment from "moment";

interface Comment {
  id: number;
  commentText: string;
  commentDate: string;
  rating: number;
}
// interface Comment {
//   commentId: number;
//   text: string;
//   date: string;
// }

interface Props {
  onDone?: () => void;
  data: Comment[] | undefined ;
}

const FeedbackModal: React.FC<Props> = ({ onDone, data }) => {
  return (
    <Modal  text="" disappear={true} title="Comments" onClose={onDone}>
      <Box component="div" className={classes.commentContainer}>
        {data && data.length > 0 ? (
          data.map((comment) => (
            <div key={comment.id} className={classes.comment}>
              <Typography variant="body1" component="p">
                <strong>Comment:</strong> {comment.commentText}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Date:</strong> {moment(comment.commentDate).format("DD/MM/YYYY")}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary">
                  <strong>Rating:</strong>
                </Typography>
                <Rating
                  name={`rating-${comment.id}`}
                  value={comment.rating}
                  readOnly
                  precision={0.5} 
                  sx={{ ml: 1 }} 
                />
              </Box>
              <hr className={classes.commentSeparator} />
            </div>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments available.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
