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
import { useAppDispatch } from "../redux/hooks/hooks";
import { filter } from "../redux/slices/searchSlice";
import { useLocation } from "react-router-dom";

interface JobType {
  id: number;
  name: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
}

interface FormSearchProps {
  setJobSearch: React.Dispatch<React.SetStateAction<JobPost[]>>;
  jobSearch: JobPost[];
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
}

export default function FormSearch({
  text,
  setText,
  onClick,
}: FormSearchProps) {
  const locationPass = useLocation();
  const locationText = locationPass.state?.text || "";
  const [location, setLocation] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (location || text) {
      dispatch(filter({ location, text }));
    }
  }, [location, text, dispatch]);


  useEffect(() => {
    if (locationText) {
      setText(locationText); 
    }
  }, [locationText, setText]);

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClick(); 
    }
  };

  return (
    <Box sx={{ display: "block", marginTop: "0em", unicodeBidi: "isolate" }}>
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
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={location || ""}
            label="Location"
            onChange={handleChangeLocation}
            sx={{ background: "white" }}
          >
            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
            <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={text}
          id="keyword-input"
          label="Enter keyword"
          placeholder="Skill (Java, iOS), Job title, Company"
          type="text"
          autoComplete="text"
          variant="outlined"
          onChange={handleText}
          onKeyDown={handleKeyDown}
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
        />

        <Button
          onClick={onClick}
          startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#FF6F61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            height: "56px",
            mb: "2px",
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
