import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,

  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
// import { SearchCompany } from "../Services/CompanyService/SearchCompany";
import { SearchCompanyByName } from "../Services/CompanyService/CompanySearchbyName";
import classes from "./FormSearch.module.css";
import { JobSearchQuery } from "../Services/JobSearchService/JobSearchQuery";
import { message } from "antd";

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
  // const advance = locationPass.state?.boolean || "";
  // const [turnOn, setTurnOn] = useState<boolean>(advance ||false);
  const [turnOn, setTurnOn] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("Turn") || "false")
  );

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
      const companyData = await SearchCompanyByName({ name });
      if (companyData?.Companies) {
        navigate(`/company/detail/${companyData.Companies.id}`);
      } else {
        navigate("/it_jobs", { state: { textt: text } });
      }
    } catch (error) {
      console.error("Error during company search:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("Turn", JSON.stringify(turnOn));
  }, [turnOn]);

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
        if (turnOn === true) {
          handleSearch();
        } else {
          onClick();
        }
      }
    }
  };



  const { mutate, isPending: Loading } = useMutation({
    mutationFn: JobSearchQuery,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.length > 0) {
        const jobSearchResults = data.result;
        // setJobSearch(data.result.items);

        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: text || "",
            boolean: turnOn,
          },
          // state: { jobSearch: jobSearchResults },
        });
      } else {
        // navigate("/it_jobs", { state: { textt: searchTerm } });
        navigate("/it_jobs");
      }

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search.");
    },
  });

  const handleSearch = () => {
    mutate({
      data: {
        query: text,
      },
    });
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      setText(locationText ? locationText : text);
      setLocation("All");
    }
  }, [locationText, setLocation, setText, text]);

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
        <Select
        IconComponent={() => (
          <LocationOnIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        )}
        labelId="location-select-label"
        id="location-select"
        value={location || ""}
        onChange={handleChangeLocation}
        onOpen={handleOpen}
        onClose={handleClose}
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
          {/* <Select
          IconComponent={LocationOnIcon} 
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
          </Select> */}
        </FormControl>
        <div className={classes.main}>
          <TextField
            value={text}
            id="keyword-input"
            // label="Enter keyword"
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
              : turnOn
              ? handleSearch
              : onClick
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
            boxSizing: "border-box",
            height: "56px",
            fontFamily:"Lexend",
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
          {turnOn
            ? Loading
              ? "Searching..."
              : "Search"
            : isPending
            ? "Searching..."
            : "Search"}
        </Button>
        <Button
          onClick={() => setTurnOn(!turnOn)}
          // startIcon={<SearchIcon />}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#FF6F61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            boxSizing: "border-box",
            padding: "10px 20px",
            height: "56px",
            mb: "2px",
            fontSize: "16px",
            width: { xs: "100%", sm: "60%" },
            fontFamily:"Lexend",
            marginTop: { xs: "10px", sm: "0" },
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#ff5c4f",
            },
          }}
        >
          Advanced Search: {turnOn ? "Turn Off" : "Turn On"}
        </Button>
      </Box>
    </Box>
  );
}
