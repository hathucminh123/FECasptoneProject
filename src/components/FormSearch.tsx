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
  console.log("met ", data);

  // Handle state change and trigger dispatch on location and text update
  useEffect(() => {
    if (location || text) {
      dispatch(filter({ location, text }));
    }
  }, [location, text, dispatch]);

  useEffect(() => {
    if (locationcolumn1) {
      const majorCities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];
      if (majorCities.includes(locationcolumn1)) {
        setLocation(locationcolumn1);
      } else {
        setLocation(null);
        setText(locationcolumn1);
      }
    }
  }, [locationcolumn1, dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNavigate();
    }
  };

  const handleNavigate = () => {
    dispatch(filter({ location, text }));
    navigate("/it-jobs");
  };

  return (
    <Box
      sx={{
        display:'block',
        marginTop:'0em',
        unicodeBidi:'isolate'
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
            padding: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
       
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white", 
              transition: "box-shadow 0.3s ease-in-out", 
              "&:hover": {
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", 
              },
            },
          }}
          onChange={handleText}
          onKeyDown={handleKeyDown} 
        />

        <Button
          onClick={handleNavigate}
          startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#FF6F61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            height:'56px',
            mb:'2px',
            fontSize: "16px",
            width: { xs: "100%", sm: "25%" },
            marginTop: { xs: "10px", sm: "0" }, 
            transition: "background-color 0.3s ease", 
            "&:hover": {
              backgroundColor: "#ff5c4f",
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
