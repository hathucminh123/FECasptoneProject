import React, { useEffect, useState } from "react";
import classes from "./RecentViewJob.module.css";
import {
  FormControl,
  //   InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CardJob from "../components/CardJob";
import { useAppSelector } from "../redux/hooks/hooks";
import { companyData } from "../assets/data/CompanyData";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
export default function RecentViewJob() {
  const [age, setAge] = React.useState("");
  const data = useAppSelector((state) => state.view.item);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  return (
    <div className={classes.tab}>
      {showAlert && (
        <Stack
          sx={{
            left: "inherit",
            right: 0,
            top: "120px",
            bottom: "inherit",
            marginRight: "48px",
            width: "400px",
            opacity: showAlert ? 1 : 0,
            zIndex: 11,
            backgroundColor: "#eaf9e9",
            padding: "16px 16px 16px 24px",
            border: "none",
            borderRadius: "8px",
            maxWidth: "400px",
            position: "fixed",
            boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
            display: showAlert ? "block" : "none",
            fontSize: "0.875rem",
            pointerEvents: "auto",
            transition: "opacity 0.15s linear",
            boxSizing: "border-box",
          }}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <div style={{ display: "block" }}>
              <div
                style={{
                  color: "#121212",
                  marginRight: "18px",
                  display: "block",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
                >
                  This job has been added to your <strong> Saved jobs</strong>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  color: "#0e2eed",
                  marginTop: "12px",
                }}
              >
                <Link
                  style={{ color: "#0e2eed", textDecoration: "none" }}
                  to={"/my-jobs"}
                >
                  View list
                </Link>
              </div>
            </div>
          </Alert>
        </Stack>
      )}
      <div className={classes.icontainer}>
        <div className={classes.container}>
          <div className={classes.container1}>
            <div style={{ display: "block" }}>
              <div className={classes.title}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#121212",
                    lineHeight: 1.5,
                    fontSize: "22px",
                    fontWeight: 700,
                    mt: 0,
                    mb: 0,
                  }}
                >
                  Recent Viewed Jobs
                </Typography>
                <div className={classes.sort}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4e4c4d",
                      whiteSpace: "nowrap",
                      marginRight: "16px",
                    }}
                  >
                    Sort by:
                  </Typography>
                  <FormControl fullWidth sx={{ width: "100%" }}>
                    {/* <InputLabel id="demo-simple-select-label">Location</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      // label="Location"
                      onChange={handleChange}
                      sx={{
                        background: "white",
                        width: "200px",
                      }}
                    >
                      <MenuItem value="Nearest expiration time">
                        Nearest expiration time
                      </MenuItem>
                      <MenuItem value="Newest jobs">Newest jobs</MenuItem>
                      {/* <MenuItem value={30}>Đà Nẵng</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.job}>
              <div className={classes.job1}>
                {data.map((job) => {
                  const companys = companyData.find(
                    (item) => item.id === job.companyId
                  );
                  return (
                    <CardJob
                      setShowAlertt={setShowAlert}
                      className={classes.carditem}
                      data={job}
                      key={job.id}
                      company={companys}
                      formButton={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
