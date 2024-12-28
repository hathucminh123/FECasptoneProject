import React from "react";
import classes from "./ReviewSuccess.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { fetchCompaniesById } from "../Services/CompanyService/GetCompanyById";
import { useQuery } from "@tanstack/react-query";
export const ReviewSuccess: React.FC = () => {
  const { CompanyId } = useParams();
  const {
    data: CompanyDa,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["Company-details", CompanyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(CompanyId), signal }),
    enabled: !!CompanyId,
  });

  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}></div>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Căn giữa theo chiều dọc
                }}
              >
                {/* Phần chữ "it" */}
                <Box
                  sx={{
                    backgroundColor: "#3cbc8c",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "22px",
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "3px",
                  }}
                >
                  A
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "22px",
                    fontFamily: "Lexend, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  mazingJob
                </Typography>
              </Box>
            </div>
          </div>
        </div>
        <div className={classes.main6}>
          <div className={classes.main7}>
            <div className={classes.main8}>
              <div className={classes.main9}>
                <img
                  className={classes.img}
                  src={companyDataa?.imageUrl}
                  alt="company-image"
                />
                <div className={classes.main10}>
                  <Typography
                    variant="h1"
                    sx={{
                      marginBottom: "16px !important",
                      paddingTop: "24px !important",
                      lineHeight: 1.5,
                      fontSize: "28px",
                      fontWeight: 700,
                      marginTop: 0,
                      boxSizing: "border-box",
                      fontFamily: "Lexend, sans-serif",
                    }}
                  >
                    Amazing! We have received your review
                  </Typography>
                </div>
                <p className={classes.p}>
                  You must wait until We will review you when we finish
                  processing your review on {companyDataa?.companyName}.
                </p>
                <div className={classes.main11}>
                  <button className={classes.button}>
                    <Link
                      to={`/company/detail/${Number(CompanyId)}`}
                      className={classes.link}
                    >
                      Back Company Page
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
