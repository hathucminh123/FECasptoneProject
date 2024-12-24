import React, {
  // useEffect

  useState
} from "react";
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
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setKeyword } from "../redux/slices/searchJobSlice";

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
  const [hoveredJob, setHoveredJob] = useState<null | string>(null)
  const searchState = useAppSelector((state) => state.searchJob);
  const dispatch = useAppDispatch();
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
  searchState.search.keyword!.trim() !== ""
      ? Companiesdata?.filter((name) =>
        name.companyName.toLowerCase().includes(text.toLowerCase())
      )
      : [];

  const filterjobs =
  searchState.search.keyword!.trim() !== ""
      ? JobTitleColums?.filter((name) =>
        name.toLowerCase().includes(searchState.search.keyword!.toLowerCase())
      )
      : [];


  const handleMouseEnterJobTitle = (title: string) => setHoveredJob(title);
  const handleMouseLeaveJobTitle = () => setHoveredJob(null);

  const handleMouseEnter = (id: number) => setHovered(id);
  const handleMouseLeave = () => setHovered(null);

  const handleSearchCompany = async () => {
    try {
      // Normalize the input text
      const normalizedText = (searchState.search.keyword || "").trim().toLowerCase();

      const matchingCompany = filterCompany?.find(
        (item) => item.companyName.trim().toLowerCase() === normalizedText
      );

      if (matchingCompany) {
        navigate(`/company/detail/${matchingCompany.id}`);
      } else {
        // Navigate to the job search page if no exact match is found
        navigate("/it_jobs", { state: { textt: searchState.search.keyword } });
      }
    } catch (error) {
      console.error("Error during company search:", error);
    }
  };

  const handleSelect = async (name: string) => {
    setText(name);
    dispatch(setKeyword(name));
    try {
      const companyData = await SearchCompanyByName({ name });
      if (companyData?.Companies) {
        navigate(`/company/detail/${companyData.Companies.id}`);
      } else {
        navigate("/it_jobs", { state: { textt: searchState.search.keyword } });
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
        const total = data.result.totalCount
        setOpen?.(false)
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: searchState.search.keyword || "",
            // location: location,
            total: total

          },
        });
      } else {
        navigate("/it_jobs", {
          state: { text: searchState.search.keyword || "", jobSearch: [], total: 0 },
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
    dispatch(setKeyword(title));
    setText(title);
  console.log("event")
    try {
      const result = await mutateAsync({
        data: { keyword: title, pageSize: 9, pageIndex: 1 },
        // data: searchState.search,
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

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value || "");
    dispatch(setKeyword(event.target.value || ""));
  }


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return; // Early return for non-Enter keys

    e.preventDefault();

    const normalizedText = (searchState.search.keyword || "").trim().toLowerCase();

    const matchingCompany = filterCompany?.find(
      (item) => item.companyName.trim().toLowerCase() === normalizedText
    );

    if (matchingCompany) {
      handleSearchCompany();
    } else {
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
        <div className={classes.main}>
          <TextField
            value={searchState.search.keyword}
            id="keyword-input"
            // label="Enter keyword"
            placeholder="Enter Keyword Skill (Java, iOS), Job title, Company Name,City"
            type="text"
            variant="outlined"
            onChange={handleText}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen?.(true)}
            // onBlur={() => setTimeout(() => setOpen?.(false), 200)}
            // onBlur={() => setOpen?.(false)}
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
          {filterCompany && open && filterCompany.length > 0 ? (
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
              searchState.search.keyword!.trim().toLowerCase()
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
            position: 'relative',
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
