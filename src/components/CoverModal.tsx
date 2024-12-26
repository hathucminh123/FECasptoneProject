import React  from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CoverLetterModalProps {
  open: boolean;
  onClose: () => void;
  description: string |undefined;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  open,
  onClose,
  description,
}) => {
    const stripHTML = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="cover-letter-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "8px",
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography id="cover-letter-title" variant="h6" fontWeight="bold">
            Cover Letter Description
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            padding: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line", // Preserves line breaks in text
              color: "text.secondary",
            }}
          >
           {stripHTML(description || "No cover letter yet.")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};