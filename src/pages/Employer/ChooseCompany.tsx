import React, { useState } from "react";
import classes from "./ChooseCompany.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompanyCard from "../../components/Employer/CompanyCard";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Services/mainService";
import { SelectCompany } from "../../Services/AuthService/SelectCompanyService";

// Import Material-UI components for the modal
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { GetJobPost } from "../../Services/JobsPost/GetJobPosts";

export default function ChooseCompany() {
  const userId = localStorage.getItem("userId");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [open, setOpen] = useState(false); 
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const navigate = useNavigate();

  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });

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
  const Companiesdata = Company?.Companies;

  const { mutate } = useMutation({
    mutationFn: SelectCompany,
    onSuccess: () => {
      message.success("Choose Company Successfully");
      const redirectPath = "/employer-verify/jobs/account/company";

      queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active",
      });

      navigate(redirectPath);
      window.location.reload();
    },
    onError: () => {
      message.error("Failed to Choose the Company");
    },
  });


  const handleOnChooseCompanyUser = (id: number) => {
    setSelectedCompanyId(id); 
    setOpen(true); 
  };


  const handleSubmitVerification = () => {
    if (selectedCompanyId) {
      mutate({
        data: { companyId: selectedCompanyId, employeeId: Number(userId), verificationCode:verificationCode },
      });
      localStorage.setItem("CompanyId", selectedCompanyId.toString());
      setOpen(false); 
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <form>
          <div className={classes.main2}>
            <div className={classes.main3}>
              <span className={classes.span}>
                <SearchOutlinedIcon fontSize="small" />
              </span>
              <input
                className={classes.input}
                autoComplete="off"
                placeholder="Company Name"
                type="text"
              />
            </div>
            <span className={classes.span1}>
              <button type="submit" className={classes.button}>
                Find
              </button>
            </span>
          </div>
        </form>
        <p className={classes.p}>New company created</p>
        <div style={{ display: "block", boxSizing: "border-box" }}>
          <div className={classes.main4}>
            {Companiesdata?.map((company) => { 
                 const jobsInCompany = JobPostsdata?.filter(
                  (item) => item.companyId === company.id
                );

              return(
              <div className={classes.main5} key={company.id}>
                <CompanyCard
                  company={company}
                  jobs={jobsInCompany}
                  onChoose={() => handleOnChooseCompanyUser(company?.id)}
                />
              </div>
            )})}
          </div>
        </div>
      </div>

   
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter Verification Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Verification Code"
            type="text"
            fullWidth
            variant="standard"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} type="default">
            Cancel
          </Button>
          <Button onClick={handleSubmitVerification} type="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
