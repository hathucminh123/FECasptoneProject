import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import classes from "./Applied.module.css";
import FormSearch from "../../components/Employer/FormSearch";
import FormSelect from "../../components/Employer/FormSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSeekerJobPost } from "../../Services/JobsPost/GetSeekerJobPost";
import { Link, useParams } from "react-router-dom";
import { PutJobPostActivityStatus } from "../../Services/JobsPostActivity/PutJobPostActivityStatus";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";

const Data = ["Show All Cv", "Show only unseen CVs"];
const headers = ["fullName", "Email", "Phone Number", "CV file","Status", "Action"];

const AppliedCV: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("1");
  const [currentJobPostId, setCurrentJobPostId] = useState<number | null>(null);

  const Height = 37.3;
  const { JobId } = useParams();

  const { data: SeekerApply } = useQuery({
    queryKey: ["SeekerApply", JobId],
    queryFn: ({ signal }) => GetSeekerJobPost({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });

  const { mutate } = useMutation({
    mutationFn: PutJobPostActivityStatus,
    onSuccess: () => {
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      queryClient.invalidateQueries({
        queryKey: ["JobPostActivity"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success("Status Details Update Successfully");
    },
    onError: () => {
      message.error("Failed to Update the status set");
    },
  });

  // const updateJobPostActivity = useMutation((data: { jobPostActivityId: number; status: string }) =>
  //   UpdateJobPostActivity(data)
  // );

  const handleEditClick = (id: number) => {
    setCurrentJobPostId(id);
    setOpenModal(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleSave = () => {
    if (currentJobPostId) {
      mutate({
        data: {
          jobPostActivityId: currentJobPostId,
          status: Number(selectedStatus),
        },
      });
    }
    setOpenModal(false);
  };

  const dataSeekerApply =
    SeekerApply?.GetSeekers?.map((seeker) => ({
      id: seeker.id,
      fullName:
        `${seeker.firstName} ${seeker.lastName}`.trim() || seeker.userName,
      Email: seeker.email,
      "Phone Number": seeker.phoneNumber || "Not provided",
      "CV file": `${seeker.cvPath}`,
      Status:  seeker.status,
      Action: "View Details",
      jobPostActivityId: seeker.jobPostActivityId,
    })) || [];

  return (
    <div className={classes.main1}>
      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <FormSearch placeholder="Find" />
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                data={Data}
                height={Height}
                placeholder="Show All Cv"
              />
            </div>
          </div>
          <div className={classes.main6}>
            <button className={classes.button}>Import CV List</button>
          </div>
        </div>
        <div className={classes.main12}>
          <TableContainer component={Paper}>
            <MuiTable>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header} align="left">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSeekerApply.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.Email}</TableCell>
                    <TableCell>{row["Phone Number"]}</TableCell>
                    <TableCell>
                      <a
                        href={row["CV file"]}
                        download
                        className={classes.cvLink}
                      >
                        Download CV
                      </a>
                    </TableCell>
                    <TableCell>{row.Status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditClick(row.jobPostActivityId)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton component={Link} to={`/userProfileSystem/${row.id}`}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </div>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className={classes.modalBox}>
          <Typography variant="h6" component="h2">
            Update Status
          </Typography>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            fullWidth
          >
            <MenuItem value="1">Pending</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
            <MenuItem value="3">Passed</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={handleSave}
            style={{ marginTop: 16 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            style={{ marginTop: 16 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AppliedCV;
