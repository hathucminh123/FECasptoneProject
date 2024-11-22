import React, { useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardEmployer from "../components/CardEmployer";
import { motion } from "framer-motion"; // Import Framer Motion
import classes from "../pages/HomePage.module.css";
import { SearchCompany } from "../Services/CompanyService/SearchCompany";
import { useQuery } from "@tanstack/react-query";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";

export default function TopEmployersSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1); // Direction of animation (1 = right, -1 = left)
  const itemsPerPage = 6; // Page size

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

  // Fetch companies using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Company", currentPage],
    queryFn: ({ signal }) =>
      SearchCompany({
        signal,
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      }),
  });

  const Companies = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setDirection(page > currentPage ? 1 : -1); // Determine direction based on page number
    setCurrentPage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
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
              Top Employers
            </Typography>
          </div>

          {/* Render loading or error state */}
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>Error fetching data</Typography>}

          {/* Company Cards with Animation */}
          <motion.div
            key={currentPage} // Ensure re-render on page change
            className={classes.card1}
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
            {Companies?.map((company) => {
              const jobIncompany = JobPostsdata?.filter(
                (job) => job.companyId === company.id
              );
              return (
                <CardEmployer
                  key={company.id}
                  data={company}
                  jobs={jobIncompany}
                />
              );
            })}
          </motion.div>

          {/* Pagination Controls */}
          <div className={classes.pagination}>
            <Pagination
              count={Math.ceil(totalCount / itemsPerPage)} // Total pages
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
