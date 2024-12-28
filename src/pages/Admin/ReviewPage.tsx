import React, { useState } from "react";
import classes from "./ReviewPage.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  //   Modal,
  //   Box,
  //   Typography,
  //   Button,
  IconButton,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetPendingApproved } from "../../Services/ReviewCompany/GetPendingApproved";
import ReviewModal from "../../components/Admin/ReviewModal";
import { message } from "antd";
import { RejectCompany } from "../../Services/ReviewCompany/RejectCompany";
import { queryClient } from "../../Services/mainService";
import { ApprovedCompany } from "../../Services/ReviewCompany/ApprovedCompany";

const headers = ["Company Name", "Rating", "Summary Content", "Action"];

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "60%",
//   backgroundColor: "#fff",
//   boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//   padding: "20px",
//   borderRadius: "10px",
//   outline: "none",
//   maxHeight: "80vh",
//   overflowY: "auto",
// };

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
  rating: number;
}

const ReviewPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewDetail | null>(
    null
  );

  // Fetch reviews
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PendingReview"],
    queryFn: ({ signal }) => GetPendingApproved({ signal }),
    staleTime: 1000,
  });

  const reviews = reviewsData?.reviewDetails || [];

  // Filter data based on search term
  const filteredData = searchTerm
    ? reviews.filter((row) =>
        [row.companyNName, row.summaryContent, row.rating.toString()]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : reviews;

  //   const handleOpenModal = (review: ReviewDetail) => {
  //     setSelectedReview(review);
  //     setOpen(true);
  //   };

  const { mutate: RejectReview } = useMutation({
    mutationFn: RejectCompany,
    onSuccess: () => {
      // console.log("ok chua ta ", data);
      queryClient.invalidateQueries({
        queryKey: ["PendingReview"],
        refetchType: "active", // Ensure an active refetch
      });
      queryClient.invalidateQueries({
        queryKey: ["Company-Review"],
        refetchType: "active", // Ensure an active refetch
      });
      setOpen(false);
      message.success(
        `Reject Review from ${selectedReview?.companyNName} successfully!`
      );
      // navigate(`/thankyou/${job?.id}`);
    },

    onError: () => {
      message.error("Rejected review Failed.");
    },
  });
  const { mutate: ApproveReview } = useMutation({
    mutationFn: ApprovedCompany,
    onSuccess: () => {
      // console.log("ok chua ta ", data);
      queryClient.invalidateQueries({
        queryKey: ["PendingReview"],
        refetchType: "active", // Ensure an active refetch
      });
      queryClient.invalidateQueries({
        queryKey: ["Company-Review"],
        refetchType: "active", // Ensure an active refetch
      });
      setOpen(false);
      message.success(
        `Approved Review from ${selectedReview?.companyNName} successfully!`
      );
      // navigate(`/thankyou/${job?.id}`);
    },

    onError: () => {
      message.error("Rejected review Failed.");
    },
  });

  const handleApprovedReview = () => {
    ApproveReview({
      data: {
        id: selectedReview?.id,
      },
    });
  };

  const handleRejectedReview = () => {
    RejectReview({
      data: {
        id: selectedReview?.id,
        reasonToReject: "",
      },
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const handleEdit = (review: ReviewDetail) => {
    console.log("Edit clicked for:", review);
    setSelectedReview(review);
    setOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem
          title="Review Management"
          appear={true}
          buttonstring="Add Review"
          
          onclick={() => {}}
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <form action="" className={classes.form}>
              <input
                type="text"
                className={classes.input}
                placeholder="Search by company name or summary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={classes.button} type="button">
                <SearchOutlinedIcon fontSize="small" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={classes.main6}>
        <TableContainer component={Paper}>
          <MuiTable>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header} align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.companyNName}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.summaryContent}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(row)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </div>

      <ReviewModal
        open={open}
        selectedReview={selectedReview}
        onClose={handleCloseModal}
        onApprove={handleApprovedReview}
        onReject={handleRejectedReview}
      />
    </div>
  );
};

export default ReviewPage;
