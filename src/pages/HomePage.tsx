import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./HomePage.module.css";
import FormSearch from "../components/FormSearch";
import CardService from "../components/CardService";
// import CardEmployer from "../components/CardEmployer";
// import CardJob from "../components/CardJob";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
// import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import { useState } from "react";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import TopEmployersSection from "../components/TopEmployersSection";
import TopJobSection from "../components/TopJobSection";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setKeyword } from "../redux/slices/searchJobSlice";
import AiFeature from "../components/AiFeature";

// const skillsColumns = [
//   "Java",
//   "PHP",
//   "JavaScript",
//   "HTML5",
//   "Manager",
//   "SQL",
//   "Android",
//   "iOS",
// ];

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

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Handling profile navigation
  const handleProfileClick = () => {
    const auth = localStorage.getItem("Auth");
    if (!auth) {
      navigate("/JobSeekers/login", { state: { from: "/profile-cv" } });
    } else {
      navigate("/profile-cv");
    }
  };
  const [jobSearch, setJobSearch] = useState<JobPost[] | undefined>([]);
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const searchState = useAppSelector((state) => state.searchJob);
  console.log("total", totalJobs);
  const [location, setLocation] = useState<string>("All");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        const total = data.result.totalCount;
        setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount);
        setOpen(false);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: searchState.search.keyword || "",
            location: location,
            total: total,
          },
        });
      } else {
        navigate("/it_jobs", {
          state: {
            text: searchState.search.keyword || "",
            location: location,
            jobSearch: [],
            total: 0,
          },
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
  const handleNavigateJob = async () => {
    // Define the shape of job data returned by the mutation
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    // Define the shape of each search data object
    interface SearchData {
      jobTitle?: string;
      companyName?: string;
      skillSet?: string;
      city?: string;
      location?: string;
      // experience?: number;
      jobType?: string;
      pageSize: number;
      pageIndex?: number;
      keyword?: string;
    }

    // Define searchDataArray with the SearchData[] type
    let searchDataArray: SearchData[];

    if (location === "All" && searchState.search.keyword === "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9 ,pageIndex:1},
        // { companyName: text, pageSize: 9,pageIndex:1 },
        // { skillSet: text, pageSize: 9 ,pageIndex:1},
        // { city: text, pageSize: 9 ,pageIndex:1},
        // { location: text, pageSize: 9 ,pageIndex:1},
        { keyword: text, pageSize: 9, pageIndex: 1 },
        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9,pageIndex:1 },
      ];
    } else if (location !== "All" && searchState.search.keyword === "") {
      searchDataArray = [
        // { city: location, pageSize: 9,pageIndex:1  },
        // { location: location, pageSize: 9 ,pageIndex:1 },
        { keyword: location, pageSize: 9, pageIndex: 1 },
      ];
    } else if (location !== "All" && searchState.search.keyword !== "") {
      searchDataArray = [
        // { jobTitle: text, city: location, pageSize: 9 ,pageIndex:1 },
        // { companyName: text, city: location, pageSize: 9,pageIndex:1  },
        // { skillSet: text, city: location, pageSize: 9,pageIndex:1  },
        // { city: text, pageSize: 9 },
        // { location: text, city: location, pageSize: 9 ,pageIndex:1 },
        { keyword: text, pageSize: 9, pageIndex: 1 },
        // { experience: Number(text), city: location, pageSize: 9 },
        // { jobType: text, city: location, pageSize: 9,pageIndex:1  },
      ];
    } else if (location == "All" && text !== "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9 ,pageIndex:1 },
        // { companyName: text, pageSize: 9 ,pageIndex:1 },
        // { skillSet: text, pageSize: 9 ,pageIndex:1 },
        // { city: text, pageSize: 9,pageIndex:1  },
        // { location: text, pageSize: 9 ,pageIndex:1 },
        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9 ,pageIndex:1 },
        { keyword: text, pageSize: 9, pageIndex: 1 },
      ];
    } else {
      searchDataArray = [];
    }

    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchDataArray[i],
        });

        console.log("Search results:", result.result.items);

        // If there are results, set them and exit the loop
        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);
          // setTotalJobs(result.result.totalCount);
          // setTotalJobs(result.result.totalCount);
          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  const handleNavigateSkill = async (item: string) => {
    dispatch(setKeyword(item));
    setText(item);
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    const searchDataArray = [
      // { companyName: text ,pageSize: 9},
      // { skillSet: item, pageSize: 9 },
      { keyword: item, pageSize: 9, pageIndex: 1 },
      // { location: text ,pageSize: 9 },
      // { experience: text ,pageSize: 9},
      // { jobType: text ,pageSize: 9},
    ];

    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchDataArray[i],
        });

        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);

          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  // Fetching Job Posts using React Query
  const {
    data: JobPosts,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });

  // Fetching Companies using React Query
  // const {
  //   data: Company,
  //   isLoading: isCompanyLoading,
  //   isError: isCompanyError,
  // } = useQuery({
  //   queryKey: ["Company"],
  //   queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
  //   staleTime: 5000,
  // });

  const JobPostsdata = JobPosts?.JobPosts;
  const skills = JobPostsdata?.map((skill) => skill.skillSets);
  const flattenedArray = skills?.flat();
  const uniqueArray = [...new Set(flattenedArray)];

  // const Companiesdata = Company?.Companies;

  const handleNavigate = () => {
    navigate("/cv-templates");
  };

  // Handle loading state
  // if (isJobLoading || isCompanyLoading) {
  //   return <div>Loading...</div>;
  // }

  // // Handle error state
  // if (isJobError || isCompanyError) {
  //   return <div>Error loading data...</div>;
  // }

  if (isJobLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isJobError) {
    return <div>Error loading data...</div>;
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.form}>
          <div className={classes.form1}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "start",
                fontWeight: "bold",
                mb: 3,

                color: "#091615",
              }}
            >
              {JobPostsdata?.length} IT Jobs For {"Chất"} Developers
            </Typography>

            <div style={{ display: "block" }}>
              <FormSearch
                setJobSearch={setJobSearch}
                jobSearch={jobSearch}
                isPending={isPending}
                text={text}
                location={location}
                setLocation={setLocation}
                setText={setText}
                onClick={handleNavigateJob}
                open={open}
                setOpen={setOpen}
              />
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "1000px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginTop: "28px",
                gap: "16px",
                flexWrap: "nowrap",
                flexDirection: "row",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#091615",
                }}
              >
                Skills for you:
              </Typography>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {uniqueArray.slice(0, 10).map((item) => (
                  <Button
                    onClick={() => handleNavigateSkill(item)}
                    key={item}
                    sx={{
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontFamily: "Lexend",
                      margin: "5px",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.main1}>
            <img
              className={classes.img}
              src="https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBKzdSVkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--470623509c0a85b21133c40fac9fa817aa009d2c/christmas.png"
              alt="logo"
            />
          </div>
          {/* <div  className={classes.mainne}>
          <svg   className={classes.img}  viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">

<path d="M 50 250 Q 80 200, 120 230 Q 150 260, 180 220 Q 220 170, 250 210" 
      stroke="#6C422A" strokeWidth="6" fill="none"/>
<path d="M 80 180 Q 100 150, 140 160 Q 180 170, 220 130" 
      stroke="#6C422A" strokeWidth="6" fill="none"/>


<g fill="#FFD700" stroke="#E5B300" strokeWidth="1">
 
  <circle cx="50" cy="250" r="8"/>
  <circle cx="58" cy="246" r="8"/>
  <circle cx="54" cy="258" r="8"/>
  <circle cx="46" cy="258" r="8"/>
  <circle cx="42" cy="246" r="8"/>

  <g transform="translate(120, 230) scale(1)">
    <circle cx="0" cy="0" r="8"/>
    <circle cx="8" cy="-3" r="8"/>
    <circle cx="4" cy="7" r="8"/>
    <circle cx="-4" cy="7" r="8"/>
    <circle cx="-8" cy="-3" r="8"/>
  </g>
  
  <g transform="translate(180, 220) scale(0.9)">
    <circle cx="0" cy="0" r="8"/>
    <circle cx="8" cy="-3" r="8"/>
    <circle cx="4" cy="7" r="8"/>
    <circle cx="-4" cy="7" r="8"/>
    <circle cx="-8" cy="-3" r="8"/>
  </g>

  <g transform="translate(140, 160) scale(0.8)">
    <circle cx="0" cy="0" r="8"/>
    <circle cx="8" cy="-3" r="8"/>
    <circle cx="4" cy="7" r="8"/>
    <circle cx="-4" cy="7" r="8"/>
    <circle cx="-8" cy="-3" r="8"/>
  </g>

  <g transform="translate(220, 130) scale(1.2)">
    <circle cx="0" cy="0" r="8"/>
    <circle cx="8" cy="-3" r="8"/>
    <circle cx="4" cy="7" r="8"/>
    <circle cx="-4" cy="7" r="8"/>
    <circle cx="-8" cy="-3" r="8"/>
  </g>
</g>


<g fill="#FFB300">
  <circle cx="50" cy="250" r="3"/>
  <circle cx="120" cy="230" r="3"/>
  <circle cx="180" cy="220" r="3"/>
  <circle cx="140" cy="160" r="3"/>
  <circle cx="220" cy="130" r="3"/>
</g>

<g fill="#3FA34D">

  <ellipse cx="42" cy="260" rx="5" ry="10" transform="rotate(-30, 42, 260)"/>
  <ellipse cx="58" cy="260" rx="5" ry="10" transform="rotate(30, 58, 260)"/>

  <ellipse cx="112" cy="240" rx="5" ry="10" transform="rotate(-30, 112, 240)"/>
  <ellipse cx="128" cy="240" rx="5" ry="10" transform="rotate(30, 128, 240)"/>

  <ellipse cx="212" cy="140" rx="5" ry="10" transform="rotate(-30, 212, 140)"/>
  <ellipse cx="228" cy="140" rx="5" ry="10" transform="rotate(30, 228, 140)"/>
</g>
</svg>
          </div> */}
          <div className={classes.main2}>
            {/* <img
              style={{ width: "150px" }}
              className={classes.img}
              src="https://dathangsi.vn/upload/products/2021/11/0856-cay-thong-noel-45cm.jpg"
              alt="logo"
            /> */}
          </div>
        </div>
        <img
          className={classes.img1}
          src="https://itviec.com/assets/christmas_background-36b334a677f4f8d08aa5aa26805025e9fd35dbd2ccbf998146741b56f04cd244.svg"
          alt=""
        />
      </div>


      <>
<AiFeature/>
</>
      {/* First section with tools for application journey */}
      <div className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                Best tools for your application journey
              </Typography>
            </div>

            <div className={classes.card}>
              <CardService
                url="https://itviec.com/assets/homepage/user-profile-704fabd6761d6f9a4efc54371bc6cc0bef771ff9ae1dce97b2cb137aa74732d6.svg"
                title="User Profile"
                text="Create an excellent profile with a well-structured format and specific guide"
                textButton="Update profile"
                onClick={handleProfileClick}
              >
                <div className={classes.divne1}></div>
              </CardService>
              <CardService
                url="https://itviec.com/assets/homepage/cv-template-c6f6a4b0c4211ea345421e77c4e1ce22c2392cfebee8993324eee7015ea44d89.svg"
                title="CV Templates"
                text="Generate professional IT CV with new templates - recommended by recruiters"
                textButton="View templates"
                onClick={handleNavigate}
              >
                <div className={classes.divne}></div>
              </CardService>

              {/* <CardService
                url="https://itviec.com/assets/homepage/blog-a0cee7c69f270172e8c4470bde32d5c15e0a113cb4c3aa92f9d8bfc9ab92c8c7.svg"
                title="Blog"
                text="Updates about salary, benefits, working policies, and careers in IT"
                textButton="Explore blog"
              /> */}
            </div>
          </section>
        </div>
      </div>

      {/* Section for Top Employers */}
      {/* <main className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                Top Employers
              </Typography>
            </div>

            <div className={classes.card1}>
              {Companiesdata?.map((company) => {
                const jobsInCompany = JobPostsdata?.filter(
                  (item) => item.companyId === company.id
                );
          
                return (
                  <CardEmployer
                    key={company.id}
                    data={company}
                    jobs={jobsInCompany}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main> */}
      <TopEmployersSection />

      {/* Section for IT Jobs */}
      {/* <main className={classes.main}>
        <div className={classes.container1}>
          <section className={classes.section}>
            <div className={classes.divtitle}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  mt: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                  fontSize: "28px",
                  boxSizing: "border-box",
                  fontWeight: 700,
                  mb: 0,
                  color: "#121212",
                }}
              >
                IT Jobs "Chất" for user
              </Typography>
            </div>
            <div className={classes.cardJob}>
              {JobPostsdata?.map((job) => {
                const company = Companiesdata?.find(
                  (item) => item.id === job.companyId
                );
                console.log("ccccc", company);
                if (!company) {
                  return null;
                }
                return <CardJob key={job.id} data={job} company={company} />;
              })}
            </div>
          </section>
        </div>
      </main> */}

      <TopJobSection />
    </>
  );
};
export default HomePage;
