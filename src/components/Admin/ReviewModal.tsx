import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Rating,
  Grid,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  padding: "20px",
  borderRadius: "10px",
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
};
interface ReviewDetail {
    id: number;
    salaryRating: number;
    trainingRating: number;
    careRating: number;
    cultureRating: number;
    officeRating: number;
    summaryContent: string;
    reviewContent: string;
    reasonContent: string;
    experienceContent: string;
    suggestionContent: string;
    recommened: boolean;
    companyNName: string | null;
    rating:number;
  }

interface ReviewModalProps {
  open: boolean;
  selectedReview: ReviewDetail|null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  selectedReview,
  onClose,
  onApprove,
  onReject,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {selectedReview?.companyNName}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Salary Rating:</strong>
            </Typography>
            <Rating value={selectedReview?.salaryRating} readOnly />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Training Rating:</strong>
            </Typography>
            <Rating value={selectedReview?.trainingRating} readOnly />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Care Rating:</strong>
            </Typography>
            <Rating value={selectedReview?.careRating} readOnly />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Culture Rating:</strong>
            </Typography>
            <Rating value={selectedReview?.cultureRating} readOnly />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Office Rating:</strong>
            </Typography>
            <Rating value={selectedReview?.officeRating} readOnly />
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Summary:</strong> {selectedReview?.summaryContent}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Review Content:</strong> {selectedReview?.reviewContent}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Experience:</strong> {selectedReview?.experienceContent}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Suggestions:</strong> {selectedReview?.suggestionContent}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={onReject}
            sx={{ width: "45%" }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onApprove}
            sx={{ width: "45%" }}
          >
            Approve
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
