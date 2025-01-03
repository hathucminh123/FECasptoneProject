import React from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { GetLocationService } from "../../Services/Location/GetLocationService";
import classes from "./CompanyLocationsForm.module.css";

interface Location {
  locationId: number;
  stressAddressDetail: string;
}

interface CompanyLocationsFormProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  width?: boolean;
}

const CompanyLocationsForm: React.FC<CompanyLocationsFormProps> = ({
  locations,
  setLocations,
  width,
}) => {
  const { data: LocationData } = useQuery({
    queryKey: ["Location"],
    queryFn: ({ signal }) => GetLocationService({ signal }),
    staleTime: 5000,
  });
  const availableLocations = LocationData?.Locations || [];

  const addLocation = () => {
    setLocations([...locations, { locationId: 0, stressAddressDetail: "" }]);
  };

  // const removeLocation = (locationId: number) => {
  //   setLocations((prevLocations) =>
  //     prevLocations.filter((loc) => loc.locationId !== locationId)
  //   );
  // };
  const removeLocation = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index) // Chỉ xóa mục tại index cụ thể
    );
  };

  const handleChange = (
    index: number,
    field: keyof Location,
    value: string | number
  ) => {
    setLocations((prevLocations) =>
      prevLocations.map((loc, i) =>
        i === index ? { ...loc, [field]: value } : loc
      )
    );
  };

  // const selectedLocationIds = locations.map((loc) => loc.locationId);

  return (
    <Box
      sx={
        width
          ? { maxWidth: "10000px", mx: "auto", mt: 4 }
          : { maxWidth: "600px", mx: "auto", mt: 4 }
      }
    >
      <div className={classes.label1}>
        <div className={classes.label2}>
          Company Location
          <span className={classes.span1}>*</span>
        </div>
      </div>
      {locations.map((loc, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            mb: 2,
            position: "relative",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                City
              </Typography>
              <Select
                fullWidth
                value={loc.locationId || ""}
                onChange={(e) =>
                  handleChange(index, "locationId", e.target.value)
                }
                displayEmpty
                sx={{ background: "#fff" }}
              >
                <MenuItem value="" disabled>
                  Select Location
                </MenuItem>
                {availableLocations.map((location) => (
                  <MenuItem
                    key={location.id}
                    value={location.id}
                    // disabled={
                    //   selectedLocationIds.includes(location.id) &&
                    //   location.id !== loc.locationId // Cho phép chọn lại locationId hiện tại
                    // }
                    // disabled={selectedLocationIds.includes(location.id)}
                  >
                    {location.city}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Stress Address Detail
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Address"
                value={loc.stressAddressDetail}
                onChange={(e) =>
                  handleChange(index, "stressAddressDetail", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <IconButton
            // onClick={() => removeLocation(loc.locationId)}
            onClick={() => removeLocation(index)} 
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "red",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addLocation}
        sx={{ mb: 3 }}
      >
        Add Location
      </Button>
    </Box>
  );
};

export default CompanyLocationsForm;
