import React, { useState } from "react";
import classes from "./ServicePage.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

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
// import { GetBusinessStream } from "../../Services/BusinessStreamService/GetBusinessStream";
// import { PostBusinessStream } from "../../Services/BusinessStreamService/PostBusinessStream";
import { GetServicePayment } from "../../Services/ServicePayment/GetServicePayment";
import { PostServices } from "../../Services/ServicePayment/PostServicePayment";
import { DeleteServicePayment } from "../../Services/ServicePayment/DeleteServicePayment";

const headers = [
  "name",
  "Services description",
  "NumberOfPost",
  "price",
  "Action",
];

// Function to remove HTML tags from a string
const stripHTML = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

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
  //   const [shorthand, setShorthand] = useState("");
  const [descriptionSkillSet, setDescriptionSkillSet] = useState("");
  const [numberOfPost, setNumberOfPost] = useState("");
  const [isHot, setIsHot] = useState("false");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

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

  // Create skill set mutation
  const { mutate: createSkillSet, isPending: isCreating } = useMutation({
    mutationFn: PostServices,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ServicePayment"],
        refetchType: "active",
      });
      message.success("ServicesPayment set created successfully.");
      handleClose();
    },
    onError: () => {
      message.error("Failed to create  ServicesPayment.");
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

  // Open/Close modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submission for skill set creation
  const handleSubmitSkillSet = () => {
    if (!nameSkill || !descriptionSkillSet || !numberOfPost || !price) {
      message.warning("Please fill in all the required fields.");
      return;
    }
    createSkillSet({
      data: {
        name: nameSkill,
        // shorthand: shorthand,
        description: descriptionSkillSet,
        numberOfPost: Number(numberOfPost),
        price: Number(price),
        isHot: isHot === "true",
      },
    });
  };

  // Handle delete action
  const handleDeleteSkillSet = (id: number) => {
    deleteSkillSet({ id });
  };

  // Format data for table
  const formattedData =
    skillSets.map((skill) => ({
      id: skill.id,
      name: skill.name,
      //   businessStreamName: skill.businessStreamName,
      //   Shorthand: skill.businessStreamName,
      numberOfPost: skill.numberOfPost,
      price: skill.price,
      "Services Description": stripHTML(skill.description || ""),
    })) || [];

  // Filter data based on search term
  const filteredData = searchTerm
    ? formattedData.filter((row) =>
        [row.name, row["Services Description"], row.numberOfPost, row.price]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : formattedData;

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
                      <TableCell>{row["Services Description"]}</TableCell>
                      <TableCell>{row.numberOfPost}</TableCell>
                      <TableCell>{row.price}</TableCell>

                      <TableCell>
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
                Create Bussiness
              </Typography>
              <TextField
                label="Name"
                value={nameSkill}
                onChange={(e) => setNameSkill(e.target.value)}
                fullWidth
                margin="normal"
              />
              {/* <TextField
                label="Shorthand"
                value={shorthand}
                onChange={(e) => setShorthand(e.target.value)}
                fullWidth
                margin="normal"
              /> */}
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
            SelectProps={{ native: true }} // For native select dropdown
          >
            <option value="true">Hot</option>
            <option value="false">Basic</option>
          </TextField>
              <Button
                variant="contained"
                onClick={handleSubmitSkillSet}
                disabled={isCreating}
                sx={{ mr: 2 }}
              >
                {isCreating ? "Creating..." : "Create"}
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
