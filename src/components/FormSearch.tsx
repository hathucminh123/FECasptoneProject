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
// import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../Services/mainService";
// import { message } from "antd";

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
  onClick:()=>void
}

export default function FormSearch({
  text,
  setText,
  // setJobSearch,
  onClick
}: FormSearchProps) {
  const locationcolumn = useLocation();
  const locationcolumn1: string | null = locationcolumn?.state ?? null;
 const locationPass= useLocation();
 const locationText = locationPass.state?.text || "";
  const [location, setLocation] = useState<string | null>(
    locationcolumn1 || null
  );
  // const [text, setText] = useState<string>("");
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Effect to update search filters
  useEffect(() => {
    if (location || text) {
      dispatch(filter({ location, text }));
    }
  }, [location, text, dispatch]);

  // Effect to set the location based on location column
  useEffect(() => {
    if (locationcolumn1) {
      const majorCities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];
      const parsedLocation =
        typeof locationcolumn1 === "string" ? locationcolumn1 : null;

      setLocation(
        majorCities.includes(parsedLocation || "") ? parsedLocation : null
      );
      setText(parsedLocation || "");
    }
  }, [locationcolumn1]);
  useEffect(() => {
    if (locationText) {
      setText(locationText); 
    }
  }, [locationText, setText]);

  // React Query Mutation for job search
  // const { mutateAsync } = useMutation({
  //   mutationFn: GetJobSearch,
  //   onSuccess: (data) => {
  //     console.log("Search result:", data);

  //     if (data && data.result && data.result.items.length > 0) {
  //       setJobSearch(data.result.items);
  //     }

  //     queryClient.invalidateQueries({
  //       queryKey: ["JobSearch"],
  //       refetchType: "active",
  //     });

  //     navigate("/it-jobs");
  //   },
  //   onError: () => {
  //     message.error("Failed to Search");
  //   },
  // });

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onClick()
    }
  };

  // Main search function
  // const handleNavigate = async () => {
 
  //   interface JobSearchResponse {
  //     result: {
  //       items: JobPost[];
  //     };
  //   }

  //   const searchDataArray = [
  //     { companyName: text },
  //     { skillSet: text },
  //     { location: text },
  //     { experience: text },
  //     { jobType: text },
  //   ];

  //   for (let i = 0; i < searchDataArray.length; i++) {
  //     try {
      
  //       console.log("Searching with:", searchDataArray[i]);

  
  //       const result: JobSearchResponse = await mutateAsync({
  //         data: searchDataArray[i],
  //       });
  //       console.log("chan", result.result.items);

 
  //       if (result && result.result && result.result.items.length > 0) {
  //         setJobSearch(result.result.items); 
  //         break; 
  //       }
  //     } catch (error) {
  //       console.error("Error during job search:", error);
  //     }
  //   }
  // };

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
          value={ text}
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
