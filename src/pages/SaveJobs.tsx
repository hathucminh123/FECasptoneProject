import React, { useEffect, useState } from "react";
import classes from "./SaveJobs.module.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import CardJob from "../components/CardJob";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import { companyData } from "../assets/data/CompanyData";
import { add } from "../redux/slices/favoriteJob";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";



interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  tags: string[];
  postDate: string;
  hotTag: boolean;
  companyId?: number;
  companyImage?: string; 
}

export default function SaveJobs() {
  const data = useAppSelector((state) => state.favorite.item);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [undoData, setUndoData] = useState<Job | null>(null); 
  const [age, setAge] = useState<string>("");

  // Tự động tắt thông báo sau 3 giây
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Xử lý khi người dùng nhấn "Undo"
  const handleUndo = () => {
    if (undoData) {
      dispatch(add(undoData)); 
      setUndoData(null); 
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className={classes.tab}>
      {showAlert && (
        <Stack
          sx={{
            left: 'inherit',
            right: 0,
            top: '120px',
            bottom: 'inherit',
            marginRight: '48px',
            width: '400px',
            opacity: showAlert ? 1 : 0, 
            zIndex: 11,
            backgroundColor: '#eaf0fa',
            padding: '16px 16px 16px 24px',
            border: 'none',
            borderRadius: '8px',
            maxWidth: '400px',
            position: 'fixed',
            boxShadow: '0px 6px 32px rgba(0, 0, 0, 0.08)',
            display: showAlert ? 'block' : 'none',
            fontSize: '0.875rem',
            pointerEvents: 'auto',
            transition: 'opacity 0.15s linear',
            boxSizing: 'border-box',
          }}
        >
          <Alert variant="outlined" severity="info">
            <AlertTitle>You unsaved a job.</AlertTitle>
            <div style={{ display: 'flex', gap: '20px', color: '#0e2eed', marginTop: '12px' }}>
              <Button color="inherit" size="small" onClick={handleUndo}>
                Undo
              </Button>
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
                  Saved Jobs ({data.length})
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
                    <Select
                      id="demo-simple-select"
                      value={age}
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
                      setShowAlert={setShowAlert}
                      setUndoData={setUndoData} 
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
