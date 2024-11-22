import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./HomePage.module.css";
import FormSearch from "../components/FormSearch";
import CardService from "../components/CardService";
// import CardEmployer from "../components/CardEmployer";
// import CardJob from "../components/CardJob";

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

export default function HomePage() {
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
  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);

  const [text, setText] = useState<string>("");
  const [location, setLocation] = useState<string>("All");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        setJobSearch(data.result.items);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: text || "",
            location: location,
          },
        });
      } else {
        navigate("/it_jobs", {
          state: { text: text || "", location: location, jobSearch: [] },
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
    }

    // Define searchDataArray with the SearchData[] type
    let searchDataArray: SearchData[];

    if (location === "All" && text === "") {
      searchDataArray = [
        { jobTitle: text, pageSize: 9 },
        { companyName: text, pageSize: 9 },
        { skillSet: text, pageSize: 9 },
        { city: text, pageSize: 9 },
        { location: text, pageSize: 9 },
        // { experience: Number(text), pageSize: 9 },
        { jobType: text, pageSize: 9 },
      ];
    } else if (location !== "All" && text === "") {
      searchDataArray = [
        { city: location, pageSize: 9 },
        { location: location, pageSize: 9 },
      ];
    } else if (location !== "All" && text !== "") {
      searchDataArray = [
        { jobTitle: text, city: location, pageSize: 9 },
        { companyName: text, city: location, pageSize: 9 },
        { skillSet: text, city: location, pageSize: 9 },
        { city: text, pageSize: 9 },
        { location: text, city: location, pageSize: 9 },
        // { experience: Number(text), city: location, pageSize: 9 },
        { jobType: text, city: location, pageSize: 9 },
      ];
    } else if (location == "All" && text !== "") {
      searchDataArray = [
        { jobTitle: text, pageSize: 9 },
        { companyName: text, pageSize: 9 },
        { skillSet: text, pageSize: 9 },
        { city: text, pageSize: 9 },
        { location: text, pageSize: 9 },
        // { experience: Number(text), pageSize: 9 },
        { jobType: text, pageSize: 9 },
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
          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  const handleNavigateSkill = async (item: string) => {
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    const searchDataArray = [
      // { companyName: text ,pageSize: 9},
      { skillSet: item, pageSize: 9 },
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

                color: "#fff",
              }}
            >
              {JobPostsdata?.length} IT Jobs For "Chất" Developers
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
                  color: "#fff",
                }}
              >
                Skills for you:
              </Typography>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {uniqueArray.slice(0,10).map((item) => (
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
                      fontFamily:"Lexend",
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
        </div>
      </div>

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
}
