import React, { useState } from "react";
import classes from "./Location.module.css";
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
// import { PostBenefits } from "../../Services/Benefits/PostBenefits";
// import { DeleteBenefits } from "../../Services/Benefits/DeleteBenefits";
import { GetLocationService } from "../../Services/Location/GetLocationService";
import { PostLocationService } from "../../Services/Location/PostLocationService";
import { DeleteLocationService } from "../../Services/Location/DeleteLocationService";
import { PutLocationService } from "../../Services/Location/PutLocationService";

const headers = ["City Name", "Action"];

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

const LocationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [cityName, setCityName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: LocationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Location"],
    queryFn: ({ signal }) => GetLocationService({ signal }),
    staleTime: 1000,
  });

  const LocationsData = LocationData?.Locations || [];

  const { mutate: createOrEditLocation, isPending: isCreating } = useMutation({
    mutationFn: editId ? PutLocationService : PostLocationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Location"] });
      message.success(
        editId
          ? "Location updated successfully."
          : "Location created successfully."
      );
      handleClose();
    },
    onError: () => {
      message.error(
        editId ? "Failed to update location." : "Failed to create location."
      );
    },
  });

  const { mutate: deleteLocation } = useMutation({
    mutationFn: DeleteLocationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Location"] });
      message.success("Location deleted successfully.");
    },
    onError: () => {
      message.error("Failed to delete location");
    },
  });

  const handleOpen = (location?: { id: number; city: string }) => {
    if (location) {
      setEditId(location.id);
      setCityName(location.city);
    } else {
      setEditId(null);
      setCityName("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCityName("");
    setEditId(null);
  };

  const handleSubmit = () => {
    if (!cityName.trim()) {
      return message.error("Please enter a valid city name.");
    }
    createOrEditLocation({
      data: {
        id: editId,
        city: cityName,
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteLocation({ id });
  };

  const formattedData = LocationsData.map((location) => ({
    id: location.id,
    CityName: location.city,
  }));

  const filteredData = searchTerm
    ? formattedData.filter((row) =>
        row.CityName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : formattedData;

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
          title="Location Management"
          // appear={true}
          appear={false}
          buttonstring="Create Location"
          onclick={() => handleOpen()}
        />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <form action="" className={classes.form}>
            <input
              type="text"
              className={classes.input}
              placeholder="Search by city name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={classes.button} type="button">
              <SearchOutlinedIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>
      <div className={classes.main6}>
        <div className={classes.main7}>
          <div className={classes.main8}>
          <div className={classes.main9}>
          <div className={classes.main10}>
            Found <span className={classes.span}>{filteredData.length}</span>{" "}
            Location(s)
            </div>
            </div>
          </div>
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
                    <TableCell>{row.CityName}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleOpen({ id: row.id, city: row.CityName })
                        }
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(row.id)}
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
              {editId ? "Edit Location" : "Create Location"}
            </Typography>
            <TextField
              label="City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isCreating}
              sx={{ mr: 2 }}
            >
              {isCreating ? "Saving..." : editId ? "Save Changes" : "Create"}
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default LocationPage;
