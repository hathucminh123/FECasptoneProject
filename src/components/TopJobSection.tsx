import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardJob from "../components/CardJob";
import classes from "../pages/HomePage.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
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

export default function TopJobSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Page size
  const [jobSearch, setJobSearch] = useState<JobPost[]>([]); // State to hold job search results
  const [totalJobs, setTotalJobs] = useState<number>(0); // Total count for pagination

  // Fetching job search data using mutation
  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount); // Update total count for pagination
      } else {
        setJobSearch([]);
        setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch job data");
    },
  });

  // Fetching companies
  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });

  const Companiesdata = Company?.Companies || [];

  // Fetch jobs whenever currentPage changes
  useEffect(() => {
    mutateAsync({
      data: {
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      },
    });
  }, [currentPage, mutateAsync]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page); // Update current page
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
  };

  return (
    <main className={classes.main}>
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

          {/* Display jobs */}
          <div className={classes.cardJob}>
            {jobSearch.map((job) => {
              const company = Companiesdata.find(
                (item) => item.id === job.companyId
              );
              if (!company) return null;
              return <CardJob key={job.id} data={job} company={company} />;
            })}
          </div>

          {/* Pagination Controls */}
          <div className={classes.pagination}>
            <Pagination
              count={Math.ceil(totalJobs / itemsPerPage)} // Total pages
              page={currentPage}
              onChange={handlePageChange} // Handle page change
              color="primary"
              size="large"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
