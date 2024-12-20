import React, { 
  // useEffect
  
   useState } from "react";
import {
  Box,
  Button,
  // FormControl,

  // MenuItem,
  // Select,
  TextField,
} from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
// import { SearchCompany } from "../Services/CompanyService/SearchCompany";
import { SearchCompanyByName } from "../Services/CompanyService/CompanySearchbyName";
import classes from "./FormSearch.module.css";
// import { JobSearchQuery } from "../Services/JobSearchService/JobSearchQuery";
import { message } from "antd";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { queryClient } from "../Services/mainService";

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
  setJobSearch: React.Dispatch<React.SetStateAction<JobPost[] | undefined>>;
  jobSearch: JobPost[] | undefined;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  location?: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  isPending?: boolean;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormSearch({
  text,
  setText,
  onClick,
  // location,
  // setLocation,
  setOpen,
  open,
  isPending,
}: FormSearchProps) {
  // const locationPass = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<null | number>(null);
  const [hoveredJob,setHoveredJob]=useState<null |string>(null)
// const [open,setOpen]=useState<boolean>(false)

  // const locationText = locationPass.state?.text || "";
  // const advance = locationPass.state?.boolean || "";
  // const [turnOn, setTurnOn] = useState<boolean>(advance ||false);
  // const [turnOn, setTurnOn] = useState<boolean>(() =>
  //   JSON.parse(localStorage.getItem("Turn") || "false")
  // );

  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });

  const Companiesdata = Company?.Companies;

  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });

  const JobPostsdata = JobPosts?.JobPosts;

  const JobTitle = JobPostsdata?.map((name) => name.jobTitle);

  const flattenedArrayJobTitle = JobTitle?.flat();
  const uniqueArrayJobTitle = [...new Set(flattenedArrayJobTitle)];

  const JobTitleColums = uniqueArrayJobTitle;

  // Filtered companies based on the input text
  const filterCompany =
    text.trim() !== ""
      ? Companiesdata?.filter((name) =>
          name.companyName.toLowerCase().includes(text.toLowerCase())
        )
      : [];

  const filterjobs =
    text.trim() !== ""
      ? JobTitleColums?.filter((name) =>
          name.toLowerCase().includes(text.toLowerCase())
        )
      : [];


  const handleMouseEnterJobTitle = (title: string) => setHoveredJob(title);
  const handleMouseLeaveJobTitle = () => setHoveredJob(null);

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
  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        const total =data.result.totalCount
        setOpen?.(false) 
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: text || "",
            // location: location,
            total:total
            
          },
        });
      } else {
        navigate("/it_jobs", {
          state: { text: text || "", jobSearch: [] ,total :0},
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["JobSearch"],
        refetchType: "active",
      });

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search");
    },
  });
  const handleSelectJobtitle = async (title: string) => {
 
    setText(title);
    try {
        const result = await mutateAsync({
            data: { keyword: title, pageSize: 9, pageIndex: 1 },
        });

        if (result && result.result && result.result.items.length > 0) {
            // setJobSearch(result.result.items);
            // navigate("/it_jobs", {
            //     state: { jobSearch: result.result.items, textt: skill ,total:totalJobs},
            // });
        } else {
            // setJobSearch([]);
            // navigate("/it_jobs", { state: { jobSearch: [], textt: skill,total:0 } });
        }
    } catch (error) {
        console.error("Error during job search:", error);
    }
};


  // useEffect(() => {
  //   localStorage.setItem("Turn", JSON.stringify(turnOn));
  // }, [turnOn]);

  // const handleChangeLocation = (event: SelectChangeEvent) =>
  //   setLocation(event.target.value as string);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value || "");

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();

  //     const normalizedText = (text || "").trim().toLowerCase();

  //     const matchingCompany = filterCompany?.find(
  //       (item) => item.companyName.trim().toLowerCase() === normalizedText
  //     );

  //     if (matchingCompany) {
  //       handleSearchCompany();
  //     // } else {
  //     //   if (turnOn === true) {
  //     //     handleSearch();
  //     //   } 
  //     }
  //      else  {
  //         onClick();
  //       }
  //     }
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return; // Early return for non-Enter keys
  
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
  };
  // const { mutate, isPending: Loading } = useMutation({
  //   mutationFn: JobSearchQuery,
  //   onSuccess: (data) => {
  //     console.log("Search result:", data);

  //     if (data && data.result && data.result.length > 0) {
  //       const jobSearchResults = data.result;
  //       // setJobSearch(data.result.items);

  //       navigate("/it_jobs", {
  //         state: {
  //           jobSearch: jobSearchResults,
  //           text: text || "",
  //           boolean: turnOn,
  //         },
  //         // state: { jobSearch: jobSearchResults },
  //       });
  //     } else {
  //       // navigate("/it_jobs", { state: { textt: searchTerm } });
  //       navigate("/it_jobs");
  //     }

  //     // navigate("/it-jobs",{state : text});
  //   },
  //   onError: () => {
  //     message.error("Failed to Search.");
  //   },
  // });

  // const handleSearch = () => {
  //   mutate({
  //     data: {
  //       query: text,
  //     },
  //   });
  // };
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   const allowedLocations = [
  //     "All",
  //     "DA NANG",
  //     "HA NOI",
  //     "HO CHI MINH",
  //     "HAI PHONG",
  //     "CAN THO",
  //     "NHA TRANG",
  //   ];

  //   if (allowedLocations.includes(locationText)) {
  //     setLocation(locationText);
  //     setText(locationText)

  //   } else {
  //     setText(locationText ? locationText : text);
  //     setLocation("All");
  //   }
  // }, [locationText, setLocation, setText, text]);

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
        {/* <FormControl fullWidth sx={{ width: { xs: "100%", sm: "25%" } }}>
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
          </Select> 
        </FormControl> */}
        <div className={classes.main}>
          <TextField
            value={text}
            id="keyword-input"
            // label="Enter keyword"
            placeholder="Enter Keyword Skill (Java, iOS), Job title, Company Name,City"
            type="text"
            variant="outlined"
            onChange={handleText}
            onKeyDown={handleKeyDown}
            onFocus={()=>setOpen?.(true)}
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
          {filterCompany && filterCompany.length > 0 ? (
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
          ) : (
            filterjobs &&
            filterjobs.length > 0 && open && (
              <div className={classes.drop}>
                <div className={classes.drop1}>Job title</div>
                {filterjobs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={classes.main1}
                    style={
                      hoveredJob === item
                        ? { backgroundColor: "#FFF5F5" }
                        : undefined
                    }
                    onMouseEnter={() => handleMouseEnterJobTitle(item)}
                    onMouseLeave={handleMouseLeaveJobTitle}
                    onClick={() => handleSelectJobtitle(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
        <Button
          onClick={
            filterCompany?.length === 1 &&
            filterCompany[0]?.companyName.trim().toLowerCase() ===
              text.trim().toLowerCase()
              ? handleSearchCompany
              // : turnOn
              // ? handleSearch
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
            fontFamily: "Lexend",
            mb: "2px",
            fontSize: "16px",
            width: { xs: "100%", sm: "25%" },
            // width: "500px",
            position:'relative',
            marginTop: { xs: "10px", sm: "0" },
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#ff5c4f",
            },
          }}
        >
          <img className={classes.img} src="https://itviec.com/assets/santa-hat-42f9e437ff89aee0a506e9e93c5cdb31c237e5f00ff562e953de0072cb3adb67.svg" alt="logoNoel" />
          {/* <svg className={classes.img}  width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <g transform="rotate(45, 100, 100)">
 
    <path d="M 100 20 L 30 160 L 170 160 Z" fill="#D8B787" stroke="#A47E50" strokeWidth="2"/>
 
    <path d="M 30 160 Q 100 140 170 160" fill="none" stroke="#A47E50" strokeWidth="2"/>
   
    <path d="M 50 160 Q 100 180 150 160" fill="none" stroke="#D43F3F" strokeWidth="4" strokeLinecap="round"/>

    <path d="M 100 20 L 60 160 L 140 160 Z" fill="#C4A078" opacity="0.3"/>
  </g>


  <g transform="translate(40, 70) scale(0.6)">
    <circle cx="0" cy="0" r="10" fill="#FFB6C1"/>
    <circle cx="0" cy="-8" r="3" fill="#FFD700"/>
    <circle cx="7" cy="-5" r="3" fill="#FFD700"/>
    <circle cx="7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="0" cy="8" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="-5" r="3" fill="#FFD700"/>
  </g>

  <g transform="translate(160, 60) scale(0.5)">
    <circle cx="0" cy="0" r="10" fill="#FFB6C1"/>
    <circle cx="0" cy="-8" r="3" fill="#FFD700"/>
    <circle cx="7" cy="-5" r="3" fill="#FFD700"/>
    <circle cx="7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="0" cy="8" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="-5" r="3" fill="#FFD700"/>
  </g>


  <g transform="translate(90, 40) scale(0.4)">
    <circle cx="0" cy="0" r="10" fill="#FFB6C1"/>
    <circle cx="0" cy="-8" r="3" fill="#FFD700"/>
    <circle cx="7" cy="-5" r="3" fill="#FFD700"/>
    <circle cx="7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="0" cy="8" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="5" r="3" fill="#FFD700"/>
    <circle cx="-7" cy="-5" r="3" fill="#FFD700"/>
  </g>
</svg> */}



          {/* {turnOn
            ? Loading
              ? "Searching..."
              : "Search"
            :  */}
            {
            isPending
            ? "Searching..."
            : "Search"}
        </Button>
        {/* <Button
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
            fontFamily: "Lexend",
            marginTop: { xs: "10px", sm: "0" },
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#ff5c4f",
            },
          }}
        >
          Advanced Search: {turnOn ? "Turn Off" : "Turn On"}
        </Button> */}
      </Box>
    </Box>
  );
}
