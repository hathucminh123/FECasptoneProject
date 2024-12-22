import React, { useState } from "react";
import classes from "./ManageJobPosting.module.css";
import HeaderSystem from "../../components/Employer/HeaderSystem";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormSelect from "../../components/Employer/FormSelect";
// import TableJobs from "../../components/Admin/TableJobs";
import TableAccount from "../../components/Admin/TableAccount";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Tooltip from "@mui/material/Tooltip";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { AnimatePresence } from "framer-motion";
import ModalCompany from "../../components/Admin/ModalCompany";
const jobStatusOptions = ["Pending", "Approved", "Suspended"];
const statusToIdMap: { [key: string]: number } = {
  Pending: 0,
  Approved: 2,
  Suspended: 1,
};

// const jobTypeOptions = ["Full-time", "Part-time", "Contract"];



interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}
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
  jobType: JobType; // jobType là đối tượng JobType
  jobLocationCities:string[];
  jobLocationAddressDetail:string[]
  skillSets: string[]; 
}
interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl:string
  companyStatus?:number;
  
}
const headers: (keyof Company | "Action")[] = [
  "companyName",
  "numberOfEmployees",
  "country",
  "companyStatus",
  "Action",
];
// Sample job data


const  ManageJobPosting:React.FC =()=> {
  const [selectStatus, setSelectStatus] = useState<string>("");
  console.log('statuss',selectStatus)
    const [openModal, setOpenModal] = useState<boolean>(false);
  // const [selectJobType, setSelectJobType] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);
   const [companyId, setCompanyId] = useState<number | null>(null);

  
   
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company", selectStatus], 
    queryFn: ({ signal }) =>
      fetchCompanies({
        signal: signal,
        id: statusToIdMap[selectStatus] || 0, 
      }),
      staleTime: 1000,
    // staleTime: 5000,
    enabled:!! selectStatus ,
  });

  const Companiesdata = Company?.Companies || [];

 


  const width = 230;

  const handleViewDetail = (company:Company) => {
    console.log("View Detail clicked for:", openModal);
    // alert(`Viewing details for ${company.companyName}`);
    
    setOpenModal(true)
    setCompanyId(company.id)
  };
  const handleCloseModal = () => {
   
    setOpenModal(false);
    // setPendingUpdate(null); 
  };

  // Custom renderers for specific columns
  const customRenderers: { [key: string]: (row: Company, index: number) => React.ReactNode } = {
    companyName: (company: Company, index: number) => (
      <>
        <span>{company.companyName}</span>
        {hovered === index && (
          <div className={classes.div6} onClick={()=>handleViewDetail(company)}>
            <Link to="#" className={classes.link2}>
              View Job Details
            </Link>
          </div>
        )}
      </>
    ),
    "Number Of Employees": (company: Company) => <span>{company.numberOfEmployees}</span>,
    Country: (company: Company) => <span>{company.country}</span>,
    companyStatus: (company: Company) => (
      <span
        style={{
          color:
            company.companyStatus === 2
              ? "green"
              : company.companyStatus === 0
              ? "orange"
              : "red",
          fontWeight: "bold",
        }}
      >
        {company.companyStatus === 2
          ? "Approved"
          : company.companyStatus === 0
          ? "Pending"
          : "Rejected"}
      </span>
    ),
    Action: (company: Company, index: number) => (
      <div className={classes.actions}>
        {company.companyStatus === 0 && (
          <div className={classes.icon2}>
            <Tooltip title="Approve">
              <CheckCircleIcon
                fontSize="small"
                sx={{
                  backgroundColor: hovered === index ? "#4CAF50" : "#e8edf2",
                  borderRadius: "50%",
                  padding: "10px",
                  color: hovered === index ? "#fff" : undefined,
                }}
              />
            </Tooltip>
          </div>
        )}
        <div className={classes.icon2}>
          <Tooltip title="Edit">
            <ModeEditIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
        <div className={classes.icon2}>
          <Tooltip title="Suspend">
            <PauseIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
        <div className={classes.icon2}>
          <Tooltip title="Delete">
            <DeleteIcon
              fontSize="small"
              sx={{
                backgroundColor: hovered === index ? "#FF6F61" : "#e8edf2",
                borderRadius: "50%",
                padding: "10px",
                color: hovered === index ? "#fff" : undefined,
              }}
            />
          </Tooltip>
        </div>
      </div>
    ),
  };
  

  return (
    <div className={classes.main}>
       <AnimatePresence>
        {openModal && (
          <ModalCompany
            onClose={handleCloseModal} // Đóng modal
            companyId ={companyId}
            // onConfirm={handleConfirmModal} // Xác nhận trong modal
          />
        )}
      </AnimatePresence>
      <div className={classes.div}>
        <HeaderSystem title="Company Info Management" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <form action="" className={classes.form}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder="Search by Company name"
                />
                <button className={classes.button}>
                  <SearchOutlinedIcon fontSize="small" />
                </button>
              </form>
            </div>
            <div className={classes.main5}>
              <FormSelect
                selectedValue={selectStatus}
                setSelectedValue={setSelectStatus}
                data={jobStatusOptions}
                width={width}
                placeholder="Filter by Company Status"
              />
            </div>
            {/* <div className={classes.main5}>
              <FormSelect
                selectedValue={selectJobType}
                setSelectedValue={setSelectJobType}
                data={jobTypeOptions}
                width={width}
                placeholder="Filter by Job Type"
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className={classes.main6}>
        <div className={classes.main7}>
          <div className={classes.main8}>
            <div className={classes.main9}>
              <div className={classes.main10}>
                Found
                <span className={classes.span}> {Companiesdata.length} </span>
                Jobs
              </div>
            </div>
          </div>
          <div className={classes.main12}>
            <TableAccount
              headers={headers}
              data={Companiesdata}
          
              customRenderers={customRenderers}
              hovered={hovered}
              setHovered={setHovered} // Correct prop name
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default ManageJobPosting