import React, { useState } from "react";
import classes from "./ServicePage.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import { useQuery, useMutation } from "@tanstack/react-query";

import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import { GetServicePayment } from "../../Services/ServicePayment/GetServicePayment";
import { PostServices } from "../../Services/ServicePayment/PostServicePayment";
import { DeleteServicePayment } from "../../Services/ServicePayment/DeleteServicePayment";
import { PutServicesPayment } from "../../Services/ServicePayment/PutServicePayment";

const headers = [
  "Name",
  "Services Description",
  "Number Of Posts",
  "Price",
  "Is Hot",
  "Action",
];

interface Services {
  id: number;
  name: string;
  numberOfPost: number;
  description: string;
  price: number;
  isHot?: boolean;
}

// Function to remove HTML tags from a string
// const stripHTML = (html: string) => {
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   return doc.body.textContent || "";
// };

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ServicePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [nameSkill, setNameSkill] = useState("");
  const [descriptionSkillSet, setDescriptionSkillSet] = useState("");
  const [numberOfPost, setNumberOfPost] = useState("");
  const [isHot, setIsHot] = useState("false");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch skill sets
  const {
    data: SkillSetData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ServicePayment"],
    queryFn: ({ signal }) => GetServicePayment({ signal }),
    staleTime: 1000,
  });

  const skillSets = SkillSetData?.Services || [];

  // Create or update skill set mutation
  const { mutate: saveSkillSet, isPending: isSaving } = useMutation({
    mutationFn: editingId ? PutServicesPayment : PostServices,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ServicePayment"],
        refetchType: "active",
      });
      message.success(
        editingId
          ? "Service Payment updated successfully."
          : "Service Payment created successfully."
      );
      handleClose();
    },
    onError: () => {
      message.error(
        editingId
          ? "Failed to update Service Payment."
          : "Failed to create Service Payment."
      );
    },
  });

  // Delete skill set mutation
  const { mutate: deleteSkillSet } = useMutation({
    mutationFn: DeleteServicePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ServicePayment"],
        refetchType: "active",
      });
      message.success("Service Payment deleted successfully.");
    },
    onError: () => {
      message.error("Failed to delete Service Payment.");
    },
  });

  // Open modal for creating or editing
  const handleOpen = () => {
    setOpen(true);
    setEditingId(null); // Ensure it's for creating
  };

  const handleOpenEdit = (service: Services) => {
    setEditingId(service.id); // Set the ID for editing
    setNameSkill(service.name);
    setDescriptionSkillSet(service.description);
    setNumberOfPost(service.numberOfPost.toString());
    setPrice(service.price.toString());
    setIsHot(service.isHot ? "true" : "false");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null); // Reset ID when closing modal
    setNameSkill("");
    setDescriptionSkillSet("");
    setNumberOfPost("");
    setPrice("");
    setIsHot("false");
  };

  //   const handleSubmitSkillSet = () => {
  //     if (!nameSkill || !descriptionSkillSet || !numberOfPost || !price) {
  //         message.warning("Please fill in all the required fields.");
  //         return;
  //     }

  //     const payload = {
  //       ...(editingId && { id: editingId }),
  //       data: {
  //           name: nameSkill,
  //           description: descriptionSkillSet,
  //           numberOfPost: Number(numberOfPost),
  //           price: Number(price),
  //           isHot: isHot === "true",
  //       },
  //   };

  //     saveSkillSet(payload);
  // };

  const handleSubmitSkillSet = () => {
    if (!nameSkill || !descriptionSkillSet || !numberOfPost || !price) {
      message.warning("Please fill in all the required fields.");
      return;
    }

    if (isNaN(Number(numberOfPost)) || Number(numberOfPost) <= 0) {
      message.warning("Number of Posts must be a valid positive number.");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      message.warning("Price must be a valid positive number.");
      return;
    }

    const payload = {
      ...(editingId && { id: editingId }),
      data: {
        name: nameSkill,
        description: descriptionSkillSet,
        numberOfPost: Number(numberOfPost),
        price: Number(price),
        isHot: isHot === "true",
      },
    };

    saveSkillSet(payload);
  };

  // Handle delete action
  const handleDeleteSkillSet = (id: number) => {
    deleteSkillSet({ id });
  };

  // Filter data based on search term
  const filteredData = searchTerm
    ? skillSets.filter((row) =>
        [row.name, row.description, row.numberOfPost, row.price.toString()]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : skillSets;

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
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
          title="Services Payment Management"
          appear={false}
          buttonstring="Create Services Payment"
          onclick={handleOpen}
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Input Services name,description"
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
      </div>
      <div className={classes.main6}>
        <div className={classes.main7}>
          <div className={classes.main8}>
            <div className={classes.main9}>
              <div className={classes.main10}>
                Found{" "}
                <span className={classes.span}>{filteredData.length}</span>{" "}
                Services(s)
              </div>
            </div>
          </div>
          <div className={classes.main12}>
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
                  {paginatedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.numberOfPost}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.isHot ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenEdit(row)}
                          aria-label="edit"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteSkillSet(row.id)}
                          aria-label="delete"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
            <div className={classes.pagination}>
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={classes.paginationButton}
              >
                Previous
              </Button>
              <span className={classes.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={classes.paginationButton}
              >
                Next
              </Button>
            </div>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography variant="h6" component="h2">
                {editingId ? "Edit Service" : "Create Service"}
              </Typography>
              <TextField
                label="Name"
                value={nameSkill}
                onChange={(e) => setNameSkill(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={descriptionSkillSet}
                onChange={(e) => setDescriptionSkillSet(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                label="Number of Posts"
                value={numberOfPost}
                onChange={(e) => setNumberOfPost(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Service Type"
                value={isHot}
                onChange={(e) => setIsHot(e.target.value)}
                fullWidth
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="true">Hot</option>
                <option value="false">Basic</option>
              </TextField>
              <Button
                variant="contained"
                onClick={handleSubmitSkillSet}
                disabled={isSaving}
                sx={{ mr: 2 }}
              >
                {isSaving
                  ? editingId
                    ? "Updating..."
                    : "Creating..."
                  : editingId
                  ? "Update"
                  : "Create"}
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
