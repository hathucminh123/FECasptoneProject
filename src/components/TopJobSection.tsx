import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardJob from "../components/CardJob";
import { motion } from "framer-motion"; // Import Framer Motion
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
  const [direction, setDirection] = useState(1); // Direction of animation (1 = right, -1 = left)
  const itemsPerPage = 8;
  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);

  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      if (data && data.result && data.result.items.length > 0) {
        setJobSearch(data.result.items);
        setTotalJobs(data.result.totalCount);
      } else {
        setJobSearch([]);
        setTotalJobs(0);
      }
    },
    onError: () => {
      message.error("Failed to fetch job data");
    },
  });

  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });

  const Companiesdata = Company?.Companies || [];

  useEffect(() => {
    mutateAsync({
      data: {
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      },
    });
  }, [currentPage, mutateAsync]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setDirection(page > currentPage ? 1 : -1); // Determine direction based on page number
    setCurrentPage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
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

          {/* Job Cards with Animation */}
          <motion.div
            key={currentPage} // Ensure re-render on page change
            className={classes.cardJob}
            custom={direction} // Pass direction to variants
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {jobSearch.map((job) => {
              const company = Companiesdata.find(
                (item) => item.id === job.companyId
              );
              if (!company) return null;
              return <CardJob classOn={true} key={job.id} data={job} company={company} />;
            })}
          </motion.div>

          {/* Pagination Controls */}
          <div className={classes.pagination}>
            <Pagination
              count={Math.ceil(totalJobs / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
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
