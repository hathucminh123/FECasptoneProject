import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { filter } from "../redux/slices/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormSearch() {
  const locationcolumn = useLocation();
  const locationcolumn1: string | null = locationcolumn?.state ?? null;
  
  // If locationcolumn1 is present, use it; otherwise, initialize to null
  const [location, setLocation] = useState<string | null>(locationcolumn1 || null);
  const [text, setText] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.search.search);
console.log('met ',data)
  // Handle state change and trigger dispatch on location and text update
  useEffect(() => {
    if (location || text) {
      dispatch(filter({ location, text }));
    }
  }, [location, text, dispatch]);


  useEffect(() => {
    if (locationcolumn1) {
   
      if (["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"].includes(locationcolumn1)) {
        setLocation(locationcolumn1);
      } else {
        setLocation(null)
        setText(locationcolumn1);
      }
    }
    // dispatch(filter({ location, text }));
  }, [locationcolumn1, dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleNavigate = () => {
    dispatch(filter({ location, text }));
    navigate("/it-jobs");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        borderRadius: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
          padding: "10px 0",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth sx={{ width: { xs: "100%", sm: "25%" } }}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location || ""}
            label="Location"
            onChange={handleChange}
            sx={{
              background: "white",
            }}
          >
            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
            <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={text}
          id="outlined-email-input"
          label="Enter keyword"
          placeholder="Skill (Java, iOS), Job title, Company"
          type="text"
          autoComplete="text"
          variant="outlined"
          sx={{
            width: { xs: "100%", sm: "50%" },
            background: "white",
          }}
          onChange={handleText}
        />
        <Button
          onClick={handleNavigate}
          startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#ff6b6b",
            height: "60px",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            width: { xs: "100%", sm: "25%" },
            transition: " background-color 0.3s ease",

            "&:hover": {
              backgroundColor: "#ff3d3d",
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
