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
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { SearchCompany } from "../Services/CompanyService/SearchCompany";
import classes from "./FormSearch.module.css";

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
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  isPending?: boolean;
}

export default function FormSearch({
  text,
  setText,
  onClick,
  location,
  setLocation,
  isPending,
}: FormSearchProps) {
  const locationPass = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<null | number>(null);

  const locationText = locationPass.state?.textt || "";

  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });

  const Companiesdata = Company?.Companies;

  // Filtered companies based on the input text
  const filterCompany =
    text.trim() !== ""
      ? Companiesdata?.filter((name) =>
          name.companyName.toLowerCase().includes(text.toLowerCase())
        )
      : [];

  const handleMouseEnter = (id: number) => setHovered(id);
  const handleMouseLeave = () => setHovered(null);

  const handleSearchCompany = async () => {
    try {
      // Normalize the input text
      const normalizedText = (text || "").trim().toLowerCase();

      const matchingCompany = filterCompany?.find(
        (item) => item.companyName.trim().toLowerCase() === normalizedText
      );

      if (matchingCompany) {
        navigate(`/company/detail/${matchingCompany.id}`);
      } else {
        // Navigate to the job search page if no exact match is found
        navigate("/it_jobs", { state: { textt: text } });
      }
    } catch (error) {
      console.error("Error during company search:", error);
    }
  };

  const handleSelect = async (name: string) => {
    setText(name);
    try {
      const companyData = await SearchCompany({ name });
      if (companyData?.Companies) {
        navigate(`/company/detail/${companyData.Companies.id}`);
      } else {
        navigate("/it_jobs", { state: { textt: text } });
      }
    } catch (error) {
      console.error("Error during company search:", error);
    }
  };

  const handleChangeLocation = (event: SelectChangeEvent) =>
    setLocation(event.target.value as string);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value || "");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

     const normalizedText = (text || "").trim().toLowerCase();

      const matchingCompany = filterCompany?.find(
        (item) => item.companyName.trim().toLowerCase() === normalizedText
      );

      if (matchingCompany) {
        handleSearchCompany();
      } else {
        onClick();
      }
    }
  };

  useEffect(() => {
    const allowedLocations = [
      "All",
      "DA NANG",
      "HA NOI",
      "HO CHI MINH",
      "HAI PHONG",
      "CAN THO",
      "NHA TRANG",
    ];

    if (allowedLocations.includes(locationText)) {
      setLocation(locationText);
    } else {
      setText(locationText? locationText :text);
      setLocation("All");
    }
  }, [locationText, setLocation, setText,text]);

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
            {[
              "All",
              "HO CHI MINH",
              "HA NOI",
              "DA NANG",
              "HAI PHONG",
              "CAN THO",
              "NHA TRANG",
            ].map((city) => (
              <MenuItem key={city} value={city}>
                {city.replace(/_/g, " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.main}>
          <TextField
            value={text}
            id="keyword-input"
            label="Enter keyword"
            placeholder="Skill (Java, iOS), Job title, Company Name"
            type="text"
            variant="outlined"
            onChange={handleText}
            onKeyDown={handleKeyDown}
            sx={{
              width: { xs: "100%", sm: "100%" },
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
          {filterCompany && filterCompany.length > 0 && (
            <div className={classes.drop}>
              <div className={classes.drop1}>Company</div>
              {filterCompany.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={classes.main1}
                  style={
                    hovered === item.id
                      ? { backgroundColor: "#FFF5F5" }
                      : undefined
                  }
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleSelect(item.companyName)}
                >
                  {item.companyName}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button
          onClick={
            filterCompany?.length === 1 &&
            filterCompany[0]?.companyName.trim().toLowerCase() ===
              text.trim().toLowerCase()
              ? handleSearchCompany
              : onClick // Proceed with onClick if no exact match or text is empty
          }
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
          {isPending ? "Searching..." : "Search"}
        </Button>
      </Box>
    </Box>
  );
}
