import React, { useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CardEmployer from "../components/CardEmployer";
import classes from "../pages/HomePage.module.css";
import { SearchCompany } from "../Services/CompanyService/SearchCompany";
import { useQuery } from "@tanstack/react-query";

export default function TopEmployersSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Page size

  // Fetch companies using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Company", currentPage],
    queryFn: ({ signal }) =>
      SearchCompany({
        signal,
        // name: companyName,
        pageIndex: currentPage,
        pageSize: itemsPerPage,
      }),
  });

  const Companies = data?.items || [];

  const count =data?.totalCount ||[]
  console.log('das',count)
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
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
              Top Employers
            </Typography>
          </div>

          {/* Render loading or error state */}
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>Error fetching data</Typography>}

          <div className={classes.card1}>
            {Companies?.map((company) => (
              <CardEmployer
                key={company.id}
                data={company}
                jobs={company.jobPosts}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className={classes.pagination}>
            <Pagination
              // count={Math.ceil((data?.totalCount || 0))} 
              count={Math.ceil((data?.totalCount ? data?.totalCount/itemsPerPage :   0))} 
            //   count={Math.ceil((data?.totalCount || 0))} 
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
